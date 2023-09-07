import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllStagedVaultsThunk, getAllVaultsThunk } from "../../store/vault";

import "./StagedVaults.css"


export default function StagedVaults() {
    const dispatch = useDispatch();
    const staged = useSelector(state => state.vault.stagedVaults?.staged_vaults);

    let stagedVaults;

    useEffect(() => {
        console.log("🪻", staged)
    },[staged])

    useEffect(() => {
        dispatch(getAllStagedVaultsThunk())
    }, [dispatch])

    return (
        <div className="page-wrapper">
            <div className="hazard-border staged-containers">
                {staged?.map(vault => (
                    <div key={vault.id} className="vault">
                        <p>{vault.customer.name}</p>
                        <p>{vault.vault_id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}   