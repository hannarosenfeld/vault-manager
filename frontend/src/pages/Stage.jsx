import { useState } from 'react';
import { useSelector } from 'react-redux';
import StageToWareHouseModal from '../components/Stage/StageToWarehouseModal';

export default function Stage() {
  const stagedVaults = useSelector((state) => state.stage.stagedVaults);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);

  const openModal = (vault) => {
    setSelectedVault(vault);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVault(null);
    setIsModalOpen(false);
  };

  return (
    <div
      className="min-h-[90vh] max-w-3xl mx-auto border-8 border-solid border-yellow-500 p-5"
      style={{
        borderImage: "repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px) 10",
      }}
    >
      {Object.keys(stagedVaults).length === 0 ? (
        <p className="text-gray-500">No staged vaults available.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Object.values(stagedVaults).map((vault) => (
            <div
              key={vault.id}
              className="flex flex-col justify-center items-center p-2 border-2 border-gray-800 rounded shadow cursor-pointer hover:bg-gray-100 bg-yellow-400 w-[calc(33.333%-1rem)]"
              onClick={() => openModal(vault)}
            >
              <h2 className="text-xs text-blue-500 font-semibold">#{vault.id}</h2>
              <p className="text-xs font-semibold text-gray-700 text-center">{vault.customer_name}</p>
              {vault.order_name && (
                <p className="text-xs text-gray-700 text-center">[{vault.order_name}]</p>
              )}
            </div>
          ))}
        </div>
      )}
      <StageToWareHouseModal isOpen={isModalOpen} onClose={closeModal} vault={selectedVault} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
}