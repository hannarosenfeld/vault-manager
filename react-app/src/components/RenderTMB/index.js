import React from "react";
import AddVaultButton from "./AddVaultButton";
import VaultInstance from "../VaultInstance";

const RenderTMB = ({ top, middle, bottom, handleStageClick }) => {
  const onlyBottom = !top && !middle && !bottom;
  const onlyMiddle = !top && !middle && bottom;
  const onlyTop = !top && middle && bottom;

  return (
    <>
      <div className="selected-field-vaults-tmb">
        <div className="top">
          <span className="position">T</span>
          {onlyTop ? (
            <AddVaultButton position="T" />
          ) : top ? (
            <VaultInstance vault={top} handleStageClick={handleStageClick} />
          ) : (
            ""
          )}
        </div>
        <div className="middle">
          <span className="position">M</span>
          {onlyMiddle ? (
            <AddVaultButton position="M" />
          ) : middle ? (
            <VaultInstance vault={middle} handleStageClick={handleStageClick} />
          ) : (
            ""
          )}
        </div>
        <div className="bottom">
          <span className="position">B</span>
          {onlyBottom ? (
            <AddVaultButton position="B" />
          ) : bottom ? (
            <VaultInstance vault={bottom} handleStageClick={handleStageClick} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default RenderTMB;
