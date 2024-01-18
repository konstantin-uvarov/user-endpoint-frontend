import React, { useState } from "react";
import {
  Button,
  Card,
  FormGroup,
  InputGroup,
  Elevation,
  Intent,
} from "@blueprintjs/core";
import { updateUser, fetchUsers, deleteUser } from "../services/users";

const UserCard = ({ user, setUsers }) => {
  const [editing, setEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(user.name);
  const [editedUserEmail, setEditedUserEmail] = useState(user.email);
  const [errors, setErrors] = useState({ name: false, email: false });

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleCancel = () => {
    setEditing(false);
    setEditedUserName(user.name);
    setEditedUserEmail(user.email);
    setErrors({ name: false, email: false });
  };

  const handleUpdate = () => {
    setEditing(true);
    setEditedUserName(user.name);
    setEditedUserEmail(user.email);
    setErrors({ name: false, email: false });
  };

  const handleSave = async () => {
    const isEmailValid = emailRegex.test(editedUserEmail);
    if (editedUserName && isEmailValid) {
      await updateUser(user._id, editedUserName, editedUserEmail);
      const users = await fetchUsers();
      setUsers(users);
      setEditing(false);
    } else {
      setErrors({
        name: !editedUserName,
        email: !isEmailValid,
      });
    }
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    const users = await fetchUsers();
    setUsers(users);
  };

  return (
    <Card interactive={true} elevation={Elevation.TWO} className="UserCard">
      {editing ? (
        <div className="card-content">
          <div>
            <FormGroup
              label="Name"
              helperText={errors.name && "Name is required"}
              intent={errors.name ? Intent.DANGER : Intent.NONE}
            >
              <InputGroup
                value={editedUserName}
                intent={errors.name ? Intent.DANGER : Intent.NONE}
                onChange={(e) => setEditedUserName(e.target.value)}
              />
            </FormGroup>
            <FormGroup
              label="Email"
              helperText={errors.email && "Invalid email address"}
              intent={errors.email ? Intent.DANGER : Intent.NONE}
            >
              <InputGroup
                value={editedUserEmail}
                intent={errors.email ? Intent.DANGER : Intent.NONE}
                onChange={(e) => setEditedUserEmail(e.target.value)}
              />
            </FormGroup>
          </div>
          <div className="button-group">
            <Button icon="floppy-disk" onClick={handleSave}>Save</Button>
            <Button icon="delete" onClick={() => handleDelete(user._id)}>Delete</Button>
            <Button icon="cross" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="card-content">
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <Button icon="edit" onClick={() => handleUpdate(user)}>Update</Button>
        </div>
      )}
    </Card>
  );
};

export default UserCard;
