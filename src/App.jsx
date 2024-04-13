import About from "./Components/About";
import Services from "./Components/Services";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Clients from "./Components/Clients";
import Footer from "./Components/Footer";
import Dummy from "./Components/Dummy";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
// import { useEffect, useState } from "react";

export default function App() {
  // const [backendData, setBackendData] = useState([{}]);
  // useEffect(() => {
  //   fetch("/signup")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dummy" element={<Dummy />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile" element={<Profile />} />
        {/* <Route path="/"/> */}
        <Route path="*" element={<h1>Page not found 404!</h1>} />
      </Routes>
      <Footer />

      {/* {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )} */}
    </Router>
  );
}
