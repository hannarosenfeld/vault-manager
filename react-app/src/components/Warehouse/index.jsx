// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import Modal from '@mui/material/Modal';
// import CircularProgress from '@mui/material/CircularProgress';
// import { editFieldThunk, getAllFieldsThunk, editSingleFieldThunk, setSelectedFieldAction } from "../../store/field.js";
// import { useParams } from "react-router-dom";  
// import { getAllWarehousesThunk } from "../../store/warehouse.js";
// import { getAllCustomersThunk } from "../../store/customer.js";
// import RenderTMB from "./FieldInfo/index.jsx";
// import AddVaultModal from "./FieldInfo/AddVaultModal/AddVaultModal.jsx"
// import ConfirmStaging from "./FieldInfo/ConfirmStaging/index.jsx";
// import "./Warehouse.css"


// export default function Warehouse({ setIsWarehousePage }) {
//     const dispatch = useDispatch();
//     const { warehouseId } = useParams(); 
//     const warehouse = useSelector((state) => state.warehouse[warehouseId]);
//     const allFields = useSelector((state) => state.field[warehouseId]);
//     const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
//     const [fields, setFields] = useState(null);
//     const field = useSelector( state => state.field.selectedField);
//     const vaults = useSelector((state) => state.vault);
//     const vaultsArr = []
//     field?.vaults?.forEach(id => (vaults[id]) ?  vaultsArr.push(vaults[id]) : null);    
//     const searchResult = useSelector((state) => state.search.fields);
//     const [position, setPosition] = useState(null);
//     const selectedField = useSelector((state) => state.field.selectedField);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] = useState(false);
//     const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);
//     const [toggleSelected, setToggleSelected] = useState(false);
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         setIsWarehousePage(true);
//         return () => {
//             setIsWarehousePage(false);
//         }
//     }, [])


//     // useEffect(() => {
//     //     dispatch(setSelectedFieldAction(null));
//     // }, [searchResult])

//     useEffect(() => {
//         dispatch(setSelectedFieldAction(null));
//     }, [warehouseId])

//     useEffect(() => {
//         setFields(null);
//         setLoading(true);
//         setLoadedWarehouseFields(false)
//         const warehouseInfo = dispatch(getAllWarehousesThunk());
//         dispatch(getAllCustomersThunk())
//         const fields = dispatch(getAllFieldsThunk(warehouseId))

//         Promise.all([warehouseInfo])
//             .then(() => setLoading(false))
//             .catch(() => setLoading(false));

//         Promise.all([fields])
//             .then(() => setLoadedWarehouseFields(true))
//             .catch(() => console.log("🚨 fields could not be loaded!"))
//     }, [dispatch, warehouseId])


//     const handleFieldClick = async (field) => {
//         await setLoading(true);
//         await setToggleSelected(false);

//         const setField = await dispatch(setSelectedFieldAction(field))

//         Promise.all([setField])
//             .then(() => setLoading(false))
//             .catch(() => console.log("🥐 couldn't set field"));
//     };

//     const handleOpenAddVaultModal = async (position) => {
//         await setPosition(position);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleStageClick = async (vault) => {
//         setSelectedVaultToStage(vault);
//         setIsConfirmStagingModalOpen(true);
//     };

//     const closeConfirmStagingModal = async (isDeleted) => {
//         if (isDeleted) {
//             setFields(prevFields => 
//                 prevFields.map(field => {
//                     return(
//                         selectedField.vaults.length === 0 ? field.vaults = [] :
//                         field.id === selectedVaultToStage.field_id ? { ...field, vaults: field.vaults.filter(vault => vault !== selectedVaultToStage.id)} : field
//                     )
//                 })
//             )
//         }
//         setSelectedVaultToStage(null);
//         setIsConfirmStagingModalOpen(false);
//     }

//     const toggleFieldType = (type, topField, bottomField) => {
//         if (!bottomField || bottomField.name[0] !== topField.name[0]) return alert("Can't switch to a couchbox on the last row")
//         if (topField.vaults.length || bottomField.vaults.length) return alert("Please empty field before switching field type!")
        
//         const formData = {"name": topField.name, "field_id_1": topField.id, "field_id_2": bottomField.id}
//         if (type === "couchbox-T") {
//             formData["type"] = "vault"
//             dispatch(editFieldThunk(formData))
//             setFields(prevFields => 
//                 prevFields.map(field =>
//                     field.id === topField.id ? { ...topField, type: "vault" } : field
//                 )
//             )
//             setFields(prevFields => 
//                 prevFields.map(field =>
//                     field.id === bottomField.id ? { ...bottomField, type: "vault" } : field
//                 )
//             )
//         } else if (type === "vault") {
//             formData["type"] = "couchbox"
//             const topName = topField.name.match(/^([a-zA-Z]+)\d/);
//             const bottomName = bottomField.name.match(/^([a-zA-Z]+)\d/);
//             if (bottomName || topName[1] === bottomName[1]) {
//                 const editDispatch = dispatch(editFieldThunk(formData))

//                 setFields(prevFields => 
//                     prevFields.map(field =>
//                         field.id === topField.id ? { ...topField, type: "couchbox-T" } : field
//                     )
//                 )
//                 setFields(prevFields => 
//                     prevFields.map(field =>
//                         field.id === bottomField.id ? { ...bottomField, type: "couchbox-B" } : field
//                     )
//                 )   

