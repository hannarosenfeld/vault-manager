import AddVaultButton from "./AddVaultButton";
import VaultInfo from "./VaultInfo";
import Modal from "../Modal";
import { useState } from "react";

export default function FieldInfo({ field }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Handle opening and closing of the modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
              <AddVaultButton type={field.type} onClick={handleOpenModal} />
            )}
          </div>
        ))}
      </div>
      <div className="flex font-semibold text-3xl items-center justify-center p-2">
        {field.name}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleCloseModal} >
          <h2 className="text-xl font-semibold">Add Vault</h2>
          {/* You can add form fields or other content here */}
          <div className="mt-4">
            <p>Here you can add a new vault.</p>
            <button onClick={handleCloseModal} className="mt-4 text-blue-500">
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
