import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { isArray } from "../../../utils/dataTypes";
import VehicleCard from "../../vehiclesList/components/vehicleCard";
import { getVehicleList } from "../../../redux/vehicles/thunk";

export default function MyItems() {
  const { vehiclesList } = useSelector((state) => state.vehicles);
  const { userProfile } = useSelector((state) => state.profile);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 25,
    sortBy: "createdAt",
    order: 1,
  });

  const totalPage = Math.ceil(vehiclesList.data?.totalCount / paginationDetails.limit) || 0;

  const handlePage = (btn) => {
    if (btn === "back" && paginationDetails.page > 1) {
      setPaginationDetails((prev) => ({ ...prev, page: prev.page - 1 }));
    } else if (btn === "next" && paginationDetails.page < totalPage) {
      setPaginationDetails((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleVehicleList = async () => {
    const newFilters = { user: userProfile.data?._id || "" };
    const request = { filters: newFilters, paginationDetails: paginationDetails };
    console.log("request", request);
    await handleApiRequest(getVehicleList, request);
  };

  useEffect(() => {
    if (userProfile.data?._id) {
      handleVehicleList();
    }
  }, [paginationDetails, userProfile]);

  console.log("vehiclesList", vehiclesList);
  // console.log("userProfile", userProfile);

  return (
    <>
      <h4>My Items</h4>
      {vehiclesList.data?.items?.length > 0 ? (
        isArray(vehiclesList.data?.items).map((vehicle, i) => (
          <>
            <VehicleCard key={vehicle._id} vehicle={vehicle || {}} />
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
