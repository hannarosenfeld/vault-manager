const VaultInstance = ({ vault, position, handleStageClick, handleEditClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <div style={{ display: "flex", width: "60%", gap: "5px" }}>
        <div>{vault?.customer?.name}</div>
        <div>{vault?.vault_id}</div>
      </div>
      <div className="edit-symbols">
        <span
          onClick={() => handleStageClick(vault, position)}
          style={{ color: "#FFA500" }}
          className="material-symbols-outlined"
        >
          forklift
        </span>
        <span
          onClick={() => handleEditClick(vault)}
          style={{ color: "#0074D9" }}
          className="material-symbols-outlined"
        >
          edit
        </span>
        {/* <span onClick={handleDeleteClick} style={{ color: "var(--delete)" }} className="material-symbols-outlined">delete</span> */}
      </div>
    </div>
  );
};

export default VaultInstance;

