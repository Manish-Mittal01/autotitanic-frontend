import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getAllMake } from "../../redux/makeAndModel/thunk";
import HeroSection from "../../components/heroSection";
import CarsList from "./components/carsList";

export default function Home() {
  const { allMakes } = useSelector((state) => state.makeAndModel);
  const [showAllMakes, setShowAllMakes] = useState(false);

  const handleMakeList = async () => {
    await handleApiRequest(getAllMake);
  };

  useEffect(() => {
    handleMakeList();
  }, []);

  // console.log("allMakes", allMakes);
  // console.log("vehiclesList", vehiclesList);

  return (
    <>
      <section>
        <HeroSection />

        <CarsList />

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
                  <Col lg={3} className="my-2">
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
            <Button variant="danger" className="my-3" onClick={() => setShowAllMakes(true)}>
              + Show All Makes
            </Button>
          </div>

          {showAllMakes && (
            <Row className="allMakeContainer">
              {allMakes.data?.items?.map((make) => (
                <Col lg={3} className="my-2">
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
      </section>
    </>
  );
}
