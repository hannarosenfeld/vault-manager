import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehouseInfoThunk } from '../../../store/warehouse';
import { getAllCustomersThunk, addCustomerThunk } from '../../../store/customer';
import { addVaultThunk, getAllVaultsThunk } from '../../../store/vault';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormGroup, FormLabel } from '@mui/material';
import "./AddVaultModal.css"
import MiniWareHouse from './MiniWareHouse';
import { getAllFieldsThunk, getFieldThunk } from '../../../store/field';

export default function AddVaultModal({ onClose, selectedField, tmb, updateSelectedFieldVaults, warehouseId }) {
    const dispatch = useDispatch();
    const customersObj = useSelector(state => state.customer.customers)
    const vaultObj = useSelector(state => state.vault.vaults);
    const field = useSelector(state => state.field.currentField)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [customer_name, setCustomerName] = useState('');
    const [vault_id, setVaultId] = useState('');
    const [order_number, setOrderNumber] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [suggestedCustomers, setSuggestedCustomers] = useState([]);
    const [vaultType, setVaultType] = useState('S');
    const [errors, setErrors] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);

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
        if (customersObj && customersObj.customers) {
            setCustomers(Object.values(customersObj.customers));
        }
    }, [customersObj]);

    useEffect(() => {
        dispatch(getAllCustomersThunk());
        dispatch(getAllVaultsThunk());
        dispatch(getAllFieldsThunk());
        dispatch(getFieldThunk(selectedField.id));
    }, [dispatch]);

    useEffect(() => {
        const filteredCustomers = customers?.filter(
            (customer) =>
                customer?.name?.toLowerCase().includes(customer_name.toLowerCase())
        );
        setSuggestedCustomers(filteredCustomers);
    }, [customers, customer_name]);

    const handleCustomerNameChange = (e) => {
        const enteredName = e.target.value;
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
                return
            } else {
                console.log(`Vault number ${vault_id} is unique.`);
            }

            const vaultData = new FormData
            vaultData.append("customer_name", customer_name)
            vaultData.append("customer", newCustomer)
            vaultData.append("field_id", selectedField.id)
            // vaultData.append("field_name", selectedField.field_id)
            vaultData.append("position", tmb)
            vaultData.append("type", selectedField.type === "vault" ? vaultType : "couchbox")
            vaultData.append("vault_id", selectedField.type === "vault" ? vault_id : null)
            vaultData.append("order_number", selectedField.type === "vault" ? order_number : null)
            vaultData.append("attachment", attachment)
            vaultData.append("warehouse_id", warehouseId)

            const newVault = await dispatch(addVaultThunk(vaultData));

            if (newVault) {
                const updateSelectedFieldVaultsThing = await updateSelectedFieldVaults(newVault);
            } else {
                console.error('updatedVault is null or undefined');
            }

            const getWarehouseInfoDispatch = await dispatch(getWarehouseInfoThunk(1));

            onClose(newVault);
            setIsSubmitting(false);
            window.location.reload(true);
            window.location.reload(false);
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

    return (
        <div className='add-vault-wrapper'>
            <Box className="add-vault-container" style={{ maxHeight: `${maxHeight}px` }}>
                <div className="close-icon-container">
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="close"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div style={{ marginBottom: "5px" }}>
                    <h4 id="modal-modal-title">{selectedField.type === "vault" ? "Add Vault" : "Add Couchbox"}</h4>
                    <div className="vault-info">
                        <div>Field: <span>{selectedField.field_id}</span></div>
                        <div>Position: <span>{tmb}</span></div>
                    </div>
                </div>
                <form className="add-vault-form" onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div style={{ display: "flex", gap: "0.2em", justifyContent: "space-between", alignItems: "baseline", alignContent: "baseline" }}>
                        <FormGroup style={{ width: "75%" }}>
                            <div className="customer-input-container">
                                <FormLabel>Customer Name</FormLabel>
                                <input
                                    type="text"
                                    value={customer_name}
                                    onChange={handleCustomerNameChange

}
                                    required
                                />
                                {suggestedCustomers?.length > 0 && customer_name && (
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
                        <FormGroup className="vault-order-number-item">
                            <FormLabel>Attachment</FormLabel>
                            <input
                                type="file"
                                onChange={(e) => setAttachment(e.target.files[0])}
                            />
                        </FormGroup>
                    </div>

                    <div className="vault-order-number" style={{ gap: "1em" }}>
                    {selectedField.type === "vault" && (
                        <div style={{width: "100%", display: "flex", gap: "0.5em", justifyContent: "space-between"}}>
                        <FormGroup className="vault-order-number-item">
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

                        <FormGroup className="vault-order-number-item">
                            <FormLabel>Order#</FormLabel>
                            <input
                            type="text"
                            value={order_number}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            required
                            />
                        </FormGroup>

                        <div style={{width: "20%"}}>
                        <FormLabel>Vault Type</FormLabel>
                        <select
                            className="form-select form-select-lg"
                            style={{ fontSize: "1em", marginLeft: "-0.5em", marginTop: "0.4em" }}
                            aria-aria-label=".form-select-lg example"
                            value={vaultType}
                            onChange={(e) => setVaultType(e.target.value)}
                        >
                            <option value="S">Standard</option>
                            {field?.vaults?.length === 2 &&
                            field.vaults[0].type !== "S" &&
                            field.vaults[1].type !== "S" ? null : (
                            <option value="T">Tall</option>
                            )}
                        </select>
                        </div>
                        </div>
                    )}
                    </div>
                    <div style={{ height: "63%", marginTop: "1em" }}>
                        <MiniWareHouse selectedField={selectedField} warehouseId={warehouseId} />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </Box>
        </div>
    )
}


