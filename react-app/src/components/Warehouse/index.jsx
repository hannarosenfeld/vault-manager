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
import RenderTMB from "./FieldInfo/index.jsx";
import AddVaultModal from "./FieldInfo/AddVaultModal/AddVaultModal.jsx";
import ConfirmStaging from "./FieldInfo/ConfirmStaging/index.jsx";
import FieldGrid from "../FieldGrid.jsx";
import { sortFields } from "../utility.js";
import { getAllRacksThunk } from "../../store/rack.js";
import "./Warehouse.css";

export default function Warehouse({ setIsWarehousePage }) {
  const dispatch = useDispatch();
  const { warehouseId } = useParams();

  const warehouse = useSelector((state) => state.warehouse[warehouseId]);
  const allFields = useSelector((state) => state.field[warehouseId]);
  const field = useSelector((state) => state.field.selectedField);
  const selectedField = useSelector((state) => state.field.selectedField);
  const vaults = useSelector((state) => state.vault);
  const racks = useSelector((state => state.rack));
  // const searchResult = useSelector((state) => state.search.fields);

  const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
  const [fields, setFields] = useState(null);
  const [racksArr, setRacksArr] = useState(null);
  const [position, setPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmStagingModalOpen, setIsConfirmStagingModalOpen] = useState(false);
  const [selectedVaultToStage, setSelectedVaultToStage] = useState(null);
  const [toggleSelected, setToggleSelected] = useState(false);
  const [loading, setLoading] = useState(true);


  const vaultsArr = [];
  field?.vaults?.forEach((id) =>
    vaults[id] ? vaultsArr.push(vaults[id]) : null
  );

  useEffect(() => {
    if (racks && Object.values(racks).length) {
      setRacksArr(Object.values(racks))
      console.log("❤️‍🔥 racksArr: ", racksArr)
    }
  }, [racks])

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

    // Promise.all([racks])
    //   .then(() => setRacksArr(Object.values(racks)))
    //   .catch(() => console.log("🚨 racks could not be loaded!"));

  }, [dispatch, warehouseId]);

  const handleFieldClick = async (field) => {
    await setLoading(true);
    await setToggleSelected(false);

    const setField = await dispatch(setSelectedFieldAction(field));

    Promise.all([setField])
      .then(() => setLoading(false))
      .catch(() => console.log("🥐 couldn't set field"));
  };

  const handleOpenAddVaultModal = async (position) => {
    await setPosition(position);
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

    const formData = {
      name: topField.name,
      field_id_1: topField.id,
      field_id_2: bottomField.id,
    };
    if (type === "couchbox-T") {
      formData["type"] = "vault";
      dispatch(editFieldThunk(formData));
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.id === topField.id ? { ...topField, type: "vault" } : field
        )
      );
      setFields((prevFields) =>
        prevFields.map((field) =>
          field.id === bottomField.id
            ? { ...bottomField, type: "vault" }
            : field
        )
      );
    } else if (type === "vault") {
      formData["type"] = "couchbox";
      const topName = topField.name.match(/^([a-zA-Z]+)\d/);
      const bottomName = bottomField.name.match(/^([a-zA-Z]+)\d/);
      if (bottomName || topName[1] === bottomName[1]) {
        const editDispatch = dispatch(editFieldThunk(formData));

        setFields((prevFields) =>
          prevFields.map((field) =>
            field.id === topField.id
              ? { ...topField, type: "couchbox-T" }
              : field
          )
        );
        setFields((prevFields) =>
          prevFields.map((field) =>
            field.id === bottomField.id
              ? { ...bottomField, type: "couchbox-B" }
              : field
          )
        );
      } else return alert("Can't switch to a couchbox on the last row");
    }
  };

  const toggleFieldFull = async (fieldId) => {
    const toggleFull = await dispatch(editSingleFieldThunk(fieldId, {}));

    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, full: !field.full } : field
      )
    );
  };

  useEffect(() => {
    if (loadedWarehouseFields && allFields) {
      const fieldsArr = Object.values(allFields);
      if (fieldsArr.length) {
        const sortedFields = sortFields(fieldsArr);
        setFields(sortedFields);
      }
    }
  }, [loadedWarehouseFields]);

  if (!warehouse) return null;

  return (
    <div className="wrapper">
      {loading && (
        <div className="loading-animation-container">
          <CircularProgress size={75} />
        </div>
      )}
      {!loading && (
        <div style={{ display: "flex", flexDirection: "column" }}>
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
              <RenderTMB
                handleStageClick={handleStageClick}
                handleOpenAddVaultModal={handleOpenAddVaultModal}
                toggleFieldType={toggleFieldType}
                toggleFieldFull={toggleFieldFull}
                toggleSelected={toggleSelected}
                warehouse={warehouse}
              />
            ) : (
              <div>Select a field/rack to view its info</div>
            )}
          </div>

          <div className="warehouse !h-[48vh] flex gap-1 items-start">
            {/* Left Side (Two Rows) */}
            <div className="flex gap-1">
              <div className="box w-10 h-10 bg-gray-300">
                {racksArr.map(rack => rack.position === "1-1" ? <div>{rack.position}</div> : '')}
              </div>
              <div className="box w-10 h-10 bg-gray-300">

              </div>
            </div>

            {/* Warehouse Fields (Center) */}
            <div className="warehouse-fields md:w-[70%] h-[85%] w-[55%] self-start mx-auto ">
              {fields && warehouse
                ? FieldGrid(fields, warehouse, handleFieldClick)
                : null}
            </div>

            {/* Right Side (Six Stacked Columns) */}
            <div className="flex flex-col gap-1 ml-auto justify-end">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="box w-10 h-10 bg-gray-300 "></div>
              ))}
            </div>
          </div>

          {/* Bottom (Nine Rows) */}
          <div className="flex items-center gap-1 justify-end">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="box w-[9%] h-10 bg-gray-300"></div>
            ))}
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
      )}
    </div>
  );
}
