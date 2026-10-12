const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/payroll");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    empid: { type: String, unique: true },
    name: String,
    basic: Number,
    da: Number,
    hra: Number,
    epf: Number,
    loan: Number,
    pt: Number,
    gross: Number,
    net: Number,
  }),
);

// Calculate payroll
const calculate = (e) => {
  e.da = e.basic * 0.1;
  e.hra = e.basic * 0.2;
  e.epf = e.basic * 0.12;
  e.loan = e.basic * 0.05;
  e.pt = 200;
  e.gross = e.basic + e.da + e.hra;
  e.net = e.gross - e.epf - e.loan - e.pt;
  return e;
};

// READ
app.get("/employees", async (req, res) => res.json(await Employee.find()));

// CREATE
app.post("/employees", async (req, res) => {
  try {
    res.json(await Employee.create(calculate(req.body)));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put("/employees/:id", async (req, res) => {
  try {
    const e = calculate(req.body);
    const updated = await Employee.findOneAndUpdate(
      { empid: req.params.id },
      e,
      { new: true, runValidators: true },
    );
    if (!updated) return res.status(404).json({ error: "Employee not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete("/employees/:id", async (req, res) => {
  await Employee.findOneAndDelete({ empid: req.params.id });
  res.json({ message: "Employee deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
