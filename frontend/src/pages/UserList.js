import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers(users.filter((user) => user._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the user.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to connect to the server.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleEdit = async (id) => {
    const userToEdit = users.find((user) => user._id === id);

    const { value: formValues } = await Swal.fire({
      title: "Edit User",
      html: `
        <input type="text" id="user" class="swal2-input" placeholder="Name" value="${
          userToEdit.user
        }" />
        <input type="text" id="interest" class="swal2-input" placeholder="Interests (comma separated)" value="${userToEdit.interest.join(
          ", "
        )}" />
        <input type="number" id="age" class="swal2-input" placeholder="Age" value="${
          userToEdit.age
        }" />
        <input type="text" id="mobile" class="swal2-input" placeholder="Mobile" value="${
          userToEdit.mobile
        }" />
        <input type="email" id="email" class="swal2-input" placeholder="Email" value="${
          userToEdit.email
        }" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          user: document.getElementById("user").value,
          interest: document
            .getElementById("interest")
            .value.split(",")
            .map((item) => item.trim()),
          age: document.getElementById("age").value,
          mobile: document.getElementById("mobile").value,
          email: document.getElementById("email").value,
        };
      },
    });

    if (formValues) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUsers(
            users.map((user) =>
              user._id === id ? { ...user, ...updatedUser } : user
            )
          );
          Swal.fire({
            title: "Updated!",
            text: "The user has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update the user.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to connect to the server.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className={styles.userListContainer}>
      {loading ? (
        <p className={styles.loadingText}>Loading users...</p>
      ) : users.length > 0 ? (
        <div className={styles.cardGrid}>
          {users.map((user) => (
            <div key={user._id} className={styles.card}>
              <div className={styles.cardTitle}>User: {user.user}</div>
              <p className={styles.cardText}>
                Interests: {user.interest.join(", ")}
              </p>
              <p className={styles.cardText}>Age: {user.age}</p>
              <p className={styles.cardText}>Mobile: {user.mobile}</p>
              <p className={styles.cardText}>Email: {user.email}</p>
              <div className={styles.cardActions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(user._id)}
                >
                  Edit User
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(user._id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noUsers}>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
