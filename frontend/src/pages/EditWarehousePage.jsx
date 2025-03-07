import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditWarehouseFieldGrid from "../components/EditWarehouse/EditWarehouseFieldGrid";
import { setCurrentWarehouse } from "../store/warehouse";
import LoadingSpinner from "../components/LoadingSpinner";
import ActionButton from "../components/EditWarehouse/ActionButton";
import EditWarehouseModal from "../components/EditWarehouse/EditWarehouseModal";

export default function EditWarehousePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { warehouseName } = useParams();
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundWarehouse = Object.values(warehouses).find(
      (w) =>
        w.name.toLowerCase().split(" ").join("-") ===
        warehouseName.toLowerCase()
    );
    if (foundWarehouse) {
      dispatch(setCurrentWarehouse(foundWarehouse));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [dispatch, warehouseName, warehouses]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const openModal = (dir, operation) => {
    setModalProps({ dir, operation, warehouseId: warehouse.id });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center h-full mt-6">
      <h2 className="mb-1 text-xl font-semibold">{warehouse.name}</h2>

      <div className="flex w-full mt-4 justify-center">
        <div className="flex flex-col items-center mx-4 justify-center">
          <ActionButton onClick={() => openModal("left", "plus")} icon="add" />
          <ActionButton
            onClick={() => openModal("left", "minus")}
            icon="remove"
          />
        </div>
        <div className="flex-grow flex justify-center">
          <EditWarehouseFieldGrid warehouse={warehouse} />
        </div>
        <div className="flex flex-col items-center mx-4 justify-center">
          <ActionButton onClick={() => openModal("right", "plus")} icon="add" />
          <ActionButton
            onClick={() => openModal("right", "minus")}
            icon="remove"
          />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4 justify-center">
        <ActionButton onClick={() => openModal("bottom", "plus")} icon="add" />
        <ActionButton
          onClick={() => openModal("bottom", "minus")}
          icon="remove"
        />
      </div>

      {isModalOpen && (
        <EditWarehouseModal
          {...modalProps}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <button
        type="button"
        className="flex mt-3 gap-1 align-center items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        Delete Warehouse
      </button>
    </div>
  );
}
