import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllVaultsThunk } from '../../store/vault';



export default function Field({ field }) {
    const dispatch = useDispatch();
    const vaults = useSelector(state => state.vault.vaults);

    useEffect(() => {
        dispatch(getAllVaultsThunk());
    }, []);

    const filteredVaults = Object.values(vaults).filter(vault => vault.field === field);

    // const top = filteredVaults?.find(vault => vault.position === "T")
    // const middle = filteredVaults?.find(vault => vault.position === "M")
    // const bottom = filteredVaults?.find(vault => vault.position === "B")

    const handleClick = () => {
        dispatch()
    }

    return (
        <div 
            className="field" 
            style={{backgroundColor: `${filteredVaults.length > 0 ? "red" : "grey"}`}}
            onClick={()=> handleClick()}
        >
            {field}
            {/* show top, middle and bottom */}
            {/* {filteredVaults && (
                <>
                    <div>{top?.customer}</div>
                    <div>{middle?.customer}</div>
                    <div>{bottom?.customer}</div>
                </>
            )} */}
        </div>
    );
}
