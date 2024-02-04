import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CrossIcon } from "../../Assets/icons/cross.svg";
import mainLogo from "../../Assets/Images/mainLogo.png";
import { categories } from "../../utils";
import { handleFilterBar } from "../../redux/common/slice";
import { filterOptions } from "../../utils/filters";
import SelectBox from "../selectBox";
import { resetFilters, selectFilters } from "../../redux/filters/slice";
import parseKey from "../../utils/parseKey";

const FilterBar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);
  const [filtersList, setFiltersList] = useState(filterOptions);

  const handleSidebar = () => {
    dispatch(handleFilterBar());
  };

  const handleUpdateFilter = (name, value) => {
    dispatch(selectFilters({ [name]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

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

  return (
    <>
      <div className="sidebar active">
        <div className="top text-center pt-4">
          <img src={mainLogo} className="w-100" />
          {/* <h2 className="m-0 py-2">Main Menu</h2> */}
        </div>
        <div className="w-100 bg-transparent nav" style={{ overflowX: "hidden" }}>
          <button
            type="button"
            className="border-0 p-0 closebtn d-lg-none btn close-btn position-absolute btn btn-transparent"
            onClick={handleSidebar}
          >
            <CrossIcon />
          </button>
          <Row className="justify-content-center">
            {filtersList.map((filter) =>
              Array.isArray(filter.filterOptions) ? (
                <Col xs={12} className="my-2">
                  <label className="">
                    <span className="">{filter.label}</span>
                  </label>
                  <SelectBox
                    options={filter.filterOptions}
                    value={filters.name}
                    getOptionLabel={(option) => option.label || option.name}
                    getOptionValue={(option) => option.value || option._id}
                    onChange={(selected) => {
                      const value = {
                        value: selected.value || selected._id,
                        label: selected.label || selected.name,
                      };
                      handleUpdateFilter(filter.name, value);
                    }}
                  />
                </Col>
              ) : (
                Object.keys(filter.filterOptions).map((filterKey) => (
                  <Col xs={12} className="my-2">
                    <label className="">
                      <span className="">{filterKey + " " + parseKey(filter.name)}</span>
                    </label>
                    <SelectBox
                      options={filter.filterOptions[filterKey].options}
                      value={filter[filter.filterOptions[filterKey].key]}
                      onChange={(value) => {
                        handleUpdateFilter([filter.filterOptions[filterKey].key], value);
                      }}
                    />
                  </Col>
                ))
              )
            )}
          </Row>
          <Button variant="" className="text-danger" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          {/* <ul className="list-unstyled mb-0 w-100 sidebar-links pt-3">
            {categories.map((category, i) => (
              <li>
                <Accordion>
                  <Accordion.Item>
                    <Accordion.Header>{category.label}</Accordion.Header>
                    <Accordion.Body>
                      <ul className="list-unstyled  mb-0">
                        <li className="py-1">
                          <Link
                            className="d-flex align-items-center active p-0"
                            //    to="/caregivers"
                          >
                            Used {category.label}
                          </Link>
                        </li>
                        <li className="py-1">
                          <Link
                            className="d-flex align-items-center"
                            //    to="/caregiver/jobs"
                          >
                            New {category.label}
                          </Link>
                        </li>
                        <li className="py-1">
                          <Link
                            className="d-flex align-items-center"
                            //    to="/caregiver/jobs"
                          >
                            Sell {category.label}
                          </Link>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default FilterBar;
