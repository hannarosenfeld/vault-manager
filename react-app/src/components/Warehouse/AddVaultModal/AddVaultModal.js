import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addVaultToWarehouseThunk, getAllWarehouseVaultsThunk, getWarehouseInfoThunk} from '../../../store/warehouse';
import { getAllCustomersThunk, addCustomerThunk } from '../../../store/customer'
import { addVaultThunk, getAllVaultsThunk } from '../../../store/vault';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormGroup, FormLabel } from '@mui/material';
import "./AddVaultModal.css"
import MiniWareHouse from './MiniWareHouse';


export default function AddVaultModal({ onClose, selectedField, tmb, updateTMB, updateSelectedFieldVaults}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const customersObj = useSelector(state => state.customer.customers)
    const vaultObj = useSelector(state => state.vault.vaults);

    const [customers, setCustomers] = useState([]);
    const [customer_name, setCustomerName] = useState('');
    const [vault_id, setVaultId] = useState('');
    const [order_number, setOrderNumber] = useState('');
    const [suggestedCustomers, setSuggestedCustomers] = useState([]);
    const [vaultType, setVaultType] = useState('S');
    const [errors, setErrors] = useState([]);

    console.log("🌷 in AddVaultModal.")
    console.log("🌷 selectedField: ", selectedField)
    console.log("🌷 position: ", tmb)


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
              console.log(vaultObj.vaults, vault_id)
              return vaultObj.vaults.some((vault) => vault.vault_id === vaultNumber);
            }
            return false;
          };

          const vaultNumberExists = doesVaultNumberAlreadyExists(vault_id);

          if (vaultNumberExists) {
            console.log(`Vault number ${vault_id} already exists.`);
            setErrors({ vault_id: `Vault number ${vault_id} already exists.` })
            return
          } else {
            console.log(`Vault number ${vault_id} is unique.`);
          }

          const vaultData = {
            customer_name: customer_name,
            customer: newCustomer,
            field_id: selectedField.id,
            field_name: selectedField.field_id,
            position: tmb,
            type: vaultType,
            vault_id: vault_id,
            order_number: order_number,
          };

          console.log("🧼 in AddVaultModal, handleSubmit.");
          console.log("🧼 vaultData: ", vaultData);

          const newVault = await dispatch(addVaultThunk(vaultData));
          console.log("🧼 return of dispatch(addVaultThunk(vaultData)): ", newVault);

          const updatedVault = await dispatch(addVaultToWarehouseThunk(newVault.id));
          console.log("🧼 return of dispatch(addVaultToWarehouseThunk(newVault.id)): ", updatedVault);

        // Ensure that addVaultToWarehouseThunk returns the updated vault
          if (updatedVault) {
            const updateTMBThing = await updateTMB(updatedVault);
            const updateSelectedFieldVaultsThing = await updateSelectedFieldVaults(updatedVault);
          } else {
            console.error('updatedVault is null or undefined');
          }
      
          // Step 4: Fetch other data (if needed)
          const getAllWarehouseVaultsDispatch = await dispatch(getAllWarehouseVaultsThunk());
          const getWarehouseInfoDispatch = await dispatch(getWarehouseInfoThunk());
          const getAllVaultsDispatch = await dispatch(getAllVaultsThunk());

        onClose(newVault);
        } catch (error) {
          console.error('Error in handleSubmit:', error);
        }
      };
      

    return (
        <Box className="add-vault-container">
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
            <div style={{marginBottom: "5px"}}>
            <h2 style={{marginBottom: "5px"}} id="modal-modal-title">Add Vault</h2>
                <div className="vault-info">
                    <div>Field: <span>{selectedField.field_id}</span></div>
                    <div>Position: <span>{tmb}</span></div>
                </div>
            </div>
            <form className="add-vault-form" onSubmit={handleSubmit}>
                <div style={{display: "flex", gap: "0.5em", justifyContent: "space-between"}}>
                <FormGroup style={{width: "80%"}}>
                    <div className="customer-input-container">
                        <FormLabel>Customer Name</FormLabel>
                        <input
                            type="text"
                            value={customer_name}
                            onChange={handleCustomerNameChange}
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

                <FormGroup style={{width: "20%"}}>
                    <FormLabel>Vault Type</FormLabel>
                    <select
                        style={{height: "5.5em"}}
                        value={vaultType}
                        onChange={(e) => setVaultType(e.target.value)}
                    >
                        <option value="S">Standard</option>
                        <option value="T">Tall</option>
                    </select>
                </FormGroup>
                </div>
                
                <div className="vault-order-number" >
                <FormGroup className="vault-order-number-item">
                    <FormLabel>Vault#</FormLabel>
                    <input
                        type="text"
                        value={vault_id}
                        onChange={(e) => setVaultId(e.target.value)}
                        required
                    />  
                    {errors.vault_id ? <div style={{color: "red", marginTop: "-0.5em"}}>{errors.vault_id}</div> : ''}
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
                </div>
                <div style={{height: "63%", marginBottom: "1em"}}>
                    <MiniWareHouse selectedField={selectedField}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </Box>
    )
}