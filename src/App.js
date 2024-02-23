import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import "./App.css";
import Collabration from "./components/Collabration";
import SciGrovists from "./components/SciGrovists";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="parent_div">
      <Navbar />
      <HeroSection />
      <Collabration />
      <SciGrovists />
      <Footer />
    </div>
  );
}

export default App;
