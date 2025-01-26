import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.userListContainer}>
      <h2 className={styles.title}>User List</h2>
      {loading ? (
        <p className={styles.loading}>Loading users...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : users.length > 0 ? (
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user._id} className={styles.userItem}>
              <strong>{user.user}</strong> ({user.age} years old)
              <br />
              Interests: {user.interest}
              <br />
              Email: {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noUsers}>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
