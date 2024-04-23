import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { authenticate } from "./store/session";
import { getAllWarehousesThunk } from "./store/warehouse";

import AddWarehouseForm from "./components/AddWarehouseForm";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Index from "./components/Index";
import Warehouse from "./components/Warehouse";
import Stage from "./components/Stage";
import EditVaultPage from "./components/Warehouse/RenderTMB/EditVaultPage";
import VaultDetailPage from "./components/Warehouse/RenderTMB/VaultDetailPage";

import EditWarehousePage from "./components/EditWarehousePage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);
  const [isWarehousePage, setIsWarehousePage] = useState(false);

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
        <Navigation isLoaded={isLoaded} company={sessionUser.company} isWarehousePage={isWarehousePage} />
          <Switch>
            <Route exact path="/" >
              <Index company={sessionUser.company} />
            </Route>
            
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>        
            
            <Route exact path="/warehouse/add-warehouse">
              <AddWarehouseForm onAddWarehouseSubmit={onAddWarehouseSubmit}/>
            </Route>                  

            <Route exact path="/:companyName/warehouse/:warehouseId"> 
              <Warehouse setIsWarehousePage={setIsWarehousePage} />
            </Route>     

            <Route exact path="/:companyName/warehouse/:warehouseId/edit"> 
              <EditWarehousePage />
            </Route>                   

            <Route path="/:companyName/warehouse/:warehouseId/field/:fieldId/vaults/:vaultId/edit">
              <EditVaultPage />
            </Route>

            <Route path="/:companyName/warehouse/:warehouseId/field/:fieldId/vaults/:vaultId/detail">
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
