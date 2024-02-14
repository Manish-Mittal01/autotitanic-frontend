import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getCompareList, removeCompareListItem } from "../../redux/vehicles/thunk";
import HeroAdd from "../../components/heroSection/heroAdd";
import { getUserProfile } from "../../redux/profile/thunk";
import { parseCamelKey } from "../../utils/parseKey";

export default function CompareList() {
  const { compareList } = useSelector((state) => state.vehicles);

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
                    <img src={details?.vehicle?.media[0]?.url} style={{ width: 100 }} />
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
              {Object.keys(compareList.data?.[0]?.vehicle || {})?.map((property, i) => (
                <tr key={property._id}>
                  {property !== "_id" &&
                    property !== "country" &&
                    property !== "city" &&
                    property !== "description" &&
                    property !== "media" &&
                    property !== "user" &&
                    property !== "createdAt" &&
                    property !== "user" &&
                    property !== "isFeatured" &&
                    property !== "updatedAt" && (
                      <>
                        <td className="comparePropertyContainer darkColor fw-bold">
                          {parseCamelKey(property)}
                        </td>
                        {compareList.data?.map((item) => (
                          <td key={item._id}>
                            {typeof item.vehicle[property] !== "object"
                              ? item.vehicle[property]
                              : property === "make" ||
                                property === "model" ||
                                property === "variant"
                              ? item.vehicle[property]?.label
                              : ""}
                          </td>
                        ))}
                      </>
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
