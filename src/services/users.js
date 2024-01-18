import axios from "axios";
import { handleErrors } from "../middlewares/http-errors";

export const fetchUsers = () => handleErrors(async () => {
  const response = await axios.get("http://localhost:4000/users/getAllUsers");
  return response.data;
});

export const createUser = (name, email) => handleErrors(async () => {
  await axios.post("http://localhost:4000/users/insertUser", {
    name,
    email,
  });
});

export const updateUser = (id, name, email) => handleErrors(async () => {
  await axios.put(`http://localhost:4000/users/updateUser/${id}`, {
    name,
    email,
  });
});

export const deleteUser = (userId) => handleErrors(async () => {
  await axios.delete(`http://localhost:4000/users/deleteUser/${userId}`);
});