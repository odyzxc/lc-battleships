import { BoardGenerator, Ship } from "./types";

const mockShips: Ship[] = [
  [{ position: "A1" }, { position: "A2" }, { position: "A3" }],
  [{ position: "C5" }, { position: "D5" }, { position: "E5" }],
];

class MockBoardGenerator implements BoardGenerator {
  public generateShips() {
    return mockShips;
  }
}
