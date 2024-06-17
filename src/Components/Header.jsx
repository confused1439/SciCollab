import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbBrain } from "react-icons/tb";
import { Button, Spacer } from "@chakra-ui/react"; // Import Button from Chakra UI
import { Colors } from "./Colors";
import { CircleUser } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [userId, setUserId] = useState(""); // State to store userId

  useEffect(() => {
    // Retrieve userId from session storage when component mounts
    const storedUserId = sessionStorage.getItem("userId");
    setUserId(storedUserId);
    const userName = sessionStorage.getItem("userName");
    setUsername(userName);
  }, [location]);

  const [username, setUsername] = useState("user");

  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg shadow-lg p-3"
        style={{ backgroundColor: Colors.mainBgColor, zIndex: "990" }}
      >
        <div className="container-fluid">
          <div className="nav_and_button">
            <Link
              className="navbar-brand d-flex fs-2 fw-bolder"
              style={{ color: "white" }}
              to="/"
            >
              <TbBrain className=" me-2 pb-1" size={50} />
              SciCollab
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-row-reverse align-item-center"
            id="navbarNav"
          >
            {location.pathname !== "/" && location.pathname !== "/signup" && (
              <Link to={`/user-profile/${userId}`}>
                <Button
                  color="hsl(338, 72%, 60%)"
                  fontSize="lg"
                  variant="solid"
                >
                  <CircleUser
                    size={22}
                    style={{ marginRight: "7", fontWeight: "bolder" }}
                    color="hsl(338, 72%, 60%)"
                  />
                  {username}
                </Button>
              </Link>
            )}

            <ul className="navbar-nav">
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  aria-current="page"
                  to={`/projects/${userId}`}
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  to={`/data-visual/${userId}`}
                >
                  Data visualization
                </Link>
              </li>
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  to={`/discussion/${userId}`}
                >
                  Discussions
                </Link>
              </li>
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  to={`/collaborators/${userId}`}
                >
                  Collaborators
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
