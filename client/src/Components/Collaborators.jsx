import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
  CardHeader,
  Box,
  Spacer,
  Badge,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Collaborators() {
  const { userId } = useParams();
  const [requests, setRequests] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOffcanvasOpen,
    onOpen: onOpenOffcanvas,
    onClose: onCloseOffcanvas,
  } = useDisclosure();
  const [senderId, setSenderId] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [requestId, setRequestId] = useState("");
  const [recipientName, setRecipientName] = useState("");

  // Sending a request
  const handleCollabRequestSend = async () => {
    try {
      await axios.post("/send-request", {
        senderId,
        recipientId,
        recipientName,
        message,
        status: "Pending",
      });
      setSenderId("");
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Error sending collaboration request:", error);
    }
  };

  // Rending collaborator
  const fetchCollaborators = async () => {
    try {
      const response = await axios.get("/get-users");
      setCollaborators(response.data);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  // Rending requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`/requests/${userId}`);
      const updatedRequests = response.data.requests.map((request) => {
        const storedStatus = localStorage.getItem(request._id);
        if (storedStatus) {
          return { ...request, status: storedStatus };
        } else {
          return request;
        }
      });
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error fetching collaboration requests:", error);
    }
  };

  // Responding to the requests
  const respondToRequest = async (requestId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "Pending"
          ? "Accept"
          : currentStatus === "Accept"
          ? "Decline"
          : "Accept";
      localStorage.setItem(requestId, newStatus); // Update status in localStorage
      const updatedRequests = requests.map((req) =>
        req._id === requestId ? { ...req, status: newStatus } : req
      );
      setRequests(updatedRequests); // Update status in state
      await axios.put(`/respond-request`, { requestId, response: newStatus }); // Update status on server
    } catch (error) {
      console.error("Error sending response of request:", error);
    }
  };

  // Getting the recipitent's username
  useEffect(() => {
    setSenderId(userId);
    fetchCollaborators();
    fetchRequests();
  }, [userId]);

  return (
    <main
      className="main"
      style={{
        backgroundColor: "hsl(215, 17%, 20%)",
      }}
    >
      <Container
        py="100"
        minW="100%"
        minH="100%"
        sx={{
          backgroundColor: "hsl(215, 17%, 20%)",
        }}
      >
        <Grid mx="85" templateColumns="repeat(1, 1fr)" gap={6}>
          <Center fontSize="5xl">Collaborators</Center>
          {collaborators
            .filter((collaborator) => collaborator._id !== senderId)
            .map((collaborator) => (
              <Card
                key={collaborator._id}
                mb={15}
                border="none"
                boxShadow="xl"
                bg="hsl(215, 17%, 20%)"
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  boxSize="300px"
                  src="https://as2.ftcdn.net/v2/jpg/01/78/95/43/1000_F_178954350_CpNpKeVtmOLNRMRoZIZ3zkcCtEQCTXtV.jpg"
                  alt="Caffe Latte"
                />
                <Stack>
                  <CardBody>
                    <Heading size="xl">{collaborator.username}</Heading>
                    <Text py="2">
                      Collaborator's Bio: Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. In repellendus omnis
                      accusantium, atque officia consequatur nostrum cumque
                      fugiat maxime laborum quaerat recusandae sapiente nesciunt
                      illum delectus autem tempora libero quidem!
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        setRecipientId(collaborator._id);
                        setRecipientName(collaborator.username);
                        onOpen();
                      }}
                      variant="solid"
                      bg="hsl(338, 72%, 60%)"
                      color="white"
                      sx={{
                        _hover: {
                          backgroundColor: "hsl(338 72%, 60%)",
                          textDecoration: "none",
                        },
                      }}
                    >
                      Collab
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            ))}
        </Grid>

        {/* Offcanvas */}
        <Button
          position="absolute"
          top="120"
          right="20"
          sx={{
            backgroundColor: "hsl(338 72%, 60%)",
            color: "black",
            _hover: {
              backgroundColor: "hsl(338 72%, 60%)",
              textDecoration: "none",
            },
          }}
          onClick={onOpenOffcanvas}
        >
          View requests
        </Button>
        {isOffcanvasOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            right={0}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="999"
            overflow="auto" // Allow the offcanvas to scroll
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              backgroundColor="hsl(215, 17%, 20%)"
              color="white"
              width="400px"
              p={4}
              maxHeight="100vh"
              overflowY="auto"
              css={`
                /* Customize scrollbar */
                &::-webkit-scrollbar {
                  width: 12px;
                }

                /* Track */
                &::-webkit-scrollbar-track {
                  background: transparent;
                }

                /* Handle */
                &::-webkit-scrollbar-thumb {
                  background: #4a5568; /* Darker shade of gray */
                  border-radius: 6px;
                  transition: background 0.3s ease-in-out;
                }

                /* Handle on hover */
                &::-webkit-scrollbar-thumb:hover {
                  background: #718096; /* Lighter shade of gray */
                }
              `}
            >
              {/* Offcanvas content */}
              <Button
                mb={50}
                sx={{ position: "relative", left: "75%" }}
                onClick={onCloseOffcanvas}
              >
                Close
              </Button>
              <Center my={5} mb={15} fontSize="2xl" fontWeight="bolder">
                Collaboration requests
              </Center>
              <Container>
                {/* Requests */}
                {requests.map((request) => (
                  <div key={request._id} boxShadow="2xl">
                    <Card
                      bg="hsl(215, 17%, 20%)"
                      boxShadow="2xl"
                      mb={10}
                      sx={{ width: "336px", padding: "10px" }}
                    >
                      <CardHeader>
                        <Flex alignItems="center">
                          <Heading size="md">
                            <span style={{ opacity: "0.5", fontSize: "1rem" }}>
                              from:{" "}
                            </span>
                            {request.sender.username}
                          </Heading>
                          <Spacer />
                          {/* <Badge
                            colorScheme={
                              request.status === "Accepted"
                                ? "green"
                                : request.status === "Declined"
                                ? "red"
                                : "yellow"
                            }
                            variant="subtle"
                            px={3}
                            py={1}
                            fontSize="sm"
                            fontWeight="bold"
                            borderRadius="md"
                          >
                            {request.status === "Accepted"
                              ? "Accepted"
                              : request.status === "Declined"
                              ? "Declined"
                              : "Pending"}
                          </Badge> */}

                          {/* Rendering the badge */}
                          <Badge
                            colorScheme={
                              request.status === "Accept"
                                ? "green"
                                : request.status === "Decline"
                                ? "red"
                                : "yellow"
                            }
                            variant="subtle"
                            px={3}
                            py={1}
                            fontSize="sm"
                            fontWeight="bold"
                            borderRadius="md"
                          >
                            {request.status === "Accept"
                              ? "Accepted"
                              : request.status === "Decline"
                              ? "Declined"
                              : "Pending"}
                          </Badge>
                        </Flex>
                      </CardHeader>
                      <CardBody>
                        <Text>{request.message}</Text>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onClick={() =>
                            respondToRequest(request._id, request.status)
                          }
                        >
                          {request.status === "Accept" ? "Decline" : "Accept"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </Container>
            </Box>
          </Box>
        )}
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          sx={{
            backgroundColor: "hsl(215, 17%, 20%)",
          }}
        >
          <ModalHeader>
            <Center mt={15} fontSize="x-large">
              Collaboration request
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Sender name</FormLabel>
              <Input
                placeholder="Name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Recipient</FormLabel>
              <Input isDisabled placeholder="Message" value={recipientName} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="hsl(338, 72%, 60%)"
              color="white"
              sx={{
                _hover: {
                  backgroundColor: "hsl(338 72%, 60%)",
                  textDecoration: "none",
                },
              }}
              mr={3}
              onClick={handleCollabRequestSend}
            >
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
