import React, { useEffect, useState } from "react";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";
import { useDispatch, useSelector } from "react-redux";

import { getFieldThunk } from "../../store/field";

const RenderTMB = ({ selectedField, top, middle, bottom, handleStageClick, handleOpenModal, handleEditClick }) => {
  const dispatch = useDispatch();
  const fieldState = useSelector(state => state.field.currentField)
  const onlyBottom = !top && !middle && !bottom;
  const onlyMiddle = !top && !middle && bottom;
  const onlyTop = !top && middle && bottom;

  useEffect(() => {
    dispatch(getFieldThunk(selectedField?.id));
  }, [dispatch])

  useEffect(() => {
    console.log("🫖 fieldState", fieldState)
  }, [fieldState])

  const RenderHelper = (fieldState, onlyTop, top) => {
    if (fieldState.full) {
      return (
        <div style={{ color: "red", display: "flex", alignItems: "center" }}>
        <span className="material-symbols-outlined">warning</span>
        This field is full
      </div>
      )
    }
    if (onlyTop && !fieldState.full) {
      return (
        <AddVaultButton
        field={selectedField}
        position="T"
        handleOpenModal={handleOpenModal}
      />
      )
    }
    if (top ) {
      return (
        <VaultInstance
        position="T"
        vault={top}
        handleStageClick={handleStageClick}
        handleEditClick={handleEditClick}
      />
      )
    }
  }
  return (
    <>
      <div className="selected-field-vaults-tmb">
        <div className="top">
          <span className="position">T</span>
          <RenderHelper fieldState={fieldState} top={top} onlyTop={onlyTop}/>
        </div>
        <div className="middle">
          <span className="position">M</span>
          {onlyMiddle ? (
            <AddVaultButton position="M" handleOpenModal={handleOpenModal}/>
          ) : middle ? (
            <VaultInstance position="M" vault={middle} handleStageClick={handleStageClick} handleEditClick={handleEditClick}/>
          ) : (
            ""
          )}
        </div>
        <div className="bottom">
          <span className="position">B</span>
          {onlyBottom ? (
            <AddVaultButton position="B" handleOpenModal={handleOpenModal}/>
          ) : bottom ? (
            <VaultInstance position="B" vault={bottom} handleStageClick={handleStageClick} handleEditClick={handleEditClick}/>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default RenderTMB;