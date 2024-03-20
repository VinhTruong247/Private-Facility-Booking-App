import React, { useState } from "react";
import styles from "../../assets/css/login.module.scss";
import logoImage from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { registerAPI } from "../../services/authService";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerAPI(formData);
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);

    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src={logoImage} alt="Logo" style={{ height: "4.5rem" }} />
          </div>
          <div className={styles.slogan}>
            Requesting public facilities has never been easier.
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.loginbox}>
          <div className={styles.logo}>
            <img src={logoImage} alt="Logo" style={{ height: "2rem" }} />
          </div>
          <div className={styles.title}>Sign up</div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className="username">
              <label htmlFor="loginInput">Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Username address"
                className={styles.input}
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="email">
              <label htmlFor="loginInput">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Email address"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="loginInput">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.signinconfirm}>
              <button type="submit">Next</button>
            </div>
          </form>
          <div className={styles.createAccount}>
            Already have an account?
            <Link to={"/login"} className={styles.signIn}>
              Login.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}