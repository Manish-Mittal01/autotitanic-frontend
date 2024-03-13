import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import coupe from "../../../Assets/Images/Coupe.png";
import convertible from "../../../Assets/Images/Convertible.png";
import estate from "../../../Assets/Images/Estate.png";
import hatchback from "../../../Assets/Images/Hatchback.png";
import mpv from "../../../Assets/Images/Mpv.png";
import pickup from "../../../Assets/Images/Pickup.png";
import saloon from "../../../Assets/Images/Saloon.png";
import suv from "../../../Assets/Images/suv.png";
import SelectBox from "../../../components/selectBox";
import { carsFilters } from "../../../utils/filters/cars";
import { selectFilters } from "../../../redux/filters/slice";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getVehicleCount, getVehicleCountByBody } from "../../../redux/vehicles/thunk";
import HeroAdd from "../../../components/heroSection/heroAdd";
import CountryFilter from "../../../components/filters";
import { preventMinus } from "../../../utils";
import { carsMileageList } from "../../../utils/filters/cars/options";
import { getYearList } from "../../../utils/filters/common/options";
import { getAllMake, getAllModel } from "../../../redux/makeAndModel/thunk";
import TruckFilters from "./truckFilters";
import FarmFilters from "./farmsFIlters";
import AllPartsFilters from "./partAndAccessoriesFilters";
import PlantFilters from "./plantFilters";

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

export default function MoreFilters() {
  const { pathname } = useLocation();
  const category = pathname.split("/")[1];

  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  // const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);
  const [filtersList, setFiltersList] = useState(carsFilters);

  const handleUpdateFilter = (name, value) => {
    dispatch(selectFilters({ [name]: value }));
  };

  const handleResultCount = async () => {
    const newFilters = {};
    Object.entries(filters).forEach((filter) => {
      newFilters[filter[0]] =
        typeof filter[1] === "object" ? filter[1].value || filter[1]._id : filter[1];
    });

    handleApiRequest(getVehicleCount, {
      filters: { ...newFilters, status: "approved", type: category },
    });
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake, { type: category });
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, { makeId: filters.make.value, type: category });
  };

  useEffect(() => {
    handleMakeList();
  }, [pathname]);

  useEffect(() => {
    handleResultCount();
  }, [filters, pathname]);

  useEffect(() => {
    if (filters.make?.value) {
      handleModelList();
    }
  }, [filters.make, pathname]);

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
          <h6 className="text-center mb-5">Search the largest choice of {category}</h6>
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

            {category !== "farms" && category !== "plants" && (
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
            )}
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

          {category === "trucks" ? (
            <TruckFilters />
          ) : category === "farms" ? (
            <FarmFilters />
          ) : category === "farms" ? (
            <FarmFilters />
          ) : category === "plants" ? (
            <PlantFilters />
          ) : (
            ""
          )}
        </Row>
      </section>
    </>
  );
}
