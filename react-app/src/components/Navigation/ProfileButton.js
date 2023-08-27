import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";

import "./Navigation.css"; // Make sure to adjust the path to your CSS file

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <Button onClick={openDrawer} className="profile-button">
        <i className="fas fa-user-circle" />
      </Button>
      <Drawer anchor="right" open={showDrawer} onClose={closeDrawer}>
        <div className="user-drawer">
          {user ? (
            <List>
              <ListItem>
                <ListItemText primary={user.username} secondary={user.email} />
              </ListItem>
              <ListItem button component={NavLink} to="/add-vault">
                <ListItemText primary="Add Vault" />
              </ListItem>
              <ListItem>
                <Button onClick={handleLogout}>Log Out</Button>
              </ListItem>
            </List>
          ) : (
            <div className="auth-buttons">
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeDrawer}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeDrawer}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </div>
      </Drawer>
      {showDrawer && <div className="overlay" onClick={closeDrawer} />}
    </>
  );
}

export default ProfileButton;
