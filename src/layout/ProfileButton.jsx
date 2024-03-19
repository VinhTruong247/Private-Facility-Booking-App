import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Divider, IconButton, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileButton(props) {
  const { handleLogout, role } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateDashboard = () => {
    switch (role) {
      case "ADMIN":
        navigate("/admin");
        break;

      case "USER":
        navigate("/user");
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small">
          <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* {location.pathname !== "/search-course" && (
          <SearchBar
            style1={{ padding: "0 17px", display: { sm: "none" } }}
            style2={{ border: "1px solid #FF6000", borderRadius: "5px" }}
          />
        )} */}

        {location.pathname !== "/search-course" && (
          <Divider
            sx={{
              backgroundColor: "black",
              marginTop: "1rem",
              display: { sm: "none" },
            }}
          />
        )}
        <MenuItem onClick={() => navigate("/setting")}>Profile</MenuItem>
        <MenuItem onClick={navigateDashboard}>Dashboard</MenuItem>
        <Divider sx={{ backgroundColor: "black" }} />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
