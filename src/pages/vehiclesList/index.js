import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { ReactComponent as FilterIcon } from "../../Assets/icons/filter.svg";
import CarFilters from "./components/carFilters";
import VehicleCard from "./components/vehicleCard";
import SelectBox from "../../components/selectBox";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getVehicleList } from "../../redux/vehicles/thunk";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "../../utils/dataTypes";
import { resetFilters, selectFilters } from "../../redux/filters/slice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FilterBar from "../../components/sidebar/Filterbar";
import { handleFilterBar } from "../../redux/common/slice";
import MyPagination from "../../components/pagination";
import { sortingOptions } from "../../utils/filters/common";
import { categories } from "../../utils";

export default function VehiclesList() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { categoryFilter } = useParams();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { showFilterBar } = useSelector((state) => state.common);

  const [vehiclesList, setVehiclesList] = useState({});
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 25,
    sortBy: "_id",
    order: 1,
  });

  const totalPage = Math.ceil(vehiclesList?.totalCount / paginationDetails.limit) || 0;

  const handleShowFilterBar = () => {
    dispatch(handleFilterBar());
  };

  const handlePage = (btn) => {
    if (btn === "back" && paginationDetails.page > 1) {
      setPaginationDetails((prev) => ({ ...prev, page: prev.page - 1 }));
    } else if (btn === "next" && paginationDetails.page < totalPage) {
      setPaginationDetails((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleVehicleList = async () => {
    const newFilters = {};
    Object.entries(filters).forEach((filter) => {
      if (typeof filter[1] === "object") {
        newFilters[filter[0]] = filter[1]?.value || filter[1]?._id;
      } else {
        newFilters[filter[0]] = filter[1] || "";
      }
    });

    const request = {
      filters: {
        ...newFilters,
        status: "approved",
        sellOrRent: pathname.includes("rent") ? "rent" : "",
      },
      paginationDetails: paginationDetails,
    };

    const response = await handleApiRequest(getVehicleList, request);
    if (response.status) {
      setVehiclesList(response.data);
    }
  };

  useEffect(async () => {
    if (filters.type || filters.sellOrRent) {
      await handleVehicleList();
    }
  }, [filters, paginationDetails]);

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

  useEffect(() => {
    const category = pathname.split("/");
    if (!filters.type) {
      if (pathname.includes("rent")) {
        let isRentalCategoryFound = false;
        for (let myCategory of categories) {
          if (category[1] === myCategory.value && category[1] !== "rentals") {
            isRentalCategoryFound = true;
          }
        }

        dispatch(
          selectFilters({
            condition: "",
            type: isRentalCategoryFound
              ? { value: category[1], label: category[1] }
              : filters.type
              ? filters.type
              : "",
            sellOrRent: { value: "rent", label: "Rent" },
          })
        );
      } else if (categoryFilter === "used" || categoryFilter === "new") {
        dispatch(
          selectFilters({
            condition: { value: categoryFilter, label: categoryFilter },
            type: { value: category[1], label: category[1] },
            sellOrRent: { value: "sell", label: "sell" },
          })
        );
      } else {
        dispatch(
          selectFilters({
            condition: "",
            type: pathname.includes("rent") ? "" : { value: category[1], label: category[1] },
            sellOrRent: { value: "sell", label: "sell" },
          })
        );
      }
    }
  }, [categoryFilter, pathname]);

  console.log("filters", filters);

  return (
    <>
      {showFilterBar && <FilterBar />}

      <section>
        <div className="d-flex justify-content-between">
          <div
            className="fullSizeAddContainer d-none d-xl-flex"
            style={{ width: 728, height: 90, marginInline: 0 }}
          >
            Add Container
            <br />
            (728 x 90)
          </div>
          <div className="personalAdd">Personal Add</div>
        </div>

        <Row className="my-2">
          <Col lg={3} className="filterBoxWrapper d-none d-lg-block">
            <CarFilters />
          </Col>

          <Col xs={12} lg={9} className="vehicleListContainer">
            <h6
              className="primaryColor pointer mt-3"
              style={{ width: "fit-content" }}
              onClick={() => navigate(-1)}
            >
              {/* <FaArrowLeftLong className="me-2" /> */}
              <MdOutlineArrowBackIosNew className="me-1" />
              Back
            </h6>
            <Row className="justify-content-between align-items-center w-100 mb-2">
              <Col
                lg={4}
                xs={12}
                className="my-2 m-lg-0 d-lg-block d-flex justify-content-between align-items-center"
              >
                <div className="filterIcon border p-2 mx-2 d-lg-none">
                  <FilterIcon onClick={handleShowFilterBar} />
                </div>
                <div>
                  <button
                    className={`paginationBtn ${paginationDetails.page === 1 ? "disabled" : ""}`}
                    onClick={() => handlePage("back")}
                  >
                    <MdOutlineArrowBackIosNew />
                  </button>
                  <button
                    className={`paginationBtn ${
                      paginationDetails.page === totalPage ? "disabled" : ""
                    }`}
                    onClick={() => handlePage("next")}
                  >
                    <MdOutlineArrowForwardIos />
                  </button>
                  <span>
                    Page {paginationDetails.page} of {totalPage}
                  </span>
                </div>
              </Col>

              <Col lg={8} className="pe-0">
                <div className="w-100 d-flex justify-content-between justify-content-lg-end">
                  <div className="">
                    <SelectBox
                      defaultValue={{ value: 25, label: 25 }}
                      options={[
                        { value: 25, label: 25 },
                        { value: 50, label: 50 },
                        { value: 75, label: 75 },
                        { value: 100, label: 100 },
                      ]}
                      onChange={(value) => {
                        setPaginationDetails((prev) => ({ ...prev, limit: value.value }));
                      }}
                    />
                  </div>
                  <div>
                    <div className="d-flex align-items-center w-100 sortingBox">
                      <span className="mx-2">Sort</span>
                      <SelectBox
                        defaultValue={sortingOptions[0]}
                        options={sortingOptions}
                        onChange={(value) => {
                          setPaginationDetails((prev) => ({
                            ...prev,
                            page: 1,
                            sortBy: value.key,
                            order: value.order,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {vehiclesList?.items?.length > 0 ? (
              isArray(vehiclesList?.items).map((vehicle, i) => (
                <Fragment key={vehicle._id}>
                  <VehicleCard
                    vehicle={vehicle}
                    setVehiclesList={setVehiclesList}
                    i={i}
                    paginationDetails={paginationDetails}
                  />
                  {i % 10 === 0 && (
                    <div
                      className="fullSizeAddContainer vehicleListAdd d-none d-lg-flex "
                      style={{ width: 468, height: 60 }}
                    >
                      Add Container
                      <br />
                      (728 x 90)
                    </div>
                  )}
                </Fragment>
              ))
            ) : vehiclesList.totalCount === 0 ? (
              <h1 className="text-center my-5">0 Results Found</h1>
            ) : (
              <h1 className="text-center my-5">Loading...</h1>
            )}

            <MyPagination
              paginationDetails={paginationDetails}
              setPaginationDetails={setPaginationDetails}
              totalPosts={vehiclesList?.totalCount}
            />
          </Col>
        </Row>
      </section>
    </>
  );
}
