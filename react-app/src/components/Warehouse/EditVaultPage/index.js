import React, { useState, useEffect } from 'react';
import './EditVaultPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { editVaultThunk } from '../../../store/vault';
import { updateCustomerNameThunk } from '../../../store/customer';
import { deleteVaultThunk } from '../../../store/vault';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { getAllVaultAttachmentsThunk, deleteAttachmentThunk } from '../../../store/attachment';
import DeleteAttachmentConfirmationModal from './DeleteAttachmentConfirmationModal';


const EditVaultPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { vaultId } = useParams();
  const vault = useSelector((state) => state.vault[vaultId]);
  const customer = useSelector((state) => state.customer[vault?.customer_id])
  const order = useSelector((state) => state.order)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newAttachments, setNewAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [isDeleteAttachmentModalOpen, setIsDeleteAttachmentModalOpen] = useState(false);
  const [reload, setReload] = useState(false)
  const [customerName, setCustomerName] = useState(customer?.name)
  const [vaultName, setVaultName] = useState(vault?.name)
  const [orderNumber, setOrderNumber] = useState(order[vault?.order_id]?.name)


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllVaultAttachmentsThunk(vaultId));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, vaultId, reload === true]);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = {
      customer_name: customerName,
      name: vaultName,
      order_number: orderNumber,
      new_attachments: newAttachments
    }

    const vaultData = new FormData
    vaultData.append("customer_name", formData.customer_name)
    vaultData.append("vault_id", formData.vault_id)
    vaultData.append("order_number", formData.order_number)

    formData.new_attachments.forEach((attachment, index) => {
      vaultData.append(`attachment${index}`, attachment)
    })
      
    try {
      await dispatch(updateCustomerNameThunk(vault.customer.id, formData.customer_name));
      await dispatch(editVaultThunk(vault.id, vaultData));
      history.push('/');
    } catch (error) {
      console.error('Error saving vault:', error);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteVaultThunk(vault.id));
    await setIsDeleteModalOpen(false);
    history.push(`/warehouse/${vault.warehouseId}`);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAttachment = (attachment) => {
    setSelectedAttachment(attachment);
    setIsDeleteAttachmentModalOpen(true);
  };

  const confirmDeleteAttachment = async () => {
    const attachmentData = new FormData
      attachmentData.append("attachment_id", selectedAttachment.id)
      attachmentData.append("attachment_to_delete", selectedAttachment.unique_name)

    await dispatch(deleteAttachmentThunk(vault.id, attachmentData))

    setReload(true)
    setIsDeleteAttachmentModalOpen(false);
  };
  

  const closeDeleteAttachmentModal = () => {
    setSelectedAttachment(null);
    setIsDeleteAttachmentModalOpen(false);
  };

  return (
    <div className="edit-vault-page-container">
      <div className="edit-vault-page">
        <div className="page-header">
          <h2>Edit Vault</h2>
        </div>
        <div className="edit-page-content">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSave} className="edit-vault-form" enctype="multipart/form-data">
              <div className="form-group">
                <label htmlFor="customer_name">Customer Name</label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={customerName}
                  onChange={(e) => {setCustomerName(e.target.value)}}
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
                  value={vaultName}
                  onChange={(e) => setVaultName(e.target.value)}
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
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Attachment</label>
                <input
                    type="file"
                    onChange={(e) => setNewAttachments([...newAttachments, e.target.files[0]])}
                />
              </div>

              <div className="form-group">
                <strong>Attachments</strong>
                <div className="attachments" >
                {vault && vault.attachments.map((attachment) => (
                  <div className='attachment' key={attachment.id} style={{display: "flex", alignItems: "center", gap: "3px"}}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                      file_present
                    </span>
                    <small>{attachment.file_name}</small>
                    <span className="material-symbols-outlined cross" onClick={() => handleDeleteAttachment(attachment)}>
                      close
                    </span>
                  </div>
                ))}
                </div>
                <div className='new-attachments'>
                {newAttachments.map((attachment) => (
                  <div className='attachment' key={attachment.id} style={{display: "flex", alignItems: "center", gap: "3px"}}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                      file_present
                    </span>
                    <small>{attachment.name}</small>
                  </div>
                ))}
                </div>
              </div>

              <div className="form-buttons">
                <Button onClick={handleDelete} color="error" variant="outlined">
                  DELETE
                </Button>
                <Button className="save-button" type="submit">
                  Save
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
      <DeleteAttachmentConfirmationModal
        isOpen={isDeleteAttachmentModalOpen}
        onClose={closeDeleteAttachmentModal}
        onDelete={confirmDeleteAttachment}
        attachment={selectedAttachment}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={confirmDelete}
        vault={vault}
      />
    </div>
  );
};

export default EditVaultPage;
