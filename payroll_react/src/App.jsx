import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [empid, setEmpid] = useState("");
  const [name, setName] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [edit, setEdit] = useState(false);

  // READ
  const getEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees");
    const data = await res.json();
    setEmployees(data);
  };

  // CREATE / UPDATE
  const saveEmployee = async () => {
    if (!empid || !name || !basicPay) {
      alert("Enter all details");
      return;
    }

    const data = {
      empid,
      name,
      basic_pay: Number(basicPay),
    };

    if (edit) {
      await fetch(`http://localhost:5000/employees/${empid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    clearForm();
    getEmployees();
  };

  // EDIT
  const editEmployee = (employee) => {
    setEmpid(employee.empid);
    setName(employee.name);
    setBasicPay(employee.basic_pay);
    setEdit(true);
  };

  // DELETE
  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    });

    getEmployees();
  };

  const clearForm = () => {
    setEmpid("");
    setName("");
    setBasicPay("");
    setEdit(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Employee Payroll</h2>

      <input
        type="text"
        placeholder="Employee ID"
        value={empid}
        onChange={(e) => setEmpid(e.target.value)}
        disabled={edit}
      />

      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Basic Pay"
        value={basicPay}
        onChange={(e) => setBasicPay(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveEmployee}>
        {edit ? "Update Employee" : "Add Employee"}
      </button>

      <button onClick={clearForm}>Clear</button>

      <button onClick={getEmployees}>Load Employees</button>

      <h3>Payroll List</h3>

      <table border="1" align="center" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Basic Pay</th>
            <th>DA</th>
            <th>HRA</th>
            <th>EPF</th>
            <th>Loan</th>
            <th>PT</th>
            <th>Gross Pay</th>
            <th>Net Pay</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.empid}>
              <td>{employee.empid}</td>
              <td>{employee.name}</td>
              <td>{employee.basic_pay}</td>
              <td>{employee.da}</td>
              <td>{employee.hra}</td>
              <td>{employee.epf}</td>
              <td>{employee.loan}</td>
              <td>{employee.professional_tax}</td>
              <td>{employee.gross_pay}</td>
              <td>{employee.net_pay}</td>

              <td>
                <button onClick={() => editEmployee(employee)}>Edit</button>

                <button onClick={() => deleteEmployee(employee.empid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
