import { useDispatch, useSelector } from "react-redux";
import { getAllWarehousesThunk } from "../store/warehouse";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { setCurrentWarehouse } from "../store/warehouse";

// 🚨 Add onhover styles to the warehouse boxes
export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllWarehousesThunk()).then(() => setLoading(false));
  }, [dispatch]);

  const handleWarehouseClick = (warehouse) => {
    dispatch(setCurrentWarehouse(warehouse))
    navigate(`/warehouse/${warehouse.name.toLowerCase().split(" ").join("-")}`)
  };

  return (
    <div className="w-full h-full">
      {loading ? (
        <LoadingSpinner />
      ) : Object.keys(warehouses).length === 0 ? (
        <div className="text-center text-gray-500 mt-4">
          There are no warehouses
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(warehouses).map((warehouse) => (
              <div
                key={warehouse.id}
                className="border border-gray-300 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleWarehouseClick(warehouse)}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {warehouse.name}
                </h2>
                <p>{warehouse.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}