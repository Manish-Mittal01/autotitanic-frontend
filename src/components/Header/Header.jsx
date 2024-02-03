import React, { useEffect, useState } from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { ReactComponent as GridFilledIcon } from "../../Assets/icons/grid-filled.svg";
import { ReactComponent as ProfileHolder } from "../../Assets/icons/Profile-holder.svg";
import { ReactComponent as DownArrow } from "../../Assets/icons/down-arrow.svg";
import mainLogo from "../../Assets/Images/mainLogo.png";
import { categories } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getUserProfile } from "../../redux/profile/thunk";
import { selectFilters } from "../../redux/filters/slice";

const Header = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedinUser } = useSelector((state) => state.auth);
  const token = loggedinUser?.data?.token;
  const { userProfile } = useSelector((state) => state.profile);

  const [showMenu, setShowMenu] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile, {}, false);
  };

  const handleFilters = async (type, condition) => {
    dispatch(
      selectFilters({
        type: { value: type, label: type },
        condition: { value: condition, label: condition },
      })
    );
  };

  useEffect(() => {
    if (token) {
      handleUserProfile();
    }
  }, [token]);

  // console.log("userProfile", userProfile);
  // console.log("admin", admin);
  // console.log("admin.image", admin.image);

  const NavLinks = ({ title, i }) => {
    return (
      <div
        className="navLink pointer m-0 text-small position-relative"
        onMouseOver={() => setShowMenu(i)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <p className="navLinkText">
          {title.label} <DownArrow width={8} height={8} />
        </p>
        {showMenu === i && title.label !== "Car Rentals" && (
          <ul className="dropOtions list-unstyled position-absolute">
            <li
              onClick={() => {
                navigate(`/${title.value}/all`);
              }}
            >
              All {title.label}
            </li>
            <li
              onClick={() => {
                navigate(`/${title.value}/used`);
              }}
            >
              Used {title.label}
            </li>
            <li
              onClick={() => {
                navigate(`/${title.value}/new`);
              }}
            >
              New {title.label}
            </li>
            <li
              onClick={() => {
                navigate(`/${title.value}/sell`);
              }}
            >
              Sell your {title.label?.slice(0, -1)}
            </li>
          </ul>
        )}
        {showMenu === i && title.label === "Car Rentals" && (
          <ul className="dropOtions list-unstyled position-absolute">
            {categories.map(
              (category, i) =>
                category.label !== "Car Rentals" && (
                  <li onClick={() => navigate(`/${category.label}/rent`)}>
                    Rent a {category.label.slice(0, -1)}
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    );
  };

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
                  <NavLinks key={category.label} title={category} i={i} />
                ))}
              </Nav>
              <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10">
                <li className="d-flex align-items-center gap-10 position-relative">
                  <Button
                    variant="transparent"
                    className="border-0 p-0"
                    onClick={() => navigate("/CompareList")}
                  >
                    <span className="icn">
                      <CompareIcon />
                    </span>
                    {userProfile.data?.compareCount > 0 && (
                      <p className="compareCount">{userProfile.data?.compareCount}</p>
                    )}
                  </Button>
                </li>
                <li
                  className="d-flex align-items-center gap-10"
                  style={{ minWidth: 45 }}
                  onClick={() => navigate("/profile")}
                >
                  <Button variant="transparent" className="font-small border-0 p-0">
                    <p className="m-0 icn">
                      {userProfile.data?.userAvatar || userProfile.data?.dealerLogo ? (
                        <img
                          src={userProfile.data.userAvatar || userProfile.data.dealerLogo}
                          className="headerAvatar"
                        />
                      ) : (
                        <ProfileHolder />
                      )}
                    </p>
                    <p className="userName">{userProfile.data?.name || "Sign In"}</p>
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
