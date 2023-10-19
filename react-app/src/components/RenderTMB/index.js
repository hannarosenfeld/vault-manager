import React from "react";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";

const RenderTMB = ({ field, top, middle, bottom, handleStageClick, handleOpenModal, handleEditClick }) => {
  const onlyBottom = !top && !middle && !bottom;
  const onlyMiddle = !top && !middle && bottom;
  const onlyTop = !top && middle && bottom;

  console.log("🍋 ", field)

  return (
    <>
      <div className="selected-field-vaults-tmb">
        <div className="top">
          <span className="position">T</span>
          {onlyTop && !field.full ? (
            <AddVaultButton position="T" handleOpenModal={handleOpenModal} />
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