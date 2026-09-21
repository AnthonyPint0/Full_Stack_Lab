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
  database: "payroll_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// Calculate payroll
const calculatePayroll = (basic) => {
  basic = Number(basic);

  const da = basic * 0.1;
  const hra = basic * 0.2;
  const epf = basic * 0.12;
  const loan = basic * 0.05;
  const professional_tax = 200;

  const gross_pay = basic + da + hra;
  const net_pay = gross_pay - epf - loan - professional_tax;

  return {
    da,
    hra,
    epf,
    loan,
    professional_tax,
    gross_pay,
    net_pay,
  };
};

// READ
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// CREATE
app.post("/employees", (req, res) => {
  const { empid, name, basic_pay } = req.body;

  const p = calculatePayroll(basic_pay);

  const sql = `
        INSERT INTO employees
        (empid, name, basic_pay, da, hra, epf, loan,
         professional_tax, gross_pay, net_pay)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      empid,
      name,
      basic_pay,
      p.da,
      p.hra,
      p.epf,
      p.loan,
      p.professional_tax,
      p.gross_pay,
      p.net_pay,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Employee added");
    },
  );
});

// UPDATE
app.put("/employees/:empid", (req, res) => {
  const { name, basic_pay } = req.body;

  const p = calculatePayroll(basic_pay);

  const sql = `
        UPDATE employees
        SET name=?,
            basic_pay=?,
            da=?,
            hra=?,
            epf=?,
            loan=?,
            professional_tax=?,
            gross_pay=?,
            net_pay=?
        WHERE empid=?
    `;

  db.query(
    sql,
    [
      name,
      basic_pay,
      p.da,
      p.hra,
      p.epf,
      p.loan,
      p.professional_tax,
      p.gross_pay,
      p.net_pay,
      req.params.empid,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Employee updated");
    },
  );
});

// DELETE
app.delete("/employees/:empid", (req, res) => {
  db.query("DELETE FROM employees WHERE empid=?", [req.params.empid], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Employee deleted");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
