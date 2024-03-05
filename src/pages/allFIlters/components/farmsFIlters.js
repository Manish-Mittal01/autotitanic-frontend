import React from "react";
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
import { farmsFuelTypeOptions } from "../../../utils/filters/farms/options";

const bodyTypeOptions = [
  { img: convertible, label: "Convertible", value: "convertible" },
  { img: coupe, label: "Coupe", value: "coupe" },
  { img: estate, label: "Estate", value: "estate" },
  { img: hatchback, label: "Hatchback", value: "hatchback" },
  { img: mpv, label: "MPV", value: "MPV" },
  { img: pickup, label: "Pick-up", value: "Pick-up" },
  { img: saloon, label: "Saloon", value: "saloon" },
  { img: suv, label: "SUV", value: "SUV" },
];

export default function FarmFilters() {
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

  return (
    <>
      <Col lg={8} className="d-flex flex-column">
        <fieldset className="border my-3">
          <legend>Fuel Type</legend>
          <Row className="py-3">
            {farmsFuelTypeOptions.map((fuelType) => (
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
          <div className="row d-flex justify-content-between my-2 gap-10">
            <div className="col-6 pe-0">
              <label>Hours Used</label>
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
