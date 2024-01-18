import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ColumnsLayout from "./layouts/ColumnsLayout";
import Users from "./components/Users";
import AddUserForm from "./components/AddUserForm";
import { fetchUsers } from "./services/users";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./styles/body.css";
import "./styles/layout.css";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsersFromServer = async () => {
    const users = await fetchUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsersFromServer();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <ColumnsLayout form={<AddUserForm setUsers={setUsers} />}>
        <Users users={users} setUsers={setUsers} />
      </ColumnsLayout>
    </div>
  );
}

export default App;