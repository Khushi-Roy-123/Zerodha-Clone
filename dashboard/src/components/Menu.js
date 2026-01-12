import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { Brightness4, Brightness7, Menu as MenuIcon } from "@mui/icons-material";
import { Tooltip, IconButton, Menu as MuiMenu, MenuItem } from "@mui/material";

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const { isDarkMode, toggleTheme } = useContext(GeneralContext);
  const location = useLocation();

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // Mobile Menu Logic
  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  return (
    <div className="menu-container">
      {/* Desktop Menu */}
      <div className="menus desktop-only">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/">
              <p className={location.pathname === "/" ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <p className={location.pathname === "/orders" ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings">
              <p className={location.pathname === "/holdings" ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions">
              <p className={location.pathname === "/positions" ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds">
              <p className={location.pathname === "/funds" ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps">
              <p className={location.pathname === "/apps" ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
          <li>
            <a style={{ textDecoration: "none" }} href={`${process.env.REACT_APP_FRONTEND_URL}/signup`}>
              <p className={menuClass}>Signup</p>
            </a>
          </li>
        </ul>
        <hr className="divider" />
        <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>

      {/* Mobile Controls (Hamburger + Theme + Profile) */}
      <div className="mobile-only" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
         {/* Theme Toggle (Visible on Mobile too) */}
        <div className="theme-toggle" onClick={toggleTheme} style={{cursor: "pointer", display: "flex", alignItems: "center"}}>
             <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
                 {isDarkMode ? <Brightness7 style={{ color: "orange" }} /> : <Brightness4 style={{ color: "gray" }} />}
             </Tooltip>
        </div>

        <IconButton onClick={handleMobileMenuOpen}>
            <MenuIcon style={{ color: "var(--text-main)" }} />
        </IconButton>

        <MuiMenu
            anchorEl={mobileAnchorEl}
            open={Boolean(mobileAnchorEl)}
            onClose={handleMobileMenuClose}
        >
            <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>Dashboard</MenuItem>
            <MenuItem component={Link} to="/orders" onClick={handleMobileMenuClose}>Orders</MenuItem>
            <MenuItem component={Link} to="/holdings" onClick={handleMobileMenuClose}>Holdings</MenuItem>
            <MenuItem component={Link} to="/positions" onClick={handleMobileMenuClose}>Positions</MenuItem>
            <MenuItem component={Link} to="/funds" onClick={handleMobileMenuClose}>Funds</MenuItem>
            <MenuItem component={Link} to="/apps" onClick={handleMobileMenuClose}>Apps</MenuItem>
        </MuiMenu>
      </div>

    </div>
  );
};

export default Menu;
