import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import HeroSection from "../../components/heroSection";
import SelectBox from "../../components/selectBox";
import { filterOptions, priceList } from "../../utils/filters";
import parseKey from "../../utils/parseKey";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "../../redux/filters/slice";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getAllCity, getAllCountry } from "../../redux/countryAndCity/thunk";
import { getAllMake, getAllModel, getAllVariant } from "../../redux/makeAndModel/thunk";
import { getVehicleCount } from "../../redux/vehicles/thunk";
import { useNavigate } from "react-router-dom";
import HeroAdd from "../../components/heroSection/heroAdd";

export default function AllFilters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vehiclesCount } = useSelector((state) => state.vehicles);
  const { filters } = useSelector((state) => state.filters);
  // const { allMakes, allModels, allVariants } = useSelector((state) => state.makeAndModel);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { allCountries, allCities } = useSelector((state) => state.countryAndCity);
  const [filtersList, setFiltersList] = useState(filterOptions);

  const handleUpdateFilter = (name, value) => {
    dispatch(selectFilters({ [name]: value }));
  };

  const handleCountryList = async () => {
    handleApiRequest(getAllCountry);
  };

  const handleAllCities = async () => {
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

  const handleResultCount = async () => {
    const newFilters = {};
    Object.entries(filters).forEach((filter) => {
      newFilters[filter[0]] = filter[1].value || filter[1]._id;
    });

    handleApiRequest(getVehicleCount, { filters: newFilters });
  };

  useEffect(() => {
    handleCountryList();
    handleMakeList();
  }, []);

  useEffect(() => {
    handleResultCount();

    if (filters.make?.value) handleModelList();
    // if (filters.model?.value) handleVariantList();
    if (filters.country?.value) handleAllCities();
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

  return (
    <>
      <HeroAdd />
      <section>
        <Row className="allFiltersContainer border rounded mx-2 my-5">
          <div className="my-3 d-flex justify-content-between">
            <p>ADVANCED SEARCH</p>
            <h6 className="text-danger fw-bold ">{vehiclesCount.data?.totalCount} Result found</h6>
          </div>
          <Col md={9} className="">
            <Row className="justify-content-center">
              {filtersList.map((filter) =>
                Array.isArray(filter.filterOptions) ? (
                  <Col md={5} className="my-2">
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
                    <Col md={5} className="my-2">
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
            <Button variant="danger" className="my-3 w-100" onClick={() => navigate("/cars")}>
              Search
            </Button>
          </Col>
          <Col
            md={2}
            className={`fullSizeAddContainer  d-none d-xl-flex `}
            style={{ width: 160, height: 400 }}
          >
            Add Container
            <br />
            (160 x 400)
          </Col>
        </Row>
      </section>
    </>
  );
}
