import React, { useEffect, useState } from "react";
import { Container, Button, Navbar, Nav, Dropdown } from "react-bootstrap";
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
import { logoutUser } from "../../redux/auth/slice";
import isUserLoggedin from "../../utils/isUserLoggedin";

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

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (token) {
      handleUserProfile();
    }
  }, [token]);

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
        {showMenu === i && title.label !== "Rentals" && (
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
            {/* <li
              onClick={() => {
                navigate(`/${title.value}/sell`);
              }}
            >
              Sell your {title.label?.slice(0, -1)}
            </li> */}
          </ul>
        )}
        {showMenu === i && title.label === "Rentals" && (
          <ul className="dropOtions list-unstyled position-absolute">
            {categories.map(
              (category, i) =>
                category.label !== "Rentals" && (
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

  console.log("userProfile", userProfile);
  // console.log("admin", admin);
  // console.log("admin.image", admin.image);

  return (
    <>
      <header className="px-2 header">
        <Navbar expand="lg" className="mainWrapper h-100 pe-0">
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
                <li className="d-flex align-items-center position-relative">
                  <Button
                    variant="transparent"
                    className="border-0 p-0"
                    onClick={() => {
                      if (userProfile.data?.compareCount > 0) {
                        navigate("/CompareList");
                      }
                    }}
                  >
                    <span className="icn">
                      <CompareIcon className="headerCompareIcon" />
                    </span>
                    {userProfile.data?.compareCount > 0 && (
                      <p className="compareCount">{userProfile.data?.compareCount}</p>
                    )}
                  </Button>
                </li>
                <li className="d-flex align-items-center mx-1 position-relative">
                  <Button
                    variant="danger"
                    className="headerPostBtn border-0 px-2 py-1 text-nowrap"
                    onClick={() => {
                      if (isUserLoggedin()) {
                        navigate("/cars/sell");
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    Post an Advert
                  </Button>
                </li>
                <li
                  className="position-relative d-flex align-items-center gap-10"
                  style={{ minWidth: 45 }}
                >
                  <Button
                    variant="transparent"
                    className="largeScreenSignIn d-none font-small border-0 p-0"
                    onClick={() => navigate("/profile")}
                  >
                    <p className="m-0 icn">
                      {isUserLoggedin() ? (
                        userProfile.data?.userAvatar || userProfile.data?.dealerLogo ? (
                          <img
                            src={userProfile.data.userAvatar || userProfile.data.dealerLogo}
                            className="headerAvatar"
                          />
                        ) : (
                          <ProfileHolder />
                        )
                      ) : (
                        ""
                      )}
                    </p>
                    <p className="userName">
                      {userProfile.data?.name
                        ? userProfile.data?.name?.split(" ")[0]
                        : "Sign In | Register"}
                    </p>
                  </Button>
                  <Dropdown className="smallScreenSignIn ">
                    <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                      <Button
                        variant="transparent"
                        className="font-small border-0 p-0"
                        onClick={() => {
                          if (!isUserLoggedin()) {
                            navigate("/profile");
                          }
                        }}
                      >
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
                    </Dropdown.Toggle>

                    {isUserLoggedin() && (
                      <Dropdown.Menu className="dropdown-menu-end">
                        <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/my-items")}>
                          My Items
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/my-wishlist")}>
                          Wishlist
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/change-password")}>
                          Change password
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
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
