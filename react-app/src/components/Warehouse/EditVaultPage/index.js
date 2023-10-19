import React, { useState, useEffect } from 'react';
import './EditVaultPage.css'; // Make sure to include your CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { editVaultThunk, getVaultThunk } from '../../../store/vault';
import { updateCustomerNameThunk } from '../../../store/customer';
import { deleteVaultThunk, getVaultAction } from '../../../store/vault';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const EditVaultPage = ({ onEditSubmit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { vaultId } = useParams();
  const vaultObj = useSelector((state) => state.vault.currentVault);
  const vaultIdNumber = parseInt(vaultId);
  const vault = Object.values(vaultObj);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for managing modal visibility
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    customer_name: '',
    vault_id: '',
    order_number: '',
  });

  useEffect(() => {
    // Fetch the vault data
    dispatch(getVaultThunk(vaultId))
      .then((vaultData) => {
        // Set the formData and mark loading as false
        setFormData({
          customer_name: vaultData?.customer?.name || '',
          vault_id: vaultData?.vault_id || '',
          order_number: vaultData?.order_number || '',
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vault:', error);
        setIsLoading(false); // Handle errors by setting isLoading to false
      });
  }, [dispatch, vaultId]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateCustomerNameThunk(vaultObj.customer.id, formData.customer_name));
      const editedVault = await dispatch(editVaultThunk(vaultObj.id, formData));
      history.push("/");
    } catch (error) {
      console.error('Error saving vault:', error);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteVaultThunk(vaultObj.id));
    await setIsDeleteModalOpen(false);
    history.push("/");
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
        {isLoading ? (
          // Display a loading indicator here
          <p>Loading...</p>
        ) : (
          // Render the form when data is available
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
              ></input>
            </div>
            <div className="form-buttons">
              <Button onClick={handleDelete} color="error" variant="outlined">DELETE</Button>
              <button className="save-button" type="submit">
                Save
              </button>
            </div>
          </form>
        )}          
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
