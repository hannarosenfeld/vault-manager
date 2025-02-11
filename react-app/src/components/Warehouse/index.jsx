import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import {
  editFieldThunk,
  getAllFieldsThunk,
  editSingleFieldThunk,
  setSelectedFieldAction,
} from "../../store/field.js";
import { useParams } from "react-router-dom";
import { getAllWarehousesThunk } from "../../store/warehouse.js";
import { getAllCustomersThunk } from "../../store/customer.js";
import FieldInfo from "./FieldInfo/index.jsx";
import AddVaultModal from "./FieldInfo/AddVaultModal/AddVaultModal.jsx";
import ConfirmStaging from "./FieldInfo/ConfirmStaging/index.jsx";
import FieldGrid from "../FieldGrid.jsx";
import { sortFields } from "../utility.js";
import { getAllRacksThunk, setSelectedRackAction } from "../../store/rack.js";
import { LoadingSpinner } from "../LoadingSpinner.jsx";
import "./Warehouse.css";
import RackInfo from "./RackInfo/index.jsx";
import Rack from "./Rack.jsx";


export default function Warehouse({ setIsWarehousePage }) {
  const dispatch = useDispatch();
  const { warehouseId } = useParams();

  const warehouse = useSelector((state) => state.warehouse[warehouseId]);
  const allFields = useSelector((state) => state.field[warehouseId]);
  const selectedField = useSelector((state) => state.field.selectedField);
  const racks = useSelector((state) => state.rack);
  const selectedRack = useSelector((state) => state.rack.selectedRack);
  const searchResult = useSelector((state) => state.search.fields);

  const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
  const [fields, setFields] = useState(null);
  const [racksArr, setRacksArr] = useState(null);
  const [position, setPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] =
    useState(false);
  const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);
  const [toggleSelected, setToggleSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRacks, setShowRacks] = useState(false);

  useEffect(() => {
    if (loadedWarehouseFields && allFields) {
      const fieldsArr = Object.values(allFields);
      if (fieldsArr.length) {
        const sortedFields = sortFields(fieldsArr);
        setFields(sortedFields);
      }
    }
  }, [loadedWarehouseFields]);

  useEffect(() => {
    if (racks && Object.values(racks).length) {
      setRacksArr(Object.values(racks));
    }
  }, [racks]);

  useEffect(() => {
    setIsWarehousePage(true);
    return () => {
      setIsWarehousePage(false);
    };
  }, []);

  useEffect(() => {
    dispatch(setSelectedFieldAction(null));
  }, [warehouseId]);

  useEffect(() => {
    setFields(null);
    setLoading(true);
    setLoadedWarehouseFields(false);
    const warehouseInfo = dispatch(getAllWarehousesThunk());
    const customers = dispatch(getAllCustomersThunk());
    const fields = dispatch(getAllFieldsThunk(warehouseId));
    const racks = dispatch(getAllRacksThunk(warehouseId));

    Promise.all([warehouseInfo])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    Promise.all([fields])
      .then(() => setLoadedWarehouseFields(true))
      .catch(() => console.log("🚨 fields could not be loaded!"));
  }, [dispatch, warehouseId]);

  const handleFieldClick = async (field) => {
    setLoading(true);
    setToggleSelected(false);

    const setField = dispatch(setSelectedFieldAction(field));
    const unselectRack = dispatch(setSelectedRackAction(null));

    Promise.all([setField])
      .then(() => setLoading(false))
      .catch(() => console.log("🥐 couldn't set field"));
  };

  const handleOpenAddVaultModal = async (position) => {
    setPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStageClick = async (vault) => {
    setSelectedVaultToStage(vault);
    setIsConfirmStagingModalOpen(true);
  };

  const closeConfirmStagingModal = async (isDeleted) => {
    if (isDeleted) {
      setFields((prevFields) =>
        prevFields.map((field) => {
          return selectedField.vaults.length === 0
            ? (field.vaults = [])
            : field.id === selectedVaultToStage.field_id
            ? {
                ...field,
                vaults: field.vaults.filter(
                  (vault) => vault !== selectedVaultToStage.id
                ),
              }
            : field;
        })
      );
    }
    setSelectedVaultToStage(null);
    setIsConfirmStagingModalOpen(false);
  };

  const toggleFieldType = (type, topField, bottomField) => {
    if (!bottomField || bottomField.name[0] !== topField.name[0])
      return alert("Can't switch to a couchbox on the last row");
    if (topField.vaults.length || bottomField.vaults.length)
      return alert("Please empty field before switching field type!");

    const newType = type === "couchbox-T" ? "vault" : "couchbox";
    const formData = {
      name: topField.name,
      field_id_1: topField.id,
      field_id_2: bottomField.id,
      type: newType,
    };

    dispatch(editFieldThunk(formData));

    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === topField.id
          ? { ...topField, type: newType === "vault" ? "vault" : "couchbox-T" }
          : field.id === bottomField.id
          ? {
              ...bottomField,
              type: newType === "vault" ? "vault" : "couchbox-B",
            }
          : field
      )
    );
  };

  const toggleFieldFull = async (fieldId) => {
    const toggleFull = dispatch(editSingleFieldThunk(fieldId, {}));

    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, full: !field.full } : field
      )
    );
  };

  if (!warehouse) return <LoadingSpinner />;

  return (
    <div className="wrapper">
      {loading && (
        <div className="loading-animation-container">
          <CircularProgress size={75} />
        </div>
      )}
      {!loading && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className=" flex flex-col h-[90vh] px-2">
            <div
              style={{
                fontSize: "1.5em",
                fontWeight: "500",
                marginBottom: "1em",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              {warehouse.name}
            </div>
            <div className="field-info">
              {selectedField?.id ? (
                <FieldInfo
                  handleStageClick={handleStageClick}
                  handleOpenAddVaultModal={handleOpenAddVaultModal}
                  toggleFieldType={toggleFieldType}
                  toggleFieldFull={toggleFieldFull}
                  toggleSelected={toggleSelected}
                  warehouse={warehouse}
                />
              ) : selectedRack?.id ? (
                <RackInfo selectedRack={selectedRack} />
              ) : (
                <div>Select a field/rack to view its info</div>
              )}
            </div>

            <div className="warehouse flex gap-1 items-start">
              {/* Left Side (Two Rows) */}
              <div
                className="flex gap-1"
                style={{ display: !showRacks ? "none" : "flex" }}
              >
                <Rack racksArr={racksArr} wallSide="top-left"/>
                
                {/* <div
                  className="box w-[2em] h-[2em] bg-gray-300 flex"
                  onClick={() => {
                    const rack = racksArr?.find((rack) => rack.position === "3-1")
                    console.log("💅🏻", rack)
                    dispatch(setSelectedRackAction(rack));
                    dispatch(setSelectedFieldAction(null));
                  }}
                >
                  <div className="m-auto text-xs">3-1</div>
                </div>
                <div className="box w-[2em] h-[2em] bg-gray-300 flex">
                  <div className="m-auto text-xs">3-2</div>
                </div> */}
              </div>

              {/* Warehouse Fields (Center) */}
              <div
                className={`warehouse-fields self-start mx-auto transition-all duration-300 ${
                  showRacks ? "h-[80%] px-4" : "h-full"
                } w-full`}
              >
                {fields && warehouse ? (
                  <FieldGrid
                    fields={fields}
                    warehouse={warehouse}
                    handleFieldClick={handleFieldClick}
                    selectedField={selectedField}
                    searchResult={searchResult}
                  />
                ) : (
                  <div>No fields available</div>
                )}
              </div>

              {/* Right Side (Six Stacked Columns) */}
              <div
                className="flex flex-col gap-1 ml-auto justify-end"
                style={{ display: !showRacks ? "none" : "flex" }}
              >
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="box w-[2em] h-[2em] bg-gray-300 flex"
                  >
                    <div className="m-auto text-xs">3-{index + 3}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom (Nine Rows) */}
            <div
              className="flex justify-end items-center gap-1"
              style={{ display: !showRacks ? "none" : "flex" }}
            >
              <div className="flex flex-row-reverse gap-1">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    className="box w-[2em] h-[2em] bg-gray-300 flex"
                  >
                    <div className="m-auto text-xs">3-{index + 9}</div>
                  </div>
                ))}
              </div>
            </div>

            <Modal open={isModalOpen}>
              <AddVaultModal
                onClose={handleCloseModal}
                position={position}
                warehouseId={warehouseId}
              />
            </Modal>
            <Modal
              open={isConfirmStagingModalOpen}
              onClose={setIsConfirmStagingModalOpen}
            >
              <ConfirmStaging
                vault={selectedVaultToStage}
                onClose={closeConfirmStagingModal}
                warehouseId={warehouseId}
              />
            </Modal>
          </div>

          <div className="border-2 mt-2 pt-4 p-3">
            <div className="!flex !items-center !space-x-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="!sr-only peer"
                  checked={showRacks}
                  onChange={() => setShowRacks(!showRacks)}
                />
                <div className="!relative w-11 h-6 !bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:!bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:!bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:!bg-blue-600 dark:peer-checked:!bg-blue-600" />
              </label>
              <span className="!text-sm !font-light !text-gray-900 !dark:text-gray-300">
                Show Racks
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
