import React from "react";
import styles from "../../assets/css/login.module.scss";
import logoImage from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
export default function SignUpPage() {
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
          <div className={styles.form}>
            <div className="email">
              <label htmlFor="loginInput">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Email address"
                className={styles.input}
              />
            </div>
            <div className="password">
              <label htmlFor="loginInput">Password:</label>
              <input
                type="text"
                name="password"
                placeholder="Password"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.signinconfirm}>
            <button type="submit">Next</button>
          </div>
          <div className={styles.createAccount}>
           Have an account ?
            <Link to={"/LogIn"} className={styles.SignIn}>
              Login.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
