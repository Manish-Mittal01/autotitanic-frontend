import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { isArray } from "../../../utils/dataTypes";
import VehicleCard from "../../vehiclesList/components/vehicleCard";
import { getVehicleList } from "../../../redux/vehicles/thunk";
import { Form, Row } from "react-bootstrap";

export default function MyItems() {
  const { vehiclesList } = useSelector((state) => state.vehicles);
  const { userProfile } = useSelector((state) => state.profile);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 25,
    sortBy: "createdAt",
    order: 1,
  });
  const [filters, setFilters] = useState({});

  const totalPage = Math.ceil(vehiclesList.data?.totalCount / paginationDetails.limit) || 0;

  const handlePage = (btn) => {
    if (btn === "back" && paginationDetails.page > 1) {
      setPaginationDetails((prev) => ({ ...prev, page: prev.page - 1 }));
    } else if (btn === "next" && paginationDetails.page < totalPage) {
      setPaginationDetails((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleVehicleList = async () => {
    const newFilters = { ...filters, user: userProfile.data?._id || "" };
    const request = { filters: newFilters, paginationDetails: paginationDetails };
    await handleApiRequest(getVehicleList, request);
  };

  useEffect(() => {
    if (userProfile.data?._id) {
      handleVehicleList();
    }
  }, [paginationDetails, userProfile, filters]);

  // console.log("vehiclesList", vehiclesList);
  // console.log("userProfile", userProfile);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5>My Items</h5>
        <Form.Select className="myVehiclesFilter" name="status" onChange={handleChange}>
          <option value="">All</option>
          <option value="pending">Under Review</option>
          <option value="draft">Draft</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="deleted">Deleted</option>
        </Form.Select>
      </div>
      {vehiclesList.data?.items?.length > 0 ? (
        isArray(vehiclesList.data?.items).map((vehicle, i) => (
          <>
            <VehicleCard key={vehicle._id} vehicle={vehicle || {}} myVehicle={true} />
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
          </>
        ))
      ) : (
        <h4 className="text-center my-5">No item Found</h4>
      )}
    </>
  );
}
