import React, { useState, useEffect } from 'react';
import './EditVaultPage.css'; // Make sure to include your CSS file
import { useDispatch, useSelector } from 'react-redux';
import { editVaultThunk, getVaultThunk } from '../../../store/vault';
import { updateCustomerNameThunk } from '../../../store/customer';
import { deleteVaultThunk } from '../../../store/vault';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const EditVaultPage = ({ onEditSubmit }) => {
  const dispatch = useDispatch();
  const { vaultId } = useParams();
  const vaultObj = useSelector((state) => state.vault.currentVault);
  const vaultIdNumber = parseInt(vaultId);
  const vault = Object.values(vaultObj);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for managing modal visibility

  useEffect(() => {
    dispatch(getVaultThunk(vaultIdNumber));
  }, [vaultIdNumber]);

  const [formData, setFormData] = useState({
    customer_name: vault?.customer?.name || '',
    vault_id: vault?.vault_id || '',
    order_number: vault?.order_number || ''
  });

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateCustomerNameThunk(vault.customer.id, formData.customer_name));
      const editedVault = await dispatch(editVaultThunk(vault.id, formData));

      // Handle the editedVault response as needed

    } catch (error) {
      console.error('Error saving vault:', error);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const confirmDelete = () => {
    dispatch(deleteVaultThunk(vault.id));
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
  };

  return (
    <div className="edit-vault-page-container">
      <div className="edit-vault-page">
        <div className="page-header">
          <h2>Edit Vault</h2>
        </div>
        <div className="edit-page-content">
          <form onSubmit={handleSave} className="edit-vault-form">
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
              <label htmlFor="vault_id">Vault#</label>
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
              <label htmlFor="order_number">Order#</label>
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
            <div className="form-buttons">
              <Button onClick={handleDelete} color="error" variant="outlined">DELETE</Button>
              <button className="save-button" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={confirmDelete}
        vault={vaultObj}
      />
    </div>
  );
};

export default EditVaultPage;
