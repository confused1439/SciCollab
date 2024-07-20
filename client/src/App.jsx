import { ChakraProvider } from "@chakra-ui/react";
import Project from "./Components/Project";
import DataVisualization from "./Components/DataVisualization";
import Header from "./Components/Header";
import Discussion from "./Components/Discussion";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import Collaborators from "./Components/Collaborators";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:userId" element={<Project />} />
          <Route path="/data-visual/:userId" element={<DataVisualization />} />
          <Route path="/discussion/:userId" element={<Discussion />} />
          <Route path="/collaborators/:userId" element={<Collaborators />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-profile/:userId" element={<Profile />} />
          <Route path="*" element={<h1>Page not found 404!</h1>} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}
