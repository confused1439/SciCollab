import React from "react";
import HeroSection from "./HeroSection";
// const navBarBg = "hsl(215, 17%, 20%)";
export default function Home() {
  return (
    <div
      className="d-flex vh-100 justify-content-center flex-wrap  p-3 "
      style={{ backgroundColor: "hsl(215, 17%, 20%)" }}
    >
      <HeroSection />
    </div>
  );
}
