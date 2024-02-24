import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getCompareList, removeCompareListItem } from "../../redux/vehicles/thunk";
import HeroAdd from "../../components/heroSection/heroAdd";
import { getUserProfile } from "../../redux/profile/thunk";
import { parseCamelKey } from "../../utils/parseKey";
import { useNavigate } from "react-router-dom";
import { compareListDetails } from "../../utils/filters/common";

export default function CompareList() {
  const navigate = useNavigate();
  const { compareList } = useSelector((state) => state.vehicles);
  const { userProfile } = useSelector((state) => state.profile);

  const handleCompareList = async () => {
    await handleApiRequest(getCompareList);
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleRemoveItem = async (id) => {
    const response = await handleApiRequest(removeCompareListItem, { id });
    if (response.status) {
      handleCompareList();
      handleUserProfile();
      if (userProfile.data.compareCount <= 1) {
        navigate("/cars/all");
      }
    }
  };

  useEffect(() => {
    handleCompareList();
  }, []);

  // console.log("compareList", compareList);
  return (
    <>
      <HeroAdd />
      <section>
        <div className="table-responsive">
          <table className="table commonTable">
            <thead className="border-0">
              <tr className="">
                <th className="compareListItem comparePropertyContainer darkColor fw-bold">
                  Selected Items
                </th>
                {compareList.data?.map((details) => (
                  <th key={details._id} className="compareListItem position-relative">
                    <img
                      className="pointer"
                      style={{ width: 100 }}
                      src={details?.vehicle?.media[0]?.url}
                      alt=""
                      onClick={() => navigate(`/details/${details.vehicle._id}`)}
                    />
                    <p className="">
                      {details?.vehicle?.make?.label + ", " + details?.vehicle?.model?.label}
                    </p>
                    <p
                      className="imageRemoveIcon compareListItemRemoveIcon"
                      onClick={() => {
                        handleRemoveItem(details._id);
                      }}
                    >
                      +
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareListDetails.cars.map((property, i) => (
                <tr key={property.value}>
                  <>
                    <td className="comparePropertyContainer darkColor fw-bold">{property.label}</td>
                    {compareList.data?.map((item) => {
                      return (
                        <td key={item._id}>
                          {property.value === "location" ? (
                            <span className="d-flex align-items-center">
                              <img src={item.vehicle.country?.flag} width={15} className="me-1" />
                              {item.vehicle.country?.name + ", " + item.vehicle.city?.name}
                            </span>
                          ) : property.value === "price" ? (
                            item.vehicle.currency + " " + item.vehicle[property.value]
                          ) : typeof item.vehicle[property.value] !== "object" ? (
                            parseCamelKey(item.vehicle[property.value])
                          ) : typeof item.vehicle[property.value] === "object" ? (
                            item.vehicle[property.value]?.label
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })}
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
