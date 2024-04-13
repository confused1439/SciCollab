import { Link } from "react-router-dom";
import { TbBrain } from "react-icons/tb";
import { Colors } from "./Colors";

export default function Header() {
  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg shadow-lg p-3"
        style={{ backgroundColor: Colors.mainBgColor }}
      >
        <div className="container-fluid">
          <div className="nav_and_button">
            <Link
              className="navbar-brand fs-2 fw-bolder"
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
            <form
              className="d-flex justify-content-center align-item-center"
              role="search"
            >
              <input
                className="form-control fw-medium me-2 w-50 h-25 border border-0"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn fw-medium"
                style={{ backgroundColor: Colors.btnColor, height: "35px" }}
                type="submit"
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  aria-current="page"
                  to="/project"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  to="/about"
                >
                  Data Sharing
                </Link>
              </li>
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  to="/services"
                >
                  Discussions
                </Link>
              </li>
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  to="/dummy"
                >
                  Collaborators
                </Link>
              </li>
              <li className="nav-item fw-medium">
                <Link
                  className="nav-link active mx-3"
                  style={{ color: "white" }}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
