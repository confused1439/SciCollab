import React, { useState } from "react";
import axios from "axios";
import {
  useDisclosure,
  Button,
  Stack,
  RadioGroup,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Grid,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
} from "@chakra-ui/react";
import "../styles/Project.scss";

export default function Project() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("1");

  const [formDataCount, setFormDataCount] = useState(1);
  const [formMillestoneCount, setMillestoneCount] = useState(1);
  const [formTaskCount, setTaskCount] = useState(1);

  const addNewDataForm = () => {
    setFormDataCount(formDataCount + 1);
  };

  const addNewMillestoneForm = () => {
    setMillestoneCount(formMillestoneCount + 1);
  };

  const addNewTaskForm = () => {
    setTaskCount(formTaskCount + 1);
  };

  const renderDataForms = () => {
    const dataForms = [];
    for (let i = 0; i < formDataCount; i++) {
      dataForms.push(
        <FormControl key={i} mt={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Input placeholder="Name" />
            <Input placeholder="Keywords..." />
          </Grid>
          <Input name="description" mt={4} placeholder="Description" />

          <InputGroup mt={4} size="sm">
            <InputLeftAddon
              sx={{
                border: "none",
                backgroundColor: "hsl(220,11%,28%)",
                color: "white",
                borderRadius: "5px 0 0 5px",
              }}
            >
              https://
            </InputLeftAddon>
            <Input
              sx={{
                border: "none",
                boxShadow: "inset #060606 0px 0px 3px 0px",
                backgroundColor: "hsl(220,11%,28%)",
                color: "white",
              }}
              placeholder="mysite"
            />
            <InputRightAddon
              sx={{
                border: "none",
                backgroundColor: "hsl(220,11%,28%)",
                color: "white",
                borderRadius: "5px 0 0 5px",
              }}
            >
              .com
            </InputRightAddon>
          </InputGroup>
        </FormControl>
      );
    }
    return dataForms;
  };

  const renderMillestonesForms = () => {
    const millestoneForm = [];
    for (let i = 0; i < formMillestoneCount; i++) {
      millestoneForm.push(
        <FormControl mt={6}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Input name="millestone" placeholder={`Millestone - ${i + 1}`} />
            <Input name="deadline" placeholder="Deadline" />
          </Grid>
        </FormControl>
      );
    }
    return millestoneForm;
  };

  const renderTaskForms = () => {
    const taskForm = [];
    for (let i = 0; i < formTaskCount; i++) {
      taskForm.push(
        <FormControl mt={6}>
          {/* <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Input name="" placeholder="Deadline" />
          </Grid> */}
          <Input name="task" placeholder={`Task - ${i + 1}`} />
          <FormLabel mt={4}>Task status</FormLabel>
          <RadioGroup mt={2} onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio value="1">Complete</Radio>
              <Radio value="2">Incomplete</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      );
    }
    return taskForm;
  };

  // Function to create a new project
  const createNewProject = async (projectData) => {
    try {
      const response = await axios.post(
        // `/create-project/${userId}`,
        projectData
      );
      console.log(response.data); // Log response data if needed
      onClose(); // Close modal after successful creation
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare project data from form fields
    const projectData = {
      name: event.target.name.value,
      description: event.target.description.value,
      accessControl: value, // This value is already stored in state
      keywords: event.target.keywords.value,
      methodology: event.target.methodology.value,
      analysisTools: event.target.analysisTools.value,
      // Add more fields as needed
    };
    // createNewProject(projectData);
  };

  return (
    <main className="vh-100" style={{ backgroundColor: "hsl(215, 17%, 20%)" }}>
      <Button
        onClick={onOpen}
        sx={{
          color: "white",
          backgroundColor: "hsl(337, 93%, 66%)",
          fontSize: "3rem",
          fontWeight: "regular",
          padding: "25px 10px",
          _hover: {
            backgroundColor: "hsl(337, 93%, 66%)", // Set hover color to the same as default color
            textDecoration: "none", // Disable any hover effect
          },
        }}
      >
        +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          sx={{
            backgroundColor: "hsl(215, 17%, 20%)",
            maxHeight: "calc(100vh - 130px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar
            },
          }}
        >
          <form onSubmit={handleSubmit}>
            <ModalHeader mb={5} sx={{ textAlign: "center" }}>
              Create new project
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* Name */}
              <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input name="name" placeholder="Project name" />
              </FormControl>

              {/* Description */}
              <FormControl mt={6}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Here is a sample placeholder"
                />
              </FormControl>

              {/* Access Control */}
              <RadioGroup onChange={setValue} value={value} mt={6}>
                <FormLabel>Access Control</FormLabel>
                <Stack direction="row">
                  <Radio value="1">Public</Radio>
                  <Radio value="2">Private</Radio>
                  <Radio value="3">Collaborator</Radio>
                </Stack>
              </RadioGroup>

              {/* Keywords */}
              <FormControl mt={6}>
                <FormLabel>
                  Keywords
                  <span style={{ opacity: "0.4" }}>(comma-separated)</span>
                </FormLabel>
                <Input name="keywords" placeholder="Keywords for project" />
              </FormControl>

              {/* Data */}
              <FormControl mt={6}>
                <FormLabel>Data</FormLabel>
                {renderDataForms()}
                <Button
                  id="addData"
                  onClick={addNewDataForm}
                  sx={{
                    color: "white",
                    backgroundColor: "hsl(337, 93%, 66%)",
                    _hover: {
                      backgroundColor: "hsl(337, 93%, 66%)", // Set hover color to the same as default color
                      textDecoration: "none", // Disable any hover effect
                    },
                  }}
                  mt={4}
                >
                  Add new data
                </Button>
              </FormControl>

              {/* Methodology */}
              <FormControl mt={6}>
                <FormLabel>Methodology</FormLabel>
                <Input placeholder="Methodology used" />
              </FormControl>

              {/* Analysis Tools */}
              <FormControl mt={6}>
                <FormLabel>
                  Analysis Tools
                  <span style={{ opacity: "0.4" }}>(comma-separated)</span>
                </FormLabel>
                <Input placeholder="Tools for analysis" />
              </FormControl>

              {/* Milestones */}
              <FormControl mt={6}>
                <FormLabel>Millestones</FormLabel>
                {renderMillestonesForms()}
                <Button
                  id="addMillestone"
                  onClick={addNewMillestoneForm}
                  sx={{
                    color: "white",
                    backgroundColor: "hsl(337, 93%, 66%)",
                    _hover: {
                      backgroundColor: "hsl(337, 93%, 66%)", // Set hover color to the same as default color
                      textDecoration: "none", // Disable any hover effect
                    },
                  }}
                  mt={4}
                >
                  Add Millestone
                </Button>
              </FormControl>

              {/* Tasks */}
              <FormControl mt={6}>
                <FormLabel>Tasks</FormLabel>
                {renderTaskForms()}
                <Button
                  id="addTask"
                  onClick={addNewTaskForm}
                  sx={{
                    color: "white",
                    backgroundColor: "hsl(337, 93%, 66%)",
                    _hover: {
                      backgroundColor: "hsl(337, 93%, 66%)", // Set hover color to the same as default color
                      textDecoration: "none", // Disable any hover effect
                    },
                  }}
                  mt={4}
                >
                  Add Task
                </Button>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                sx={{
                  color: "white",
                  backgroundColor: "hsl(337, 93%, 66%)",
                  _hover: {
                    backgroundColor: "hsl(337, 93%, 66%)", // Set hover color to the same as default color
                    textDecoration: "none", // Disable any hover effect
                  },
                }}
                mr={3}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </main>
  );
}
