import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import "./Navigation.css";

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
        <i className="fas fa-user-circle" style={{fontSize: "1.5em"}}/>
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
              {user.username === "admin" ? <span style={{fontSize: "1.5em"}} class="material-symbols-outlined">shield_person</span> : ''}
              <ListItemText primary={user.username}/>
              </ListItem>
              <ListItem 
                button 
                onClick={closeDrawer}
                component={NavLink} 
                to="/" 
                style={{display: "flex", gap: "5px"}}>
                <ListItemText primary="Warehouse" />
              </ListItem>                 
              <ListItem 
                button 
                onClick={closeDrawer}
                component={NavLink} 
                to="/stage" 
                style={{display: "flex", gap: "5px"}}>
                {/* <i class="fa-solid fa-plus"></i> */}
                <ListItemText primary="Stage" />
              </ListItem>           
              <ListItem>
                <Button id="logout-button" variant="outlined" style={{color: "var(--lightgrey)", borderColor: "var(--lightgrey)"}} onClick={handleLogout}>Log Out</Button>
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
