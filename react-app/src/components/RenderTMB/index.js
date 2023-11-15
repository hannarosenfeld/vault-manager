import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useState } from "react";

const RenderTMB = ({ selectedField, handleStageClick, handleOpenModal, handleEditClick }) => {
  const dispatch = useDispatch();
  const vaultsObj = useSelector((state) => state.vault.vaults);
  const vaults = selectedField.vaults;
  const [topmostVault, setTopmostVault] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const fieldState = useSelector((state) => state.warehouse.warehouseFields[parseInt(selectedField.id)]);
  const [fieldVaults, setFieldVaults] = useState({
    T: undefined,
    M: undefined,
    B: undefined,
  })

  useEffect(() => {
    console.log("🌹", fieldVaults["B"])
  }, [fieldVaults["B"]])


  useEffect(() => {
    setIsLoaded(false);
  
    const updateTopmostVault = () => {
      let topVault = null;
  
      for (let vaultId of vaults) {
        const vault = vaultsObj[vaultId];
        if (!topVault || vault.position > topVault.position) {
          topVault = vault;
        }
      }
  
      setTopmostVault(topVault);
    };
  
    if (vaults && vaults.length > 0) {
      updateTopmostVault();
    }
  
    setIsLoaded(true);
  }, [selectedField, vaultsObj]);
  

  useEffect(() => {
    setFieldVaults( fs => {
      let res = {}
      if (fieldState.vaults && fieldState.vaults.length !== 0) {
        fieldState.vaults.forEach((vault) => {
          let vaultState = vaultsObj[vault];
          res[vaultState?.position] = vaultState;
        })
      }
      return res
    })
  }, [selectedField, fieldState])

  const onlyBottom = !fieldVaults["T"] && !fieldVaults["M"] && !fieldVaults["B"];
  const onlyMiddle = !fieldVaults["T"] && !fieldVaults["M"] && fieldVaults["B"];
  const onlyTop = !fieldVaults["T"] && fieldVaults["M"] && fieldVaults["B"];

  return (
    <>
      <div className="selected-field-vaults-tmb">
        <div className="top">
          <span className="position">T</span>
          {onlyTop && fieldState.full && (
            <div style={{ color: "red" }}>
              <span class="material-symbols-outlined">warning</span>Field is full
            </div>
          )}
          {onlyTop && !fieldState.full ? (
            <AddVaultButton position="T" handleOpenModal={handleOpenModal} />
          ) : fieldVaults["T"] ? (
            <VaultInstance
              position="T"
              vault={fieldVaults["T"]}
              handleStageClick={handleStageClick}
              handleEditClick={handleEditClick}
              topmostVault={isLoaded && topmostVault.id === fieldVaults["T"].id ? true : false}
            />
          ) : (
            ""
          )}
        </div>
        <div className="middle">
          <span className="position">M</span>
          {onlyMiddle ? (
            <AddVaultButton position="M" handleOpenModal={handleOpenModal} />
          ) : fieldVaults["M"] ? (
            <VaultInstance
              position="M"
              vault={fieldVaults["M"]}
              handleStageClick={handleStageClick}
              handleEditClick={handleEditClick}
              topmostVault={isLoaded && topmostVault.id === fieldVaults["M"].id ? true : false}
            />
          ) : (
            ""
          )}
        </div>
        <div className="bottom">
          <span className="position">B</span>
          {onlyBottom ? (
            <AddVaultButton position="B" handleOpenModal={handleOpenModal} />
          ) : fieldVaults["B"] ? (
            <VaultInstance
              position="B"
              vault={fieldVaults["B"]}
              handleStageClick={handleStageClick}
              handleEditClick={handleEditClick}
              topmostVault={isLoaded && topmostVault.id === fieldVaults["B"].id ? true : false}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};



export default RenderTMB;