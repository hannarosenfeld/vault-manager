import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import FieldGrid from "../Warehouse/FieldGrid";
import FieldInfo from "../Warehouse/FieldInfo";

export default function StageToWareHouseModal({ isOpen, onClose, vault }) {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const warehouseArr = Object.values(warehouses);
  const [selectedField, setSelectedField] = useState(null);

  const handleFieldClick = (field) => {
    console.log("👰🏼‍♀️ field: ", field);
    setSelectedField(field);
  };

  if (!vault) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-30" />
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white p-6 rounded shadow-lg z-50 w-full max-w-4xl relative">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Dialog.Title className="text-lg font-bold">
            Move Vault {vault.name} into Warehouse
          </Dialog.Title>
          {warehouseArr.length ? (
            warehouseArr.map((warehouse) => (
              <div key={warehouse.id}>
                <div className="flex flex-col mt-4">
                  <button
                    type="button"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    {warehouse.name}
                  </button>
                </div>
                {selectedField?.id ? <FieldInfo field={selectedField} /> : "Select a field to view details"}
                <FieldGrid
                  warehouse={warehouse}
                  handleFieldClick={handleFieldClick}
                />
              </div>
            ))
          ) : (
            <div>No warehouses found!</div>
          )}
          <Dialog.Description className="mt-2"></Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}