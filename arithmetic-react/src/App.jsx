import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const calculate = (op) => {
    let a = Number(num1);
    let b = Number(num2);

    if (op === "+") setResult(a + b);
    else if (op === "-") setResult(a - b);
    else if (op === "*") setResult(a * b);
    else if (op === "/") setResult(b === 0 ? "Cannot divide by zero" : a / b);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Arithmetic Operations</h2>

      <input
        type="number"
        placeholder="Enter number 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter number 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br />
      <br />

      <button onClick={() => calculate("+")}>Add</button>
      <button onClick={() => calculate("-")}>Subtract</button>
      <button onClick={() => calculate("*")}>Multiply</button>
      <button onClick={() => calculate("/")}>Divide</button>

      <p>Result: {result}</p>
    </div>
  );
}

export default App;
