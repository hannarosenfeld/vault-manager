import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addVaultThunk, getAllVaultsThunk } from '../../../store/vault';
import { getAllCustomersThunk, addCustomerThunk } from '../../../store/customer'
import { getAllRowsThunk } from '../../../store/rows';
import { getAllFieldsThunk } from '../../../store/field';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormGroup, FormLabel, keyframes } from '@mui/material';


import "./AddVaultModal.css"
import MiniWareHouse from './MiniWareHouse';


export default function AddVaultModal({ onClose, selectedField, tmb}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const customersObj = useSelector(state => state.customer.customers)
    const [customers, setCustomers] = useState([]);
    const [customer_name, setCustomerName] = useState('');
    const [position, setPosition] = useState('');
    const [vault_id, setVaultId] = useState('');
    const [order_number, setOrderNumber] = useState('');
    const [suggestedCustomers, setSuggestedCustomers] = useState([]);
    let newCustomer;

    useEffect(() => {
        if (customersObj && customersObj.customers) {
            setCustomers(Object.values(customersObj.customers));
        }
    }, [customersObj]);

    useEffect(() => {
        dispatch(getAllCustomersThunk())
    }, [dispatch]);
    
    useEffect(() => {
        const filteredCustomers = customers?.filter(
            (customer) =>
                customer?.name?.toLowerCase().includes(customer_name.toLowerCase())
        );
        setSuggestedCustomers(filteredCustomers);
    }, [customers]);

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

        const lowercaseCustomerName = customer_name.toLowerCase();
        const search = await customers.find(customer => customer.name.toLowerCase() === lowercaseCustomerName);

        console.log("🪞", tmb)
        if (search === undefined) {
            const customerData = {
                name: customer_name
            }
            newCustomer = await dispatch(addCustomerThunk(customerData))
        }
        
        console.log("🌓 customer name", customer_name)
        const vaultData = {
            customer_name: customer_name,
            customer: newCustomer,
            field_id: selectedField.id,
            field_name: selectedField.field_id,
            position: tmb,
            vault_id: vault_id,
        };

        const newVault = await dispatch(addVaultThunk(vaultData));
        await dispatch(getAllRowsThunk());
        await dispatch(getAllVaultsThunk());
        await dispatch(getAllFieldsThunk());
    
        onClose(newVault);
        
    };

    return (
        <Box className="add-vault-container">
            <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={onClose} 
                sx={{
                    position: 'absolute',
                    right: 15,
                    top: 8,
                }}
            >
                <CloseIcon />
            </IconButton>
            <div style={{marginBottom: "10px"}}>
            <Typography style={{marginBottom: "5px"}} id="modal-modal-title" variant="h6" component="h2">Add Vault</Typography>
                <div className="vault-info">
                    <div>Field: <span>{selectedField.field_id}</span></div>
                    <div>Position: <span>{tmb}</span></div>
                </div>
            </div>
            <form className="add-vault-form" onSubmit={handleSubmit}>
                <FormGroup>
                <div className="customer-input-container">
                    <FormLabel>Customer Name</FormLabel>
                    <input
                        type="text"
                        value={customer_name}
                        onChange={handleCustomerNameChange}
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
                <div className="vault-order-number" >
                <FormGroup className="vault-order-number-item">
                    <FormLabel>Vault#</FormLabel>
                    <input
                        type="text"
                        value={vault_id}
                        onChange={(e) => setVaultId(e.target.value)}
                    />  
                </FormGroup>
                <FormGroup className="vault-order-number-item">
                    <FormLabel>Order#</FormLabel>
                    <input
                        type="text"
                        value={order_number}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />  
                </FormGroup>
                </div>
                <div style={{height: "63%", marginBottom: "1em"}}>
                    <MiniWareHouse selectedField={selectedField}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </Box>
    )
}