//             } else return alert("Can't switch to a couchbox on the last row")
//         }
//     }

//     const toggleFieldFull = async (fieldId) => {
//         const toggleFull = await dispatch(editSingleFieldThunk(fieldId, {}))
        
//         setFields(prevFields => 
//             prevFields.map(field =>
//                 field.id === fieldId ? { ...field, full : !field.full } : field
//             )
//         )
//     }

//     useEffect(() => {
//         let sortedFields;
//         if (loadedWarehouseFields) {
//             // setFields(Object.values(allFields).sort((a,b) => a.name - b.name))
//             let fieldsArr = (Object.values(allFields))

//             sortedFields = fieldsArr.sort(function (a, b) {
//                 // Split the field names into alphabetical and numeric parts
//                 const [, aAlpha, aNum] = a.name.match(/^([A-Za-z]+)(\d+)$/);
//                 const [, bAlpha, bNum] = b.name.match(/^([A-Za-z]+)(\d+)$/);
            
//                 // Compare alphabetical parts first
//                 if (aAlpha !== bAlpha) {
//                     return aAlpha.localeCompare(bAlpha);
//                 }
                
//                 // If alphabetical parts are equal, compare numeric parts as numbers
//                 return parseInt(aNum) - parseInt(bNum);
//             });
            
//         }

//         setFields(sortedFields)
//     }, [loadedWarehouseFields])

//     function fieldGenerator(fields) {
//         if (fields) {
//             return (
//                 <div 
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: `repeat(${warehouse.columns}, 1fr)`,
//                         gridTemplateRows: `repeat(${warehouse.rows}, 1fr)`,
//                         gridAutoFlow: 'column',
//                         gridGap: "1%",
//                         width: "100%",
//                         height: "75vh",
//                         marginBottom: "1rem"
//                     }}
//                 >   
//                     {fields.map(field => (
//                     <div
//                         className="field"
//                         key={field.id}
//                         style={{
//                             backgroundColor: `${
//                                 field.vaults?.length === 3 && field.type === "vault" || field.full ? "var(--red)" :
//                                 field.vaults?.length === 4 && field.type === "couchbox-T" || field.full ? "var(--red)" :
//                                 field.vaults?.length === 3 && field.type === "couchbox-T" || field.full ? "var(--yellow)" :
//                                 field.vaults?.length === 2 ? "var(--yellow)" :
//                                 field.vaults?.length === 1 ? "var(--green)" :
//                                 "var(--lightgrey)"
//                             }`,
//                             border: `${
//                                 selectedField?.id === field.id ? "3px solid var(--blue)" : 
//                                 searchResult && searchResult?.includes(field.id) ? "3px solid var(--blue)" : "none"
//                             }`,
//                             height: `${field.type === "couchbox-T" ? "213%" : '100%'}`,
//                             marginBottom: `${field.type === "couchbox-T" ? "-2.6em" : '0'}`,
//                             width: `${field.type === "couchbox-B" ? "0px" : ''}`,
//                             zIndex: `${field.type === "couchbox-B" ? "100" : 'none'}`,
//                         }}
//                         onClick={() => handleFieldClick(field)}
//                     >{field.type === "couchbox-B" ? "" : <div className="field-number">{field.name}</div>}</div>
//                     ))}
//                 </div>
//             )
//         }
//     }

//     if (!warehouse) return null

//     return (
//         <div className="warehouse-wrapper" style={{padding: "1em"}}>
//             {loading  && ( 
//                 <div className="loading-animation-container"> 
//                 <CircularProgress  size={75} />
//             </div>
//             )}
//             {!loading && ( 
//                 <div style={{display: "flex", flexDirection: "column"}}>
//             <div 
//                 style={{
//                     fontSize: "1.5em", 
//                     fontWeight: "500", 
//                     marginBottom: "1em",
//                     textAlign: "center",
//                     textDecoration: "underline"
//                 }}
//             >
//                 {warehouse.name}
//             </div>                    
//             <div className="field-info">
//                         {selectedField?.id ? (
//                             <RenderTMB
//                                 handleStageClick={handleStageClick}
//                                 handleOpenAddVaultModal={handleOpenAddVaultModal}
//                                 toggleFieldType={toggleFieldType}
//                                 toggleFieldFull={toggleFieldFull}
//                                 toggleSelected={toggleSelected}
//                                 warehouse={warehouse}
//                             />
//                         ) : (
//                             <div>
//                                 Select a field to view its info
//                             </div>
//                         )}
//                     </div>
//                     <div className="warehouse">
//                         {fields ? fieldGenerator(fields): null}
//                     </div>
//                     <Modal open={isModalOpen}>
//                         <AddVaultModal
//                             onClose={handleCloseModal}
//                             position={position}
//                             warehouseId={warehouseId}
//                         />
//                     </Modal>
//                     <Modal open={isConfirmStagingModalOpen} onClose={setIsConfirmStagingModalOpen}>
//                         <ConfirmStaging
//                             vault={selectedVaultToStage}
//                             onClose={closeConfirmStagingModal}
//                             warehouseId={warehouseId}
//                         />
//                     </Modal>
//                 </div>
//             )}
//         </div>
//     )
// }
