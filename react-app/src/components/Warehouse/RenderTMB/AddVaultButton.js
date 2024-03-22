
const AddVaultButton = ({ position, vault, handleOpenAddVaultModal, moveVault, fieldType }) => {
    return (
      <div className="add-vault-button" onClick={() => {!vault ? handleOpenAddVaultModal(position) : moveVault(vault,position)}}>
        <i className="fa-solid fa-plus" />
        <span>{fieldType === "vault" ? " Add Vault" : " Add Couchbox"}</span>
      </div>
    );
  };
  
  export default AddVaultButton;