import React, { useState, useEffect } from 'react';
import './EditVaultPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { deleteVaultThunk, editVaultThunk, getAllFieldVaultsThunk } from '../../../../store/vault';
import { updateCustomerNameThunk } from '../../../../store/customer';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { getAllVaultAttachmentsThunk, deleteAttachmentThunk } from '../../../../store/attachment';
import DeleteAttachmentConfirmationModal from './DeleteAttachmentConfirmationModal';
import { NavLink } from 'react-router-dom';

const EditVaultPage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { warehouseId, fieldId, vaultId } = useParams();
  const warehouse = useSelector((state) => state.warehouse[warehouseId]);
  const vault = useSelector((state) => state.vault[vaultId]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newAttachments, setNewAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [isDeleteAttachmentModalOpen, setIsDeleteAttachmentModalOpen] = useState(false);
  const [reload, setReload] = useState(false)
  const [customerName, setCustomerName] = useState()
  const [vaultName, setVaultName] = useState()
  const [orderNumber, setOrderNumber] = useState()
  const companyName = warehouse.companyName.toLowerCase();

  useEffect(() => {
    if (!vault) {
    const fetchData = async () => {
      try {
        await dispatch(getAllVaultAttachmentsThunk(vaultId));
        await dispatch(getAllFieldVaultsThunk(fieldId))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    }
  }, [dispatch, vaultId, reload === true]);

  useEffect(() => {
    if (vault) {
      setCustomerName(vault.customer_name)
      setVaultName(vault.name)
      setOrderNumber(vault.order_name)
      setIsLoading(false);
    } else setIsLoading(true);
  }, [dispatch, vault])

  const handleSave = async (e) => {
    e.preventDefault();
    const vaultData = new FormData
    vaultData.append("customer_name", customerName)
    vaultData.append("name", vaultName)
    vaultData.append("order_number", orderNumber)

    newAttachments.forEach((attachment, index) => {
      vaultData.append(`attachment${index}`, attachment)
    })
    try {
      await dispatch(updateCustomerNameThunk(vault.customer_id, customerName));
      await dispatch(editVaultThunk(vault.id, vaultData));

      history.push(`/${companyName}/warehouse/${warehouseId}`);
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
    history.push(`/${companyName}/warehouse/${warehouseId}`);
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
        <div style={{display: "flex", width: "100%"}}>
          <NavLink style={{margin: "auto 0", fontSize: "1.3em", fontWeight: "bold"}} to={`/${warehouse.companyName.toLowerCase()}/warehouse/${warehouseId}`}>
        <span class="material-symbols-outlined" style={{margin: "auto 0", fontSize: "1.3em", fontWeight: "bold"}}>
          arrow_back
        </span>
        </NavLink>
          <h4 style={{alignSelf: "center", margin: "0 auto"}}>Edit Vault</h4>
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
                  onChange={(e) => {setCustomerName(e.target.value.toUpperCase())}}
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
