import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/css/login.module.scss";
import logoImage from "../../assets/images/logo.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postLogin } from "../../services/authService";
import { useForm } from "react-hook-form";
import { login } from "../../redux/slices/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";



export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogin = async (data) => {
  //   setLoading(true);
  //   const res = await postLogin(data);
  //   if (res.succeeded) {
  //     if (res.data.userCredentials.status) {
  //       dispatch(login(res.data));
  //       navigate("/");
  //       toast.success(res.message);
  //     } else toast.error("Account currently inactive.");
  //   } else toast.error("Login Failed.");
  //   setLoading(false);
  // };

  const handleLogin = async (data) => {
    setLoading(true);
    const res = await postLogin(data);
    if (res.statusCode === 201) {
      dispatch(login(res.data));
      navigate("/");
      toast.success(res.message);
    } else if (res.statusCode === 401) {
      toast.error("Account currently inactive.");
    } else {
      toast.error("Login Failed.");
    }
    setLoading(false);
  };

  // const handleLoginGoogle = async (credentialResponse) => {
  //   if (credentialResponse) {
  //     const credentialResponseDecode = jwt_decode(
  //       credentialResponse.credential
  //     );

  //     let data = {
  //       payload: credentialResponseDecode,
  //       role: 1,
  //     };

  //     let res = await postLoginGoogle(data);
  //     if (res.succeeded) {
  //       dispatch(login(res.data));
  //       navigate("/");
  //       toast.success("Login Success.");
  //     } else toast.error(res.message);
  //   }
  // };

  const togglePassword = (e) => {
    setShowPassword(!showPassword);
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

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
        <div className={styles.top}>
          <div className={styles.logo}>
            <img src={logoImage} alt="Logo" style={{ height: "2rem" }} />
          </div>
          <div className={styles.title}>Log In</div>
        </div>
        
        <div className={styles.loginbox}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className={styles.form}>
              <div className={styles.email}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email.message}</div>
                )}
              </div>
              <div className={styles.password}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="Password">Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder="Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <div className={styles.error}>
                      {errors.password.message}
                    </div>
                  )}
                </FormControl>
              </div>
              <div className={styles.extra}>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
              <div className={styles.btnLogin}>
                <LoadingButton
                  loadingPosition="start"
                  startIcon={<></>}
                  className="btn btn-login w-100 theme-btn mx-auto "
                  type="submit"
                  loading={loading}
                >
                  Login
                </LoadingButton>
              </div>
            </div>
          </form>
          <hr />
          <div className={styles.confirm}>
            <Link to="/register" className={styles.signIn}>
              Trouble Logging In?
            </Link>
          </div>
          <div className={styles.createAccount}>
            Don't have an account ?{" "}
            <Link to="/register" className={styles.signIn}>
              Create Account.
            </Link>
          </div>
          <div className={styles.issueBox}>
            <p>Having issues logging in?</p>
            <div>
              We've enhanced our login system. Please click{" "}
              <Link to="/register" className={styles.signIn}>
                here
              </Link>{" "}
              and follow the steps to login with advanced security.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}