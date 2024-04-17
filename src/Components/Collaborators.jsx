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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  const [recipientName, setRecipientName] = useState("");
  const [findUsername, setFindUsername] = useState("");

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
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching collaboration requests:", error);
    }
  };

  // Getting the recipitent's username

  useEffect(() => {
    setSenderId(userId);
    fetchCollaborators();
    fetchRequests();
  }, [userId]);

  const handleCollabRequestSend = async () => {
    try {
      await axios.post("/send-request", {
        senderId,
        recipientId,
        recipientName,
        message,
      });
      setSenderId("");
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Error sending collaboration request:", error);
    }
  };

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
                  boxSize="270px"
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

          {/* Requests */}
          {requests.map((request) => (
            <div key={request._id}>
              <Card bg="hsl(215, 17%, 20%)" sx={{ width: "fit-content" }}>
                <CardHeader>
                  <Heading size="md"> {request.sender.username}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{request.message}</Text>
                </CardBody>
                <CardFooter>
                  <Button></Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </Grid>

        {/* Offcanvas */}
        <Button onClick={onOpenOffcanvas}>Open Offcanvas</Button>

        {isOffcanvasOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            right={0}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="999"
            onClick={onCloseOffcanvas}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              backgroundColor="white"
              width="300px"
              p={4}
            >
              {/* Offcanvas content */}
              <Button onClick={onCloseOffcanvas}>Close</Button>
              <p>This is the offcanvas content.</p>
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
