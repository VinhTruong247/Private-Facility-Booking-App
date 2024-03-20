import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LimitedAccess from "../components/access/LimitedAccess";
import { toast } from "react-toastify";
import Loading from "../router/Loading";

const ProtectedRoute = (props) => {
  const { name } = props;
  const [show, setShow] = useState(false);
  const [deny, setDeny] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const arrAdmin = ["adminDashboard", "setting", "payment"];
  const arrUser = ["userDashboard", "setting", "payment"];

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user.role);

  const checkAccess = async () => {
    if (!isAuthenticated) {
      toast.error("Unauthenticated user.");
      navigate("/login");
      return;
    }

    if (role !== "ADMIN" && role !== "User") {
      toast.error("Invalid user role.");
      navigate("/login");
      dispatch(logout());
      return;
    }

    if (role === "ADMIN" && arrAdmin.includes(name)) {
      setShow(true);
    } else if (role === "User" && arrUser.includes(name)) {
      setShow(true);
    } else {
      setDeny(true);
    }
  };

  useEffect(() => {
    checkAccess();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {show && props.children}
      {deny && <LimitedAccess />}
      {!show && !deny && <Loading />}
    </div>
  );
};

export default ProtectedRoute;