import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFieldThunk } from "../../store/field";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";


const RenderTMB = ({ selectedField, handleStageClick, handleOpenModal, handleEditClick }) => {
  const dispatch = useDispatch();
  const vaults = useSelector((state) => state.vault.vaults);
  const fieldState = useSelector((state) => state.field.currentField);
  const fieldVaults = {
    T: undefined,
    M: undefined,
    B: undefined,
  };

  useEffect(() => {
    console.log("💖", selectedField.id);
    dispatch(getFieldThunk(selectedField?.id));
  }, [dispatch, selectedField]);

  console.log("fieldstate:", fieldState);

  if (fieldState.vaults && Object.keys(fieldState.vaults).length !== 0) {
    fieldState.vaults.forEach((vault) => {
      let vaultState = vaults[vault];
      console.log("🫖 vaultState", vaultState);
      fieldVaults[vaultState.position] = vaultState;
    });
  }

  console.log("🍻 fieldVaults: ", fieldVaults);

  const onlyBottom = !fieldVaults["T"] && !fieldVaults["M"] && !fieldVaults["B"];
  const onlyMiddle =
    !fieldVaults["T"] && !fieldVaults["M"] && fieldVaults["B"] && !fieldVaults["B"].isFilled;
  const onlyTop =
    !fieldVaults["T"] &&
    fieldVaults["M"] &&
    fieldVaults["B"] &&
    !fieldVaults["M"].isFilled &&
    !fieldVaults["B"].isFilled;

  console.log("🍻  ", onlyBottom, onlyMiddle, onlyTop);

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