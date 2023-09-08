import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllStagedVaultsThunk } from "../../store/stage";

import "./StagedVaults.css"


export default function StagedVaults() {
    const dispatch = useDispatch();
    const staged = useSelector(state => state.stage?.vaults);
    const stagedArr = Object.values(staged);

    useEffect(() => {
        console.log("🪻", stagedArr[0])
    },[staged])

    let hi;

    useEffect(() => {
        dispatch(getAllStagedVaultsThunk())
    }, [dispatch])

    return (
        <div className="page-wrapper">
            <div className="hazard-border staged-containers">
                {stagedArr[0]?.map(vault => (
                    <div key={vault.id} className="vault">
                        <p>{vault.customer.name}</p>
                        <p>{vault.vault_id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}   