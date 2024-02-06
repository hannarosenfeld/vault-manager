import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useState } from "react";
import "./RenderTMB.css"
import { getFieldVaultsThunk } from "../../store/field";


const RenderTMB = ({ 
  selectedField, 
  handleStageClick, 
  handleOpenModal, 
  handleToggleChange, 
  toggleSelected }) => {

    console.log(
      "1️⃣ selectedField: ", selectedField,
      "2️⃣ handleStageClick: ", handleStageClick,
      "3️⃣ handleOpenModal: ", handleOpenModal,
      "5️⃣ handleToggleChange: ", handleToggleChange,
      "6️⃣ toggleSelected: ", toggleSelected
  );
  
  const dispatch = useDispatch();
  const selectedFieldVaults = useSelector((state) => state.field.fieldVaults);
  const [topmostVault, setTopmostVault] = useState(null);
  const fieldState = useSelector((state) => state.field.fieldVaults);
  const vaults = Object.values(fieldState)


  useEffect(() => {
    dispatch(getFieldVaultsThunk(selectedField.id));
  }, [selectedField, handleStageClick])

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
  }, [selectedField, vaults]);

  const onlyBottom = !selectedFieldVaults["T"] && !selectedFieldVaults["M"] && !selectedFieldVaults["B"];
  const onlyMiddle = !selectedFieldVaults["T"] && !selectedFieldVaults["M"] && selectedFieldVaults["B"];
  const onlyFirstMiddle = selectedField.type === "couchbox" && (!selectedFieldVaults["T"] && !selectedFieldVaults["M2"] && selectedFieldVaults["M"] && selectedFieldVaults["B"]);
  const onlyTop = !selectedFieldVaults["T"] && selectedFieldVaults["M"] && selectedFieldVaults["B"];

  return (
    <>
        <div className="selected-field-vaults-tmb" style={{ gridTemplateRows: selectedField.type === "couchbox" ? "repeat(4,1fr)" : ""}}>
          <div className="top field-row">
            <span className="position">T</span>
            { onlyTop && fieldState.full && selectedField.type === "vault" && (
              <div style={{ color: "red" }}>
                <span className="material-symbols-outlined">warning</span>Field is full
              </div>
            )}
            { !onlyFirstMiddle && onlyTop && !fieldState.full ? (
              <AddVaultButton position="T" handleOpenModal={handleOpenModal} fieldType={selectedField.type}/>
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

          { selectedField.type === "couchbox" && 
            <div className="middle-top middle field-row">
              <span className='position'>M2</span>
              {onlyFirstMiddle ? (
                <AddVaultButton position="M2" handleOpenModal={handleOpenModal} fieldType={selectedField.type}/>
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
            { selectedField.type === "vault" ? <span className='position'>M</span> : selectedField.type === "couchbox" ? <span className='position'>M1</span> : "" }
            {onlyMiddle ? (
              <AddVaultButton position="M" handleOpenModal={handleOpenModal} fieldType={selectedField.type}/>
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
              <AddVaultButton position="B" handleOpenModal={handleOpenModal} fieldType={selectedField.type}/>
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
      <div className={`selected-field-box ${toggleSelected ? 'toggled' : ''}`}>
      <div className="form-check form-switch" >
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={toggleSelected || selectedField.type === "couchbox" }
          onChange={handleToggleChange}
        />
        <label
          className={`field-type-label ${selectedField.type === 'vault' ? 'vault-label' : 'couchbox-label'}`}
          style={{fontSize: "0.8em", paddingRight: "0.5em"}}
        >
          {toggleSelected || selectedField.type === "couchbox" ? 'Couchbox' : 'Vault' }
        </label>
      </div>
        <div className="selected-field-name">{selectedField.field_id}</div>
      </div>
    </>
  );
};


export default RenderTMB;