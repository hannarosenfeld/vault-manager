import { useState } from "react";
import DeleteWarehouseModal from "./DeleteWarehouseModal";

export const ToggleBox = ({ isToggled, handleToggle, warehouseId, confirmDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="wrapper !w-full !h-[10vh] !flex !justify-between !items-center bg-white rounded-lg shadow-md !p-[2em] !mb-[1em]">
      <div className="!flex !items-center !space-x-3">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="!sr-only peer"
            checked={isToggled}
            onChange={handleToggle}
          />
          <div className="!relative w-11 h-6 !bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:!bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:!bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:!bg-blue-600 dark:peer-checked:!bg-blue-600" />
        </label>
        <span className="!text-sm !font-light !text-gray-900 !dark:text-gray-300">
          Show {isToggled ? "Racks" : "Fields"}
        </span>
      </div>

      <div>
        <button
          onClick={openDeleteModal}
          style={{ fontSize: "10px" }}
          className="btn btn-outline-secondary !text-red-700 hover:!text-white !border-red-700 hover:!bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center mb-2 dark:!border-red-500 dark:!text-red-500 dark:hover:!bg-red-600 dark:focus:ring-red-900"
        >
          DELETE WAREHOUSE
        </button>
      </div>

      {isDeleteModalOpen && (
        <DeleteWarehouseModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          confirmDelete={() => {
            confirmDelete();
            closeDeleteModal();
          }}
          closeDeleteModal={closeDeleteModal}
        />
      )}
    </div>
  );
};
