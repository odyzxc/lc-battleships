const validPositionsRegex = new RegExp(/^((^|[,])([A-J]([1-9]|10)))+$/);

export const isValidPosition = (message: string) =>
  validPositionsRegex.test(message);
