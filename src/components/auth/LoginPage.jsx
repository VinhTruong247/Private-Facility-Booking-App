import React from "react";
import styles from "../../assets/css/login.module.scss";
import logoImage from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
export default function LoginPage() {
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
          <div className={styles.title}>Log In</div>
          <div className={styles.loginemail}>
            <input
              type="text"
              name="email"
              placeholder="Email address"
              className={styles.input}
            />
          </div>
          <div className={styles.confirm}>
            <Link to={"/register"} className={styles.SignIn}>
              Trouble Logging In?
            </Link>
            <button type="submit">Next</button>
          </div>
          <div className={styles.createAccount}>
            Don't have an account ?
            <Link to={"/register"} className={styles.SignIn}>
              Create Account.
            </Link>
          </div>
          <div className={styles.IssueBox}>
            <p>Having issues logging in?</p>
            <div style={{ width: "100%" }}>
              We've enhanced our login system. Please click
              <Link to={"/register"} className={styles.SignIn}>
                here
              </Link>
              and follow the steps to login with advanced security.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
