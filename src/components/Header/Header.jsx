import React, { useState } from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { ReactComponent as GridFilledIcon } from "../../Assets/icons/grid-filled.svg";
import { ReactComponent as ProfileHolder } from "../../Assets/icons/Profile-holder.svg";
import { ReactComponent as DownArrow } from "../../Assets/icons/down-arrow.svg";
import mainLogo from "../../Assets/Images/mainLogo.png";
import { categories } from "../../utils";

const NavLinks = ({ title, i }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <p
      className="navLink pointer m-0 text-small position-relative"
      onMouseOver={() => setShowMenu(i)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <span>
        {title} <DownArrow width={8} height={8} />
      </span>
      {showMenu === i && (
        <ul className="dropOtions list-unstyled position-absolute">
          <li>Used {title}</li>
          <li>New {title}</li>
          <li>Sell your {title}</li>
        </ul>
      )}
    </p>
  );
};

const Header = ({ sidebar, setSidebar }) => {
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  // console.log("admin", admin);
  // console.log("admin.image", admin.image);

  return (
    <>
      <header className="px-2 header">
        <Navbar expand="lg" className="mainWrapper h-100">
          <div className=" d-flex align-items-center justify-content-between w-100">
            <Container fluid className="m-0 p-0 d-flex">
              <div className="left d-flex align-items-center">
                <Button
                  onClick={handleSidebar}
                  variant="transparent"
                  className="d-lg-none Toggle border-0 p-0 me-2 d-flex align-items-center justify-content-center"
                >
                  <GridFilledIcon />
                </Button>
              </div>
              <div className="">
                <Link to="/home" className="h-100">
                  <img src={mainLogo} alt="" className="img-fluid" style={{ height: 30 }} />
                </Link>
              </div>
            </Container>

            <div className="d-flex align-items-center">
              <Nav className="d-none d-lg-flex me-2">
                {categories.map((category, i) => (
                  <NavLinks title={category.label} i={i} />
                ))}
              </Nav>
              <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10">
                <li className="d-flex align-items-center gap-10">
                  <Button variant="transparent" className="border-0 p-0">
                    <span className="icn">
                      <CompareIcon />
                    </span>
                  </Button>
                </li>
                <li className="d-flex align-items-center gap-10">
                  <Button variant="transparent" className="font-small border-0 p-0">
                    <p className="m-0 icn">
                      <ProfileHolder />
                    </p>
                    <span style={{ textWrap: "nowrap" }}>Sign In</span>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Navbar>
      </header>
    </>
  );
};
export default Header;
