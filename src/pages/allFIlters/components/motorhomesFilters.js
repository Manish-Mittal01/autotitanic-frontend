import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import aClass from "../../../Assets/Images/aClass.png";
import americanRv from "../../../Assets/Images/americanRV.jpg";
import cClass from "../../../Assets/Images/cClass.jpg";
import camper from "../../../Assets/Images/camper.jpg";
import couchBuilt from "../../../Assets/Images/couchBuilt.jpg";
import highTop from "../../../Assets/Images/highTop.jpg";
import lowProfile from "../../../Assets/Images/lowProfile.jpg";
import micro from "../../../Assets/Images/micro.png";
import vanConversion from "../../../Assets/Images/vanConersion.jpg";
import SelectBox from "../../../components/selectBox";
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
import { vansFilters } from "../../../utils/filters/vans";
import { getAllMake, getAllModel } from "../../../redux/makeAndModel/thunk";
import {
  motorhomesBedroomLayoutOptions,
  motorhomesBirthOptions,
  motorhomesEndLayoutOptions,
  motorhomesFuelTypeOptions,
  motorhomesGearBoxOptions,
  motorhomesLengthOptions,
} from "../../../utils/filters/motorhomes/options";

export const bodyTypeOptions = [
  { img: aClass, value: "aClass", label: "A Class" },
  { img: americanRv, value: "americanRV", label: "American RV" },
  { img: cClass, value: "cClass", label: "C Class" },
  { img: camper, value: "campervan", label: "Camper Van" },
  { img: couchBuilt, value: "couchBuilt", label: "Couch Built" },
  { img: highTop, value: "highTop", label: "High Top" },
  { img: lowProfile, value: "lowProfile", label: "Low Profile" },
  { img: micro, value: "microMotorhome", label: "Micro" },
  { img: vanConversion, value: "vanconversion", label: "Van Conversion" },
];

export default function AllMotorhomesFilters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehiclesCount, vehiclesCountByFilter } = useSelector((state) => state.vehicles);
  const { filters } = useSelector((state) => state.filters);
  // const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);
  const [filtersList, setFiltersList] = useState(vansFilters);

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
      filters: { ...newFilters, status: "approved", type: "motorhomes" },
    });
  };

  const getVehicleCountByFilter = async () => {
    const bodyStyles = bodyTypeOptions.map((type) => {
      return type.value;
    });
    const request = {
      filters: { bodyStyle: bodyStyles, type: "motorhomes" },
    };
    const response = await handleApiRequest(getVehicleCountByBody, request);
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake, { type: "motorhomes" });
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, { makeId: filters.make.value, type: "motorhomes" });
  };

  useEffect(() => {
    getVehicleCountByFilter();
    handleMakeList();
  }, []);

  useEffect(() => {
    handleResultCount();
  }, [filters]);

  useEffect(() => {
    if (filters.make?.value) {
      handleModelList();
    }
  }, [filters.make]);

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

  return (
    <>
      <HeroAdd />

      <section>
        <Row>
          <h5 className="fw-bold text-center">ADVANCED SEARCH</h5>
          <h6 className="text-center mb-5">Search the largest choice of motorhomes</h6>
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
                <SelectBox
                  placeholder="Make"
                  options={allMakes.data?.items || []}
                  value={filters.make || ""}
                  onChange={(selected) => {
                    handleUpdateFilter("make", { value: selected._id, label: selected.label });
                  }}
                />
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
                {motorhomesFuelTypeOptions.map((fuelType) => (
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
                  <label>Berth</label>
                  <Select
                    options={motorhomesBirthOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.birth}
                    onChange={(selected) => {
                      handleUpdateFilter("birth", selected);
                    }}
                  />
                </div>
                <div className="w-100">
                  <label>Belted Seat</label>
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
                  <label>End Layout</label>
                  <Select
                    options={motorhomesEndLayoutOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.endLayout}
                    onChange={(selected) => {
                      handleUpdateFilter("endLayout", selected);
                    }}
                  />
                </div>
                <div className="w-100">
                  <label>Bedroom Layout</label>
                  <Select
                    options={motorhomesBedroomLayoutOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.bedroomLayout}
                    onChange={(selected) => {
                      handleUpdateFilter("bedroomLayout", selected);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between row my-2 gap-10">
                <div className="col-6 pe-0">
                  <label>Length</label>
                  <Select
                    options={motorhomesLengthOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.length}
                    onChange={(selected) => {
                      handleUpdateFilter("length", selected);
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
                  <label>Transmission</label>
                  <Select
                    options={motorhomesGearBoxOptions}
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
                navigate("/motorhomes/all");
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
