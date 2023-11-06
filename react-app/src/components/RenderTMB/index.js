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

  // useEffect(() => {
  //   dispatch(getFieldThunk(selectedField?.id));
  // }, [dispatch])

  useEffect(() => {
    console.log("🫖 fieldState", fieldState)
    console.log("🌸 selectedField: ", selectedField)
  }, [fieldState])

  return (
    <>
      <div className="selected-field-vaults-tmb">
        <div className="top">
          <span className="position">T</span>
          {fieldState.full && <div style={{color: "red"}}><span class="material-symbols-outlined">warning</span>Field is full</div>}
          {onlyTop && !fieldState.full ? (
            <AddVaultButton field={fieldState} position="T" handleOpenModal={handleOpenModal} />
          ) : top ? (
            <VaultInstance position="T" vault={top} handleStageClick={handleStageClick} handleEditClick={handleEditClick}/>
          ) : (
            ""
          )}
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