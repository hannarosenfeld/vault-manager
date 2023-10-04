import React, { useState, useEffect } from 'react';
import './EditVaultModal.css';
import { useDispatch } from 'react-redux';
import { editVaultThunk } from '../../../store/vault';
import { updateCustomerNameThunk } from '../../../store/customer';


const EditVaultModal = ({ vault, onClose, onEditSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customer_name: vault.customer.name || '',
    vault_id: vault.vault_id || '',
    order_number: vault.order_number || ''
  });

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(updateCustomerNameThunk(vault.customer.id, formData.customer_name))
      const editedVault = await dispatch(editVaultThunk(vault.id, formData));
      onEditSubmit(editedVault);
      onClose();
    } catch (error) {
      console.error('Error saving vault:', error);
    }
  };

  useEffect(() => {
    setFormData({
      customer_name: vault.customer.name || '',
      vault_id: vault.vault_id || '',
      order_number: vault.order_number || ''      
    });
  }, [vault]);

  return (
    <div className="edit-vault-modal-container">
      <div className="edit-vault-modal">
        <div className="modal-header">
          <h2>Edit Vault</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="edit-modal-content">
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="customer_name">Customer Name</label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="vault_id">Vault ID</label>
              <input
                type="text"
                id="vault_id"
                name="vault_id"
                value={formData.vault_id}
                onChange={(e) =>
                  setFormData({ ...formData, vault_id: e.target.value })
                }
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="order_number">Vault ID</label>
              <input
                type="text"
                id="order_number"
                name="order_number"
                value={formData.order_number}
                onChange={(e) =>
                  setFormData({ ...formData, order_number: e.target.value })
                }
                required
                className="form-control"
              />
            </div>
            <button className="save-button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVaultModal;
