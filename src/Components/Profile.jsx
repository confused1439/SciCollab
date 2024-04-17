import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();

  useEffect(() => {
    // Store userId in session storage when component mounts
    sessionStorage.setItem("userId", userId);
    console.log(`${userId} is stored in session successfully!`);

    // Clean up function to remove userId from session storage when component unmounts
    return () => {
      sessionStorage.removeItem("userId");
    };
  }, [userId]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {userId}</p>
    </div>
  );
}
