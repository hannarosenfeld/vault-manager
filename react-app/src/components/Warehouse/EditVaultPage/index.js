import React, { useState, useEffect } from 'react';
import './EditVaultPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { editVaultThunk, getVaultThunk } from '../../../store/vault';
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
  const vaultObj = useSelector((state) => state.vault.currentVault);
  const attachmentsObj = useSelector((state) => state.attachment.vaultAttachments);
  const attachments = Object.values(attachmentsObj);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newAttachments, setNewAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [isDeleteAttachmentModalOpen, setIsDeleteAttachmentModalOpen] = useState(false);
  const [reload, setReload] = useState(false)

  const [formData, setFormData] = useState({
    customer_name: null,
    vault_id: null,
    order_number: null,
    new_attachments: null,
    attachment_to_delete: null
  });

  useEffect(() => {
    if (vaultObj && vaultObj.customer) {
      setFormData({
        customer_name: vaultObj.customer.name,
        vault_id: vaultObj.vault_id,
        order_number: vaultObj.order_number,
        new_attachments : newAttachments,
        attachment_to_delete: selectedAttachment,
      })
      setIsLoading(false)
    } else setIsLoading(true)
  }, [vaultObj, newAttachments, selectedAttachment])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getVaultThunk(vaultId));
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

    const vaultData = new FormData
      vaultData.append("customer_name", formData.customer_name)
      vaultData.append("vault_id", formData.vault_id)
      vaultData.append("order_number", formData.order_number)

      formData.new_attachments.forEach((attachment, index) => {
        vaultData.append(`attachment${index}`, attachment)
      })
      
    try {
      await dispatch(updateCustomerNameThunk(vaultObj.customer.id, formData.customer_name));
      await dispatch(editVaultThunk(vaultObj.id, vaultData));
      history.push('/');
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
    history.push('/');
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
      attachmentData.append("attachment_id", formData.attachment_to_delete.id)
      attachmentData.append("attachment_to_delete", formData.attachment_to_delete.unique_name)

    await dispatch(deleteAttachmentThunk(vaultObj.id, attachmentData))

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
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, vault_id: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, order_number: e.target.value })}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Attachment</label>
                <input
                    type="file"
                    onChange={(e) => setNewAttachments([...newAttachments,e.target.files[0]])}
                />
              </div>

              <div className="form-group">
                <strong>Attachments</strong>
                <div className="attachments" >
                {attachments.map((attachment) => (
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
        vault={vaultObj}
      />
    </div>
  );
};

export default EditVaultPage;
