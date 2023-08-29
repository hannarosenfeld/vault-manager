import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addVaultThunk } from '../../store/vault';
import { getAllCustomersThunk, addCustomerThunk } from '../../store/customer'

import { getAllRowsThunk } from "../../store/rows";

import './AddVault.css';


export default function AddVault() {
    const dispatch = useDispatch();
    const customersObj = useSelector(state => state.customer.customers)
    const customers = Object.values(customersObj?.customers);

    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [customer_name, setCustomerName] = useState('');
    const [row_id, setRowId] = useState('A');
    const [field_id, setFieldId] = useState('1');
    const [position, setPosition] = useState('');
    const [vault_id, setVaultId] = useState('');
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [suggestedCustomers, setSuggestedCustomers] = useState([]);
    let newCustomer;

    useEffect(() => {
        dispatch(getAllCustomersThunk()).then(() => setIsLoading(false)); // Mark loading as complete
    }, [dispatch]);

    // MiniWareHouse
    const rows = useSelector(state => state.row.rows)
    const rowsArr = Object.values(rows)
    const [selectedField, setSelectedField] = useState(null); // Add this state

    useEffect(() => {
        dispatch(getAllRowsThunk())
        dispatch(getAllCustomersThunk())
    }, [])

    const selectField = (field) => {
        setSelectedField(field);
        setRowId(field.row_id);
        setFieldId(field.field_id);
    };

    useEffect(() => {
        if (!isLoading && customersObj) {
            const filteredCustomers = customers?.filter(
                (customer) =>
                    customer?.name?.toLowerCase().includes(customer_name.toLowerCase())
            );
            setSuggestedCustomers(filteredCustomers);
        }
    }, [isLoading, customers, customer_name]);

    const handleCustomerNameChange = (e) => {
        const enteredName = e.target.value;
        setCustomerName(enteredName);
    };

    const handleSuggestedCustomerClick = (customer) => {
        setCustomerName(customer.name);
        setSuggestedCustomers([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const lowercaseCustomerName = customer_name.toLowerCase();
    
        // Use the converted name for comparison
        const search = await customers[0].find(customer => customer.name.toLowerCase() === lowercaseCustomerName);

        if (search === undefined) {
            const customerData = {
                name: customer_name
            }
            newCustomer = await dispatch(addCustomerThunk(customerData))
        }
        
        const vaultData = {
            customer_name: customer_name,
            customer: newCustomer,
            field_id: selectedField.id, // Combine row id and field id
            field_name: selectedField.field_id,
            position: position,
            vault_id: vault_id,
        };

        const response = await dispatch(addVaultThunk(vaultData));
    };

    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };

    return (
        <div className="add-vault-container">
            <div style={{height: "93%"}}>
            <h3>Add a New Vault</h3>
            <br/>
            <form className="add-vault-form" onSubmit={handleSubmit}>
                <label>Customer Name</label>
                <input
                type="text"
                value={customer_name}
                onChange={handleCustomerNameChange}
            />
                {suggestedCustomers.length > 0 && customer_name && (
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
            )}
                <div className="row-field-id">
                    <div className='row-field-id-input'>
                        <div>Field ID: </div>
                    </div>
                </div>               
                    <div className="expanded-section">
                        <div className="warehouse-wrapper" style={{height: "100%"}}>
                            <div className="warehouse" style={{height: "100%"}}>
                            {rowsArr.map((row) => (
                                <div key={row.id} className="row">
                                {/* <div className="row-id">{row.id}</div> */}
                                <div className="fields">
                                {row.fields.map((field, index) => (
                                    <div
                                        className="field"
                                        key={field.id}
                                        onClick={() => selectField(field)}
                                        style={{ backgroundColor: `${field.vaults.length ? "var(--red)" : "var(--lightgrey)" }`, border: `${selectedField?.field_id === field?.field_id ? "2px solid var(--blue)" : "transparent"}`}}
                                    >
                                        <div className="field-number">{field.field_id}</div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            ))}
                            </div>
                        </div>                    
                    </div>
                    <div>
                        <label>
                            Vault Id
                            <input 
                                type="text"
                                onChange={(e) => setVaultId(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="position-radio-container">
                        <div className="position-radio">
                        <div className='position-radio-button'>
                            <label>
                                <input
                                    type="radio"
                                    value="T"
                                    checked={position === "T"}
                                    onChange={() => setPosition("T")}
                                />
                                T
                            </label>
                        </div>
                        <div className='position-radio-button'>
                            <label>
                                <input
                                    type="radio"
                                    value="M"
                                    checked={position === "M"}
                                    onChange={() => setPosition("M")}
                                />
                                M
                            </label>
                        </div>
                        <div className='position-radio-button'>
                            <label>
                                <input
                                    type="radio"
                                    value="B"
                                    checked={position === "B"}
                                    onChange={() => setPosition("B")}
                                />
                                B
                            </label>
                        </div>
                        </div>
                    </div>

                
                <button type="submit">Add Vault</button>
            </form>
            </div>
        </div>
    );
}
