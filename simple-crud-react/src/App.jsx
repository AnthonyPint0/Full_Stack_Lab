import { useState } from "react";

function App() {
  const [users, setUsers] = useState([{ id: "1", name: "John Doe" }]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Create / Update
  const saveUser = () => {
    if (id === "" || name === "") return;

    if (editId === null) {
      // Create
      setUsers([...users, { id: id, name: name }]);
    } else {
      // Update
      setUsers(
        users.map((user) =>
          user.id === editId ? { ...user, name: name } : user,
        ),
      );

      setEditId(null);
    }

    setId("");
    setName("");
  };

  // Edit user
  const editUser = (user) => {
    setId(user.id);
    setName(user.name);
    setEditId(user.id);
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>User Management - CRUD</h2>

      <input
        type="text"
        placeholder="Enter user ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        disabled={editId !== null}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={saveUser}>
        {editId === null ? "Add User" : "Update User"}
      </button>

      <h3>User List</h3>

      {users.map((user) => (
        <div key={user.id}>
          {user.id} - {user.name}
          <button onClick={() => editUser(user)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
