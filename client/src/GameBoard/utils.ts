export const transformEncodedPositionsTo = (
  positions: string[] | undefined
) => {
  const arrays = Array.from(Array(10), (_, outerIndex) => {
    return Array.from(Array(10), (_, innerIndex) => {
      return "";
    });
  });
  positions?.forEach((position) => {
    const state = position.charAt(position.length - 1);
    const x = position.charCodeAt(0) - 65;
    const y = position.match(/\d/g)?.join("");
    if (!y) {
      throw new Error("Incorrect board config!");
    }
    arrays[x][parseInt(y) - 1] = state;
  });
  return arrays;
};

export const getColourFromPositionState = (state: string) => {
  if (state === "M") {
    return "#F16858";
  }
  if (state === "S") {
    return "#59DC6E";
  }
  if (state === "H") {
    return "#FFE141";
  }
  return "#FFFFFF";
};
