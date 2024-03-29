import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from "../../components/heroSection";
import CarsList from "./components/carsList";
import { resetFilters, selectFilters } from "../../redux/filters/slice";
import Gallery from "../../components/gallery";
import { isArray } from "../../utils/dataTypes";

export default function Home() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allMakes } = useSelector((state) => state.makeAndModel);
  const { galleryMedia } = useSelector((state) => state.common);
  const [showAllMakes, setShowAllMakes] = useState(false);

  const handleFilter = async (make) => {
    dispatch(selectFilters({ make: { value: make._id, label: make.label } }));
    setTimeout(() => {
      navigate("/cars/all", {
        state: { filters: { make: { value: make._id, label: make.label } } },
      });
    });
  };

  useEffect(() => {
    dispatch(resetFilters());
  }, [pathname]);

  // console.log("vehiclesList", vehiclesList);

  return (
    <>
      <section>
        <HeroSection />
        <CarsList />
        {pathname.includes("cars") && (
          <>
            <div className="fullSizeAddContainer">
              Add Container
              <br />
              (930 x 180)
            </div>
            <div className="makeBoxWrapper">
              <h4 className="text-center">Browse by Make</h4>
              <Row>
                {allMakes.data?.items?.map(
                  (make) =>
                    make.isMainLogo && (
                      <Col
                        sm={6}
                        lg={3}
                        className="my-2 pointer"
                        onClick={() => handleFilter(make)}
                      >
                        <div className="makeCard">
                          <div>
                            <p className="m-0">{make.label}</p>
                            <img src={make.logo} />
                          </div>
                        </div>
                      </Col>
                    )
                )}
              </Row>
              <div className="text-center">
                <Button
                  variant="danger"
                  className="my-3"
                  onClick={() => setShowAllMakes(!showAllMakes)}
                >
                  {showAllMakes ? "- Close Makes" : "+ Show All Makes"}
                </Button>
              </div>

              {showAllMakes && (
                <Row className="allMakeContainer">
                  {allMakes.data?.items?.map((make) => (
                    <Col sm={6} lg={3} className="pointer my-2 " onClick={() => handleFilter(make)}>
                      <div className="makeCard">
                        <div>
                          <p className="m-0">{make.label}</p>
                          <img src={make.logo} />
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </>
        )}
      </section>
      {isArray(galleryMedia).length > 0 && <Gallery media={galleryMedia} />}
    </>
  );
}
