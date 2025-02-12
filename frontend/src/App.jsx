import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import WarehousePage from "./pages/WarehousePage";

function App() {
  return (
    <Router>
      <div className="flex flex-col m-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[800px]">
        <NavBar />
        <div className="h-[90vh]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/warehouse/:warehouseName" element={<WarehousePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;