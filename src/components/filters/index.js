import React, { useEffect } from "react";
import SelectBox from "../selectBox";
import africaFlag from "../../Assets/Images/africa-flag.png";
import { isArray } from "../../utils/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getAllMake, getAllModel } from "../../redux/makeAndModel/thunk";
import { getAllCity, getAllCountry } from "../../redux/countryAndCity/thunk";
import { selectFilters } from "../../redux/filters/slice";

export default function CountryFilter({ filterType }) {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);

  const CountryFilterOptions = ({ data, isDisabled, innerProps }) => {
    return !isDisabled ? (
      <div {...innerProps} className="pointer p-2">
        <img className="countryDropFlag" src={data.flag || africaFlag} />
        <span className="ms-2">{data.name}</span>
      </div>
    ) : null;
  };

  const handleUpdateFilters = (name, value) => {
    if (name === "country" && !value.value) {
      dispatch(selectFilters({ [name]: value, city: "" }));
    } else if (name === "make" && !value.value) {
      dispatch(selectFilters({ [name]: value, model: "" }));
    } else {
      dispatch(selectFilters({ [name]: value }));
    }
  };

  const handleCountryList = async () => {
    handleApiRequest(getAllCountry);
  };

  const handleCityList = async () => {
    await handleApiRequest(getAllCity, filters.country.value);
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake);
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, { makeId: filters.make.value });
  };

  useEffect(() => {
    if (filterType === "country") {
      handleCountryList();
    } else if (filterType === "make") {
      handleMakeList();
    }
  }, [filterType]);

  useEffect(() => {
    if (filters.make?.value && filterType === "model") {
      handleModelList();
    }
  }, [filters.make, filterType]);

  useEffect(() => {
    if (filters.country?.value && filterType === "city") {
      handleCityList();
    }
  }, [filters.country, filterType]);

  return filterType === "country" ? (
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
          <div className="pointer px-2">
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
  ) : filterType === "city" ? (
    <SelectBox
      placeholder="Select City"
      options={allCities.data?.items || []}
      value={filters.city || ""}
      getOptionLabel={(option) => option.name || option.label}
      onChange={(selected) => {
        handleUpdateFilters("city", {
          value: selected._id,
          label: selected.name,
        });
      }}
    />
  ) : filterType === "make" ? (
    <SelectBox
      placeholder="Make"
      options={allMakes.data?.items || []}
      value={filters.make || ""}
      onChange={(selected) => {
        handleUpdateFilters("make", { value: selected._id, label: selected.label });
      }}
    />
  ) : filterType === "model" ? (
    <SelectBox
      placeholder="Model"
      options={allModels.data?.items || []}
      value={filters.model || ""}
      onChange={(selected) => {
        handleUpdateFilters("model", { value: selected._id, label: selected.label });
      }}
    />
  ) : (
    ""
  );
}
