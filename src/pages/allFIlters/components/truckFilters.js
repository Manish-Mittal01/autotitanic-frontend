import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmark } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import beavertail from "../../../Assets/Images/beaverTailtruck.png";
import box from "../../../Assets/Images/boxTruck.jpg";
import bus from "../../../Assets/Images/bus.jpg";
import catering from "../../../Assets/Images/cateringTruck.jpg";
import chassisCab from "../../../Assets/Images/chassisTruck.jpg";
import coach from "../../../Assets/Images/coach.jpg";
import concreteMix from "../../../Assets/Images/concreteMixerTruck.jpg";
import craneMounted from "../../../Assets/Images/craneMountedTruck.jpg";
import curtainSide from "../../../Assets/Images/curtainSideTruck.jpg";
import dropside from "../../../Assets/Images/dropSideTruck.jpg";
import flatbed from "../../../Assets/Images/flatbedTruck.jpg";
import gritterTruck from "../../../Assets/Images/gritterTruck.jpg";
import hookLoader from "../../../Assets/Images/hookLoadertruck.webp";
import livestock from "../../../Assets/Images/livestockTruck.jpg";
import lowLoader from "../../../Assets/Images/lowLoaderTruck.jpg";
import municipal from "../../../Assets/Images/municipalTruck.webp";
import pantechnican from "../../../Assets/Images/pentechoniconTruck.jpg";
import roadSweeper from "../../../Assets/Images/roadSweeperTruck.webp";
import scaffordBody from "../../../Assets/Images/scaffold.jpg";
import skeletal from "../../../Assets/Images/skeletoltruck.jpg";
import skipLoader from "../../../Assets/Images/skipLoaderTruck.jpg";
import specialistVehicle from "../../../Assets/Images/specialistVehicleTruck.jpg";
import tanker from "../../../Assets/Images/tankerTruck.jpg";
import temperatureControlled from "../../../Assets/Images/temperatureControlledTruck.jpg";
import tipper from "../../../Assets/Images/tipperTruck.png";
import tipperGrab from "../../../Assets/Images/tipperGrab.jpg";
import tractorUnit from "../../../Assets/Images/tractorUnitTruck.jpg";
import vehicleTransporter from "../../../Assets/Images/vehicleTransportTruck.png";
import { selectFilters } from "../../../redux/filters/slice";
import { colorsList, driverPositionsOptions } from "../../../utils/filters/common/options";
import { useNavigate } from "react-router-dom";
import {
  trucksAxleOptions,
  trucksCabOptions,
  trucksCategoryOptions,
  trucksEnginePowerOptions,
  trucksFuelTypeOptions,
  trucksGtwOptions,
  trucksGvwOptions,
} from "../../../utils/filters/trucks/options";
import { getVehicleCountByBody } from "../../../redux/vehicles/thunk";
import { handleApiRequest } from "../../../services/handleApiRequest";

export const bodyTypeOptions = [
  { img: beavertail, value: "beavertail", label: "Beavertail" },
  { img: box, value: "box", label: "Box" },
  { img: bus, value: "bus", label: "Bus" },
  { img: catering, value: "catering", label: "Catering" },
  { img: chassisCab, value: "chassisCab", label: "Chassis Cab" },
  { img: coach, value: "coach", label: "Coach" },
  { img: concreteMix, value: "concreteMix", label: "Concrete Mix" },
  { img: craneMounted, value: "craneMounted", label: "Crane Mounted" },
  { img: curtainSide, value: "curtainSide", label: "Curtain Side" },
  { img: dropside, value: "dropside", label: "Dropside" },
  { img: flatbed, value: "flatbed", label: "Flatbed" },
  { img: gritterTruck, value: "gritterTruck", label: "Gritter Truck" },
  { img: hookLoader, value: "hookLoader", label: "Hook Loader" },
  { img: livestock, value: "livestock", label: "Livestock" },
  { img: lowLoader, value: "lowLoader", label: "Low Loader" },
  { img: municipal, value: "municipal", label: "Municipal" },
  { img: pantechnican, value: "pantechnican", label: "Pantechnican" },
  { img: roadSweeper, value: "roadSweeper", label: "Road Sweeper" },
  { img: scaffordBody, value: "scaffordBody", label: "Scafford Body" },
  { img: skeletal, value: "skeletal", label: "Skeletal" },
  { img: skipLoader, value: "skipLoader", label: "Skip Loader" },
  { img: specialistVehicle, value: "specialistVehicle", label: "Specialist Vehicle" },
  { img: tanker, value: "tanker", label: "Tanker" },
  { img: temperatureControlled, value: "temperatureControlled", label: "Temperature Controlled" },
  { img: tipper, value: "tipper", label: "Tipper" },
  { img: tipperGrab, value: "tipperGrab", label: "Tipper Grab" },
  { img: tractorUnit, value: "tractorUnit", label: "Tractor Unit" },
  { img: vehicleTransporter, value: "vehicleTransporter", label: "Vehicle Transporter" },
];

