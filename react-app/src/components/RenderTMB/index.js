import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFieldThunk } from "../../store/field";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useState } from "react";

const RenderTMB = ({ topmostVault, selectedField, handleStageClick, handleOpenModal, handleEditClick }) => {
  const dispatch = useDispatch();
  const vaults = useSelector((state) => state.vault.vaults);
  const fieldState = useSelector((state) => state.warehouse.warehouseFields[parseInt(selectedField.id)]);
  const [fieldVaults, setFieldVaults] = useState({
    T: undefined,
    M: undefined,
    B: undefined,
  })

  useEffect(() => {
    setFieldVaults( fs => {
      let res = {}
      if (fieldState.vaults && fieldState.vaults.length !== 0) {
        fieldState.vaults.forEach((vault) => {
          let vaultState = vaults[vault];
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
              topmostVault={fieldVaults["T"].id === topmostVault.id ? true : false}
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
              topmostVault={fieldVaults["M"].id === topmostVault.id ? true : false}
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
              topmostVault={fieldVaults["B"]?.id === topmostVault?.id ? true : false}
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