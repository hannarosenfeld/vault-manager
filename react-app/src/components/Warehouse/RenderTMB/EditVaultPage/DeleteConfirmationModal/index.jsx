import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, vault }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="delete-confirmation-modal">
      <DialogTitle id="delete-confirmation-modal">Confirm Deletion</DialogTitle>
      <DialogContent>
        <p>
          Are you sure you want to delete Vault <b>#{vault?.vault_id}</b> from Order <b>#{vault?.order_number}</b>?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
