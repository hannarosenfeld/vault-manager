import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
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

console.log("🦋")

function App() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);
  const [isWarehousePage, setIsWarehousePage] = useState(false);

  const onAddWarehouseSubmit = async () => {
    await dispatch(getAllWarehousesThunk());    
    history("/");
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
        <Routes>
          <Route exact path="/" element={<LoginFormPage />} />
        </Routes>
      )}
      {isLoaded && sessionUser && (
        <>
        <Navigation isLoaded={isLoaded} company={sessionUser.company} isWarehousePage={isWarehousePage} />
          <Routes>
            <Route exact path="/" element={<Index company={sessionUser.company} />} />
            <Route exact path="/signup" element={<SignupFormPage />} />
            <Route exact path="/warehouse/add-warehouse" element={<AddWarehouseForm onAddWarehouseSubmit={onAddWarehouseSubmit}/>} />
            <Route exact path="/:companyName/warehouse/:warehouseId" element={<Warehouse setIsWarehousePage={setIsWarehousePage} />} /> 
            <Route exact path="/:companyName/warehouse/:warehouseId/edit" element={<EditWarehousePage />} />
            <Route path="/:companyName/warehouse/:warehouseId/vault/:vaultId/edit" element={<EditVaultPage />} />
            <Route path="/:companyName/warehouse/:warehouseId/vault/:vaultId/detail" element={<VaultDetailPage/>} />
            <Route path="/stage" element={<Stage />} />
            <Route path="/add-user" element={<SignupFormPage />} />
            <Route path="/login" element={<LoginFormPage />} />
            <Route path='*'>
              There is nothing here
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
