// import React, { useState, useEffect } from "react";

// const User = ({ userId, username, isFollowed, onToggleFollow }) => {
//   const [followed, setFollowed] = useState(isFollowed);

//   const handleToggleFollow = () => {
//     setFollowed(!followed);
//     onToggleFollow(userId, !followed);
//   };

//   return (
//     <div>
//       <p>{username}</p>
//       <button onClick={handleToggleFollow}>
//         {followed ? "Unfollow" : "Follow"}
//       </button>
//     </div>
//   );
// };

// const App = () => {
//   const [followedUsers, setFollowedUsers] = useState([]);

//   useEffect(() => {
//     // Load followed users from local storage on component mount
//     const storedFollowedUsers =
//       JSON.parse(localStorage.getItem("followedUsers")) || [];
//     setFollowedUsers(storedFollowedUsers);
//   }, []);

//   const handleToggleFollow = (userId, follow) => {
//     let updatedFollowedUsers;
//     if (follow) {
//       updatedFollowedUsers = [...followedUsers, userId];
//     } else {
//       updatedFollowedUsers = followedUsers.filter((id) => id !== userId);
//     }
//     setFollowedUsers(updatedFollowedUsers);
//     // Update local storage with the new list of followed users
//     localStorage.setItem("followedUsers", JSON.stringify(updatedFollowedUsers));
//   };

//   return (
//     <div>
//       <h1>Users</h1>
//       <User
//         userId={1}
//         username="User 1"
//         isFollowed={followedUsers.includes(1)}
//         onToggleFollow={handleToggleFollow}
//       />
//       <User
//         userId={2}
//         username="User 2"
//         isFollowed={followedUsers.includes(2)}
//         onToggleFollow={handleToggleFollow}
//       />
//       <User
//         userId={3}
//         username="User 3"
//         isFollowed={followedUsers.includes(3)}
//         onToggleFollow={handleToggleFollow}
//       />
//       <h2>Followed Users</h2>
//       <ul>
//         {followedUsers.map((userId) => (
//           <li key={userId}>User {userId}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function Project() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const onClose1 = () => setIsOpen1(false);
  const onClose2 = () => setIsOpen2(false);

  return (
    <div>
      <Button onClick={() => setIsOpen1(true)}>Open Modal 1</Button>
      <Button onClick={() => setIsOpen2(true)}>Open Modal 2</Button>

      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal 1</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            convallis libero sit amet interdum fermentum.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose1}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal 2</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            convallis libero sit amet interdum fermentum.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
