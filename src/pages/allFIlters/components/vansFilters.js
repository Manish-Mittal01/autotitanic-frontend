import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import coupe from "../../../Assets/Images/Coupe.png";
import convertible from "../../../Assets/Images/Convertible.png";
import estate from "../../../Assets/Images/Estate.png";
import camper from "../../../Assets/Images/camper.jpg";
import boxVan from "../../../Assets/Images/boxVan.jpg";
import miniBus from "../../../Assets/Images/miniBus.jpg";
import luton from "../../../Assets/Images/luton.jpg";
import suv from "../../../Assets/Images/suv.png";
import SelectBox from "../../../components/selectBox";
import { carsFilters } from "../../../utils/filters/cars";
import { resetFilters, selectFilters } from "../../../redux/filters/slice";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getVehicleCount, getVehicleCountByBody } from "../../../redux/vehicles/thunk";
import HeroAdd from "../../../components/heroSection/heroAdd";
import CountryFilter from "../../../components/filters";
import { preventMinus } from "../../../utils";
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
  getYearList,
} from "../../../utils/filters/common/options";
import {
  vansEnginePowerOptions,
  vansMileageList,
  vansSeatOptions,
  vansWheelBaseOptions,
} from "../../../utils/filters/vans/options";

const bodyTypeOptions = [
  { img: coupe, label: "Coupe", value: "coupe" },
  { img: camper, label: "Camper", value: "camper" },
  { img: boxVan, label: "Box Van", value: "boxVan" },
  { img: miniBus, label: "Mini Bus", value: "miniBus" },
  { img: luton, label: "Luton", value: "luton" },
  { img: suv, label: "SUV", value: "SUV" },
];

