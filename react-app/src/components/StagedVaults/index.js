import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStagedVaultsThunk } from "../../store/stage";
import StageToWareHouseModal from "./StageToWareHouseModal/StageToWareHouseModal";
import "./StagedVaults.css";

export default function StagedVaults() {
  const dispatch = useDispatch();
  const staged = useSelector((state) => state.stage.stagedVaults);
  const stagedArr = Object.values(staged);
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for the modal

  useEffect(() => {
    dispatch(getAllStagedVaultsThunk());
  }, [dispatch]);

  // Function to truncate a string to a specified length
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + ".."; // Append ellipsis for truncated text
    }
    return str;
  };

  // Function to handle click and open the modal
  const handleVaultClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="page-wrapper">
      <div className="hazard-border">
        <div className="staged-containers">
          {stagedArr?.map((vault) => (
            <div key={vault.id} className="vault" onClick={handleVaultClick}>
              <p><b>{truncateString(vault?.customer?.name, 6)}</b></p>
              <p>{vault?.vault_id}</p>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <StageToWareHouseModal closeModal={() => setIsModalOpen(false)} />} {/* Display the modal when isModalOpen is true */}
    </div>
  );
}
