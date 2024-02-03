import React, { useEffect } from "react";
import { handleApiRequest } from "../../services/handleApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountry } from "../../redux/countryAndCity/thunk";
import SelectBox from "../selectBox";
import { Button } from "react-bootstrap";
import { getVehicleCount } from "../../redux/vehicles/thunk";
import { getAllMake, getAllModel } from "../../redux/makeAndModel/thunk";
import { useNavigate } from "react-router-dom";
import { priceList } from "../../utils/filters";
import { resetFilters, selectFilters } from "../../redux/filters/slice";
import { isArray } from "../../utils/dataTypes";

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
    const africa =
      "https://firebasestorage.googleapis.com/v0/b/autotitanic-fde97.appspot.com/o/autotitanic%2Fafrica.jpg%2F1704646552270?alt=media&token=8583e54d-c990-4135-bccf-3f93bbc0a138";
    return !isDisabled ? (
      <div {...innerProps} className="pointer p-2">
        <img className="countryDropFlag" src={data.flag || africa} />
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
          className="searchBoxWrapper bg-white p-4 rounded ms-4"
          style={{ display: showFilterBox ? "" : "none" }}
        >
          <h5 className="text-center">Find your dream Cars</h5>
          <SelectBox
            placeholder="Select Country"
            components={{ Option: CountryFilterOptions, IndicatorSeparator: null }}
            options={[{ _id: "", name: "Africa" }, ...isArray(allCountries.data?.items)]}
            value={filters.country || ""}
            onChange={(selected) => {
              handleUpdateFilters("country", { value: selected._id, label: selected.name });
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
          <div className="d-flex justify-content-between my-2 gap-10">
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
              More Filters
            </u>
          </div>
        </div>
      </section>
    </div>
  );
}
