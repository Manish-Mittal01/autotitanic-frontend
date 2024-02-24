import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getWishlist } from "../../../redux/vehicles/thunk";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { isArray } from "../../../utils/dataTypes";
import VehicleCard from "../../vehiclesList/components/vehicleCard";

export default function Wishlist() {
  const { wishlist } = useSelector((state) => state.vehicles);

  const handleWishlist = async () => {
    await handleApiRequest(getWishlist);
  };

  useEffect(() => {
    handleWishlist();
  }, []);

  // console.log("Wishlist", wishlist);

  return (
    <>
      <h4>My Wishlist</h4>
      {wishlist.data?.length > 0 ? (
        isArray(wishlist.data).map((item, i) => (
          <>
            <VehicleCard key={item._id} vehicle={item.vehicle || {}} wishlist={item._id} />
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
