import { useDispatch, useSelector } from "react-redux";
import { getAllWarehousesThunk } from "../store/warehouse";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const dispatch = useDispatch();
  const warehouses = useSelector(state => state.warehouse);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllWarehousesThunk()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="mx-auto p-4 border-2 h-full">
      {loading ? (
        <LoadingSpinner />
      ) : Object.keys(warehouses).length === 0 ? (
        <div className="text-center text-gray-500 mt-4">There are no warehouses</div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">Warehouses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.values(warehouses).map((warehouse) => (
              <div key={warehouse.id} className="bg-white border border-gray-200 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h2 className="text-xl font-semibold mb-2">{warehouse.name}</h2>
                <p className="text-gray-600">{warehouse.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}