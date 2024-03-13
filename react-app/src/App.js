import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Index from "./components/Index";
import Warehouse from "./components/Warehouse";
import StagedVaults from "./components/StagedVaults";
import EditVaultPage from "./components/Warehouse/EditVaultPage";
import VaultDetailPage from "./components/Warehouse/VaultDetailPage";
import AddWarehouseForm from "./components/AddWareHouse";
import { getAllWarehousesThunk } from "./store/warehouse";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector(state => state.session.user);

  // useEffect(()=>{
  //   console.log("💖", currentWarehouse.warehouse_id)
  // }, [currentWarehouse])

  const onAddWarehouseSubmit = async () => {
    // await currentWarehouse
    await dispatch(getAllWarehousesThunk());    
    // history.push(`/warehouse/${currentWarehouse.warehouse_id}`);
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
              <StagedVaults />
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
