import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "./VaultInstance";
import { useState } from "react";
import { getAllFieldVaultsThunk } from "../../../store/vault";
import "./RenderTMB.css";

const RenderTMB = ({ 
  selectedFieldId,
  handleStageClick, 
  handleOpenAddVaultModal, 
  toggleFieldType, 
  toggleFieldFull,
  toggleSelected,
  selectedVault,
  moveVault,
  warehouse
 }) => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.field[warehouse.id]);
  const field = useSelector((state) => state.field[warehouse.id][selectedFieldId]);
  const vaults = useSelector((state) => state.vault);
  const vaultsArr = []

  field.vaults.forEach(id => (vaults[id]) ?  vaultsArr.push(vaults[id]) : null);
  const [sortedVaults, setSortedVaults] = useState({});
  const [topmostVault, setTopmostVault] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { type } = field


  useEffect(() => {
    if (fields) console.log("🧖🏻‍♂️ fields: ", fields)
  }, [fields])

  useEffect(() => {
    setSortedVaults({});
    dispatch(getAllFieldVaultsThunk(selectedFieldId))
  }, [dispatch, selectedFieldId])

  useEffect(() => {
    const sortVaults = {};
    if (Object.keys(vaults).length) {
      vaultsArr.forEach(vault => {
        sortVaults[vault.position] = vault;
      });

      setSortedVaults(sortVaults)
    }
    setIsLoading(false)
  }, [dispatch, vaults, selectedFieldId]);


  const { T, M, M2, B } = sortedVaults

  const updateTopmostVault = () => {
    let topVault = null;
    for (let vault of vaultsArr) {
      if (!topVault || vault.position > topVault.position) {
        topVault = vault;
      }
    }

    setTopmostVault(topVault);
  };

  useEffect(() => {
    if (vaultsArr && vaultsArr.length > 0) {
      updateTopmostVault();
    }
  }, [dispatch, vaultsArr]);

 
  return (
    <div className="rendertmb-container">
    {isLoading ? (
      <div className="rendertmb-loading-container">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
    </div>
    ) : (
        <div className="selected-field-vaults-tmb" style={{ gridTemplateRows: type === "couchbox" ? "repeat(4,1fr)" : ""}}>
          <div className="top field-row">
            <span className="position">T</span>
            {/* { onlyTop && sortedVaults.full && type === "vault" && (
              <div style={{ color: "red" }}>
                <span className="material-symbols-outlined">warning</span>Field is full
              </div>
            )} */}
            { !T && M2 && M && B ? (
              <AddVaultButton position="T" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type} isFull={field.full}/>
            ) 
            : sortedVaults["T"] ? (
              <VaultInstance
                position="T"
                vault={sortedVaults["T"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === sortedVaults["T"].id ? true : false}
                fieldType={type}
              />
            ) 
            : (
              ""
            )}
          </div>
          { type === "couchbox-T" && 
            <div className="middle-top middle field-row">
              <span className='position'>M2</span>
              { !M2 && M && B ? (
                <AddVaultButton position="M2" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type} isFull={field.full}/>
              ) : sortedVaults["M2"]? (
                <VaultInstance
                  position="M2"
                  vault={sortedVaults["M2"]}
                  handleStageClick={handleStageClick}
                  topmostVault={topmostVault?.id === sortedVaults["M2"].id ? true : false}
                  fieldType={type}
                />
              ) : (
                ""
              )}
            </div>
          }
          <div className="middle-bottom middle field-row">
            { type === "vault" ? <span className='position'>M</span> : type === "couchbox-T" ? <span className='position'>M1</span> : "" }
            {B && !M ? (
              <AddVaultButton position="M" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type} isFull={field.full}/>
            ) : sortedVaults["M"] ? (
              <VaultInstance
                position="M"
                vault={sortedVaults["M"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === sortedVaults["M"].id ? true : false}
                fieldType={type}
              />
            ) : (
              ""
            )}
          </div>
          <div className="bottom field-row">
            <span className="position">B</span>
            {!B ? (
              <AddVaultButton position="B" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type} isFull={field.full}/>
            ) : sortedVaults["B"] ? (
              <VaultInstance
                position="B"
                vault={sortedVaults["B"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === sortedVaults["B"].id ? true : false}
                fieldType={type}
              />
            ) : (
              ""
            )}
          </div>
        </div>
    )}
    <div className={`selected-field-box ${toggleSelected ? 'toggled' : ''}`}>
      <div className="field-info-box">
        <div className="selected-field-name">{field.name}</div>
          <div className="field-switches">
            <div className="form-check form-switch toggle-container" >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={type === "couchbox-T"}
                onChange={() => toggleFieldType(type, fields[selectedFieldId], fields[selectedFieldId+1])}
              />
              <label className={`field-type-label ${type === 'vault' ? 'vault-label' : 'couchbox-label'}`}>
                {type === 'couchbox-T' ? 'couchbox' : 'vault'}
              </label>
            </div>
            <div className="form-check form-switch toggle-container" >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={field.full}
                onChange={() => toggleFieldFull(field.id)}
              />
              <label>
                full
                {/* {toggleSelected || type === "couchbox" ? 'Couchbox' : 'Vault' } */}
              </label>
            </div>            
          </div>
        </div> 
      </div>
    </div>
  );
};


export default RenderTMB;