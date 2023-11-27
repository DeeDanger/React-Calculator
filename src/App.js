import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./Operationbutton";
import { useReducer, React } from "react";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.current === "0") {
        return state;
      }
      if (payload.digit === "." && state.current.includes(".")) {
        return state;
      }
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.current == null && state.previous == null) {
        return state;
      }
      if (state.previous == null) {
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        };
      }
      return {
        ...state,
        previous: evaluate(state),
        operation: payload.operation,
        current: null,
      };
    case ACTIONS.CLEAR:
      return {};
  }
}

function evaluate({ current, previous, operation }) {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
  }
  return computation.toString();
}

function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="App">
      <h1>CALCULATOR</h1>
      <div className="calculatorContainer">
        <div className="screenContainer">
          <div className="previousScreen">
            {previous}
            {operation}
          </div>
          <div className="currentScreen">{current}</div>
        </div>
        <div className="btnContainer">
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />

          <OperationButton operation="+" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <OperationButton operation="/" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <button
            className="clearBtn"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            C
          </button>
          <button className="equalBtn" style={{ marginLeft: "7rem" }}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
