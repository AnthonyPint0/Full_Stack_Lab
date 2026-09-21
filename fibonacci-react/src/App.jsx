import { useState } from "react";

function App() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");

  // Recursive factorial
  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  // Recursive Fibonacci
  const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const showFactorial = () => {
    let n = Number(num);

    if (n < 0 || !Number.isInteger(n)) setResult("Enter a positive integer");
    else setResult("Factorial = " + factorial(n));
  };

  const showFibonacci = () => {
    let n = Number(num);

    if (n <= 0 || !Number.isInteger(n)) {
      setResult("Enter a positive integer");
      return;
    }

    let series = "";

    for (let i = 0; i < n; i++) series += fibonacci(i) + " ";

    setResult("Fibonacci = " + series);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Factorial and Fibonacci</h2>

      <input
        type="number"
        placeholder="Enter number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />

      <br />
      <br />

      <button onClick={showFactorial}>Factorial</button>
      <button onClick={showFibonacci}>Fibonacci</button>

      <p>{result}</p>
    </div>
  );
}

export default App;
