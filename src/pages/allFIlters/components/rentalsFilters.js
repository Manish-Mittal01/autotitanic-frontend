import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import SelectBox from "../../../components/selectBox";
import { carsFilters } from "../../../utils/filters/cars";
import { resetFilters, selectFilters } from "../../../redux/filters/slice";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getVehicleCount } from "../../../redux/vehicles/thunk";
import HeroAdd from "../../../components/heroSection/heroAdd";
import CountryFilter from "../../../components/filters";
import { preventMinus } from "../../../utils";
import { carsMileageList } from "../../../utils/filters/cars/options";
import { colorsList, fuelTypeOptions, getYearList } from "../../../utils/filters/common/options";
import { getAllMake, getAllModel } from "../../../redux/makeAndModel/thunk";
import { rentalsPriceTypeOptions } from "../../../utils/filters/rental/options";

export default function AllRentalsFilters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehiclesCount } = useSelector((state) => state.vehicles);
  const { filters } = useSelector((state) => state.filters);
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
      filters: { ...newFilters, status: "approved", type: "", sellOrRent: "rent" },
    });
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake);
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, { makeId: filters.make.value, type: "cars" });
  };

  useEffect(() => {
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
          <h6 className="text-center mb-5">Search the largest choice of rentals</h6>
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
                  options={carsMileageList.slice(0, -2)}
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
                  options={carsMileageList.slice(2)}
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

              <div className="d-flex justify-content-between row my-2 gap-10">
                <div className="col-6 pe-0">
                  <label>Price type</label>
                  <Select
                    options={rentalsPriceTypeOptions}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    value={filters.priceType}
                    onChange={(selected) => {
                      handleUpdateFilter("priceType", selected);
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
        </Row>
      </section>
    </>
  );
}
