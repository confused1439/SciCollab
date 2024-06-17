import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [researchInterests, setResearchInterests] = useState("");
  const [bio, setBio] = useState("");
  // useEffect(() => {}, [userId]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    try {
      axios.post(`/update-user/${userId}`, {
        username,
        email,
        skills,
        researchInterests,
        bio,
      });

      sessionStorage.setItem("userName", username);

      setUsername("");
      setEmail("");
      setSkills("");
      setResearchInterests("");
      setBio("");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/logout");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userId");

      window.location.href = response.data.redirectToHome;
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <main
      className="h-100"
      style={{ paddingBlock: "100px", backgroundColor: "hsl(215, 17%, 20%)" }}
    >
      <Container boxShadow="2xl" px="80px" py="30px">
        {/* Form header */}
        <FormControl>
          <Center>
            <Heading mb="10" fontSize="4xl" fontWeight="bolder">
              User Details
            </Heading>
          </Center>
        </FormControl>

        {/* Form Body */}
        <FormControl mt={4}>
          <FormLabel>Username</FormLabel>
          <Input
            mt={2}
            color="white"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            border="none"
            placeholder="Username"
            sx={{ boxShadow: "inset 0 0 4px 0px #141414" }}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            mt={2}
            value={email}
            border="none"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ boxShadow: "inset 0 0 4px 0px #141414" }}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Skills</FormLabel>
          <Input
            mt={2}
            value={skills}
            border="none"
            placeholder="comma-seperated values"
            onChange={(e) => setSkills(e.target.value)}
            sx={{ boxShadow: "inset 0 0 4px 0px #141414" }}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Research interest</FormLabel>
          <Input
            mt={2}
            value={researchInterests}
            border="none"
            placeholder="comma-seperated values"
            onChange={(e) => setResearchInterests(e.target.value)}
            sx={{ boxShadow: "inset 0 0 4px 0px #141414" }}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Bio</FormLabel>
          <Textarea
            mt={2}
            value={bio}
            border="none"
            placeholder="about you"
            onChange={(e) => setBio(e.target.value)}
            sx={{ boxShadow: "inset 0 0 4px 0px #141414" }}
          />
        </FormControl>

        <FormControl mt={10} mb={5}>
          <Flex>
            <Button
              onClick={handleUpdateUser}
              variant="solid"
              bg="hsl(338, 48%, 48%)"
            >
              Submit
            </Button>
            <Spacer />
            <Button
              onClick={handleLogout}
              variant="solid"
              bg="hsl(338, 48%, 48%)"
            >
              Log out
            </Button>
          </Flex>
        </FormControl>
      </Container>
    </main>
  );
}
