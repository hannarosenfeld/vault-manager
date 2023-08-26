import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getAllVaultsThunk } from '../../store/vault';

import Field from './Field';

import "./Warehouse.css"



export default function Warehouse () {
    const dispatch = useDispatch();
    const n = 72;

    return (
        <div className="warehouse-wrapper">
            <div>

            </div>
            <div className="field-info">
                
            </div>
            <div className="warehouse">
            {[...Array(n)].map((e, i) => (
              <Field field={i+1} key={i} />
            ))}
            </div>
        </div>
    )
}