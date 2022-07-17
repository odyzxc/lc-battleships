import { BoardState, BoardTransformer, Ship } from "./types";

// M - miss, H - hit, S - sunk
class UrlBoardEncoder implements BoardTransformer {
  transformBoard(boardState: BoardState): string {
    const boardShotPositions: string[] = boardState.shots.map((shot) =>
      this.processShot(shot, boardState.ships)
    );
    return `http://localhost:3000/?positions=${boardShotPositions.join(",")}`;
  }

  private processShot(shot: string, ships: Ship[]): string {
    const shipShot = ships.find(
      (ship) => ship.findIndex((field) => field.position === shot) !== -1
    );
    if (!shipShot) {
      return `${shot}-M`;
    }
    if (shipShot.every((field) => field.shot)) {
      return `${shot}-S`;
    }
    return `${shot}-H`;
  }
}

export default UrlBoardEncoder;
