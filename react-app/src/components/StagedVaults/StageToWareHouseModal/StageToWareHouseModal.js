import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./StageToWareHouseModal.css"; // Import your updated CSS file

export default function StageToWareHouseModal({ closeModal }) {
  return (
    <div className="stage-to-warehouse-modal-wrapper">
      <div className="stage-to-warehouse-modal-content">
        <IconButton
          aria-label="Close"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={closeModal}
        >
          <CloseIcon />
        </IconButton>
        <p>Modal Content Goes Here</p>
        <div style={{color: "red"}}>
          TODO: select from warehouse
        </div>
      </div>
    </div>
  );
}
