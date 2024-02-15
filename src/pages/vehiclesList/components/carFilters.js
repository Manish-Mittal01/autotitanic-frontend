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
import { resetFilters, selectFilters } from "../../../redux/filters/slice";
import { preventMinus } from "../../../utils";
import { parseCamelKey } from "../../../utils/parseKey";

export default function CarFilters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { vehiclesList } = useSelector((state) => state.vehicles);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  // const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);
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

  const handleResetFilters = async () => {
    dispatch(resetFilters());
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
    // const variantIndex = oldFilters.findIndex((elem) => elem.label === "Variant");
    const countryIndex = oldFilters.findIndex((elem) => elem.label === "Country");
    const cityIndex = oldFilters.findIndex((elem) => elem.label === "City");

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

  //   console.log("allMakes", allMakes);
  //   console.log("allModels", allModels);
  //   console.log("filtersList", filtersList);
  //   console.log("allVariants", allVariants);
  // console.log("filters", filters);
  // console.log("allCountries", allCountries);
  // console.log("vehiclesList", vehiclesList);

  return (
    <>
      <div className="border rounded py-3">
        <h4 className="text-center">{vehiclesList.data?.totalCount} Cars found</h4>
        <div className="text-center">
          <Button variant="" className="drakColor" onClick={handleResetFilters}>
            <h6>Reset Filters</h6>
          </Button>
        </div>
        {/* <p className="text-center">0 filters selected</p> */}

        <ul className="list-unstyled">
          {filtersList.map((filter, i) => (
            <Fragment key={filter.label}>
              <li
                key={filter.label}
                className={`d-flex justify-content-between px-3 py-2 border-top ${
                  !filters.make && filter.label === "Model"
                    ? // || (!filters.model && filter.label === "Variant")
                      "disabled"
                    : ""
                }`}
              >
                {filter.label === "Country" && filters[filter.name]?.label === "Africa" ? (
                  <span className="text-danger">Continent</span>
                ) : (
                  <span className="text-danger">{filter.label}</span>
                )}
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
                                  .map((filterValue, ind) => (
                                    <td key={ind} className="filterOption pointer">
                                      <div className="d-flex align-items-center">
                                        {filter.label === "Country" && (
                                          <img src={filterValue.flag} width={20} className="me-1" />
                                        )}
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
                                      </div>
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
                          onClick={() => {
                            if (filter.name === "country") {
                              handleSelectFilter(filter.name, "", "Africa");
                            } else {
                              handleSelectFilter(filter.name, "", "");
                            }
                          }}
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
                            value={filters[filter.filterOptions[filterKey].key] || ""}
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
              {filter.filterType === "input" && (
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
                          <input
                            type="number"
                            className="form-control"
                            style={{ height: 40 }}
                            placeholder={parseCamelKey(filter.filterOptions[filterKey].key)}
                            min={0}
                            onKeyDown={preventMinus}
                            name={filter.filterOptions[filterKey].key}
                            value={filters[filter.filterOptions[filterKey].key]?.value || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value.length > 10) return;
                              dispatch(
                                selectFilters({
                                  [filter.filterOptions[filterKey].key]: {
                                    value: value,
                                    label: value,
                                  },
                                })
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
      <div className="fullSizeAddContainer d-none d-lg-flex" style={{ width: 200, height: 200 }}>
        Add Container
        <br />
        (200 x 200)
      </div>
      <div className="fullSizeAddContainer d-none d-lg-flex" style={{ width: 200, height: 200 }}>
        Add Container
        <br />
        (200 x 200)
      </div>
    </>
  );
}
