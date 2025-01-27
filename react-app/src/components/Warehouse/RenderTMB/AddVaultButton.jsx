
const AddVaultButton = ({ position, vault, handleOpenAddVaultModal, moveVault, fieldType, isFull }) => {
    return (
      <>
      {isFull ? <span style={{color: "red"}}>This field is full</span> 
      : <div className="add-vault-button" onClick={() => {!vault ? handleOpenAddVaultModal(position) : moveVault(vault,position)}}>
        <i className="fa-solid fa-plus" />
        <span>{fieldType === "vault" ? " Add Vault" : " Add Couchbox"}</span>
      </div>
      }
      </>
    );
  };
  
  export default AddVaultButton;