export default function AllVansFilters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehiclesCount, vehiclesCountByFilter } = useSelector((state) => state.vehicles);
  const { filters } = useSelector((state) => state.filters);
  // const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);
  const [filtersList, setFiltersList] = useState(carsFilters);

  const handleUpdateFilter = (name, value) => {
    dispatch(selectFilters({ [name]: value }));
  };

  const hanldeResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleResultCount = async () => {
    const newFilters = {};
    Object.entries(filters).forEach((filter) => {
      newFilters[filter[0]] =
        typeof filter[1] === "object" ? filter[1].value || filter[1]._id : filter[1];
    });

    handleApiRequest(getVehicleCount, {
      filters: { ...newFilters, status: "approved", type: "vans" },
    });
  };

  const getVehicleCountByFilter = async () => {
    const bodyStyles = bodyTypeOptions.map((type) => {
      return type.value;
    });
    const request = {
      filters: { bodyStyle: bodyStyles, type: "vans" },
    };
    const response = await handleApiRequest(getVehicleCountByBody, request);
  };

  useEffect(() => {
    getVehicleCountByFilter();
  }, []);

  useEffect(() => {
    handleResultCount();
  }, [filters]);

  useEffect(() => {
    const oldFilters = [...filtersList];
    const makeIndex = oldFilters.findIndex((elem) => elem.label === "Make");
    const modelIndex = oldFilters.findIndex((elem) => elem.label === "Model");
    // const variantIndex = oldFilters.findIndex((elem) => elem.label === "Variant");
    const cityIndex = oldFilters.findIndex((elem) => elem.label === "City");
    const countryIndex = oldFilters.findIndex((elem) => elem.label === "Country");

    if (allMakes.data) {
      oldFilters[makeIndex].filterOptions = allMakes.data?.items;
    }
    if (filters.make && allModels.data) {
      oldFilters[modelIndex].filterOptions = allModels.data.items;
    }
    // if (filters.model && allVariants.data) {
    //   oldFilters[variantIndex].filterOptions = allVariants.data.items;
    // }
    if (allCountries.data) {
      oldFilters[countryIndex].filterOptions = allCountries.data.items;
    }
    if (filters.country && allCities.data) {
      oldFilters[cityIndex].filterOptions = allCities.data.items;
    }

    setFiltersList(oldFilters);
  }, [allMakes, allModels, allCountries, allCities]);
  // }, [allMakes, allModels, allVariants, allCountries, allCities]);

  //   console.log("filters", filters);
  // console.log("vehiclesCount", vehiclesCount);
  // console.log("vehiclesCountByFilter", vehiclesCountByFilter);

  return (
    <>
      <HeroAdd />

      <section>
        <Row>
          <h5 className="fw-bold text-center">ADVANCED SEARCH</h5>
          <h6 className="text-center mb-5">Search the largest choice of vans</h6>
          <Col lg={4} className="d-flex flex-column" style={{ gap: 10 }}>
            <div className="d-flex justify-content-between my-2 gap-10">
              <div className="w-100">
                <label>Country</label>
                <CountryFilter filterType={"country"} />
              </div>
              {filters.country?.label !== "Africa" && (
                <div className="w-100">
                  <label>City</label>
                  <CountryFilter filterType={"city"} />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between my-2 gap-10">
              <div className="w-100">
                <label>Make</label>
                <CountryFilter filterType={"make"} />
              </div>
              <div className="w-100">
                <label>Model</label>
                <CountryFilter filterType={"model"} />
              </div>
            </div>
            <div className="d-flex justify-content-between my-2 gap-10">
              <div>
                <label>Min Price</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ height: 40 }}
                  placeholder="Enter Min Price"
                  name="minPrice"
                  value={filters.minPrice?.value || ""}
                  min={0}
                  onKeyDown={preventMinus}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 10) return;
                    handleUpdateFilter("minPrice", { value: value, label: value });
                  }}
                />
              </div>

              <div>
                <label>Min Price</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ height: 40 }}
                  placeholder="Enter Max Price"
                  name="maxPrice"
                  value={filters.maxPrice?.value || ""}
                  min={0}
                  onKeyDown={preventMinus}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 10) return;
                    handleUpdateFilter("maxPrice", { value: value, label: value });
                  }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between my-2 gap-10">
              <div className="w-100">
                <label>Min Mileage</label>
                <SelectBox
                  placeholder="Max Mileage"
                  options={vansMileageList.slice(0, -2)}
                  value={filters.minMileage || ""}
                  onChange={(value) => {
                    handleUpdateFilter("minMileage", value);
                  }}
                />
              </div>
              <div className="w-100">
                <label>Max Mileage</label>
                <SelectBox
                  placeholder="Max Mileage"
                  options={vansMileageList.slice(2)}
                  value={filters.maxMileage || ""}
                  onChange={(value) => {
                    handleUpdateFilter("maxMileage", value);
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between my-2 gap-10">
              <div className="w-100">
                <label>From (Year)</label>
                <SelectBox
                  options={getYearList()}
                  value={filters.minYear || ""}
                  onChange={(value) => {
                    handleUpdateFilter("minYear", value);
                  }}
                />
              </div>
              <div className="w-100">
                <label>To (Year)</label>
                <SelectBox
                  options={getYearList()}
                  value={filters.maxYear || ""}
                  onChange={(value) => {
                    handleUpdateFilter("maxYear", value);
                  }}
                />
              </div>
            </div>

            <div className="allFiltersAdd">Add Container</div>
          </Col>
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
                        ?.count?.toLocaleString()}
                      )
                    </p>
                  </Col>
                ))}
              </Row>
            </fieldset>
            <fieldset className="border my-3">
              <legend>Fuel Type</legend>
              <Row className="py-3">
                {fuelTypeOptions.map((fuelType) => (
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
                  <label>Door</label>
                  <Select
                    options={doorOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.door}
                    onChange={(selected) => {
                      handleUpdateFilter("door", selected);
                    }}
                  />
                </div>
                <div className="w-100">
                  <label>Seat</label>
                  <Select
                    options={vansSeatOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.seat}
                    onChange={(selected) => {
                      handleUpdateFilter("seat", selected);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between my-2 gap-10">
                <div className="w-100">
                  <label>Wheel Base</label>
                  <Select
                    options={vansWheelBaseOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.wheelBase}
                    onChange={(selected) => {
                      handleUpdateFilter("wheelBase", selected);
                    }}
                  />
                </div>
                <div className="w-100">
                  <label>Gear Box</label>
                  <Select
                    options={gearBoxOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.gearBox}
                    onChange={(selected) => {
                      handleUpdateFilter("gearBox", selected);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between row my-2 gap-10">
                <div className="col-6 pe-0">
                  <label>Driver Position</label>
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
              <div className="d-flex justify-content-between my-2 gap-10">
                <div className="w-100">
                  <label>Engine Size</label>
                  <Select
                    options={engineSizeOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.engineSize}
                    onChange={(selected) => {
                      handleUpdateFilter("engineSize", selected);
                    }}
                  />
                </div>
                <div className="w-100">
                  <label>Acceleration</label>
                  <Select
                    options={accelerationOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.acceleration}
                    onChange={(selected) => {
                      handleUpdateFilter("acceleration", selected);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between row my-2 gap-10">
                <div className="col-6 pe-0">
                  <label>Engine Power</label>
                  <Select
                    options={vansEnginePowerOptions}
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
              <legend>Running Cost</legend>
              <div className="d-flex justify-content-between my-2 gap-10">
                <div className="w-100">
                  <label>Fuel Consumption</label>
                  <Select
                    options={fuelConsumtionOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.fuelConsumtion}
                    onChange={(selected) => {
                      handleUpdateFilter("fuelConsumtion", selected);
                    }}
                  />
                </div>
                <div className="w-100">
                  <label>CO2 Emission</label>
                  <Select
                    options={co2EmmisionOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.co2Emmision}
                    onChange={(selected) => {
                      handleUpdateFilter("co2Emmision", selected);
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
                navigate("/vans/all");
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
        </Row>
      </section>
    </>
  );
}
