import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import "./Navigation.css";
import { getAllWarehousesThunk } from "../../store/warehouse";


function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const warehousesObj = useSelector(state => state.warehouse)
  const warehouses = Object.values(warehousesObj)

  useEffect(() => {
    dispatch(getAllWarehousesThunk())
}, [dispatch])

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  const visitWarehouse = () => {
    closeDrawer();
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
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
              <i className="fas fa-user-circle" style={{fontSize: "1.5em", marginRight: "0.5em"}}/>
              {user.username === "admin" ? <span style={{fontSize: "1.5em"}} class="material-symbols-outlined">shield_person</span> : ''}
              <ListItemText primary={user.username}/>
              </ListItem>

              { warehouses?.map(warehouse => (
              <ListItem 
              button 
              onClick={visitWarehouse}
              component={NavLink} 
              to={`/${warehouse.companyName.toLowerCase()}/warehouse/${warehouse.id}`}
              style={{display: "flex", gap: "5px"}}>
              <ListItemText primary={warehouse.name} />
            </ListItem>  
              ))    

              }
              <ListItem 
                button 
                onClick={closeDrawer}
                component={NavLink} 
                to="/stage" 
                style={{display: "flex", gap: "5px", color: "orange"}}>
                {/* <i class="fa-solid fa-plus"></i> */}
                <ListItemText primary="Stage" />
              </ListItem>
              
              <ListItem 
                button 
                onClick={closeDrawer}
                component={NavLink} 
                to="/warehouse/add-warehouse" 
                style={{display: "flex", gap: "5px", color: "var(--blue)"}}>
                <ListItemText primary="+ Add Warehouse" />
              </ListItem>        
              
              <ListItem 
                onClick={closeDrawer}
                component={NavLink} 
                to="/signup"
                style={{display: "flex", gap: "5px", cursor: "pointer"}}>
                <ListItemText primary="+ Add User" />
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
