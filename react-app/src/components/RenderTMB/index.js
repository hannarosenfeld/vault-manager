import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useState } from "react";
import "./RenderTMB.css";
import { getAllVaultsThunk } from "../../store/vault";


const RenderTMB = ({ 
  selectedFieldId, 
  handleStageClick, 
  handleOpenModal, 
  handleToggleChange, 
  toggleSelected, 
  warehouse
 }) => {
  const dispatch = useDispatch();
  const field = useSelector((state) => state.field[selectedFieldId]);
  const vaults = useSelector((state) => state.vault);
  const vaultIds = field.vaults;
  const vaultsArr = vaultIds.map(id => vaults[id])
  const [sortedVaults, setSortedVaults] = useState(null);
  const [topmostVault, setTopmostVault] = useState(null);
  const [isLoading, setIsLoadig] = useState(true);
  const { type } = field

  // 🚨 TODO: The Add Vault Button is currently not showing
  let onlyBottom;
  let onlyMiddle;
  let onlyFirstMiddle;
  let onlyTop;

  useEffect(() => {
    dispatch(getAllVaultsThunk(selectedFieldId))
  }, [selectedFieldId])

  useEffect(() => {
    // console.log("🚨", vaultsArr)
    const sortVaults = {};
    vaultsArr.forEach(vault => {
      sortVaults[vault.position] = vault;
    });
    setSortedVaults(sortVaults);
    setIsLoadig(false)
  }, [vaults]);

  // useEffect(() => {
  //   if (sortedVaults) {
  //     console.log("🍄 sortedVaults: ", sortedVaults)
  //     onlyBottom = sortedVaults["B"] ? false : true;
  //     onlyMiddle = !sortedVaults["M"] && sortedVaults["B"];
  //     onlyFirstMiddle = type === "couchbox-T" && !sortedVaults["M2"] && sortedVaults["M"];
  //     onlyTop = !sortedVaults["T"] && ((type === "couchbox-T" && sortedVaults["M1"]) || sortedVaults["M"])
  //   }
  //   console.log(
  //     "💖 onlyBottom:", onlyBottom,
  //     "\n💖 onlyFirstMiddle: ", onlyFirstMiddle,
  //     "\n💖 onlyMiddle: ", onlyMiddle,
  //     "\n💖 onlyTop: ", onlyTop
  //     )
  // }, [sortedVaults])

  const updateTopmostVault = () => {
    let topVault = null;
    for (let vault of vaultsArr) {
      if (!topVault || vault.position > topVault.position) {
        topVault = vault;
      }
    }

    setTopmostVault(topVault);
    console.log("🥎 topmostVault: ",topmostVault)
  };

  useEffect(() => {
    updateTopmostVault()
    if (vaults && vaults.length > 0) {
      updateTopmostVault();
    }
  }, [vaultsArr]);


  const { T, M, M2, B } = sortedVaults

  return (
    <>
    {isLoading ? (
      <div style={{width: "100%", display: "flex", alignItems: "center", marginLeft: "50%", alignContent: "center"}}>
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
    </div>
    ) : (
        <div className="selected-field-vaults-tmb" style={{ gridTemplateRows: type === "couchbox" ? "repeat(4,1fr)" : ""}}>
          <div className="top field-row">
            <span className="position">T</span>
            { onlyTop && sortedVaults.full && type === "vault" && (
              <div style={{ color: "red" }}>
                <span className="material-symbols-outlined">warning</span>Field is full
              </div>
            )}
            { !T && M && B ? (
              <AddVaultButton position="T" handleOpenModal={handleOpenModal} fieldType={type}/>
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
                <AddVaultButton position="M2" handleOpenModal={handleOpenModal} fieldType={type}/>
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
              <AddVaultButton position="M" handleOpenModal={handleOpenModal} fieldType={type}/>
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
              <AddVaultButton position="B" handleOpenModal={handleOpenModal} fieldType={type}/>
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