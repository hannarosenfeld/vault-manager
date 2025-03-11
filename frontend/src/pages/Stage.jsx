import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StageToWareHouseModal from '../components/Stage/StageToWarehouseModal';
import ConfirmDeleteVaultModal from '../components/Stage/ConfirmDeleteVaultModal';
// import { deleteVaultThunk, getVaultsThunk } from '../store/vault';

export default function Stage() {
  const dispatch = useDispatch();
  const stagedVaults = useSelector((state) => state.stage.stagedVaults);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  const [isDeleteModeOn, setIsDeleteModeOn] = useState(false);
  const [vaultsToDelete, setVaultsToDelete] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // dispatch(getVaultsThunk());
  }, [dispatch]);

  const openModal = (vault) => {
    setSelectedVault(vault);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVault(null);
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Simulate delete action
      // await Promise.all(vaultsToDelete.map((vault) => dispatch(deleteVaultThunk(vault.id))));
      setVaultsToDelete([]);
      setIsDeleteModalOpen(false);
      console.log("Vaults deleted!");
    } catch (error) {
      console.error("Error deleting vaults:", error);
    }
  };

  const handleToggleDeleteMode = (event) => {
    setIsDeleteModeOn(event.target.checked);
  };

  const handleVaultClick = (vault) => {
    if (!isDeleteModeOn) {
      openModal(vault);
    } else {
      setVaultsToDelete((prevVaults) => {
        const isVaultInList = prevVaults.some((v) => v.id === vault.id);
        if (isVaultInList) {
          return prevVaults.filter((v) => v.id !== vault.id);
        } else {
          return [...prevVaults, vault];
        }
      });
    }
  };

  return (
    <div className="min-h-[90vh] max-w-3xl mx-auto border-8 border-solid border-yellow-500 p-5"
      style={{
        borderImage: "repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px) 10",
      }}
    >
      <div className="flex justify-between items-center mb-4 h-12">
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={isDeleteModeOn}
                onChange={handleToggleDeleteMode}
                className="sr-only"
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                  isDeleteModeOn ? "transform translate-x-full bg-red-500" : ""
                }`}
              ></div>
            </div>
            <span className="ml-3 text-gray-700">Delete vaults mode {isDeleteModeOn ? <span className='text-green-600'>ON</span> : <span className='text-red-600'>OFF</span>}</span>
          </label>
        </div>
        {isDeleteModeOn && (
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Selected
          </button>
        )}
      </div>
      {Object.keys(stagedVaults).length === 0 ? (
        <p className="text-gray-500">No staged vaults available.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Object.values(stagedVaults).map((vault) => (
            <div
              key={vault.id}
              className={`flex flex-col justify-center items-center p-2 border-2 border-gray-800 rounded shadow cursor-pointer hover:bg-gray-100 w-[calc(33.333%-1rem)] ${
                isDeleteModeOn && vaultsToDelete.some((v) => v.id === vault.id) ? "bg-red-500" : "bg-yellow-400"
              }`}
              onClick={() => handleVaultClick(vault)}
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
      <StageToWareHouseModal isOpen={isModalOpen} onClose={closeModal} vault={selectedVault} />
      <ConfirmDeleteVaultModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        handleDelete={handleConfirmDelete}
      />
    </div>
  );
}