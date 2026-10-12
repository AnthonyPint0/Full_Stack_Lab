const express = require("express");
const calc = require("./calculator");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/calculate", (req, res) => {
  const a = Number(req.body.a);
  const b = Number(req.body.b);
  const op = req.body.op;

  let result;

  if (op === "add") result = calc.add(a, b);
  else if (op === "sub") result = calc.sub(a, b);
  else if (op === "mul") result = calc.mul(a, b);
  else if (op === "div") result = calc.div(a, b);
  else return res.status(400).send("Invalid operation");

  res.send(`
        <h2>Result: <p>${result}</p></h2>
        <a href="/">Go Back</a>
    `);
});

app.listen(3000, () => console.log("Server running on port 3000"));
