import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmark } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import coupe from "../../../Assets/Images/Coupe.png";
import convertible from "../../../Assets/Images/Convertible.png";
import estate from "../../../Assets/Images/Estate.png";
import hatchback from "../../../Assets/Images/Hatchback.png";
import mpv from "../../../Assets/Images/Mpv.png";
import pickup from "../../../Assets/Images/Pickup.png";
import saloon from "../../../Assets/Images/Saloon.png";
import suv from "../../../Assets/Images/suv.png";
import { selectFilters } from "../../../redux/filters/slice";
import {
  accelerationOptions,
  co2EmmisionOptions,
  colorsList,
  doorOptions,
  driverPositionsOptions,
  engineSizeOptions,
  fuelConsumtionOptions,
  fuelTypeOptions,
  gearBoxOptions,
} from "../../../utils/filters/common/options";
import { carsBootSpaceOptions, carsSeatOptions } from "../../../utils/filters/cars/options";
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
  { img: suv, value: "beavertail", label: "Beavertail" },
  { img: suv, value: "box", label: "Box" },
  { img: suv, value: "bus", label: "Bus" },
  { img: suv, value: "catering", label: "Catering" },
  { img: suv, value: "chassisCab", label: "Chassis Cab" },
  { img: suv, value: "coach", label: "Coach" },
  { img: suv, value: "concreteMix", label: "Concrete Mix" },
  { img: suv, value: "craneMounted", label: "Crane Mounted" },
  { img: suv, value: "curtainSide", label: "Curtain Side" },
  { img: suv, value: "dropside", label: "Dropside" },
  { img: suv, value: "flatbed", label: "Flatbed" },
  { img: suv, value: "gritterTruck", label: "Gritter Truck" },
  { img: suv, value: "hookLoader", label: "Hook Loader" },
  { img: suv, value: "livestock", label: "Livestock" },
  { img: suv, value: "lowLoader", label: "Low Loader" },
  { img: suv, value: "municipal", label: "Municipal" },
  { img: suv, value: "pantechnican", label: "Pantechnican" },
  { img: suv, value: "roadSweeper", label: "Road Sweeper" },
  { img: suv, value: "scaffordBody", label: "Scafford Body" },
  { img: suv, value: "skeletal", label: "Skeletal" },
  { img: suv, value: "skipLoader", label: "Skip Loader" },
  { img: suv, value: "specialistVehicle", label: "Specialist Vehicle" },
  { img: suv, value: "tanker", label: "Tanker" },
  { img: suv, value: "temperatureControlled", label: "Temperature Controlled" },
  { img: suv, value: "tipper", label: "Tipper" },
  { img: suv, value: "tipperGrab", label: "Tipper Grab" },
  { img: suv, value: "tractorUnit", label: "Tractor Unit" },
  { img: suv, value: "vehicleTransporter", label: "Vehicle Transporter" },
  { img: suv, value: "unlisted", label: "Unlisted" },
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
                <img src={bodyType.img} />
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
                value={filters.truckCategory}
                onChange={(selected) => {
                  handleUpdateFilter("truckCategory", selected);
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
            navigate("/cars/all");
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
