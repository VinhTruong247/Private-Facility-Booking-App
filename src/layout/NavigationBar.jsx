import * as React from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import ProfileButton from "./ProfileButton"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchBar from "./searchBar";
import { toast } from "react-toastify";
import { logoutAPI } from '../services/authService';
import { logout } from "../redux/slices/authSlice";

const drawerWidth = 240;
const navItems = ['Listing Facilities', 'Renting Facilities', 'Resources', 'Support'];

export default function NavigationBar(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user.role);

  console.log(useSelector((state) => state.auth))

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    let res = await logoutAPI();
    if (res.succeeded === false) {
      toast.error(res.message);
    } else {
      dispatch(logout());
      navigate("/login");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SportScape Connect
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
        <Button
          className="nav-btn"
          variant="outlined"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="nav-btn"
          variant="outlined"
          onClick={() => navigate("/signup")}
        >
          Register
        </Button>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <header>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', lg: 'block' } }}
              onClick={() => navigate("/")}
            >
              SportScape Connect
            </Typography>

            <SearchBar
              style1={{ display: { xs: "none", sm: "block" }, mr: 3 }}
              style2={{}}
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'block' }, mr: 3 }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff', mr: 3 }}>
                  {item}
                </Button>
              ))}
            </Box>
            {isAuthenticated ? (
              <>
                <ProfileButton handleLogout={handleLogout} role={role} />
              </>
            ) : (
              <Box sx={{ display: { xs: "none", lg: "flex" } }}>
                <Button
                  className="nav-btn"
                  variant="outlined"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="nav-btn"
                  variant="outlined"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>



        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </header>
  );
}