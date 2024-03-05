import React from "react";
import mainLogo from "../../Assets/Images/mainLogo.png";
import { categories } from "../../utils";
import { Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate();

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="sidebar active">
        <div className="top text-center pt-4">
          <img src={mainLogo} className="w-100" />
          {/* <h2 className="m-0 py-2">Main Menu</h2> */}
        </div>
        <div className="w-100 bg-transparent nav">
          <button
            type="button"
            className="border-0 p-0 closebtn d-lg-none btn close-btn position-absolute btn btn-transparent"
            onClick={handleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="#000"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.7819 4.03141C11.8353 3.97803 11.8778 3.91464 11.9067 3.84487C11.9357 3.7751 11.9506 3.70031 11.9506 3.62477C11.9507 3.54923 11.9358 3.47442 11.907 3.40461C11.8781 3.3348 11.8358 3.27136 11.7824 3.21791C11.729 3.16446 11.6656 3.12205 11.5959 3.0931C11.5261 3.06415 11.4513 3.04923 11.3758 3.04918C11.3002 3.04914 11.2254 3.06397 11.1556 3.09283C11.0858 3.1217 11.0223 3.16403 10.9689 3.21741L7.4999 6.68641L4.0319 3.21741C3.92396 3.10947 3.77756 3.04883 3.6249 3.04883C3.47225 3.04883 3.32584 3.10947 3.2179 3.21741C3.10996 3.32536 3.04932 3.47176 3.04932 3.62441C3.04932 3.77707 3.10996 3.92347 3.2179 4.03141L6.6869 7.49941L3.2179 10.9674C3.16445 11.0209 3.12206 11.0843 3.09313 11.1541C3.0642 11.224 3.04932 11.2988 3.04932 11.3744C3.04932 11.45 3.0642 11.5248 3.09313 11.5947C3.12206 11.6645 3.16445 11.728 3.2179 11.7814C3.32584 11.8894 3.47225 11.95 3.6249 11.95C3.70049 11.95 3.77533 11.9351 3.84517 11.9062C3.915 11.8773 3.97845 11.8349 4.0319 11.7814L7.4999 8.31241L10.9689 11.7814C11.0768 11.8892 11.2232 11.9497 11.3758 11.9496C11.5283 11.9496 11.6746 11.8889 11.7824 11.7809C11.8902 11.673 11.9507 11.5266 11.9506 11.3741C11.9505 11.2215 11.8898 11.0752 11.7819 10.9674L8.3129 7.49941L11.7819 4.03141Z"
                fill="white"
              ></path>
            </svg>
          </button>
          <ul className="list-unstyled mb-0 w-100 sidebar-links pt-3">
            <li>
              <Accordion defaultActiveKey={1}>
                {categories.map((category, i) => (
                  <Accordion.Item eventKey={i + 1}>
                    <Accordion.Header
                    // onClick={() => {
                    //   navigate(category.value);
                    //   handleSidebar();
                    // }}
                    >
                      {category.label}
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="list-unstyled  mb-0">
                        {category.label !== "Rentals" ? (
                          <>
                            <li className="py-1">
                              <Link
                                to={`${category.value}/all`}
                                className="d-flex align-items-center active p-0"
                                onClick={handleSidebar}
                              >
                                All {category.label}
                              </Link>
                            </li>
                            <li className="py-1">
                              <Link
                                to={`${category.value}/used`}
                                className="d-flex align-items-center active p-0"
                                onClick={handleSidebar}
                              >
                                Used {category.label}
                              </Link>
                            </li>
                            <li className="py-1">
                              <Link
                                tto={`${category.value}/new`}
                                className="d-flex align-items-center"
                                onClick={handleSidebar}
                              >
                                New {category.label}
                              </Link>
                            </li>
                          </>
                        ) : (
                          category.label === "Rentals" &&
                          categories.map(
                            (category, i) =>
                              category.label !== "Rentals" && (
                                <li
                                  onClick={() => {
                                    navigate(`/${category.label}/rent`);
                                    handleSidebar();
                                  }}
                                >
                                  Rent a {category.label.slice(0, -1)}
                                </li>
                              )
                          )
                        )}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
