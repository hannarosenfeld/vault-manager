import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getAllVaultsThunk } from '../../store/vault';
import { getAllRowsThunk } from "../../store/rows";
import { getAllFieldsThunk } from "../../store/field";

import "./Warehouse.css"


export default function Warehouse () {
    const dispatch = useDispatch();
    const rows = useSelector(state => state.row.rows);
    const vaults = useSelector(state => state.vault.vaults)
    const fields = useSelector(state => state.field.fields)

    const rowsArr = Object.values(rows);
    const vaultsArr = Object.values(vaults);
    const fieldsArr = Object.values(fields);

    const [selectedField, setSelectedField] = useState(null); // Add this state
    const [selectedRow, setSelectedRow] = useState(null)
    const [selectedFieldIndex, setSelectedFieldIndex] = useState(0);
    let [top, setTop] = useState(null);
    let [middle, setMiddle] = useState(null);
    let [bottom, setBottom] = useState(null);

    useEffect(() => {
        dispatch(getAllRowsThunk());
        dispatch(getAllVaultsThunk());
        dispatch(getAllFieldsThunk());
    }, [])

    const handleFieldClick = async (field, row, index) => {
        await setSelectedField(field);
        setSelectedRow(row.id);
        setSelectedFieldIndex(index + 1);

        setTop(null)
        setMiddle(null)
        setBottom(null)
        
        if (field.vaults.length > 0) {
            setTop(field.vaults.find(vault => vault.position === "T"))
            setMiddle(field.vaults.find(vault => vault.position === "M"))
            setBottom(field.vaults.find(vault => vault.position === "B"))
        }
    };

    const AddVaultButton = () => {
        return (
        <div className="add-vault-button">
            <i class="fa-solid fa-plus"/>
            <span> Add Vault</span>
            </div>
        )
    }

    const RenderTMB = () => {
        const onlyBottom = !top && !middle && !bottom        
        const onlyMiddle = !top && !middle && bottom        
        const onlyTop = !top && middle && bottom        

        return (
            <div className="selected-field-vaults-tmb">
                <div className="top"><span>T</span> {onlyTop ? <AddVaultButton /> : top ? top.customer.name  + '  ' + top.vault_id : ""}</div>
                <div className="middle"><span>M</span> {onlyMiddle ? <AddVaultButton /> : middle ? middle.customer.name  + '  ' + middle.vault_id : ""}</div>
                <div className="bottom"><span>B</span> {onlyBottom ? <AddVaultButton /> : bottom ? bottom.customer.name  + '  ' + bottom.vault_id : ""}</div>
            </div>  
        )      
    }

    return (
        <div className="warehouse-wrapper">
            <div className="field-info">
            {selectedField ? (
                <>
                <RenderTMB />
                <div className="selected-field-id">{selectedRow + selectedFieldIndex}</div>
                </>
            ) : (
                <div>
                    Select a field to view its info
                </div>
            )}
            </div>
            <div className="warehouse">
            {rowsArr.map((row) => (
                 <div className="row">
                 <div className="fields">
                 {row.fields.map((field, index) => (
                 <div
                    className="field"
                    style={{ backgroundColor: `${field.vaults.length ? "#ea373d" : "var(--lightgrey)"}`, border: `${selectedField?.id === field?.id ? "3px solid var(--blue)" : "blue"}` }}
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