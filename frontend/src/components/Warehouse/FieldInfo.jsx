import AddVaultButton from "./AddVaultButton";
import VaultInfo from "./VaultInfo";
import AddVaultModal from "./AddVaultModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function FieldInfo({ field }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [vaults, setVaults] = useState(field.vaults);
  const rowCount = field.type === "couchbox" ? 4 : 3;

  const positionOrder = ["T", "M2", "M", "B"].filter(
    (pos) => pos !== "M2" || field.type === "couchbox"
  );

  useEffect(() => {
    setVaults(field.vaults);
  }, [field.vaults]);

  const sortedVaults = vaults
    ? [...Object.values(vaults)].sort(
        (a, b) =>
          positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
      )
    : [];

  const vaultMap = Object.fromEntries(
    sortedVaults.map((vault) => [vault.position, vault])
  );

  const lastEmptyPosition = [...positionOrder]
    .reverse()
    .find((pos) => !vaultMap[pos]);

  const handleOpenModal = (position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

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
                <VaultInfo vault={vaultMap[pos]} />
              ) : (
                lastEmptyPosition === pos && (
                  <AddVaultButton type={field.type} onClick={() => handleOpenModal(pos)} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex font-semibold text-3xl items-center justify-center p-2">
        {field.name}
      </div>
      {isModalOpen && (
        <AddVaultModal
          fieldId={field.id}
          position={selectedPosition}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}