import { useEffect, useRef, useState } from "react";
import { symbols, calculateResult } from "../services/calculating-service";
import CalculatorActions from "../components/calculator-actions/CalculatorActions";
import "./Calculator.css";

const Calculator: React.FC = () => {
  const equation = useRef<HTMLParagraphElement>(null);
  const appendText = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.textContent!;
    manageTextInput(value);
  };

  const manageTextInput = (value: string) => {
    if (equation.current) {
      if (value === "CE" || value.toLowerCase() === "delete") {
        equation.current.innerText = "";
      } else if (value === "<" || value.toLowerCase() === "backspace") {
        equation.current.innerText = equation.current.innerText.slice(0, -1);
      } else if (value === "=" || value.toLowerCase() === "enter") {
        calculateResult(equation.current.innerText);
      } else if (!symbols.includes(value)) {
        return;
      } else {
        equation.current.innerText += value;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      console.log(`Key pressed: ${event.key}`);
      console.log(`Key code: ${event.code}`);
      manageTextInput(event.key);
    });
  }, []);

  return (
    <div className="calculator">
      <div className="calculator-container">
        <div className="calculator-input">
          <p ref={equation}></p>
        </div>
        <div className="calculator-input">
          <CalculatorActions onClick={appendText} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
