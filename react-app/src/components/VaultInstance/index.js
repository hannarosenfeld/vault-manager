import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { getFieldThunk } from "../../store/field";
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';

const VaultInstance = ({ vault, position, handleStageClick, handleEditClick }) => {
  const history = useHistory();
  const field = useSelector(state => state.field.currentField);
  const dispatch = useDispatch();
  const [topmostPosition, setTopmostPosition] = useState(""); // State variable to track topmost position

  useEffect(() => {
    dispatch(getFieldThunk(vault.field_id));
  }, []);

  useEffect(() => {
    if (field && field.vaults && field.vaults.length > 0) {

      // Find the topmost vault by comparing positions as strings
      const newTopmostPosition = field.vaults.reduce((maxPosition, currentVault) => {
        return currentVault.position > maxPosition ? currentVault.position : maxPosition;
      }, field.vaults[0].position); // Initialize with the position of the first vault

      // Update the topmost position state variable
      setTopmostPosition(newTopmostPosition);
    }
  }, [field]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <div style={{ display: "flex", width: "60%", gap: "5px" }}>
        <div>{vault?.customer?.name}</div>
        <div>{vault?.vault_id}</div>
        <div style={{color: "var(--red)"}}><b>{vault?.type}</b></div>
      </div>
      <div className="edit-symbols">
        <span
          onClick={() => handleStageClick(vault, position)}
          style={{ color: position === topmostPosition ? "#FFA500" : "#CCCCCC" }}
          className="material-symbols-outlined"
        >
          forklift
        </span>
        <Link to={`/vaults/${vault.id}/edit`} className="edit-link">
        <span
          // onClick={() => handleEditClick(vault)}
          style={{ color: "#0074D9" }}
          className="material-symbols-outlined"
        >
          edit
        </span>
        </Link>
      </div>
    </div>
  );
};

export default VaultInstance;
