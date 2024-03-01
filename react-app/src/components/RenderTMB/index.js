import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useState } from "react";
import "./RenderTMB.css";


const RenderTMB = ({ 
  selectedFieldId, 
  handleStageClick, 
  handleOpenModal, 
  handleToggleChange, 
  toggleSelected, 
  warehouse
 }) => {

  const dispatch = useDispatch();
  const [topmostVault, setTopmostVault] = useState(null);
  // const selectedFieldVaults = useSelector((state) => state.field.fieldVaults);
  // const vaults = Object.values(selectedFieldIdVaults)
  const field = useSelector((state) => state.field[selectedFieldId])
  const vaults = useSelector((state) => state.vaults)
  const selectedFieldVaults = field.vaults.map((vaultId) => vaults[vaultId])
  const [isLoading, setIsLoadig] = useState(false);

  const { type } = field

  // useEffect(() => {
  //     setIsLoadig(true)
  //     .then(setIsLoadig(false));
  // }, [selectedFieldId, handleStageClick])

  useEffect(() => {
    const updateTopmostVault = () => {
      let topVault = null;

      for (let vault of vaults) {
        if (!topVault || vault.position > topVault.position) {
          topVault = vault;
        }
      }

      setTopmostVault(topVault);
    };

    if (vaults && vaults.length > 0) {
      updateTopmostVault();
    }
  }, [selectedFieldId, vaults]);

  const onlyBottom = !selectedFieldVaults["B"];
  const onlyMiddle = !selectedFieldVaults["M"] && selectedFieldVaults["B"];
  const onlyFirstMiddle = type === "couchbox-T" && !selectedFieldVaults["M2"] && selectedFieldVaults["M"];
  const onlyTop = !selectedFieldVaults["T"] && ((type === "couchbox-T" && selectedFieldVaults["M1"]) || selectedFieldVaults["M"])

  return (
    <>
    {isLoading ? (
      <div style={{width: "100%", display: "flex", alignItems: "center", marginLeft: "50%", alignContent: "center"}}>
      <div className="loading-dots">
        <div className="dot1"></div>
        <div className="dot2"></div>
        <div className="dot3"></div>
      </div>
    </div>
    ) : (
        <div className="selected-field-vaults-tmb" style={{ gridTemplateRows: type === "couchbox" ? "repeat(4,1fr)" : ""}}>
          <div className="top field-row">
            <span className="position">T</span>
            { onlyTop && selectedFieldVaults.full && type === "vault" && (
              <div style={{ color: "red" }}>
                <span className="material-symbols-outlined">warning</span>Field is full
              </div>
            )}
            { !onlyFirstMiddle && onlyTop && !selectedFieldVaults.full ? (
              <AddVaultButton position="T" handleOpenModal={handleOpenModal} fieldType={type}/>
            ) : selectedFieldVaults["T"] ? (
              <VaultInstance
                position="T"
                vault={selectedFieldVaults["T"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === selectedFieldVaults["T"].id ? true : false}
              />
            ) : (
              ""
            )}
          </div>

          { type === "couchbox" && 
            <div className="middle-top middle field-row">
              <span className='position'>M2</span>
              {onlyFirstMiddle ? (
                <AddVaultButton position="M2" handleOpenModal={handleOpenModal} fieldType={type}/>
              ) : selectedFieldVaults["M2"]? (
                <VaultInstance
                  position="M2"
                  vault={selectedFieldVaults["M2"]}
                  handleStageClick={handleStageClick}
                  topmostVault={topmostVault?.id === selectedFieldVaults["M2"].id ? true : false}
                />
              ) : (
                ""
              )}
            </div>
          }

          <div className="middle-bottom middl field-row">
            { type === "vault" ? <span className='position'>M</span> : type === "couchbox" ? <span className='position'>M1</span> : "" }
            {onlyMiddle ? (
              <AddVaultButton position="M" handleOpenModal={handleOpenModal} fieldType={type}/>
            ) : selectedFieldVaults["M"]? (
              <VaultInstance
                position="M"
                vault={selectedFieldVaults["M"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === selectedFieldVaults["M"].id ? true : false}
              />
            ) : (
              ""
            )}
          </div>
          <div className="bottom field-row">
            <span className="position">B</span>
            {onlyBottom ? (
              <AddVaultButton position="B" handleOpenModal={handleOpenModal} fieldType={type}/>
            ) : selectedFieldVaults["B"] ? (
              <VaultInstance
                position="B"
                vault={selectedFieldVaults["B"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === selectedFieldVaults["B"].id ? true : false}
              />
            ) : (
              ""
            )}
          </div>
        </div>
    )}

    {/* Toggle Field Type Switch */}
      <div className={`selected-field-box ${toggleSelected ? 'toggled' : ''}`}>
      <div className="form-check form-switch" >
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={toggleSelected || type === "couchbox" }
          onChange={handleToggleChange}
        />
        <label
          className={`field-type-label ${type === 'vault' ? 'vault-label' : 'couchbox-label'}`}
          style={{fontSize: "0.8em", paddingRight: "0.5em"}}
        >
          {toggleSelected || type === "couchbox" ? 'Couchbox' : 'Vault' }

        </label>
      </div>
      
        <div className="selected-field-name">{field.name}</div>
      </div>
    </>
  );
};


export default RenderTMB;