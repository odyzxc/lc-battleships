import GameManager from "./GameManager";
import { BoardGenerator } from "./types";

const oneShipBoardGenerator: BoardGenerator = {
  generateShips: () => [[{ position: "A1" }]],
};

describe("GameManager", () => {
  test("returns boardState and events", () => {
    const gameManager = new GameManager(oneShipBoardGenerator);
    const testThreadId = "testThreadId";
    gameManager.startGame(testThreadId);
    const result = gameManager.playTurn(testThreadId, "A1");
    expect(result).not.toBeNull();
    expect(result.boardState).not.toBeNull();
    expect(result.events).not.toBeNull();
  });

  test("game won", () => {
    const gameManager = new GameManager(oneShipBoardGenerator);
    const testThreadId = "testThreadId";
    gameManager.startGame(testThreadId);
    const result = gameManager.playTurn(testThreadId, "A1");
    expect(result).not.toBeNull();
    expect(result.boardState).not.toBeNull();
    expect(result.events).not.toBeNull();
    expect(result.events).toContain("A1 sunk a ship.");
    expect(result.events).toContain("Congratulations you've won!");
  });

  test("shot missed", () => {
    const gameManager = new GameManager(oneShipBoardGenerator);
    const testThreadId = "testThreadId";
    gameManager.startGame(testThreadId);
    const result = gameManager.playTurn(testThreadId, "A2");
    expect(result).not.toBeNull();
    expect(result.boardState).not.toBeNull();
    expect(result.events).not.toBeNull();
    expect(result.events).toContain("A2 is a miss.");
  });

  test("shot hit", () => {
    const twoFieldShipGenerator = {
      generateShips: () => [[{ position: "A1" }, { position: "A2" }]],
    };
    const gameManager = new GameManager(twoFieldShipGenerator);
    const testThreadId = "testThreadId";
    gameManager.startGame(testThreadId);
    const result = gameManager.playTurn(testThreadId, "A2");
    expect(result).not.toBeNull();
    expect(result.boardState).not.toBeNull();
    expect(result.events).not.toBeNull();
    expect(result.events).toContain("A2 hit a ship.");
    expect(result.events).not.toContain("Congratulations you've won!");
    expect(result.events).not.toContain("A2 is a miss.");
  });
});
