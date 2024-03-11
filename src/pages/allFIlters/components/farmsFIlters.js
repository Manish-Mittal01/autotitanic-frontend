import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { selectFilters } from "../../../redux/filters/slice";
import { colorsList } from "../../../utils/filters/common/options";
import { useNavigate } from "react-router-dom";
import { trucksCategoryOptions } from "../../../utils/filters/trucks/options";
import { farmsFuelTypeOptions } from "../../../utils/filters/farms/options";

export default function FarmFilters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { vehiclesCount } = useSelector((state) => state.vehicles);

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
                value={filters.category}
                onChange={(selected) => {
                  handleUpdateFilter("category", selected);
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
            navigate("/farms/all");
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
