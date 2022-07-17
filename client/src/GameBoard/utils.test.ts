import { transformEncodedPositionsTo } from "./utils";

test("single position", () => {
  const result = transformEncodedPositionsTo(["A1-H"]);
  expect(result[0][0]).toBe("H");
});

test("multiple positions", () => {
  const result = transformEncodedPositionsTo(["A1-H", "B2-M", "J10-S"]);
  expect(result[0][0]).toBe("H");
  expect(result[1][1]).toBe("M");
  expect(result[9][9]).toBe("S");
});
