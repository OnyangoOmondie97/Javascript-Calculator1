import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [formula, setFormula] = useState("");
  const [equalPressed, setEqualPressed] = useState(false);

  const rounded = (number) => parseFloat(number.toFixed(4));

  const handleNumberClick = (number) => {
    if (equalPressed) {
        setInput(number);
        setFormula(number);
        setEqualPressed(false);
        return;
    }

    if (input === "0") {
      setInput(number);
    } else {
      setInput(prev => prev + number);
    }
    setFormula(prev => prev + number);
  };

  const handleOperatorClick = (op) => {
    if (equalPressed) {
      setFirstValue(parseFloat(input));
      setFormula(input + op);
      setInput('0');
      setEqualPressed(false);
      setOperator(op);
      return;
    }

    if (operator) {
      setFormula(prev => prev.slice(0, -1) + op);
      setOperator(op);
      return;
    } else {
      setFirstValue(parseFloat(input));
      setFormula(prev => prev + op);
    }
    setInput('0');
    setOperator(op);
  };

  const handleEqualClick = () => {
      if (!operator || firstValue === null) return;
  
          let result;
          switch(operator) {
            case '+':
              result = firstValue + parseFloat(input);
              break;
            case '-':
              result = firstValue - parseFloat(input);
              break;
            case 'x':
              result = firstValue * parseFloat(input);
              break;
            case '/':
              result = firstValue / parseFloat(input);
              break;
            default:
              return;
          }
  
          const roundedResult = rounded(result).toString();
          setInput(roundedResult);
          setFormula(roundedResult);
          setFirstValue(null);
          setOperator(null);
          setEqualPressed(true);
        };



  return (
    <div id="App" className="calculator">
      <div className="formulaScreen">{formula}</div>
      <div className="outputScreen" id="display">{input}</div>

      <div className="buttons">
        <div className="row" style={{height: "20%"}}>
          <div className="col-6 p-0">
            <button 
              className="btn btn-block" 
              id="clear" 
              onClick={() => {
                setInput("0");
                setOperator(null);
                setFirstValue(null);
                setFormula("");
                setEqualPressed(false);
              }}>
              AC
            </button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="divide" onClick={() => handleOperatorClick("/")}>/</button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="multiply" onClick={() => handleOperatorClick("x")}>x</button>
          </div>
        </div>

        <div className="row" style={{height: "20%"}}>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="seven" onClick={() => handleNumberClick("7")}>7</button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="eight" onClick={() => handleNumberClick("8")}>8</button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="nine" onClick={() => handleNumberClick("9")}>9</button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="subtract" onClick={() => handleOperatorClick("-")}>-</button>
          </div>
        </div>

        <div className="row" style={{height: "20%"}}>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="four" onClick={() => handleNumberClick("4")}>4</button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="five" onClick={() => handleNumberClick("5")}>5</button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="six" onClick={() => handleNumberClick("6")}>6</button>
          </div>
          <div className="col-3 p-0">
            <button className="btn btn-block" id="add" onClick={() => handleOperatorClick("+")}>+</button>
          </div>
        </div>

        <div class="row" style={{height: "40%"}}>
          <div class="col-9 p-0 d-flex flex-column">
            <div className="row">
              <div className="col-4 p-0">
                <button className="btn btn-block" id="one" onClick={() => handleNumberClick("1")}>1</button>
              </div>
              <div className="col-4 p-0">
                <button className="btn btn-block" id="two" onClick={() => handleNumberClick("2")}>2</button>
              </div>
              <div className="col-4 p-0">
                <button className="btn btn-block" id="three" onClick={() => handleNumberClick("3")}>3</button>
              </div>
            </div>

            <div className="row">
              <div className="col-8 p-0">
                <button className="btn btn-block" id="zero" onClick={() => handleNumberClick("0")}>0</button>
              </div>
              <div className="col-4 p-0">
                <button className="btn btn-block" id="decimal" onClick={() => { if (!input.includes('.')) setInput(prev => prev + '.') }}>.</button>
              </div>
            </div>
          </div>

          <div class="col-3 p-0 d-flex align-items-center">
            <button className="btn btn-block" id="equals" onClick={handleEqualClick}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;