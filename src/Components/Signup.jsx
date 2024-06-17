import React from "react";

export default function Signup() {
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const form = event.target;
    const alertDiv = form.querySelector("#signupAlert");
    const formData = new FormData(form); // Get form data
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        // Check if the response is successful (status code 200-299)
        alertDiv.classList.remove("alert-danger", "alert-warning"); // Reset alert color
        alertDiv.classList.add("alert-success");
        alertDiv.textContent = "Signup successful. Redirecting...";
        console.log("Signup successful!");

        setTimeout(() => {
          window.location.href = data.redirectUrlForLogin;
        }, 1400);
      } else {
        if (data.alert) {
          // Check if the server sent an alert message
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
        console.log("Signup failed!");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div
      className="d-flex p-5 vh-100 justify-content-center align-item-center"
      style={{ backgroundColor: "hsl(215, 17%, 20%)" }}
    >
      <form
        id="signupForm"
        onSubmit={handleSubmit}
        className="p-5 rounded justify-content-center"
        style={{
          height: "fit-content",
          boxShadow: "#181818 8px 6px 20px 6px",
          position: "relative",
          left: "55px",
        }}
      >
        <div id="signupAlert" className="alert fw-bold" role="alert"></div>
        <h2 className="my-4 mb-5 text-center">Create Your Free Account</h2>
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="InputUsername1" className="text-ligth form-label">
            Username
          </label>
          <input
            type="texts"
            className="form-control fw-medium"
            id="InputUsername1"
            name="username"
            required
          />
        </div>

        {/* Email-id */}
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
          className="btn btn-primary w-100 mb-4 text-dark fw-bold"
          style={{
            backgroundColor: "hsl(337, 93%, 66%)",
            border: "none",
          }}
        >
          Create new account
        </button>
      </form>
    </div>
  );
}
