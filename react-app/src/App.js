import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Index from "./components/Index";
import Warehouse from "./components/Warehouse";
import Stage from "./components/Stage";
import EditVaultPage from "./components/Warehouse/RenderTMB/EditVaultPage";
import VaultDetailPage from "./components/Warehouse/RenderTMB/VaultDetailPage";
import AddWarehouseForm from "./components/AddWarehouse";
import { getAllWarehousesThunk } from "./store/warehouse";
import { getCompaniesThunk } from "./store/company";


function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector(state => state.session.user);
  let companyId;
  const companies = useSelector(state => state.companies)

  useEffect(() => {
    dispatch(getCompaniesThunk());
  }, [])
  
  useEffect(() => {
    console.log("🌹", sessionUser)
    if (sessionUser?.companyId) companyId = sessionUser.company_id;
  }, [sessionUser])

  useEffect(() => {
    console.log("🥝", companies)
  }, [companies])

  const onAddWarehouseSubmit = async () => {
    await dispatch(getAllWarehousesThunk());    
    history.push("/");
  }

  useEffect(() => {
    dispatch(authenticate())
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  return (
    <>
      {isLoaded && !sessionUser && (
        <Switch>
          <Route exact path="/">
            <LoginFormPage />
          </Route>
        </Switch>
      )}
      {isLoaded && sessionUser && (
        <>
        <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>        
            
            <Route exact path="/warehouse/add-warehouse">
              <AddWarehouseForm onAddWarehouseSubmit={onAddWarehouseSubmit}/>
            </Route>                  

            <Route exact path="/warehouse/:warehouseId"> 
              <Warehouse />
            </Route>          

            <Route path="/warehouse/:warehouseId/field/:fieldId/vaults/:vaultId/edit">
              <EditVaultPage />
            </Route>

            <Route path="/warehouse/:warehouseId/field/:fieldId/vaults/:vaultId/detail">
              <VaultDetailPage/>
            </Route>

            <Route path="/stage">
              <Stage />
            </Route>

            <Route path="/add-user">
              <SignupFormPage />
            </Route>

            <Route path="/login" >
              <LoginFormPage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
