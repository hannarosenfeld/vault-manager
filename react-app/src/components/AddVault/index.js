import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVaultThunk } from '../../store/vault';
import './AddVault.css';

import { getAllVaultsThunk } from '../../store/vault';
import { getAllRowsThunk } from "../../store/rows";

// import Row from './Row';



function MiniWareHouse() {
        const dispatch = useDispatch();
        const rows = useSelector(state => state.row.rows)
        const rowsArr = Object.values(rows)
        const [selectedField, setSelectedField] = useState(null); // Add this state
        const [selectedRow, setSelectedRow] = useState(null)
        const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);
        let [top, setTop] = useState(null);
        let [middle, setMiddle] = useState(null);
        let [bottom, setBottom] = useState(null);
    
        
        useEffect(() => {
            dispatch(getAllRowsThunk())
        }, [])
    
        const handleFieldClick = (field, row, index) => {
            setTop(null)
            setMiddle(null)
            setBottom(null)
            
            setSelectedField(field);
            setSelectedRow(row.id);
            setSelectedFieldIndex(index + 1);
    
            if (field.vaults.length > 0) {
                setTop(field.vaults.find(vault => vault.position === "TOP"))
                setMiddle(field.vaults.find(vault => vault.position === "MIDDLE"))
                setBottom(field.vaults.find(vault => vault.position === "BOTTOM"))
            }
    
            console.log("🏩", top, middle, bottom);
        };
    
        return (
            <div className="warehouse-wrapper" style={{height: "100%"}}>
                <div className="warehouse" style={{height: "100%"}}>
                {rowsArr.map((row) => (
                     <div className="row">
                     {/* <div className="row-id">{row.id}</div> */}
                     <div className="fields">
                     {row.fields.map((field, index) => (
                     <div
                        className="field"
                        style={{ backgroundColor: `${field.vaults.length ? "var(--red)" : "var(--lightgrey)"}` }}
                        onClick={() => handleFieldClick(field, row, index)} // Call the click handler here
                    >
                        <div className="field-number">{row.id}{index + 1}</div>
                    </div>
                    ))}
                     </div>
                 </div>
                ))}
                </div>
            </div>
        )
    }


export default function AddVault() {
    const dispatch = useDispatch();
    const [customer_name, setCustomerName] = useState('');
    const [row_id, setRowId] = useState('A');
    const [field_id, setFieldId] = useState('1');
    const [position, setPosition] = useState('');
    const [vault_id, setVaultId] = useState('');
    const [isSectionOpen, setIsSectionOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const vaultData = {
            customer_name: customer_name,
            field_id: `${row_id}${field_id}`, // Combine row id and field id
            position: position,
            vault_id: vault_id,
        };

        const response = await dispatch(addVaultThunk(vaultData));

        if (response) {
            // Vault added successfully, handle the success
        } else {
            // Error adding vault, handle the error
        }
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
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <div className="row-field-id">
                    <div className='row-field-id-input'>
                    <label>Field ID</label>
                    <select
                        value={row_id}
                        onChange={(e) => setRowId(e.target.value)}
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                    </select>
                    <select
                        value={field_id}
                        onChange={(e) => setFieldId(e.target.value)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    </div>
                    <button className="expand-button" onClick={toggleSection} style={{width: "60px"}}>
                        <i className="fas fa-warehouse"></i>
                    </button>
                </div>               
                {isSectionOpen && (
                    <div className="expanded-section">
                        <MiniWareHouse/>
                    </div>
                    )}                        
                <label>Position</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <label>Vault ID</label>
                <input
                    type="text"
                    value={vault_id}
                    onChange={(e) => setVaultId(e.target.value)}
                />
                
                <button type="submit">Add Vault</button>
            </form>
            </div>
        </div>
    );
}
