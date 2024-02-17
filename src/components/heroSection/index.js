import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import africaFlag from "../../Assets/Images/africa-flag.png";
import { isArray } from "../../utils/dataTypes";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getAllCountry } from "../../redux/countryAndCity/thunk";
import { getAllMake, getAllModel } from "../../redux/makeAndModel/thunk";
import { getVehicleCount } from "../../redux/vehicles/thunk";
import { resetFilters, selectFilters } from "../../redux/filters/slice";
import SelectBox from "../selectBox";
import { preventMinus } from "../../utils";

export default function HeroSection({ showFilterBox = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { allCountries } = useSelector((state) => state.countryAndCity);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { vehiclesCount } = useSelector((state) => state.vehicles);

  const handleUpdateFilters = (name, value) => {
    dispatch(selectFilters({ [name]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleCountryList = async () => {
    handleApiRequest(getAllCountry);
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake);
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, filters.make.value);
  };

  const handleResultCount = async () => {
    const request = {
      ...filters,
      country: filters.country?.value || "",
      make: filters.make?.value || "",
      model: filters.model?.value || "",
      minPrice: filters.minPrice?.value,
      maxPrice: filters.maxPrice?.value,
      status: "approved",
    };
    handleApiRequest(getVehicleCount, { filters: request });
  };

  useEffect(() => {
    if (showFilterBox) {
      handleCountryList();
      handleMakeList();
    }
  }, []);

  useEffect(() => {
    if (showFilterBox) handleResultCount();
  }, [filters]);

  useEffect(() => {
    if (filters.make?.value && showFilterBox) {
      handleModelList();
    }
  }, [filters.make]);

  const CountryFilterOptions = ({ data, isDisabled, innerProps, ...props }) => {
    return !isDisabled ? (
      <div {...innerProps} className="pointer p-2">
        <img className="countryDropFlag" src={data.flag || africaFlag} />
        <span className="ms-2">{data.name}</span>
      </div>
    ) : null;
  };

  // console.log("filters", filters);
  //   console.log("allCountries", allCountries);
  //   console.log("allMakes", allMakes);
  //   console.log("allModels", allModels);
  // console.log("vehiclesCount", vehiclesCount);

  return (
    <div className="mx-0 mx-lg-2">
      <section className="heroSectionWrapper" style={{ minHeight: !showFilterBox ? 250 : "" }}>
        <div
          className="searchBoxWrapper bg-white p-4 rounded mx-4"
          style={{ display: showFilterBox ? "" : "none" }}
        >
          <h5 className="text-center">Find your dream Car</h5>
          <SelectBox
            isSearchable={false}
            placeholder="Select Country"
            components={{ Option: CountryFilterOptions, IndicatorSeparator: null }}
            options={[
              { _id: "", name: "Africa", flag: africaFlag },
              ...isArray(allCountries.data?.items),
            ]}
            getOptionLabel={(option) => {
              return (
                <div className="pointer p-2">
                  <img className="countryDropFlag" src={option.flag} />
                  <span className="ms-1">{option.label}</span>
                </div>
              );
            }}
            value={filters.country || ""}
            onChange={(selected) => {
              handleUpdateFilters("country", {
                value: selected._id,
                label: selected.name,
                flag: selected.flag,
              });
            }}
          />
          <div className="d-flex justify-content-between my-2 gap-10">
            <SelectBox
              placeholder="Make"
              options={allMakes.data?.items || []}
              value={filters.make || ""}
              onChange={(selected) => {
                handleUpdateFilters("make", { value: selected._id, label: selected.label });
              }}
            />
            <SelectBox
              placeholder="Model"
              options={allModels.data?.items || []}
              value={filters.model || ""}
              onChange={(selected) => {
                handleUpdateFilters("model", { value: selected._id, label: selected.label });
              }}
            />
          </div>
          {/* <div className="d-flex justify-content-between my-2 gap-10">
            <SelectBox
              placeholder="Min Price"
              options={priceList.slice(0, -2)}
              value={filters.minPrice || ""}
              onChange={(value) => {
                handleUpdateFilters("minPrice", value);
              }}
            />
            <SelectBox
              placeholder="Max Price"
              options={priceList.slice(2)}
              value={filters.maxPrice || ""}
              onChange={(value) => {
                handleUpdateFilters("maxPrice", value);
              }}
            />
          </div> */}
          <div className="d-flex justify-content-between my-2 gap-10">
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
                handleUpdateFilters("minPrice", { value: value, label: value });
              }}
            />
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
                handleUpdateFilters("maxPrice", { value: value, label: value });
              }}
            />
          </div>
          <div className="text-center my-3">
            <Button variant="danger" onClick={() => navigate("/cars")}>
              Search {vehiclesCount.data?.totalCount?.toLocaleString()} Cars
            </Button>
          </div>
          <div className="d-flex justify-content-between">
            <u className="text-primary pointer" onClick={() => handleResetFilters()}>
              Reset Filters
            </u>
            <u className="text-primary pointer" onClick={() => navigate("/allFilters")}>
              More Options
            </u>
          </div>
        </div>
      </section>
    </div>
  );
}
