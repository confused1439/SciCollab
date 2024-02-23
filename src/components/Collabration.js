import React from "react";
import "./Collabration.css";

export default function Collabration() {
  return (
    <div className="mainContainer">
      <div className="desc_container">
        <h1>Empowering Collaborative Research in Science</h1>
        <p>
          Unlock the potential of collective intelligence and collaborative
          research to address scientific challenges, every step of the way.
        </p>
      </div>

      <div class="cards">
        {/* card-1 */}
        <article class="card">
          <div class="thumb thumb1"></div>
          <div class="infos">
            <h3 class="title">Empowering Collaboration</h3>
            <p class="txt">
              Unlock the potential of collective intelligence and collaborative
              research to address scientific challenges, every step of the way.
            </p>
            <a href="/">Discover Tools</a>
          </div>
        </article>

        {/* card-2 */}
        <article class="card">
          <div class="thumb thumb2"></div>
          <div class="infos">
            <h3 class="title">Explore Diverse Approaches</h3>
            <p class="txt">
              Use various methods or develop new ones for scientific research.
            </p>
            <a href="/">Discover Tools</a>
          </div>
        </article>

        {/* card-3 */}
        <article class="card">
          <div class="thumb thumb3"></div>
          <div class="infos">
            <h3 class="title">Deploy Discoveries</h3>
            <p class="txt">
              Share discoveries via publications, presentations, or interactive
              mediums.
            </p>
            <a href="/">Discover Tools</a>
          </div>
        </article>

        {/* card-4 */}
        <article class="card">
          <div class="thumb thumb4"></div>
          <div class="infos">
            <h3 class="title">Foster Continuous Improvement</h3>
            <p class="txt">
              Assess, refine, and innovate for ongoing scientific progress.
            </p>
            <a href="/">Discover Tools</a>
          </div>
        </article>
      </div>
    </div>
  );
}
