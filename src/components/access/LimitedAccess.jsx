import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import "./LimitedAccess.scss";
import { Button } from "@mui/material";

const LimitedAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="limited-access-container">
      <Alert variant="secondary" className="alert-message">
        <div>
          <div className="text1">Access denied</div>
          <div className="text2">
            You don't have permissions to access this page.
          </div>
          <div className="text3">
            Contact someone with authority to get permissions or go to the home
            page and browse other pages.
          </div>
        </div>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Homepage
        </Button>
      </Alert>
    </div>
  );
};

export default LimitedAccess;
