import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ReactComponent as FilterIcon } from "../../Assets/icons/filter.svg";
import HeroSection from "../../components/heroSection";
import CarFilters from "./components/carFilters";
import VehicleCard from "./components/vehicleCard";
import MyPagination from "../../components/pagination";
import SelectBox from "../../components/selectBox";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getVehicleList } from "../../redux/vehicles/thunk";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "../../utils/dataTypes";
import { sortingOptions } from "../../utils/filters";
import { resetFilters, selectFilters } from "../../redux/filters/slice";
import { useParams } from "react-router-dom";

export default function VehiclesList() {
  const { categoryFilter } = useParams();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);
  const { vehiclesList } = useSelector((state) => state.vehicles);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 25,
    sortBy: "_id",
    order: 1,
  });

  const totalPage = Math.ceil(vehiclesList.data?.totalCount / paginationDetails.limit) || 0;

  const handleSidebar = () => {};

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
      newFilters[filter[0]] = filter[1].value || filter[1]._id;
    });
    const request = { filters: newFilters, paginationDetails: paginationDetails };
    console.log("request", request);
    await handleApiRequest(getVehicleList, request);
  };

  useEffect(() => {
    handleVehicleList();
  }, [filters, paginationDetails]);

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

  useEffect(() => {
    if (categoryFilter === "used" || categoryFilter === "new") {
      dispatch(selectFilters({ condition: { value: categoryFilter, label: categoryFilter } }));
    }
  }, [categoryFilter]);

  //   console.log("vehiclesList", vehiclesList);
  // console.log("categoryFilter", categoryFilter);
  // console.log("filters", filters);

  return (
    <>
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
          <div className="personalAdd" s>
            Personal Add
          </div>
        </div>

        <Row className="my-2">
          <Col lg={3} className="filterBoxWrapper d-none d-lg-block">
            <CarFilters />
          </Col>

          <Col lg={9} className="vehicleListContainer">
            <Row className="justify-content-between align-items-center w-100 mb-2">
              <Col
                lg={3}
                xs={12}
                className="my-2 m-lg-0 d-lg-block d-flex justify-content-between align-items-center"
              >
                <div className="filterIcon border p-2 mx-2 d-lg-none">
                  <FilterIcon onClick={handleSidebar} />
                </div>
                <div>
                  {" "}
                  <button className="paginationBtn" onClick={() => handlePage("back")}>
                    {"<"}
                  </button>
                  <button className="paginationBtn" onClick={() => handlePage("next")}>
                    {">"}
                  </button>
                  <span>
                    Page {paginationDetails.page} of {totalPage}
                  </span>
                </div>
              </Col>

              <Col lg={9} className="px-0">
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
            {vehiclesList.data?.items.length > 0 ? (
              isArray(vehiclesList.data?.items).map((vehicle, i) => (
                <>
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                  {i % 15 === 0 && (
                    <div
                      className="fullSizeAddContainer vehicleListAdd d-none d-lg-flex "
                      style={{ width: 468, height: 60 }}
                    >
                      Add Container
                      <br />
                      (728 x 90)
                    </div>
                  )}
                </>
              ))
            ) : (
              <h1 className="text-center my-5">0 Results Found</h1>
            )}
          </Col>
        </Row>
      </section>
    </>
  );
}
