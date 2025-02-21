import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { stageVaultThunk } from "../../store/stage";
import FieldGrid from "../Warehouse/FieldGrid";

export default function StageToWareHouseModal({ isOpen, onClose, vault }) {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const warehouseArr = Object.values(warehouses);

  const handleFieldClick = (field) => {
    console.log("👰🏼‍♀️ field: ", field)
  }


  if (!vault) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black opacity-30" />
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white p-6 rounded shadow-lg z-50">
          <Dialog.Title className="text-lg font-bold">
            Move Vault {vault.name} into Warehouse
          </Dialog.Title>
          {warehouseArr.length ? (
            warehouseArr.map((warehouse) => (
              <>
                <div className="flex flex-col mt-4">
                  <button
                    type="button"
                    class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    {warehouse.name}
                  </button>
                </div>
              <FieldGrid warehouse={warehouse} handleFieldClick={handleFieldClick} />
              </>
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
