import React, { useEffect, useState } from "react";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useDispatch, useSelector } from "react-redux";

import { getFieldThunk } from "../../store/field";

const RenderTMB = ({ selectedField, top, middle, bottom, handleStageClick, handleOpenModal, handleEditClick }) => {
  const dispatch = useDispatch();
  const fieldState = useSelector(state => state.field.currentField);
  const onlyBottom = !top && !middle && !bottom;
  const onlyMiddle = !top && !middle && bottom;
  const onlyTop = !top && middle && bottom;

  console.log("🍰", selectedField);

  useEffect(() => {
    dispatch(getFieldThunk(selectedField?.id));
  }, [dispatch]);

  return (
    <div className="selected-field-vaults-tmb">
      <div className="top">
        {fieldState.full ? (
          <div style={{ color: "red", display: "flex", alignItems: "center" }}>
            <span className="material-symbols-outlined">warning</span>
            This field is full
          </div>
        ) : onlyTop && !fieldState.full ? (
          <AddVaultButton
            field={selectedField}
            position="T"
            handleOpenModal={handleOpenModal}
          />
        ) : top ? (
          <VaultInstance
            position="T"
            vault={top}
            handleStageClick={handleStageClick}
            handleEditClick={handleEditClick}
          />
        ) : null}
      </div>
      <div className="bottom">
        <span className="position">B</span>
        {onlyBottom ? (
          <AddVaultButton position="B" handleOpenModal={handleOpenModal} />
        ) : bottom ? (
          <VaultInstance
            position="B"
            vault={bottom}
            handleStageClick={handleStageClick}
            handleEditClick={handleEditClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default RenderTMB;
