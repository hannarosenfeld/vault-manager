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
      <Button 
        onClick={openDrawer} 
        className="profile-button"
        style={{color: "var(--blue)"}}>
        <i className="fas fa-user-circle" />
      </Button>
      <Drawer 
        anchor="right" 
        open={showDrawer} 
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            backgroundColor: "var(--black)",
            color: "var(--lightgrey)",
            width: "40%"
          }
        }}>
        <div className="user-drawer">
          {user ? (
            <List>
              <ListItem>
                <ListItemText primary={user.username}/>
              </ListItem>
              {/* <ListItem 
                button 
                component={NavLink} 
                to="/add-vault" 
                style={{color: "var(--blue)", display: "flex", gap: "5px"}}>
                <i class="fa-solid fa-plus"></i>
                <ListItemText primary="Add Vault" />
              </ListItem> */}
              <ListItem >
                <Button style={{color: "var(--red)"}} onClick={handleLogout}>Log Out</Button>
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
