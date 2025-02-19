import { useState } from 'react';
import ViewAndEditVaultModal from './ViewAndEditVaultModal';

export default function VaultInfo({ vault }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex justify-between text-xs h-full w-full items-center">
        <div className="flex gap-2 h-full items-center justify-center">
          <div className="flex gap-1 leading-none">
            <div>{vault.customer_name.length > 10 ? `${vault.customer_name.substring(0, 10)}...` : vault.customer_name}</div>
            <div>{vault.name}</div>
            <div className="font-semibold text-red-600">{vault.type}</div>
          </div>
        </div>
        <div className="flex text-md gap-2 items-center justify-center">
          <div className="flex items-center" onClick={toggleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 cursor-pointer"
              style={{color: "var(--blue)"}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <span className="material-symbols-outlined text-amber-500" style={{ fontSize: '18px'}}>
            forklift
          </span>
        </div>
      </div>

      {isModalOpen && (
        <ViewAndEditVaultModal toggleModal={toggleModal} vault={vault} />
      )}
    </div>
  );
}