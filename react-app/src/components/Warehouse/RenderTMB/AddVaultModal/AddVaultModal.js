import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomersThunk, addCustomerThunk } from '../../../../store/customer';
import { addVaultThunk } from '../../../../store/vault';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormGroup, FormLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import "./AddVaultModal.css"
import MiniWareHouse from './MiniWareHouse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, FormControlLabel, Switch } from '@mui/material';
import { Form } from 'react-bootstrap';

function AddNoteModal({ open, onClose, onAddNote, note }) {
    const [noteText, setNoteText] = useState(note); // Initialize noteText with the note prop

    const handleAddNote = () => {
        onAddNote(noteText);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your note here.
                </DialogContentText>
                <textarea
                    rows="4"
                    cols="50"
                    value={noteText} // Set the default value to the note prop
                    onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddNote}>Add Note</Button>
            </DialogActions>
        </Dialog>
    );

}

export default function AddVaultModal({ onClose, warehouseId, position } ) {
    const dispatch = useDispatch();
    const history = useNavigate();
 
    const customersObj = useSelector((state) => state.customer);
    const customers = Object.values(customersObj);
    const vaultObj = useSelector((state) => state.vault.vaults);
    const field = useSelector((state) => state.field.selectedField);
    const selectedFieldId = (field ? field.id : null);
    const warehouse = useSelector(state => state.warehouse[warehouseId])
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customer_name, setCustomerName] = useState('');
    const [vault_id, setVaultId] = useState('');
    const [order_number, setOrderNumber] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [suggestedCustomers, setSuggestedCustomers] = useState([]);
    const [vaultType, setVaultType] = useState('S');
    const [errors, setErrors] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [note, setNote] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);

    const handleDocumentClick = (e) => {
        const isClickInsideCustomerBox = e.target.closest('.customer-input-container');
        if (!isClickInsideCustomerBox) {
            setSuggestedCustomers([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        function updateMaxHeight() {
            const windowHeight = window.innerHeight;
            const calculatedMaxHeight = windowHeight * 0.9;
            setMaxHeight(calculatedMaxHeight);
        }

        window.addEventListener("resize", updateMaxHeight);
        updateMaxHeight();

        return () => {
            window.removeEventListener("resize", updateMaxHeight);
        };
    }, []);

    useEffect(() => {
        dispatch(getAllCustomersThunk());
    }, [dispatch]);

    const handleCustomerNameChange = (e) => {
        const enteredName = e.target.value.toUpperCase();
        setCustomerName(enteredName);

        if (enteredName) {
            const filteredCustomers = customers?.filter(
                (customer) =>
                    customer?.name?.toLowerCase().includes(enteredName.toLowerCase())
            );
            setSuggestedCustomers(filteredCustomers);
        } else {
            setSuggestedCustomers([]);
        }
    };

    const handleSuggestedCustomerClick = (customer) => {
        setCustomerName(customer.name);
        setSuggestedCustomers([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const lowercaseCustomerName = customer_name.toLowerCase();
            let newCustomer;
            const search = customers.find(
                (customer) => customer.name.toLowerCase() === lowercaseCustomerName
            );
            if (!search) {
                const customerData = {
                    name: customer_name,
                };
                newCustomer = await dispatch(addCustomerThunk(customerData));
            }

            const doesVaultNumberAlreadyExists = (vaultNumber) => {
                if (vaultObj && vaultObj.vaults) {
                    return vaultObj.vaults.some((vault) => vault.vault_id === vaultNumber);
                }
                return false;
            };

            const vaultNumberExists = doesVaultNumberAlreadyExists(vault_id);

            if (vaultNumberExists) {
                console.log(`Vault number ${vault_id} already exists.`);
                setErrors({ vault_id: `Vault number ${vault_id} already exists.` });
                setIsSubmitting(false);
                return;
            } else {
                console.log(`Vault number ${vault_id} is unique.`);
            }

            const vaultData = new FormData();
            vaultData.append("customer_name", customer_name);
            vaultData.append("customer", newCustomer);
            vaultData.append("field_id", selectedFieldId);
            vaultData.append("position", position);
            vaultData.append("type", field.type === "vault" ? vaultType : "couchbox");
            vaultData.append("vault_id", field.type === "vault" ? vault_id : null);
            vaultData.append("order_number", field.type === "vault" ? order_number : null);
            vaultData.append("attachment", attachment);
            vaultData.append("warehouse_id", warehouseId);
            vaultData.append("note", note);
            vaultData.append('isEmpty', isEmpty); // Include toggle state in the form data

            const newVault = await dispatch(addVaultThunk(vaultData));

            history(`/${warehouse.companyName.toLowerCase()}/warehouse/${warehouseId}`);
            setIsSubmitting(false);
            window.location.reload();
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setIsSubmitting(false);
        }
    };

    const handleVaultIdChange = (e) => {
        const enteredVaultId = e.target.value;
        setVaultId(enteredVaultId);
        setErrors({});
    };

    const handleAddNote = (noteText) => {
        setNote(noteText);
    };

    return (
        <div className='add-vault-wrapper'>
            <Box className="add-vault-container" style={{ maxHeight: `${maxHeight}px` }}>
                <div className="close-icon-container">
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="close"
                        onClick={() => onClose()}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <form className="add-vault-form" onSubmit={handleSubmit} encType="multipart/form-data">

                <div style={{marginBottom: "1em"}}>
                    <h5 id="modal-modal-title">{field.type === "vault" ? "Add Vault" : "Add Couchbox"}</h5>
                    <div style={{display: "flex", width: "30%", alignItems: "center"}}>
                    <div className="vault-info">
                        <div>Field: <span>{selectedFieldId}</span></div>
                        <div>Position: <span>{position}</span></div>
                    </div>
                    <FormGroup>
                    <FormLabel>Empty</FormLabel>
                                <Form.Check
                                    type="checkbox"
                                    id="full-empty-switch"
                                    // label={isFull ? "Full" : "Empty"}
                                    checked={isEmpty}
                                    onChange={() => setIsEmpty(!isEmpty)}
                                />
                    </FormGroup> 
                    </div>
                </div>

                    <div className='add-vault-form-input'>
                        <div style={{ display: "flex", gap: "1em", alignItems: "baseline", alignContent: "baseline", justifyContent: "space-between", marginBottom: "1em" }}>
                            <FormGroup style={{ width: "50%" }}>
                                <div className="customer-input-container">
                                    <FormLabel>Customer Name</FormLabel>
                                    <input
                                        type="text"
                                        value={customer_name.toUpperCase()}
                                        onChange={handleCustomerNameChange}
                                        required
                                    />
                                    {customer_name && (
                                        <div className="suggested-customers-container">
                                            <Paper elevation={3}>
                                                <ul className="suggested-customers-list">
                                                    {suggestedCustomers.map((customer) => (
                                                        <li
                                                            key={customer.id}
                                                            onClick={() => handleSuggestedCustomerClick(customer)}
                                                        >
                                                            {customer.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Paper>
                                        </div>
                                    )}
                                </div>
                            </FormGroup>
                            <FormGroup style={{ alignSelf: "center" }}>
                                <FormLabel style={{ marginBottom: "0.6em" }}>Type</FormLabel>
                                <select
                                    className="form-select form-select-lg"
                                    style={{ fontSize: "1em" }}
                                    value={vaultType}
                                    onChange={(e) => setVaultType(e.target.value)}
                                >
                                    <option value="S">Standard</option>
                                    <option value="T">Tall</option>
                                </select>
                            </FormGroup>                           
                            <FormGroup className="vault-order-number-item">
                                <FormLabel>Attachment</FormLabel>
                                <input
                                    type="file"
                                    onChange={(e) => setAttachment(e.target.files[0])}
                                />
                            </FormGroup>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "1em", alignContent: "center", alignItems: "center" }}>
                            <FormGroup className="vault-order-number-item" style={{ width: "45%" }}>
                                <FormLabel>Order#</FormLabel>
                                <input
                                    type="text"
                                    value={order_number}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            {field.type === "vault" && (
                                <FormGroup className="vault-order-number-item" style={{ width: "45%" }}>
                                    <FormLabel>Vault#</FormLabel>
                                    <input
                                        type="text"
                                        value={vault_id}
                                        onChange={(e) => handleVaultIdChange(e)}
                                        required
                                    />
                                    {errors.vault_id && (
                                        <div style={{ color: "red", marginTop: "-0.5em" }}>
                                            {errors.vault_id}
                                        </div>
                                    )}
                                </FormGroup>
                            )}
                            <FormGroup style={{ alignSelf: "flex-end" }}>
                                <Button 
                                    variant="outlined" 
                                    style={{ display: "flex", flexDirection: "column" }}
                                    onClick={() => setIsAddNoteModalOpen(true)}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: "1.5em" }}>
                                        edit_note
                                    </span>
                                    <span style={{ fontSize: "0.5em" }}>Add Note</span>
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                    <MiniWareHouse selectedFieldId={selectedFieldId} warehouseId={warehouseId} />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </Box>
            {isAddNoteModalOpen && (
                <AddNoteModal 
                    open={isAddNoteModalOpen} 
                    onClose={() => setIsAddNoteModalOpen(false)}
                    onAddNote={handleAddNote}
                    note={note} // Pass the note state variable as a prop
                />
            )}
        </div>
    );
}
