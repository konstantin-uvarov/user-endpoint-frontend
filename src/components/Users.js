import React from 'react';
import UserCard from "./UserCard";

const Users = ({ users, setUsers }) => {
  return (
    <>
      {users.map((user) => (
        <UserCard key={user._id} user={user} setUsers={setUsers} />
      ))}
    </>
  );
};

export default Users;