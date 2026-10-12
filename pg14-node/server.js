const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "college",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/search", (req, res) => {
  const id = req.body.id;

  let sql = "SELECT * FROM students";
  let values = [];

  if (id) {
    sql += " WHERE id = ?";
    values.push(id);
  }

  db.query(sql, values, (err, records) => {
    if (err) return res.status(500).send("Database error");

    let html = `<h2>Student Records</h2>
                    <table border="1" cellpadding="8">
                    <tr><th>ID</th><th>Name</th>
                    <th>Department</th><th>Marks</th></tr>`;

    records.forEach((s) => {
      html += `<tr><td>${s.id}</td><td>${s.name}</td>
                     <td>${s.department}</td><td>${s.marks}</td></tr>`;
    });

    html += `</table><br><a href="/">Go Back</a>`;
    res.send(html);
  });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
