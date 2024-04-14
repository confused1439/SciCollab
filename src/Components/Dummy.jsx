import React, { useState, useEffect } from "react";

const User = ({ userId, username, isFollowed, onToggleFollow }) => {
  const [followed, setFollowed] = useState(isFollowed);

  const handleToggleFollow = () => {
    setFollowed(!followed);
    onToggleFollow(userId, !followed);
  };

  return (
    <div>
      <p>{username}</p>
      <button onClick={handleToggleFollow}>
        {followed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

const App = () => {
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    // Load followed users from local storage on component mount
    const storedFollowedUsers =
      JSON.parse(localStorage.getItem("followedUsers")) || [];
    setFollowedUsers(storedFollowedUsers);
  }, []);

  const handleToggleFollow = (userId, follow) => {
    let updatedFollowedUsers;
    if (follow) {
      updatedFollowedUsers = [...followedUsers, userId];
    } else {
      updatedFollowedUsers = followedUsers.filter((id) => id !== userId);
    }
    setFollowedUsers(updatedFollowedUsers);
    // Update local storage with the new list of followed users
    localStorage.setItem("followedUsers", JSON.stringify(updatedFollowedUsers));
  };

  return (
    <div>
      <h1>Users</h1>
      <User
        userId={1}
        username="User 1"
        isFollowed={followedUsers.includes(1)}
        onToggleFollow={handleToggleFollow}
      />
      <User
        userId={2}
        username="User 2"
        isFollowed={followedUsers.includes(2)}
        onToggleFollow={handleToggleFollow}
      />
      <User
        userId={3}
        username="User 3"
        isFollowed={followedUsers.includes(3)}
        onToggleFollow={handleToggleFollow}
      />
      <h2>Followed Users</h2>
      <ul>
        {followedUsers.map((userId) => (
          <li key={userId}>User {userId}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
