import { BoardState, BoardGenerator, BoardTransformer } from "./types";

class GameManager {
  private readonly state: Record<string, BoardState>;
  private readonly boardGenerator: BoardGenerator;
  private readonly boardTransformer: BoardTransformer;

  constructor(
    boardGenerator: BoardGenerator,
    boardTransformer: BoardTransformer = { transformBoard: (board) => board }
  ) {
    this.state = {};
    this.boardGenerator = boardGenerator;
    this.boardTransformer = boardTransformer;
  }

  startGame(threadId: string) {
    this.state[threadId] = {
      ships: this.boardGenerator.generateShips(),
      shots: [],
    };
  }

  playTurn(threadId: string, message: string) {
    if (!this.state[threadId]) {
      this.startGame(threadId);
    }
    const positions = Array.from(new Set(message.split(",")));

    const events: string[] = [];
    positions.forEach((position) =>
      this.processPosition(threadId, position, events)
    );
    this.checkForWin(threadId, events);
    return {
      boardState: this.boardTransformer.transformBoard(this.state[threadId]),
      events,
    };
  }

  private processPosition(
    threadId: string,
    position: string,
    events: string[]
  ) {
    if (this.state[threadId].shots.includes(position)) {
      events.push(
        `Position ${position} was already shot in earlier turn of the game.`
      );
      return;
    }

    this.state[threadId].shots.push(position);

    let shipFieldIndex = -1;
    const shipShotIndex = this.state[threadId].ships.findIndex((ship) => {
      shipFieldIndex = ship.findIndex((field) => field.position === position);
      return shipFieldIndex !== -1;
    });
    if (shipShotIndex === -1) {
      events.push(`${position} is a miss.`);
      return;
    }
    // marking ship field shot
    this.state[threadId].ships[shipShotIndex][shipFieldIndex] = {
      ...this.state[threadId].ships[shipShotIndex][shipFieldIndex],
      shot: true,
    };

    const shipHit = this.state[threadId].ships[shipShotIndex];
    if (shipHit.every((field) => field.shot)) {
      events.push(`${position} sunk a ship.`);
      return;
    }
    events.push(`${position} hit a ship.`);
  }

  private checkForWin(threadId: string, events: string[]) {
    const won = this.state[threadId].ships.every((ship) =>
      ship.every((field) => field.shot)
    );
    if (won) {
      events.push(`Congratulations you've won!`);
    }
  }
}

export default GameManager;
