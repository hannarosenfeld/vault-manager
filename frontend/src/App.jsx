import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import WarehousePage from "./pages/WarehousePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllWarehousesThunk } from "./store/warehouse";
import LoadingSpinner from "../src/components/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const [loading, setLoading] = useState(Object.keys(warehouses).length === 0);

  useEffect(() => {
    if (Object.keys(warehouses).length === 0) {
      dispatch(getAllWarehousesThunk()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, warehouses]);

  return (
    <Router>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col m-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[800px]">
          <NavBar />
          <div className="h-min-[90vh] p-4">
            <Routes>
              <Route path="/" element={<HomePage warehouses={warehouses} />} />
              <Route
                path="/warehouse/:warehouseName"
                element={<WarehousePage warehouses={warehouses}/>}
              />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;