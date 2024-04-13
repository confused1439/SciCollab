import React, { useState } from "react";

const User = ({ userId, username, onFollow }) => {
  const [followed, setFollowed] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleFollow = () => {
    setRequestSent(true); // Set request sent to true
    // Simulate an API call to send follow request
    setTimeout(() => {
      setRequestSent(false); // Reset request sent status
      setFollowed(true); // Once request is sent, set followed to true
      onFollow(userId); // Notify parent component about the follow action
    }, 1000);
  };

  return (
    <div>
      <p>{username}</p>
      {!followed && !requestSent && (
        <button onClick={handleFollow}>Follow</button>
      )}
      {requestSent && <p>Follow request sent...</p>}
      {followed && <p>Following</p>}
    </div>
  );
};

const App = () => {
  const [followedUsers, setFollowedUsers] = useState([]);

  const handleFollow = (userId) => {
    setFollowedUsers([...followedUsers, userId]);
  };

  return (
    <div>
      <h1>Users</h1>
      <User userId={1} username="User 1" onFollow={handleFollow} />
      <User userId={2} username="User 2" onFollow={handleFollow} />
      <User userId={3} username="User 3" onFollow={handleFollow} />
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
