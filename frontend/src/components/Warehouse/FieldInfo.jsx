import AddVaultButton from "./AddVaultButton";
import VaultInfo from "./VaultInfo";
import AddVaultModal from "./AddVaultModal";
import { useState } from "react";export default function FieldInfo({ field }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const rowCount = field.type === "couchbox" ? 4 : 3;

  // Define positions, conditionally including M2
  const positionOrder = ["T", "M2", "M", "B"].filter(
    (pos) => pos !== "M2" || field.type === "couchbox"
  );

  // Sort vaults based on their position
  const sortedVaults = field.vaults
    ? [...field.vaults].sort(
        (a, b) =>
          positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
      )
    : [];

  // Map vaults to positions
  const vaultMap = Object.fromEntries(
    sortedVaults.map((vault) => [vault.position, vault])
  );

  // Find the last empty position
  const lastEmptyPosition = [...positionOrder]
    .reverse()
    .find((pos) => !vaultMap[pos]);

  // Handle opening and closing of the modal
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
            className={`p-2 ${
              index < rowCount - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            {vaultMap[pos] ? (
              <VaultInfo vault={vaultMap[pos]} />
            ) : (
              lastEmptyPosition === pos && (
                <AddVaultButton type={field.type} onClick={() => handleOpenModal(pos)} />
              )
            )}
          </div>
        ))}
      </div>
      <div className="flex font-semibold text-3xl items-center justify-center p-2">
        {field.name}
      </div>
      {/* Modal */}
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
