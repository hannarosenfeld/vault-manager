import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Warehouse from "../Warehouse";

export default function Index() {
    return(
        <div className="wrapper" style={{marginTop: "-5px"}}>
            <ul className="index-nav">
                <li><NavLink to="/warehouse">WareHouse</NavLink></li>
                <li><NavLink to="/add-vault">Add Vault</NavLink></li>
            </ul>
        </div>
    )
}