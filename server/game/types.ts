export type BoardState = {
  ships: Ship[];
  shots: string[];
};

export type Ship = ShipField[];

export type ShipField = {
  position: string;
  shot?: boolean;
};

export interface BoardGenerator {
  generateShips: () => Ship[];
}

export interface BoardTransformer {
  transformBoard: (boardState: BoardState) => any;
}
