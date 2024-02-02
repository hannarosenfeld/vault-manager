
const AddVaultButton = ({ position, handleOpenModal, fieldType }) => {
  console.log("🛼", fieldType)
    return (
      <div className="add-vault-button" onClick={() => handleOpenModal(position)}>
        <i className="fa-solid fa-plus" />
        <span>{fieldType === "vault" ? " Add Vault" : " Add Couchbox"}</span>
      </div>
    );
  };
  
  export default AddVaultButton;