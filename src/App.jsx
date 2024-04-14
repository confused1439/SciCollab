import Project from "./Components/Project";
import DataSharing from "./Components/DataSharing";
import Header from "./Components/Header";
import Discussion from "./Components/Discussion";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Dummy from "./Components/Dummy";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/data-sharing" element={<DataSharing />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/dummy" element={<Dummy />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="*" element={<h1>Page not found 404!</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}
