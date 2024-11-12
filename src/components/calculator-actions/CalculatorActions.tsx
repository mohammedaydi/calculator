import { Props } from "../../types/CalculatorActionsProps";
import "./CalculatorActions.css";

const elements: (string | JSX.Element)[] = [
  "CE",
  "<",
  ".",
  "/",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "(",
  "0",
  ")",
  <span>=</span>,
];

const CalculatorActions = (props: Props) => {
  return (
    <div className="actions-container">
      {elements.map((element, index) => (
        <button onClick={props.onClick} key={index} className="grid-item">
          {element}
        </button>
      ))}
      <button onClick={props.onClick} className="grid-item eq">
        %
      </button>
    </div>
  );
};

export default CalculatorActions;
