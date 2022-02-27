import React, { useEffect, useState } from "react";
import { User } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/store";
import { fetchAllUsers } from "../app/features/usersSlice";

export default function Users() {
  const allUsers = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const onGetUsersClick = () => {
    dispatch(fetchAllUsers());
  };
  return (
    <div>
      <h1>Users List</h1>
      <button onClick={onGetUsersClick}>Get All users</button>
      {allUsers && (
        <div>
          {allUsers.map((user) => (
            <div key={user.id}>
              {user.email} - {user.isActivated ? "activated" : "not activated"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
