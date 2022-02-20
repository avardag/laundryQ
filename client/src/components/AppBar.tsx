import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { User } from "../app/features/types";

interface AppBarProps {
  user: User | null;
  onLogout: () => void;
}
export default function MenuAppBar({ user, onLogout }: AppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, flexGrow: 0, display: { xs: "flex", md: "flex" } }}
            >
              laundryQ
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
            </Link>
            {user && (
              <>
                <Link to="/bookings">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Bookings
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Profile
                  </Button>
                </Link>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {user ? (
              <Stack direction="row" spacing={1}>
                <Chip
                  avatar={
                    <Avatar>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </Avatar>
                  }
                  label={user.firstName}
                  size="medium"
                />
                <Button
                  onClick={onLogout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <>
                <Link to="/login">
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/">
                  <Typography textAlign="center" variant="body1">
                    Home
                  </Typography>
                </Link>
              </MenuItem>
              {user && (
                <Box>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/bookings">
                      <Typography textAlign="center" variant="body1">
                        Bookings
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/profile">
                      <Typography textAlign="center" variant="body1">
                        Profile
                      </Typography>
                    </Link>
                  </MenuItem>
                </Box>
              )}

              <Divider />
              {user ? (
                <MenuItem onClick={onLogout}>
                  <Typography
                    textAlign="center"
                    variant="body1"
                    onClick={handleCloseNavMenu}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                <Box>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/login">
                      <Typography textAlign="center" variant="body1">
                        Login
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/signup">
                      <Typography textAlign="center" variant="body1">
                        Signup
                      </Typography>
                    </Link>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
