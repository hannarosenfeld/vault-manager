import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaultsThunk } from "../../store/vault";
// import { getAllStagedVaultsThunk } from "../../store/stage";
import StageToWareHouseModal from "./StageToWareHouseModal/StageToWareHouseModal";
import "./Stage.css";

export default function Stage() {
  const dispatch = useDispatch();
  // const staged = useSelector((state) => state.stage);
  const vaults = useSelector((state) => state.vault);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagedArr, setStagedArr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let res = await dispatch(getVaultsThunk())
      setStagedArr(Object.values(res).filter(vault => (!vault.field_id && !vault.position)))
    }
    fetchData()
  }, [dispatch]);

  useEffect(() => {
    if (Object.values(vaults).length) {
      setStagedArr(Object.values(vaults).filter(vault => (!vault.field_id && !vault.position)))
      setLoading(false);
    }
  }, [vaults])

  // Function to truncate a string to a specified length
  const truncateString = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str?.slice(0, maxLength) + "..";
    }
    return str;
  };

  const handleVaultClick = (vault) => {
    setSelectedVault(vault);
    setIsModalOpen(true);
  };

  return (
    <>
    {loading ? (
      <div className="rendertmb-loading-container">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      ) : (
    <div className="page-wrapper">
      <div className="hazard-border">
        <div className="staged-containers">
        {stagedArr.length ? stagedArr.map(vault => (
          <div
            key={vault.id}
            className="vault"
            onClick={() => handleVaultClick(vault)} 
          >
            <p style={{marginBottom: "0"}}><b>{truncateString(vault.customer_name, 6)}</b></p>
            <p>{vault.name}</p>
          </div>
        )): <>No staged vaults</>}
        </div>
      </div>
      {isModalOpen && <StageToWareHouseModal selectedVault={selectedVault} closeModal={() => setIsModalOpen(false)} />}
    </div>)}
    </>
  );
}
