import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStagedVaultsThunk } from "../../store/stage";
import { getVaultsThunk } from "../../store/vault";
import StageToWareHouseModal from "./StageToWareHouseModal/StageToWareHouseModal";
import "./StagedVaults.css";

export default function StagedVaults() {
  const dispatch = useDispatch();
  // const staged = useSelector((state) => state.stage);
  const vaults = useSelector(state => state.vault);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  let stagedArr = [];

  useEffect(() => {
    // dispatch(getAllStagedVaultsThunk());
    dispatch(getVaultsThunk())
  }, [dispatch]);

  useEffect(() => {
    if (Object.values(vaults).length) stagedArr = Object.values(vaults).filter(vault => (!vault.field_id && !vault.position))
  }, [vaults])

  // Function to truncate a string to a specified length
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "..";
    }
    return str;
  };

  const handleVaultClick = (vault) => {
    setSelectedVault(vault);
    setIsModalOpen(true);
  };

  return (
    <div className="page-wrapper">
      <div className="hazard-border">
        <div className="staged-containers">
        {Object.values(vaults).filter(vault => (!vault.field_id && !vault.position)).map(vault => (
          <div
            key={vault.id}
            className="vault"
            onClick={() => handleVaultClick(vault)} 
          >
            <p style={{marginBottom: "0"}}><b>{truncateString(vault.customer_name, 6)}</b></p>
            <p>{vault.name}</p>
          </div>
        ))}
        </div>
      </div>
      {isModalOpen && <StageToWareHouseModal selectedVault={selectedVault} closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}
