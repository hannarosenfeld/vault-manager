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
  handleToggleChange, 
  toggleSelected,
  selectedVault,
  moveVault
 }) => {
  const dispatch = useDispatch();
  const field = useSelector((state) => state.field[selectedFieldId]);
  const vaults = useSelector((state) => state.vault);
  const vaultsArr = []
  field.vaults.forEach(id => (vaults[id]) ?  vaultsArr.push(vaults[id]) : null);
  const [sortedVaults, setSortedVaults] = useState({});
  const [topmostVault, setTopmostVault] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { type } = field


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
    // console.log.log("🦄", topmostVault)
    let topVault = null;
    for (let vault of vaultsArr) {
      if (!topVault || vault.position > topVault.position) {
        topVault = vault;
      }
    }

    setTopmostVault(topVault);
  };

  useEffect(() => {
      console.log("🦕", vaultsArr)
    // updateTopmostVault()
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
            { !T && M && B ? (
              <AddVaultButton position="T" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type}/>
            ) 
            : sortedVaults["T"] ? (
              <VaultInstance
                position="T"
                vault={sortedVaults["T"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === sortedVaults["T"].id ? true : false}
              />
            ) 
            : (
              ""
            )}
          </div>
          { type === "couchbox" && 
            <div className="middle-top middle field-row">
              <span className='position'>M2</span>
              { !M2 && M && B ? (
                <AddVaultButton position="M2" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type}/>
              ) : sortedVaults["M2"]? (
                <VaultInstance
                  position="M2"
                  vault={sortedVaults["M2"]}
                  handleStageClick={handleStageClick}
                  topmostVault={topmostVault?.id === sortedVaults["M2"].id ? true : false}
                />
              ) : (
                ""
              )}
            </div>
          }
          <div className="middle-bottom middle field-row">
            { type === "vault" ? <span className='position'>M</span> : type === "couchbox" ? <span className='position'>M1</span> : "" }
            {B && !M ? (
              <AddVaultButton position="M" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type}/>
            ) : sortedVaults["M"] ? (
              <VaultInstance
                position="M"
                vault={sortedVaults["M"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === sortedVaults["M"].id ? true : false}
              />
            ) : (
              ""
            )}
          </div>
          <div className="bottom field-row">
            <span className="position">B</span>
            {!B ? (
              <AddVaultButton position="B" vault={selectedVault} handleOpenAddVaultModal={handleOpenAddVaultModal} moveVault={moveVault} fieldType={type}/>
            ) : sortedVaults["B"] ? (
              <VaultInstance
                position="B"
                vault={sortedVaults["B"]}
                handleStageClick={handleStageClick}
                topmostVault={topmostVault?.id === sortedVaults["B"].id ? true : false}
              />
            ) : (
              ""
            )}
          </div>
        </div>
    )}
    {/* Toggle Field Type Switch */}
    <div className={`selected-field-box ${toggleSelected ? 'toggled' : ''}`}>
      <div className="field-info-box">
      {/* <div className="form-check form-switch" >
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
      </div>     */}
        <div className="selected-field-name" style={{margin: "0 auto"}}>{field.name}</div>
      </div> 
      </div>
    </div>
  );
};


export default RenderTMB;