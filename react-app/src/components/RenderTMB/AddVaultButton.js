const AddVaultButton = ({ position, handleOpenModal }) => {
    return (
      <div className="add-vault-button" onClick={() => handleOpenModal(position)}>
        <i className="fa-solid fa-plus" />
        <span> Add Vault</span>
      </div>
    );
  };
  
  export default AddVaultButton;