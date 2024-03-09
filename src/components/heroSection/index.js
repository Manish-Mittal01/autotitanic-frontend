import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import africaFlag from "../../Assets/Images/africa-flag.png";
import { isArray } from "../../utils/dataTypes";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getAllCountry } from "../../redux/countryAndCity/thunk";
import { getAllMake, getAllModel } from "../../redux/makeAndModel/thunk";
import { getVehicleCount } from "../../redux/vehicles/thunk";
import { resetFilters, selectFilters } from "../../redux/filters/slice";
import SelectBox from "../selectBox";
import { preventMinus } from "../../utils";
import { handlePopularCarsMakeList } from "../../utils/filters/cars";
import parseKey, { parseCamelKey } from "../../utils/parseKey";
// import { handlePopularMakeList } from "../../utils/filters";
import { motorhomesBirthOptions } from "../../utils/filters/motorhomes/options";
import { getYearList } from "../../utils/filters/common/options";
import { trucksCategoryOptions } from "../../utils/filters/trucks/options";
import { caravansBirthOptions } from "../../utils/filters/caravans/options";
import { vansBodyStyleOptions } from "../../utils/filters/vans/options";

export default function HeroSection({ showFilterBox = true }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { allCountries } = useSelector((state) => state.countryAndCity);
  const { allMakes, allModels } = useSelector((state) => state.makeAndModel);
  const { vehiclesCount } = useSelector((state) => state.vehicles);

  const [popularMakes, setPopularMakes] = useState([]);
  const [heroBanner, setHeroBanner] = useState("../../Assets/Images/hero-image.png");

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
    handleApiRequest(getAllMake, { type: pathname.replace("/", "") });
  };

  const handleModelList = async () => {
    handleApiRequest(getAllModel, { makeId: filters.make.value });
  };

  const handleResultCount = async () => {
    const request = {
      ...filters,
      // country: filters.country?.value || "",
      // make: filters.make?.value || "",
      // model: filters.model?.value || "",
      // minPrice: filters.minPrice?.value,
      // maxPrice: filters.maxPrice?.value,
      status: "approved",
      type: pathname.split("/")[1],
      sellOrRent: "rent",
    };

    for (let key of Object.keys(filters || {})) {
      if ("value" in filters[key] && "label" in filters[key]) {
        request[key] = filters[key].value;
      }
    }

    if (pathname.includes("motorhomes")) {
      request.minYear = filters.minYear?.value;
      request.birth = filters.birth?.value;
    } else if (pathname.includes("caravans")) {
      request.birth = filters.birth?.value;
    } else if (pathname.includes("trucks")) {
      request.truckCategory = filters.truckCategory?.value;
    }
    handleApiRequest(getVehicleCount, { filters: request });
  };

  useEffect(() => {
    if (showFilterBox) {
      handleCountryList();
      handleMakeList();
    }
  }, [pathname]);

  useEffect(() => {
    if (showFilterBox) handleResultCount();
  }, [filters]);

  useEffect(() => {
    if (filters.make?.value && showFilterBox) {
      handleModelList();
    }
  }, [filters.make]);

  useEffect(async () => {
    const myMakes = await handlePopularCarsMakeList();
    setPopularMakes(myMakes);
  }, [allMakes]);

  useEffect(() => {
    const category = pathname.split("/")[1];
    switch (category) {
      case "cars":
        setHeroBanner("/assets/images/hero-image.png");
        break;
      case "caravans":
        setHeroBanner("/assets/images/caravanHome.jpg");
        break;
      case "vans":
        setHeroBanner("/assets/images/vanHome.jpg");
        break;
      case "motorhomes":
        setHeroBanner("/assets/images/motorhomeHome.jpg");
        break;
      case "farms":
        setHeroBanner("/assets/images/farmHome.jpg");
        break;
      case "partAndAccessories":
        setHeroBanner("/assets/images/partAccessoriesHome.jpg");
        break;
      case "trucks":
        setHeroBanner("/assets/images/truckHome.jpg");
        break;

      default:
        setHeroBanner("/assets/images/hero-image.png");
        break;
    }
  }, [pathname]);

  const CountryFilterOptions = ({ data, isDisabled, innerProps, ...props }) => {
    return !isDisabled ? (
      <div {...innerProps} className="pointer p-2">
        <img className="countryDropFlag" src={data.flag || africaFlag} />
        <span className="ms-2">{data.name}</span>
      </div>
    ) : null;
  };

  const MakeGroupLabel = (data) => (
    <div className="mainDarkColor text-white p-2 fw-bold">
      <span>{data.label}</span>
    </div>
  );

  return (
    <div className="mx-0 mx-lg-2">
      <section
        className="heroSectionWrapper"
        style={{
          minHeight: !showFilterBox ? 250 : "",
          backgroundImage: `url(${heroBanner})`,
        }}
      >
        <div
          className="searchBoxWrapper bg-white p-4 rounded mx-4"
          style={{ display: showFilterBox ? "" : "none" }}
        >
          <h5 className="text-center">
            Find your dream {parseCamelKey(pathname.split("/")[1]?.slice(0, -1))}
          </h5>
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
              classNamePrefix={"makeSelector"}
              formatGroupLabel={MakeGroupLabel}
              placeholder="Make"
              options={[
                {
                  label: "Most Searched for",
                  options: popularMakes,
                },
                {
                  label: "All Makes",
                  options: allMakes.data?.items || [],
                },
              ]}
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

          {pathname === "/vans" && (
            <SelectBox
              classNamePrefix={"makeSelector"}
              placeholder="Body type"
              options={vansBodyStyleOptions}
              value={filters.bodyStyle || ""}
              onChange={(selected) => {
                handleUpdateFilters("bodyStyle", selected);
              }}
            />
          )}

          {pathname === "/motorhomes" && (
            <div className="d-flex justify-content-between my-2 gap-10">
              <SelectBox
                classNamePrefix={"makeSelector"}
                placeholder="Birth"
                options={motorhomesBirthOptions}
                value={filters.birth || ""}
                onChange={(selected) => {
                  handleUpdateFilters("birth", selected);
                }}
              />
              <SelectBox
                placeholder="Year"
                options={getYearList()}
                value={filters.minYear || ""}
                onChange={(selected) => {
                  handleUpdateFilters("minYear", selected);
                }}
              />
            </div>
          )}

          {pathname === "/caravans" && (
            <SelectBox
              classNamePrefix={"makeSelector"}
              placeholder="Birth"
              options={caravansBirthOptions}
              value={filters.birth || ""}
              onChange={(selected) => {
                handleUpdateFilters("birth", selected);
              }}
            />
          )}

          {pathname === "/trucks" && (
            <SelectBox
              classNamePrefix={"makeSelector"}
              placeholder="Category"
              options={trucksCategoryOptions}
              value={filters.truckCategory || ""}
              onChange={(selected) => {
                handleUpdateFilters("truckCategory", selected);
              }}
            />
          )}

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

          {/* {(pathname.includes("trucks") ||
            pathname.includes("farms") ||
            pathname.includes("plants")) && (
            <input
              type="text"
              className="form-control"
              style={{ height: 40 }}
              placeholder="Enter Keyword"
              name="keyword"
              value={filters.keyword || ""}
              onChange={(e) => {
                const value = e.target.value;
                handleUpdateFilters("keyword", { value: value, label: value });
              }}
            />
          )} */}

          <div className="text-center my-3">
            <Button variant="danger" onClick={() => navigate(`${pathname}/all`)}>
              {pathname.includes("rent")
                ? `Search ${vehiclesCount.data?.totalCount?.toLocaleString()} rental
                ${parseCamelKey(pathname.split("/")[1])}`
                : `Search ${vehiclesCount.data?.totalCount?.toLocaleString()} 
              ${parseCamelKey(pathname.replace("/", ""))}`}
            </Button>
          </div>
          <div className="d-flex justify-content-between">
            <u className="text-primary pointer" onClick={() => handleResetFilters()}>
              Reset Filters
            </u>

            <u className="text-primary pointer" onClick={() => navigate(`${pathname}/allFilters`)}>
              More Options
            </u>
          </div>
        </div>
      </section>
    </div>
  );
}
