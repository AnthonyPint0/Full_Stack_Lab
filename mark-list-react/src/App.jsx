import { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [regno, setRegno] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState(["", "", "", "", ""]);
  const [edit, setEdit] = useState(false);

  // READ
  const getStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE / UPDATE
  const saveStudent = async () => {
    if (!regno || !name || marks.some((m) => m === "")) {
      alert("Please enter all details");
      return;
    }

    const data = {
      regno: regno,
      name: name,
      sub1: Number(marks[0]),
      sub2: Number(marks[1]),
      sub3: Number(marks[2]),
      sub4: Number(marks[3]),
      sub5: Number(marks[4]),
    };

    try {
      if (edit) {
        await fetch(`http://localhost:5000/students/${regno}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("http://localhost:5000/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      clearForm();
      getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const editStudent = (student) => {
    setRegno(student.regno);
    setName(student.name);

    setMarks([
      student.sub1,
      student.sub2,
      student.sub3,
      student.sub4,
      student.sub5,
    ]);

    setEdit(true);
  };

  // DELETE
  const deleteStudent = async (regno) => {
    try {
      await fetch(`http://localhost:5000/students/${regno}`, {
        method: "DELETE",
      });

      getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // CLEAR
  const clearForm = () => {
    setRegno("");
    setName("");
    setMarks(["", "", "", "", ""]);
    setEdit(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Student Mark List</h2>

      <input
        type="text"
        placeholder="Register Number"
        value={regno}
        onChange={(e) => setRegno(e.target.value)}
        disabled={edit}
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      {marks.map((mark, index) => (
        <input
          key={index}
          type="number"
          placeholder={`Subject ${index + 1}`}
          value={mark}
          onChange={(e) => {
            const newMarks = [...marks];
            newMarks[index] = e.target.value;
            setMarks(newMarks);
          }}
        />
      ))}

      <br />
      <br />

      <button onClick={saveStudent}>
        {edit ? "Update Student" : "Add Student"}
      </button>

      <button onClick={clearForm}>Clear</button>

      <button onClick={getStudents}>Load Students</button>

      <h3>Student Mark List</h3>

      <table border="1" align="center" cellPadding="8">
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Sub 1</th>
            <th>Sub 2</th>
            <th>Sub 3</th>
            <th>Sub 4</th>
            <th>Sub 5</th>
            <th>Result</th>
            <th>CGPA</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.regno}>
              <td>{student.regno}</td>
              <td>{student.name}</td>
              <td>{student.sub1}</td>
              <td>{student.sub2}</td>
              <td>{student.sub3}</td>
              <td>{student.sub4}</td>
              <td>{student.sub5}</td>
              <td>{student.result}</td>
              <td>{student.cgpa}</td>
              <td>{student.grade}</td>

              <td>
                <button onClick={() => editStudent(student)}>Edit</button>

                <button onClick={() => deleteStudent(student.regno)}>
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
