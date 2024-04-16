import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import googleIcon from "../assets/google.png";
import linkedInIcon from "../assets/linkedin.png";
import faceBookIcon from "../assets/facebook-app-symbol.png";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const alertDiv = form.querySelector("#loginAlert");
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alertDiv.classList.remove("alert-danger", "alert-warning");
        alertDiv.classList.add("alert-success");
        alertDiv.textContent = "Login successful. Redirecting...";
        console.log("Login successful!");

        // Update the header with the user's username
        setTimeout(() => {
          navigate(data.redirectUrl, { state: { userName: data.userName } });
        }, 1400); // Delay redirection by 1.4 seconds
      } else {
        if (data.alert) {
          alertDiv.classList.remove("alert-success");
          if (data.alert.type === "danger") {
            alertDiv.classList.add("alert-danger");
          } else if (data.alert.type === "warning") {
            alertDiv.classList.add("alert-warning");
          }
          alertDiv.textContent = data.alert.message;
        } else {
          alertDiv.classList.remove("alert-success");
          alertDiv.classList.add("alert-danger");
          alertDiv.textContent = data.error;
        }
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="container align-items-center text-light d-flex vw-100 m-0 py-4">
        {/* heroSectionDesc */}
        <div className="heroSectionDesc vw-75" style={{ flex: "0 0 60%" }}>
          <h1 className="fw-bolder my-5">
            SciCollab: Empower Your Research Through Collaboration & Analysis
          </h1>
          {/* Element-1 */}
          <h3 className="my-5">Unleash the Potential of Your Research:</h3>
          <div
            className="accordion my-4"
            // style={{ width: "85%" }}
            id="accordion_1"
          >
            <div className="accordion-item border border-0">
              <h2 className="accordion-header">
                <button
                  className="accordion-button bg-dark-subtle fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne_1"
                  aria-expanded="true"
                  aria-controls="collapseOne_1"
                >
                  Join a vibrant community of researchers and gain the tools you
                  need to:
                </button>
              </h2>
              <div
                id="collapseOne_1"
                className="accordion-collapse collapse border border-top-0 rounded-bottom"
                data-bs-parent="#accordion_1"
              >
                <div className="accordion-body text-light">
                  <ul>
                    <li className="my-2">
                      <strong>
                        Collaborate seamlessly: Share data, analyses, and
                        insights effortlessly.
                      </strong>
                    </li>
                    <li className="my-2">
                      <strong>
                        Streamline workflows: Automate tasks and accelerate your
                        research progress.
                      </strong>
                    </li>
                    <li className="my-2">
                      <strong>
                        Gain deeper understanding: Utilize advanced analysis
                        tools for groundbreaking discoveries.
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="#"
            className="heroSectionLink my-3 link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            Stop by yourself, achieve more together. Start your free trial
            today!
            <BsArrowUpRight style={{ fontSize: "20px", opacity: "0.2" }} />
          </Link>

          {/* Element-2 */}
          <h3 className="my-5">Boost Your Research Impact:</h3>
          <div className="accordion my-4" id="accordion_2">
            <div className="accordion-item border border-top-0 rounded-bottom">
              <h2 className="accordion-header">
                <button
                  className="accordion-button bg-dark-subtle fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne_2"
                  aria-expanded="true"
                  aria-controls="collapseOne_2"
                >
                  SciCollab empowers researchers of all levels by providing a
                  comprehensive platform for:
                </button>
              </h2>
              <div
                id="collapseOne_2"
                className="accordion-collapse collapse"
                data-bs-parent="#accordion_2"
              >
                <div className="accordion-body text-light">
                  <ul>
                    <li className="my-2">
                      <strong>
                        Data Management: Securely store, organize, and share
                        your research data.
                      </strong>
                    </li>
                    <li className="my-2">
                      <strong>
                        Collaborative Analysis: Work together on analyses in
                        real-time, fostering innovation.
                      </strong>
                    </li>
                    <li className="my-2">
                      <strong>
                        Advanced Visualization: Generate clear and impactful
                        visualizations to communicate your findings.
                      </strong>
                    </li>
                    <li className="my-2">
                      <strong>
                        Project Management: Keep your research on track with
                        intuitive tools and progress tracking.
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="#"
            className="heroSectionLink link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            Learn More About SciCollab
            <BsArrowUpRight style={{ fontSize: "20px", opacity: "0.2" }} />
          </Link>
        </div>

        {/* HeroSection form */}
        <div className="heroSectionForm vw-25" style={{ flex: "0 0 40%" }}>
          <form
            id="loginForm"
            onSubmit={handleSubmit}
            className="p-4 mb-5 w-100 rounded justify-content-center"
            style={{
              boxShadow: "#181818 8px 6px 20px 6px",
              position: "relative",
              left: "55px",
            }}
          >
            <h2 className="my-4 mb-5">Create Your Free Account</h2>
            <div className="d-flex justify-content-evenly">
              <Link to="/signup">
                <button
                  className="btn d-flex align-items-center text-dark fw-bolder fs-6"
                  style={{ backgroundColor: "hsl(337, 93%, 66%)" }}
                  type="button"
                >
                  <img
                    src={googleIcon}
                    style={{
                      marginRight: "5px",
                      width: "17px",
                      background: "none",
                    }}
                    alt=""
                  />
                  <label className="text-dark" htmlFor="Google">
                    Google
                  </label>
                </button>
              </Link>

              <button
                className="btn d-flex align-items-center text-dark fw-bolder fs-6"
                style={{
                  backgroundColor: "hsl(337, 93%, 66%)",
                  height: "fit-content",
                }}
              >
                <img
                  src={linkedInIcon}
                  style={{
                    marginRight: "5px",
                    width: "18px",
                    background: "none",
                  }}
                  alt=""
                />
                <label className="text-dark" htmlFor="LinkedIn">
                  LinkedIn
                </label>
              </button>

              <button
                className="btn d-flex align-items-center text-dark fw-bolder fs-6"
                style={{ backgroundColor: "hsl(337, 93%, 66%)" }}
              >
                <img
                  src={faceBookIcon}
                  style={{
                    marginRight: "5px",
                    width: "17px",
                    background: "none",
                  }}
                  alt=""
                />
                Facebook
              </button>
            </div>
            <h3
              className="text-center my-4"
              style={{ letterSpacing: "0.2rem" }}
            >
              OR
            </h3>

            {/* Login Alert */}
            <div id="loginAlert" className="alert fw-bold" role="alert"></div>
            <div className="mb-4">
              <label htmlFor="InputEmail1" className="text-ligth form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control fw-medium"
                id="InputEmail1"
                name="email"
                aria-describedby="emailHelp"
                required
              />
              <div
                id="emailHelp"
                className="text-light form-text"
                style={{ color: "white" }}
              ></div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="exampleInputPassword1"
                className="text-light form-label"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-4 text-light fw-bold"
              style={{ backgroundColor: "hsl(337, 93%, 66%)", border: "none" }}
            >
              Start your research right now!!!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
