import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import showdown from "showdown";
import axios from "axios";
import {
  PawPrint,
  PencilLine,
  MessageCircleQuestion,
  ThumbsUp,
  Clover,
  MessagesSquare,
} from "lucide-react";

export default function Discussion() {
  const renderForumContent = (content) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(content);
  };

  const [forums, setForums] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [forumTitle, setForumTitle] = useState("");
  const [showForums, setShowForums] = useState(false);

  const fetchForumPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-forums");
      setForums(response.data);
    } catch (error) {
      console.error("Error fetching forum posts:", error);
    }
  };

  useEffect(() => {
    fetchForumPosts();
  }, []);

  const postToForum = async () => {
    if (!postContent.trim() || !forumTitle.trim()) return;

    const converter = new showdown.Converter();
    const html = converter.makeHtml(postContent);

    const newForumPost = {
      title: forumTitle,
      author: authorName || "Anonymous",
      content: html,
    };

    try {
      await axios.post("http://localhost:3000/create-forum", newForumPost);
      fetchForumPosts();
      setPostContent("");
      setAuthorName("");
      setForumTitle("");
    } catch (error) {
      console.error("Error posting forum:", error);
    }
  };

  const toggleForumsVisibility = () => {
    setShowForums(!showForums);
  };

  const handleDeleteForum = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete-forum/${id}`);
      fetchForumPosts();
    } catch (error) {
      console.error("Error deleting forum:", error);
    }
  };

  return (
    <main
      className=" main px-5 py-5 d-flex flex-wrap w-100"
      style={{
        backgroundColor: "hsl(215, 17%, 20%)",
      }}
    >
      <div
        className="d-flex"
        id="headline"
        style={{
          height: "fit-content",
          marginBottom: "60px",
        }}
      >
        <div id="headlineDesc" style={{ flex: "0 0 62%" }}>
          <h2 className="fs-2 fw-medium" style={{ letterSpacing: "7px" }}>
            Discussions
          </h2>
          <p className="my-4 fw-light" style={{ textAlign: "justify" }}>
            Collaborate and share knowledge with fellow researchers! Discuss
            research projects, methodologies, data analysis techniques, and
            anything related to your scientific endeavors. This is a space to:
          </p>
          <ul className="fw-light">
            <li className="my-2">
              Ask questions and get expert advice from the SciCollab community.
            </li>
            <li className="my-2">
              Share your research findings and insights to spark discussions.
            </li>
            <li className="my-2">
              Collaborate on projects and brainstorm new ideas with other
              researchers.
            </li>
            <li>Stay up-to-date on the latest advancements in your field.</li>
          </ul>
        </div>
        <div
          className="p-3"
          id="headlineIcons"
          style={{
            flex: "0 0 31%",
            background: "none",
            position: "relative",
            top: "25px",
            left: "45px",
            transform: "rotate(-14deg)",
          }}
        >
          <MessageCircleQuestion
            color="#e25085"
            size={75}
            style={{ position: "relative", top: "2px", left: "75px" }}
          />
          <Clover
            color="#e25085"
            size={75}
            style={{ position: "relative", bottom: "70px", left: "370px" }}
          />
          <PencilLine
            color="hsl(338, 72%, 60%)"
            size={75}
            style={{ position: "relative", bottom: "-50px", left: "185px" }}
          />
          <PawPrint
            color="#e25085"
            size={75}
            style={{ position: "relative", top: "150px", right: "-10px" }}
          />
          <ThumbsUp
            color="#e25085"
            size={75}
            style={{ position: "relative", top: "85px", left: "349px" }}
          />
        </div>
      </div>
      <div className="my-5" id="list_of_projects">
        <div className="d-flex align-item-center" id="forum_and_icon">
          <MessagesSquare color="#e25085" size={45} />
          <h3 className="fs-2 fw-medium ms-3" style={{ letterSpacing: "7px" }}>
            Forums
          </h3>
          <button
            className="btn text-light mx-5"
            style={{ backgroundColor: "hsl(337, 93%, 66%)" }}
            onClick={toggleForumsVisibility}
          >
            {showForums ? "Hide Forums" : "Display Forums"}
          </button>
        </div>

        {showForums && (
          <>
            {forums.map((forum, index) => (
              <div className="d-flex flex-column mb-3" key={index}>
                <div className="px-3 py-4 my-3 container shadow-lg rounded vw-100">
                  <Link to={`/forum/${index}`} className="link text-light">
                    <h3>
                      {
                        renderForumContent(forum.title)
                          .split("<")[1]
                          .split(">")[1]
                      }
                    </h3>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderForumContent(forum.content),
                    }}
                  />
                  <h5 className="text-end m-3 opacity-50">
                    Created by: {forum.author}
                  </h5>
                  <button
                    className="btn text-light"
                    style={{ backgroundColor: "hsl(337, 93%, 66%)" }}
                    onClick={() => handleDeleteForum(forum._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="vw-100 justify-content-center" id="forum-container">
        <h2 style={{ position: "relative", left: "5%" }}>New Post</h2>

        <div className="form-floating w-75 my-5 mt-3">
          {/* input */}
          <div
            className="input-group mb-3 w-75"
            style={{
              position: "relative",
              left: "54%",
              transform: "translateX(-50%)",
            }}
          >
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
              style={{ height: "37.6px" }}
            >
              Title
            </span>
            <input
              type="text"
              className="form-control mb-3 fw-bolder"
              style={{ boxShadow: "inset #060606 0px 0px 5px 0px" }}
              value={forumTitle}
              onChange={(e) => setForumTitle(e.target.value)}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div
            className="input-group w-75"
            style={{
              position: "relative",
              left: "54%",
              transform: "translateX(-50%)",
            }}
          >
            <span className="input-group-text">With textarea</span>
            <textarea
              className="form-control"
              style={{
                boxShadow: "inset #060606 0px 0px 5px 0px",
                border: "none",
                color: "black",
                height: "100px",
              }}
              cols={100}
              rows={10}
              aria-label="With textarea"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div
          className="input-group has-validation w-75"
          style={{
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <span className="input-group-text" style={{ height: "58px" }}>
            @
          </span>
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${
                authorName.trim() === "" ? "is-invalid" : ""
              }`}
              style={{
                boxShadow: "inset #060606 0px 0px 5px 0px",
                width: "74%",
              }}
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Username"
              required
            />
            <label
              style={{ background: "none", color: "black" }}
              htmlFor="authorName"
            >
              Username
            </label>
            {authorName.trim() === "" && (
              <div className="invalid-feedback">Please choose a username.</div>
            )}
          </div>
        </div>

        <button
          className="btn btn-primary fs-5 fw-bolder "
          style={{
            backgroundColor: "hsl(337, 93%, 66%)",
            border: "none",
            letterSpacing: "0.1rem",
            outline: "none",
            position: "relative",
            left: "72%",
            bottom: "19%",
          }}
          onClick={postToForum}
          disabled={authorName.trim() === ""}
        >
          POST
        </button>
      </div>
    </main>
  );
}
