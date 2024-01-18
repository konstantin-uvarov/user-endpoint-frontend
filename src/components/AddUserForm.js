import React, { useState } from "react";
import {
  Button,
  Card,
  FormGroup,
  InputGroup,
  Elevation,
  Intent,
} from "@blueprintjs/core";
import { createUser, fetchUsers } from "../services/users";

const defaultUser = { name: "", email: "" };
const defaultErrors = { name: false, email: false };

const AddUserForm = ({ setUsers }) => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [errors, setErrors] = useState(defaultErrors);

  const handleAddUser = () => {
    setIsAddingUser(true);
  };

  const handleCancel = () => {
    setIsAddingUser(false);
    setErrors(defaultErrors);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: false });
  };

  const handleSaveNewUser = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isEmailValid = emailRegex.test(user.email);

    if (user.name && isEmailValid) {
      await createUser(user.name, user.email);
      const users = await fetchUsers();
      setUsers(users);
      setIsAddingUser(false);
      setUser(defaultUser);
      setErrors(defaultErrors);
    } else {
      setErrors({
        name: !user.name,
        email: !isEmailValid,
      });
    }
  };

  return (
    <Card interactive={true} elevation={Elevation.TWO} className="UserCard">
      {!isAddingUser ? (
        <Button icon="add" onClick={handleAddUser}>Add User</Button>
      ) : (
        <div className="add-user-form">
          <FormGroup
            label="Name"
            labelFor="name-input"
            helperText={errors.name && "Name is required"}
            intent={errors.name ? Intent.DANGER : Intent.NONE}
          >
            <InputGroup
              id="name-input"
              name="name"
              value={user.name}
              onChange={handleChange}
              intent={errors.name ? Intent.DANGER : Intent.NONE}
            />
          </FormGroup>
          <FormGroup
            label="Email"
            labelFor="email-input"
            helperText={errors.email && "Email is required"}
            intent={errors.email ? Intent.DANGER : Intent.NONE}
          >
            <InputGroup
              id="email-input"
              name="email"
              value={user.email}
              onChange={handleChange}
              intent={errors.email ? Intent.DANGER : Intent.NONE}
            />
          </FormGroup>
          <div className="button-group">
            <Button icon="floppy-disk" onClick={handleSaveNewUser}>Save</Button>
            <Button icon="cross" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AddUserForm;
