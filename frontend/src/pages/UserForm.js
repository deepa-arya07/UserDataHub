import React, { useState } from "react";
import styles from "./UserForm.module.css";
import Swal from "sweetalert2";

const UserForm = () => {
  const [userData, setUserData] = useState({
    user: "",
    interest: "",
    age: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "User information has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setUserData({ user: "", interest: "", age: "", mobile: "", email: "" });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text:
            errorData.message || "An error occurred while submitting the data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to connect to the server. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>User Information Form</h2>
      <input
        type="text"
        name="user"
        placeholder="Name"
        value={userData.user}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        name="interest"
        placeholder="Interests (comma separated)"
        value={userData.interest}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={userData.age}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={userData.mobile}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default UserForm;
