import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './DeleteAttachmentConfirmationModal.css'; // Create a separate CSS file for styling

const DeleteAttachmentConfirmationModal = ({ isOpen, onClose, onDelete, attachment }) => {
  if (!attachment) {
    return null;
  }

  const { id, file_name } = attachment;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="delete-attachment-modal">
        <h3>Delete Attachment</h3>
        <p>Are you sure you want to delete the attachment "{file_name}"?</p>
        <div className="modal-buttons">
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={() => onDelete(id)} variant="contained" color="error">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAttachmentConfirmationModal;