export default function TruckFilters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { vehiclesCount, vehiclesCountByFilter } = useSelector((state) => state.vehicles);

  const handleUpdateFilter = (name, value) => {
    dispatch(selectFilters({ [name]: value }));
  };

  const hanldeResetFilters = () => {
    dispatch(resetFilters());
  };

  const getVehicleCountByFilter = async () => {
    const bodyStyles = bodyTypeOptions.map((type) => {
      return type.value;
    });
    const request = {
      filters: { bodyStyle: bodyStyles, type: "truck" },
    };
    console.log("first", request);

    const response = await handleApiRequest(getVehicleCountByBody, request);
    console.log("response", response);
  };

  useEffect(() => {
    getVehicleCountByFilter();
  }, []);

  return (
    <>
      <Col lg={8} className="d-flex flex-column">
        <fieldset className="border my-3">
          <legend>Body Type</legend>
          <Row className="py-3">
            {bodyTypeOptions.map((bodyType) => (
              <Col
                lg={2}
                sm={3}
                xs={4}
                className={`bodyStyleContainer pointer position-relative ${
                  filters.bodyStyle?.value === bodyType.value ? "activeBody" : ""
                }`}
                onClick={() =>
                  handleUpdateFilter("bodyStyle", {
                    value: bodyType.value,
                    label: bodyType.value,
                  })
                }
              >
                {filters.bodyStyle?.value === bodyType.value && (
                  <IoCheckmark className="checkIcon" />
                )}
                <img src={bodyType.img} style={{ aspectRatio: "3/2" }} />
                <p className="m-0">{bodyType.label}</p>
                <p>
                  (
                  {vehiclesCountByFilter.data?.bodyStyle
                    .find((style) => style.value === bodyType.value)
                    ?.count?.toLocaleString() || 0}
                  )
                </p>
              </Col>
            ))}
          </Row>
        </fieldset>
        <fieldset className="border my-3">
          <legend>Fuel Type</legend>
          <Row className="py-3">
            {trucksFuelTypeOptions.map((fuelType) => (
              <Col lg={4} xs={6} className="d-flex align-items-center my-2">
                <input
                  type="radio"
                  name="fuelType"
                  id={fuelType.value}
                  onClick={() => handleUpdateFilter("fuelType", fuelType.value)}
                />
                <label className="m-0 ms-2" htmlFor={fuelType.value}>
                  {fuelType.label}
                </label>
              </Col>
            ))}
          </Row>
        </fieldset>
        <fieldset className="border my-3 py-3">
          <legend>Specification</legend>
          <fieldset className="border">
            <legend>Color</legend>
            <Row className="py-3">
              {colorsList.map((color) => (
                <Col lg={4} xs={6} className="d-flex align-items-center my-2">
                  <input
                    type="radio"
                    name="exteriorColor"
                    id={color.value}
                    onChange={() => handleUpdateFilter("exteriorColor", color)}
                  />
                  <label className="m-0 ms-2" htmlFor={color.value}>
                    {color.label}
                  </label>
                </Col>
              ))}
            </Row>
          </fieldset>
          <div className="d-flex justify-content-between my-2 gap-10">
            <div className="w-100">
              <label>Category</label>
              <Select
                options={trucksCategoryOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.category}
                onChange={(selected) => {
                  handleUpdateFilter("category", selected);
                }}
              />
            </div>
            <div className="w-100">
              <label>Axle</label>
              <Select
                options={trucksAxleOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.axle}
                onChange={(selected) => {
                  handleUpdateFilter("axle", selected);
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between my-2 gap-10">
            <div className="w-100">
              <label>GVW</label>
              <Select
                options={trucksGvwOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.gvw}
                onChange={(selected) => {
                  handleUpdateFilter("gvw", selected);
                }}
              />
            </div>
            <div className="w-100">
              <label>GTW</label>
              <Select
                options={trucksGtwOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.gtw}
                onChange={(selected) => {
                  handleUpdateFilter("gtw", selected);
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between my-2 gap-10">
            <div className="w-100">
              <label>Cab Type</label>
              <Select
                options={trucksCabOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.cabType}
                onChange={(selected) => {
                  handleUpdateFilter("cabType", selected);
                }}
              />
            </div>
            <div className="w-100">
              <label>Driver position</label>
              <Select
                options={driverPositionsOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.driverPosition}
                onChange={(selected) => {
                  handleUpdateFilter("driverPosition", selected);
                }}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="border my-3  py-3">
          <legend>Performence</legend>
          <div className="row d-flex justify-content-between my-2 gap-10">
            <div className="col-6 pe-0">
              <label>Engine Power</label>
              <Select
                options={trucksEnginePowerOptions}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.enginePower}
                onChange={(selected) => {
                  handleUpdateFilter("enginePower", selected);
                }}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border my-3  py-3">
          <legend>Preference</legend>
          <div className="d-flex justify-content-between my-2 gap-10">
            <div className="w-100">
              <label>Private & Dealer</label>
              <Select
                options={[
                  { value: "private", label: "Private" },
                  { value: "dealer", label: "Dealer" },
                ]}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.userType}
                onChange={(selected) => {
                  handleUpdateFilter("userType", selected);
                }}
              />
            </div>
            <div className="w-100">
              <label>Condition</label>
              <Select
                options={[
                  { value: "used", label: "Used" },
                  { value: "new", label: "New" },
                ]}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={filters.condition}
                onChange={(selected) => {
                  handleUpdateFilter("condition", selected);
                }}
              />
            </div>
          </div>
        </fieldset>
        <Button
          type="submit"
          variant="danger"
          className="w-50 mt-3 mx-auto d-flex align-items-center justify-content-center"
          onClick={() => {
            navigate("/trucks/all");
          }}
        >
          <IoSearch className="searchIcon" />
          Search {vehiclesCount.data?.totalCount}
        </Button>
        <Button
          variant=""
          className="w-50 mb-3 mx-auto text-primary"
          style={{ fontSize: 16 }}
          onClick={() => {
            hanldeResetFilters();
          }}
        >
          Reset Filters
        </Button>
      </Col>
    </>
  );
}
