import UrlBoardEncoder from "./UrlBoardEncoder";
import { BoardState } from "./types";

describe("UrlBoardEncoder", () => {
  test("misses only", () => {
    const urlBoardEncoder = new UrlBoardEncoder();
    const board: BoardState = { ships: [], shots: ["A1", "J10"] };
    const result = urlBoardEncoder.transformBoard(board);
    expect(result).not.toBeNull();
    expect(result).toEqual("http://localhost:3000/?positions=A1-M,J10-M");
  });
  test("some ships hit", () => {
    const urlBoardEncoder = new UrlBoardEncoder();
    const board: BoardState = {
      ships: [[{ position: "A1", shot: true }, { position: "A2" }]],
      shots: ["A1", "J10"],
    };
    const result = urlBoardEncoder.transformBoard(board);
    expect(result).not.toBeNull();
    expect(result).toEqual("http://localhost:3000/?positions=A1-H,J10-M");
  });
  test("some ships sunk", () => {
    const urlBoardEncoder = new UrlBoardEncoder();
    const board: BoardState = {
      ships: [
        [
          { position: "A1", shot: true },
          { position: "A2", shot: true },
        ],
      ],
      shots: ["A1", "A2", "J10"],
    };
    const result = urlBoardEncoder.transformBoard(board);
    expect(result).not.toBeNull();
    expect(result).toEqual("http://localhost:3000/?positions=A1-S,A2-S,J10-M");
  });
  test("some ships sunk, some hit, some misses too", () => {
    const urlBoardEncoder = new UrlBoardEncoder();
    const board: BoardState = {
      ships: [
        [
          { position: "A1", shot: true },
          { position: "A2", shot: true },
        ],
        [{ position: "D1", shot: true }, { position: "D2" }],
      ],
      shots: ["A1", "A2", "D1", "J10"],
    };
    const result = urlBoardEncoder.transformBoard(board);
    expect(result).not.toBeNull();
    expect(result).toEqual(
      "http://localhost:3000/?positions=A1-S,A2-S,D1-H,J10-M"
    );
  });
});
