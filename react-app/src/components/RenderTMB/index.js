import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useState } from "react";
import { getAllVaultsThunk } from "../../store/vault";
import "./RenderTMB.css"


const RenderTMB = ({ selectedField, handleStageClick, handleOpenModal, handleEditClick, handleToggleChange, toggleSelected }) => {
  const dispatch = useDispatch();
  const vaultsObj = useSelector((state) => state.vault.vaults);
  const [topmostVault, setTopmostVault] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const fieldState = useSelector((state) => state.warehouse.warehouseFields[parseInt(selectedField.id)]);
  const vaults = fieldState.vaults;

  const [fieldVaults, setFieldVaults] = useState({
    T: undefined,
    M: undefined,
    B: undefined,
  })

  useEffect(() => {
    dispatch(getAllVaultsThunk())
  }, [])

  useEffect(() => {
    const updateTopmostVault = () => {
      let topVault = null;
  
      for (let vaultId of vaults) {
        const vault = vaultsObj[vaultId];
        
        if (!topVault || vault.position > topVault.position) {
          topVault = vault;
        }
      }
  
      setTopmostVault(topVault);
      setIsLoaded(true);
    };
  
    if (vaults && vaults.length > 0) {
      updateTopmostVault();
    }
  }, [selectedField, vaults]);
  

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
      <div className="selected-field-vaults-tmb" style={{ gridTemplateRows: selectedField.type === "couchbox" ? "repeat(4,1fr)" : ""}}>
        <div className="top">
          <span className="position">T</span>
          {onlyTop && fieldState.full && (
            <div style={{ color: "red" }}>
              <span className="material-symbols-outlined">warning</span>Field is full
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


        {/* This is a conditional position based on wether this field is a vault- or couchbox field */}
        { selectedField.type === "couchbox" && 
        <div className="middle-top middle">
          <span className='position'>M2</span>
          {onlyMiddle ? (
            <AddVaultButton position="M2" handleOpenModal={handleOpenModal} />
          ) : fieldVaults["M2"]? (
            <VaultInstance
              position="M2"
              vault={fieldVaults["M2"]}
              handleStageClick={handleStageClick}
              handleEditClick={handleEditClick}
              topmostVault={isLoaded && topmostVault.id === fieldVaults["M2"].id ? true : false}
            />
          ) : (
            ""
          )}
        </div>
        }

        <div className="middle-bottom middle">
          { selectedField.type === "vault" ? <span className='position'>M</span> : selectedField.type === "couchbox" ? <span className='position'>M1</span> : "" }
          {onlyMiddle ? (
            <AddVaultButton position="M" handleOpenModal={handleOpenModal} />
          ) : fieldVaults["M"]? (
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
      <div className={`selected-field-box ${toggleSelected ? 'toggled' : ''}`}>
      <div className="form-check form-switch">
      <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={toggleSelected}
          onChange={handleToggleChange}
        />
      </div>
        <div className="selected-field-name">{selectedField.field_id}</div>
      </div>
    </>
  );
};


export default RenderTMB;