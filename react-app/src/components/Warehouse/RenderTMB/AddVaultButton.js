
const AddVaultButton = ({ position, handleOpenAddVaultModal, fieldType }) => {
    return (
      <div className="add-vault-button" onClick={() => handleOpenAddVaultModal(position)}>
        <i className="fa-solid fa-plus" />
        <span>{fieldType === "vault" ? " Add Vault" : " Add Couchbox"}</span>
      </div>
    );
  };
  
  export default AddVaultButton;