import {
  getColourFromPositionState,
  transformEncodedPositionsTo,
} from "./utils";
import "./gameboard.css";

const GameBoard = () => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const positions = searchParams.get("positions")?.split(",");

  const transformedPositions = transformEncodedPositionsTo(positions);
  console.log({ transformedPositions });
  return (
    <div className="gameboard">
      <div className="row">
        <div className="field-box">
          <div className="number"></div>
        </div>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <div className="field-box">
              <div className="number">{index + 1}</div>
            </div>
          ))}
      </div>
      {transformedPositions.map((row, rowIndex) => (
        <>
          <div className="row">
            <div className="field-box">
              <div className="number">{String.fromCharCode(65 + rowIndex)}</div>
            </div>
            {row.map((position) => (
              <div className="field-box">
                <div
                  className="field"
                  style={{
                    backgroundColor: getColourFromPositionState(position),
                  }}
                ></div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
export default GameBoard;
