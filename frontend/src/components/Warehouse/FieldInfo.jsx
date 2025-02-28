import AddVaultButton from "./AddVaultButton";
import VaultInfo from "./VaultInfo";
import AddVaultModal from "./AddVaultModal";
import ConfirmAddVaultModal from "../Stage/ConfirmationAddVaultModal";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { moveVaultToWarehouseThunk, updateFieldTypeThunk } from "../../store/warehouse";

export default function FieldInfo({ field, isStage, vaultId, onMove }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [vaults, setVaults] = useState(field.vaults);
  const [fieldType, setFieldType] = useState(field.type);

  const rowCount = fieldType === "couchbox" ? 4 : 3;

  const positionOrder = ["T", "M2", "M", "B"].filter(
    (pos) => pos !== "M2" || fieldType === "couchbox"
  );

  useEffect(() => {
    setVaults(field.vaults);
  }, [field.vaults]);

  const sortedVaults = useMemo(() => {
    return vaults
      ? [...Object.values(vaults)].sort(
          (a, b) =>
            positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
        )
      : [];
  }, [vaults, positionOrder]);

  const vaultMap = useMemo(() => {
    return Object.fromEntries(
      sortedVaults.map((vault) => [vault.position, vault])
    );
  }, [sortedVaults]);

  const lastEmptyPosition = useMemo(() => {
    return [...positionOrder]
      .reverse()
      .find((pos) => !vaultMap[pos]);
  }, [positionOrder, vaultMap]);

  const handleOpenModal = (position) => {
    setSelectedPosition(position);
    if (!isStage) {
      setIsModalOpen(true);
    } else {
      setIsConfirmModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  const handleConfirmAddStagedVaultToWarehouse = async () => {
    await dispatch(moveVaultToWarehouseThunk(vaultId, field.id, selectedPosition));
    onMove();
    setIsConfirmModalOpen(false);
    setIsModalOpen(false);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedPosition(null);
  };

  const handleFieldTypeToggle = async () => {
    const newFieldType = fieldType === "standard" ? "couchbox" : "standard";
    setFieldType(newFieldType);
    await dispatch(updateFieldTypeThunk(field.id, newFieldType));
  };

  const hasVaults = vaults && Object.keys(vaults).length > 0;

  return (
    <div className="h-[90%] grid grid-cols-[65%_35%]">
      <div className={`grid grid-rows-${rowCount} border-r border-gray-300`}>
        {positionOrder.map((pos, index) => (
          <div
            key={pos}
            className={`p-2 flex items-center justify-between ${
              index < rowCount - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <div className="text-sm w-[10%] flex items-center">
              {pos}
            </div>
            <div className="flex-grow flex items-center">
              {vaultMap[pos] ? (
                <VaultInfo vault={vaultMap[pos]} isStage={isStage} />
              ) : (
                lastEmptyPosition === pos && (
                  <AddVaultButton type={fieldType} onClick={() => handleOpenModal(pos)} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <div className="font-semibold text-3xl mb-4">{field.name}</div>
        <div className="mb-4">
          <div className="flex items-center">
            <span className="material-symbols-outlined mr-2">
              {fieldType === "standard" ? "package_2" : "weekend"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={fieldType === "couchbox"}
                onChange={handleFieldTypeToggle}
                disabled={hasVaults}
              />
              <div className={`w-11 h-6 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:left-[calc(100%-2px)] peer-checked:after:translate-x-[-100%] ${hasVaults ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200'}`}></div>
            </label>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddVaultModal
          fieldId={field.id}
          position={selectedPosition}
          onClose={handleCloseModal}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmAddVaultModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmAddStagedVaultToWarehouse}
          position={selectedPosition}
        />
      )}
    </div>
  );
}