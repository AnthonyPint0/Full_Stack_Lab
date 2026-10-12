const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "payroll",
});

const calculate = (basic) => {
  const da = basic * 0.1;
  const hra = basic * 0.2;
  const epf = basic * 0.12;
  const loan = basic * 0.05;
  const pt = 200;
  const gross = basic + da + hra;
  const net = gross - epf - loan - pt;
  return [da, hra, epf, loan, pt, gross, net];
};

// READ
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.json(data);
  });
});

// CREATE
app.post("/employees", (req, res) => {
  const { empid, name, basic } = req.body;
  const b = Number(basic);

  if (
    !empid?.trim() ||
    !name?.trim() ||
    basic === "" ||
    !Number.isFinite(b) ||
    b < 0
  )
    return res.status(400).send("Enter valid employee details");

  const values = [empid.trim(), name.trim(), b, ...calculate(b)];

  db.query(
    `INSERT INTO employees
     (empid,name,basic,da,hra,epf,loan,pt,gross,net)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    values,
    (err) => {
      if (err) return res.status(400).send(err.message);
      res.send("Employee added");
    },
  );
});

// UPDATE
app.put("/employees/:id", (req, res) => {
  const { name, basic } = req.body;
  const b = Number(basic);

  if (!name?.trim() || basic === "" || !Number.isFinite(b) || b < 0)
    return res.status(400).send("Enter valid employee details");

  db.query(
    `UPDATE employees SET name=?,basic=?,da=?,hra=?,epf=?,
     loan=?,pt=?,gross=?,net=? WHERE empid=?`,
    [name.trim(), b, ...calculate(b), req.params.id],
    (err, result) => {
      if (err) return res.status(400).send(err.message);
      if (!result.affectedRows)
        return res.status(404).send("Employee not found");
      res.send("Employee updated");
    },
  );
});

// DELETE
app.delete("/employees/:id", (req, res) => {
  db.query(
    "DELETE FROM employees WHERE empid=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err.message);
      if (!result.affectedRows)
        return res.status(404).send("Employee not found");
      res.send("Employee deleted");
    },
  );
});

app.listen(3000, () => console.log("Server running on port 3000"));
