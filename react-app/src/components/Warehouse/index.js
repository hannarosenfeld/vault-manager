import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getAllVaultsThunk } from '../../store/vault';
import { getAllRowsThunk } from "../../store/rows";

// import Row from './Row';

import "./Warehouse.css"



export default function Warehouse () {
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
        <div className="warehouse-wrapper">
            <div className="field-info">
            {selectedField ? (
                <>
            <div className="selected-field-vaults-tmb">
                {/* Display info for the selected field */}
                <div className="top">T {top?.customer?.name} {top?.vault_id}</div>
                <div className="middle">M {middle?.customer?.name} {middle?.vault_id}</div>
                <div className="bottom">B {bottom?.customer?.name} {bottom?.vault_id}</div>
                {/* Add more fields as needed */}
            </div>
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
                 {/* <div className="row-id">{row.id}</div> */}
                 <div className="fields">
                 {row.fields.map((field, index) => (
                 <div
                    className="field"
                    style={{ backgroundColor: `${field.vaults.length ? "#ea373d" : "#4e4e50"}` }}
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