import { isValidPosition } from "./utils";

test("single position - valid", () => {
  expect(isValidPosition("A1")).toBe(true);
  expect(isValidPosition("C7")).toBe(true);
  expect(isValidPosition("D1")).toBe(true);
  expect(isValidPosition("J10")).toBe(true);
});

test("comma separated positions - valid", () => {
  expect(isValidPosition("A1,J10")).toBe(true);
  expect(isValidPosition("B5,C7")).toBe(true);
  expect(isValidPosition("C6,C7,C8,C9,C10")).toBe(true);
});

test("single position - invalid", () => {
  expect(isValidPosition("example message")).toBe(false);
  expect(isValidPosition("K1")).toBe(false);
  expect(isValidPosition("A11")).toBe(false);
});

test("comma separated positions - invalid", () => {
  expect(isValidPosition("message,A10")).toBe(false);
  expect(isValidPosition("A1,K10")).toBe(false);
  expect(isValidPosition("B5,C11")).toBe(false);
  expect(isValidPosition("D,10")).toBe(false);
});
