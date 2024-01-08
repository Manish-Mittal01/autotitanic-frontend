import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectBox from "../../../components/selectBox";
import Tooltip from "../../../components/myTooltip";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { filterOptions } from "../../../utils/filters";
import { isArray } from "../../../utils/dataTypes";
import { getAllCity, getAllCountry } from "../../../redux/countryAndCity/thunk";
import { getAllMake, getAllModel, getAllVariant } from "../../../redux/makeAndModel/thunk";
import { selectFilters } from "../../../redux/filters/slice";

export default function CarFilters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { vehiclesList } = useSelector((state) => state.vehicles);
  const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);

  const [showFilterOptions, setShowFilterOptions] = useState(null);
  const [filtersList, setFiltersList] = useState([...filterOptions]);

  const handleSelectFilter = (name, value, label) => {
    if (name === "make")
      dispatch(selectFilters({ [name]: { value, label }, model: "", variant: "" }));
    else if (name === "model") dispatch(selectFilters({ [name]: { value, label }, variant: "" }));
    else dispatch(selectFilters({ [name]: { value, label } }));
    setShowFilterOptions(null);
  };

  const handleCountryList = async () => {
    handleApiRequest(getAllCountry);
  };

  const handleCityList = async () => {
    handleApiRequest(getAllCity, filters.country?.value);
  };

  const handleMakeList = async () => {
    handleApiRequest(getAllMake);
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, filters.make?.value);
  };

  const handleVariantList = async () => {
    handleApiRequest(getAllVariant, filters.model?.value);
  };

  useEffect(() => {
    handleCountryList();
    handleMakeList();
  }, []);

  useEffect(() => {
    if (filters.make?.value) handleModelList();
    if (filters.model?.value) handleVariantList();
    if (filters.country?.value) handleCityList();
  }, [filters]);

  useEffect(() => {
    const oldFilters = [...filtersList];
    const makeIndex = oldFilters.findIndex((elem) => elem.label === "Make");
    const modelIndex = oldFilters.findIndex((elem) => elem.label === "Model");
    const variantIndex = oldFilters.findIndex((elem) => elem.label === "Variant");
    const countryIndex = oldFilters.findIndex((elem) => elem.label === "Country");
    const cityIndex = oldFilters.findIndex((elem) => elem.label === "City");

    if (allMakes.data) {
      oldFilters[makeIndex].filterOptions = allMakes.data?.items;
    }
    if (filters.make && allModels.data) {
      oldFilters[modelIndex].filterOptions = allModels.data.items;
    }
    if (filters.model && allVariants.data) {
      oldFilters[variantIndex].filterOptions = allVariants.data.items;
    }
    if (allCountries.data) {
      oldFilters[countryIndex].filterOptions = allCountries.data.items;
    }
    if (filters.country && allCities.data) {
      oldFilters[cityIndex].filterOptions = allCities.data.items;
    }

    setFiltersList(oldFilters);
  }, [allMakes, allModels, allVariants, allCountries, allCities]);

  //   console.log("allMakes", allMakes);
  //   console.log("allModels", allModels);
  //   console.log("filtersList", filtersList);
  //   console.log("allVariants", allVariants);
  // console.log("filters", filters);
  // console.log("allCountries", allCountries);

  return (
    <div className="border rounded py-3">
      <h4 className="text-center">{vehiclesList.data?.totalCount} Cars found</h4>
      {/* <p className="text-center">0 filters selected</p> */}

      <ul className="list-unstyled">
        {filtersList.map((filter, i) => (
          <Fragment key={filter.label}>
            <li
              key={filter.label}
              className={`d-flex justify-content-between px-3 py-2 border-top ${
                (!filters.make && filter.label === "Model") ||
                (!filters.model && filter.label === "Variant")
                  ? "disabled"
                  : ""
              }`}
            >
              <span className="text-danger">{filter.label}</span>
              {filter.filterType === "normal" && filter.filterOptions.length > 0 ? (
                <Tooltip
                  text={filters[filter.name]?.label ? `${filters[filter.name]?.label}>` : "Any >"}
                  showTooltip={() => setShowFilterOptions(i)}
                >
                  <div
                    className="tooltiptext"
                    style={showFilterOptions === i ? { visibility: "visible", opacity: 1 } : {}}
                  >
                    <div className="d-flex justify-content-between align-items-center border-bottom">
                      <h5 className="filterModelHeading">Select {filter.label}</h5>
                      <Button
                        variant="link"
                        className="text-decoration-none"
                        onClick={() => setShowFilterOptions(null)}
                      >
                        Close
                      </Button>
                    </div>

                    <table className="my-3 w-100">
                      <tbody>
                        {Array.from({ length: Math.ceil(filter.filterOptions.length / 4) }).map(
                          (_, i) => (
                            <tr key={i}>
                              {isArray(filter.filterOptions)
                                .slice(i * 4, i * 4 + 4)
                                .map((filterValue) => (
                                  <td key={filterValue.label} className="filterOption pointer">
                                    <p
                                      className="m-0 text-primary"
                                      onClick={() =>
                                        handleSelectFilter(
                                          filter.name,
                                          filterValue.value || filterValue._id,
                                          filterValue.label || filterValue.name
                                        )
                                      }
                                    >
                                      {filterValue.label || filterValue.name}
                                    </p>
                                  </td>
                                ))}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    <div className="text-start my-2">
                      <Button
                        variant="outline-primary"
                        onClick={() => handleSelectFilter(filter.name, "", "")}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </Tooltip>
              ) : (
                <span>{"Any>"}</span>
              )}
            </li>
            {filter.filterType === "range" && (
              <>
                {Object.keys(filter.filterOptions).map((filterKey) => (
                  <li
                    key={filterKey}
                    className="d-flex justify-content-between align-items-center px-3 py-2 "
                  >
                    <Row className="w-100">
                      <Col xs={4} className="">
                        <span className="">{filterKey}</span>
                      </Col>
                      <Col xs={8} className="p-0">
                        <SelectBox
                          options={filter.filterOptions[filterKey].options}
                          value={filter[filter.filterOptions[filterKey].key]}
                          onChange={(value) => {
                            dispatch(
                              selectFilters({ [filter.filterOptions[filterKey].key]: value })
                            );
                          }}
                        />
                      </Col>
                    </Row>
                  </li>
                ))}
              </>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
