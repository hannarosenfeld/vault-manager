import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditWarehouseFieldGrid from "../components/EditWarehouse/EditWarehouseFieldGrid";
import { setCurrentWarehouse } from "../store/warehouse";

export default function EditWarehousePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { warehouseName } = useParams();
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundWarehouse = Object.values(warehouses).find(
      (w) => w.name.toLowerCase().split(" ").join("-") === warehouseName.toLowerCase()
    );
    if (foundWarehouse) {
      dispatch(setCurrentWarehouse(foundWarehouse));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [dispatch, warehouseName, warehouses]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex w-full mt-4 justify-center">
          <div className="flex flex-col items-center mx-4">
            <button
              className="btn btn-outline-secondary mb-2"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <div className="flex-grow flex justify-center">
            <EditWarehouseFieldGrid warehouse={warehouse} />
          </div>
          <div className="flex flex-col items-center mx-4">
            <button
              className="btn btn-outline-secondary mb-2"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p>Placeholder Modal</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}