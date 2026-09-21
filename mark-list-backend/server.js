const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "studentdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// Calculate result, CGPA and grade
const calculate = (marks) => {
  let total = marks.reduce((a, b) => a + Number(b), 0);
  let percentage = total / 5;

  let result = marks.every((m) => Number(m) >= 40) ? "PASS" : "FAIL";

  let cgpa = result === "PASS" ? percentage / 10 : 0;

  let grade;

  if (result === "FAIL") grade = "F";
  else if (cgpa >= 9) grade = "A+";
  else if (cgpa >= 8) grade = "A";
  else if (cgpa >= 7) grade = "B";
  else if (cgpa >= 6) grade = "C";
  else grade = "D";

  return { result, cgpa, grade };
};

// READ
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
});

// CREATE
app.post("/students", (req, res) => {
  const { regno, name, sub1, sub2, sub3, sub4, sub5 } = req.body;

  const marks = [sub1, sub2, sub3, sub4, sub5];
  const { result, cgpa, grade } = calculate(marks);

  const sql = `
        INSERT INTO students
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [regno, name, sub1, sub2, sub3, sub4, sub5, result, cgpa, grade],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Student added");
    },
  );
});

// UPDATE
app.put("/students/:regno", (req, res) => {
  const { name, sub1, sub2, sub3, sub4, sub5 } = req.body;

  const marks = [sub1, sub2, sub3, sub4, sub5];
  const { result, cgpa, grade } = calculate(marks);

  const sql = `
        UPDATE students
        SET name=?, sub1=?, sub2=?, sub3=?, sub4=?,
            sub5=?, result=?, cgpa=?, grade=?
        WHERE regno=?
    `;

  db.query(
    sql,
    [name, sub1, sub2, sub3, sub4, sub5, result, cgpa, grade, req.params.regno],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Student updated");
    },
  );
});

// DELETE
app.delete("/students/:regno", (req, res) => {
  db.query("DELETE FROM students WHERE regno=?", [req.params.regno], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Student deleted");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
