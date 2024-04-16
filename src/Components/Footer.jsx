import React from "react";
import { Link } from "react-router-dom";
import { TbBrain } from "react-icons/tb";
import { Colors } from "./Colors";

export default function Footer() {
  return (
    <>
      <footer
        className="footer d-flex p-5 flex-column justify-content-center align-items-center"
        style={{
          boxShadow: "#191919 0px 0px 16px 0px",
          backgroundColor: "hsl(215, 17%, 20%)",
        }}
      >
        <div className="logoAndTitle mb-3 d-flex align-items-center">
          <TbBrain size={55} color={Colors.primary} />{" "}
          {/* Added size and color */}
          <Link
            to="/"
            className="fs-1 fw-bolder text-light text-decoration-none"
          >
            SciCollab
          </Link>
        </div>
        <div className="copyright mb-3 fs-5">
          &copy; {new Date().getFullYear()} SciCollab. All rights reserved.
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          <Link to="/about" className="link mx-2">
            About Us
          </Link>
          <Link to="/contact" className="link mx-2">
            Contact
          </Link>
          <Link to="/terms" className="link mx-2">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="link mx-2">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </>
  );
}
