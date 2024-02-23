import React from "react";
import "./SciGrovists.css";
import lapi from "../images/lapi.png";

export default function SciGrovists() {
  return (
    <div className="parent">
      <div className="child1">
        <div className="desc">
          <h3>Who are SciGrovists?</h3>
          <p>
            SciGrovists are a diverse community comprising students, educators,
            researchers, and professionals from various scientific domains. They
            leverage SciCollab to engage in collaborative research endeavors,
            access cutting-edge knowledge, and foster interdisciplinary
            collaborations. Whether novices or experts, SciCollab users unite to
            explore, innovate, and contribute to scientific discovery.
          </p>
        </div>
        <div className="image">
          <img src={lapi} alt="" />
        </div>
      </div>

      <h1>Join the SciCollab community</h1>
      <div className="child2">
        {/* card-1 */}
        <div className="card1 card">
          <div className="card_child_1_1 card_1">
            <h3>Get involved</h3>
          </div>
          <div className="card_child_1_2 card_2">
            <p>
              Engage, learn, and collaborate with a vibrant global community of
              scientific researchers and enthusiasts.
            </p>
            <a className="sci_grovists_a_tag" href="/">
              VISIT THE SCICOLLAB FORUM
            </a>
            <br />
            <a className="sci_grovists_a_tag" href="/">
              JOIN A SCICOLLAB USER GROUP
            </a>
          </div>
        </div>

        {/* card-2 */}
        <div className="card2 card">
          <div className="card_child_2_1 card_1">
            <h3>Explore Expert Insights</h3>
          </div>
          <div className="card_child_2_2 card_2">
            <p>
              Gain knowledge about cutting-edge models and diverse applications,
              delve into insights about SciCollab, and progress further on your
              learning journey.
            </p>
            <a className="sci_grovists_a_tag" href="/">
              WATCH EXPERT TECH TALKS
            </a>
            <br />
            <a className="sci_grovists_a_tag" href="/">
              EXPLORE EDUCATIONAL COURSES
            </a>
          </div>
        </div>

        {/* card_3 */}
        <div className="card3 card">
          <div className="card_child_3_1 card_1">
            <h3>Start Collaborating Together</h3>
          </div>
          <div className="card_child_3_2 card_2">
            <p>
              Engage with an inclusive SciCollab machine learning community.
            </p>
            <a className="sci_grovists_a_tag" href="/">
              JOIN A SPECIAL INTEREST GROUP
            </a>
            <br />
            <a className="sci_grovists_a_tag" href="/">
              BECOME A CONTRIBUTOR
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
