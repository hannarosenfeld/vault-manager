import { Modal } from "react-bootstrap";

export default function DeleteWarehouseModal({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Warehouse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this warehouse?</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onConfirm} className="btn btn-danger">
          Yes
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}
