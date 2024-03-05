import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFeaturedList, getRecentList } from "../../../redux/vehicles/thunk";
import { handleApiRequest } from "../../../services/handleApiRequest";
import ListCrousel from "./listCrousel";
import { useLocation } from "react-router-dom";
import parseKey, { parseCamelKey } from "../../../utils/parseKey";

function CarsList() {
  const { pathname } = useLocation();
  const featuredList = useSelector((state) => state.vehicles.featuredList);
  const recentList = useSelector((state) => state.vehicles.recentList);

  const handleRecentList = async () => {
    const request = {
      filters: {
        isFeatured: true,
        status: "approved",
        type: pathname.replace("/", ""),
      },
      paginationDetails: { page: 1, limit: 240 },
    };
    await handleApiRequest(getFeaturedList, request);
  };

  const handleFeaturedList = async () => {
    const request = {
      filters: {
        status: "approved",
        isFeatured: false,
        type: pathname.replace("/", ""),
      },
      paginationDetails: { page: 1, limit: 180, sortBy: "createdAt", order: -1 },
    };
    await handleApiRequest(getRecentList, request);
  };

  useEffect(() => {
    handleRecentList();
    handleFeaturedList();
  }, [pathname]);

  // console.log("splitList", splitList(recentList.data?.items, 4, 5));
  // console.log("recentList", recentList);
  // console.log("featuredList", featuredList);

  return (
    <>
      {/* <h4 className="my-2 text-center text-danger">Featured Cars</h4> */}
      <ListCrousel dataList={featuredList.data?.items || []} rowsCount={6} rowSize={30} />

      <div className="fullSizeAddContainer" style={{ width: 980, height: 120 }}>
        Add Container
        <br />
        (980 x 120)
      </div>

      <h4 className="drakColor my-2 text-center">
        Recently Posted {parseCamelKey(pathname.replace("/", ""))}
      </h4>
      <ListCrousel dataList={recentList.data?.items || []} rowsCount={12} rowSize={20} />
    </>
  );
}

export default memo(CarsList);
