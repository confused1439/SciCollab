import { useState, useEffect } from "react";
import axios from "axios";
import {
  useDisclosure,
  Button,
  Select,
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
  Flex,
  Grid,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  Box,
} from "@chakra-ui/react";
import "../styles/Project.scss";
import { useParams } from "react-router-dom";

export default function Project() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const onClose1 = () => setIsOpen1(false);
  const onClose2 = () => setIsOpen2(false);

  const { userId } = useParams();
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [accessControl, setAccessControl] = useState("Public");
  const [methodology, setMethodology] = useState("");
  const [analysisTools, setAnalysisTools] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState([
    { name: "", keywords: "", description: "", url: "" },
  ]);
  const [formDataCount, setFormDataCount] = useState(1);
  const [milestones, setMilestones] = useState([{ name: "", deadline: "" }]);
  const [milestoneCount, setMilestoneCount] = useState(1);
  const [tasks, setTasks] = useState([{ name: "", status: "" }]);
  const [taskCount, setTaskCount] = useState(1);
  const [projects, setProjects] = useState([]); // State to hold projects

  useEffect(() => {
    // Fetch projects when component mounts
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/get-projects");
      // console.log(response.data.createdBy);
      setProjects(
        response.data.filter((project) => project.createdBy === userId)
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) {
      return <p>No projects available</p>;
    }
    return projects.map((project, index) => (
      <Box
        sx={{
          backgroundColor: "hsl(215, 17%, 20%)",
          boxShadow: " #060606 0px 0px 5px 0px",
          height: "500px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        key={index}
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        mb={4}
      >
        <p style={{ opacity: "0.6", marginBottom: "20px" }}>
          Project - {index + 1}
        </p>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <p>Keywords: {project.keywords.join(", ")}</p>
        <p>Funding Source: {project.fundingSource}</p>
        <p>Access Control: {project.accessControl}</p>
        <p>Methodology: {project.methodology}</p>
        <p>Analysis Tools: {project.analysisTools.join(", ")}</p>
        <p>Created By: {project.createdBy}</p>
        <p>Created At: {new Date(project.createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(project.updatedAt).toLocaleString()}</p>
        {/* Render data */}
        <p>Data:</p>
        {project.data.map((data, dataIndex) => (
          <div key={dataIndex}>
            <p>Name: {data.name}</p>
            <p>Description: {data.description}</p>
            <p>Data URL: {data.dataUrl}</p>
            <p>Format: {data.format}</p>
          </div>
        ))}
        {/* Render milestones */}
        <p>Milestones:</p>
        {project.milestones.map((milestone, milestoneIndex) => (
          <div key={milestoneIndex}>
            <p>Name: {milestone.name}</p>
            <p>Deadline: {new Date(milestone.deadline).toLocaleString()}</p>
          </div>
        ))}
        {/* Render tasks */}
        <p>Tasks:</p>
        {project.tasks.map((task, taskIndex) => (
          <div key={taskIndex}>
            <p>Name: {task.name}</p>
            <p>Completed: {task.completed ? "Yes" : "No"}</p>
          </div>
        ))}

        <Button
          sx={{ backgroundColor: "hsl(337, 93%, 66%)" }}
          onClick={() => handleDeleteProject(project._id)}
        >
          Delete
        </Button>
      </Box>
    ));
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`/delete-project/${id}`);
      fetchProjects(); // Fetch the updated projects
    } catch (error) {
      console.error("Error deleting forum:", error);
    }
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setName(project.name);
    setDescription(project.description);
    setAccessControl(project.accessControl);
    setKeywords(project.keywords.join(", "));
    setMethodology(project.methodology);
    setAnalysisTools(project.analysisTools.join(", "));
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(`/update-project/${selectedProject._id}`, {
        name,
        description,
        keywords: keywords.split(",").map((k) => k.trim()),
        accessControl,
        methodology,
        analysisTools: analysisTools.split(",").map((t) => t.trim()),
      });
      console.log("Project updated successfully");
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // dataform
  const addNewDataForm = () => {
    setFormDataCount(formDataCount + 1);
    setFormData([
      ...formData,
      { name: "", dataUrl: "", description: "", format: "" },
    ]);
  };
  const handleDataChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  const renderDataForms = () => {
    return formData.map((data, index) => (
      <FormControl key={index} mt={4}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Input
            placeholder="Name"
            value={data.name}
            onChange={(e) => handleDataChange(index, "name", e.target.value)}
          />
          <Input
            placeholder="format..."
            value={data.format}
            onChange={(e) => handleDataChange(index, "format", e.target.value)}
          />
        </Grid>
        <Textarea
          name="description"
          mt={4}
          placeholder="Description"
          value={data.description}
          onChange={(e) =>
            handleDataChange(index, "description", e.target.value)
          }
        />
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
            value={data.dataUrl}
            onChange={(e) => handleDataChange(index, "dataUrl", e.target.value)}
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
    ));
  };

  // milestone
  const addNewMilestoneForm = () => {
    setMilestoneCount(milestoneCount + 1);
    setMilestones([...milestones, { name: "", deadline: "" }]);
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
  };

  const renderMilestonesForms = () => {
    return milestones.map((milestone, index) => (
      <FormControl key={index} mt={6}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Input
            name="milestone"
            placeholder={`Milestone - ${index + 1}`}
            value={milestone.name}
            onChange={(e) =>
              handleMilestoneChange(index, "name", e.target.value)
            }
          />
          <Input
            name="deadline"
            placeholder="Deadline"
            value={milestone.deadline}
            onChange={(e) =>
              handleMilestoneChange(index, "deadline", e.target.value)
            }
          />
        </Grid>
      </FormControl>
    ));
  };
  // task
  const addNewTaskForm = () => {
    setTaskCount(taskCount + 1);
    setTasks([...tasks, { name: "", status: "" }]);
  };

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const renderTaskForms = () => {
    return tasks.map((task, index) => (
      <FormControl key={index} mt={6}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Input
            name="task"
            placeholder={`Task - ${index + 1}`}
            value={task.name}
            onChange={(e) => handleTaskChange(index, "name", e.target.value)}
          />
          <Select
            sx={{ position: "relative", bottom: "8px" }}
            mt={2}
            value={task.status}
            onChange={(e) => handleTaskChange(index, "status", e.target.value)}
            placeholder="Select status"
          >
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </Select>
        </Grid>
      </FormControl>
    ));
  };

  const handleAccessChange = (value) => {
    setAccessControl(value);
  };

  const handleCreateNewProject = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/create-project", {
        name,
        data: formData,
        description,
        keywords,
        accessControl,
        milestones,
        methodology,
        tasks,
        analysisTools,
        createdBy: userId, // Include the userId here
      });

      console.log(`project created by: ${userId}`);
      // Reset the form fields
      setName("");
      setDescription("");
      setKeywords("");
      setAccessControl("Public");
      setMethodology("");
      setAnalysisTools("");
      setFormData([{ name: "", dataUrl: "", description: "", format: "" }]);
      setFormDataCount(1);
      setMilestones([{ name: "", deadline: "" }]);
      setMilestoneCount(1);
      setTasks([{ name: "", status: "" }]);
      setTaskCount(1);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <main className="h-100" style={{ backgroundColor: "hsl(215, 17%, 20%)" }}>
      <Button
        onClick={() => setIsOpen1(true)}
        sx={{
          color: "white",
          backgroundColor: "hsl(337, 93%, 66%)",
          position: "relative",
          marginTop: "35px",
          left: "50%",
          transform: "translateX(-50%)",
          fontWeight: "bolder",

          _hover: {
            backgroundColor: "hsl(337, 93%, 66%)",
            textDecoration: "none",
          },
        }}
      >
        Add new project
      </Button>

      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent
          sx={{
            boxShadow: "inset #060606 0px 0px 7px 0px",
            backgroundColor: "hsl(215, 17%, 20%)",
            maxHeight: "calc(100vh - 130px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <form onSubmit={handleCreateNewProject}>
            <ModalHeader mb={5} sx={{ textAlign: "center" }}>
              Create new project
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* Name */}
              <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Project name"
                />
              </FormControl>

              {/* Description */}
              <FormControl mt={6}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  placeholder="Here is a sample placeholder"
                />
              </FormControl>

              {/* Access Control */}
              <RadioGroup
                value={accessControl}
                onChange={handleAccessChange}
                mt={6}
              >
                <FormLabel>Access Control</FormLabel>
                <Stack direction="row">
                  <Radio value="Public">Public</Radio>
                  <Radio value="Private">Private</Radio>
                  <Radio value="Collaborator">Collaborator</Radio>
                </Stack>
              </RadioGroup>

              {/* Keywords */}
              <FormControl mt={6}>
                <FormLabel>
                  Keywords
                  <span style={{ opacity: "0.4" }}>(comma-separated)</span>
                </FormLabel>
                <Input
                  name="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Keywords for project"
                />
              </FormControl>

              {/* Render other form fields */}
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
                      backgroundColor: "hsl(337, 93%, 66%)",
                      textDecoration: "none",
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
                <Input
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                  placeholder="Methodology used"
                />
              </FormControl>

              {/* Analysis Tools */}
              <FormControl mt={6}>
                <FormLabel>
                  Analysis Tools
                  <span style={{ opacity: "0.4" }}>(comma-separated)</span>
                </FormLabel>
                <Input
                  value={analysisTools}
                  onChange={(e) => setAnalysisTools(e.target.value)}
                  placeholder="Tools for analysis"
                />
              </FormControl>

              <FormControl mt={6}>
                <FormLabel>Milestones</FormLabel>
                {renderMilestonesForms()}
                <Button
                  id="addMilestone"
                  onClick={addNewMilestoneForm}
                  sx={{
                    color: "white",
                    backgroundColor: "hsl(337, 93%, 66%)",
                    _hover: {
                      backgroundColor: "hsl(337, 93%, 66%)",
                      textDecoration: "none",
                    },
                  }}
                  mt={4}
                >
                  Add Milestone
                </Button>
              </FormControl>

              {/* Render other form fields */}
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
                      backgroundColor: "hsl(337, 93%, 66%)",
                      textDecoration: "none",
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
              <Button onClick={onClose1}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <h1
        className="my-4"
        style={{ position: "relative", width: "fit-content", left: "3%" }}
      >
        Project Gallery
      </h1>
      <Grid
        sx={{ padding: "50px" }}
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={4}
      >
        {renderProjects()}
      </Grid>

      {/* Model-2 */}

      {/* Update Modal */}
      <h1
        className="my-4"
        style={{ position: "relative", width: "fit-content", left: "3%" }}
      >
        Update and Delete section
      </h1>
      <Flex
        flexDirection="column"
        alignItems="center"
        justify="center"
        p={8}
        bg="hsl(215, 17%, 20%)"
      >
        {selectedProject ? (
          <Flex
            sx={{
              boxShadow: "#060606 0px 0px 7px 0px",
              backgroundColor: "hsl(215, 17%, 20%)",
              maxHeight: "calc(100vh - 10px)",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            direction="column"
            alignItems="center"
            justify="center"
            bg="white"
            p={8}
            borderRadius="md"
            boxShadow="md"
            mb={4}
          >
            <h4 className="my-4">Update Project</h4>
            <FormControl mb={4}>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Here is a sample placeholder"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Access Control</FormLabel>
              <RadioGroup
                value={accessControl}
                onChange={(value) => setAccessControl(value)}
              >
                <Stack direction="row">
                  <Radio value="Public">Public</Radio>
                  <Radio value="Private">Private</Radio>
                  <Radio value="Collaborator">Collaborator</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Keywords
                <span style={{ opacity: "0.4" }}>(comma-separated)</span>
              </FormLabel>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Keywords for project"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Methodology</FormLabel>
              <Input
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
                placeholder="Methodology used"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Analysis Tools
                <span style={{ opacity: "0.4" }}>(comma-separated)</span>
              </FormLabel>
              <Input
                value={analysisTools}
                onChange={(e) => setAnalysisTools(e.target.value)}
                placeholder="Tools for analysis"
              />
            </FormControl>

            <Flex justify="flex-end" w="full">
              <Button
                mr={4}
                onClick={() => setSelectedProject(null)}
                sx={{
                  color: "white",
                  backgroundColor: "hsl(337, 93%, 66%)",
                  _hover: {
                    backgroundColor: "hsl(337, 93%, 66%)",
                    textDecoration: "none",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProject}
                sx={{
                  color: "white",
                  backgroundColor: "hsl(337, 93%, 66%)",
                  _hover: {
                    backgroundColor: "hsl(337, 93%, 66%)",
                    textDecoration: "none",
                  },
                }}
              >
                Update
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex
            sx={{
              color: "white",
              backgroundColor: "hsl(215, 17%, 20%)",
              boxShadow: "0px 0px 7px 0px #242222",
            }}
            direction="column"
            alignItems="center"
            justify="center"
            bg="white"
            p={8}
            borderRadius="md"
            boxShadow="md"
            mb={4}
          >
            <p>No project selected</p>
          </Flex>
        )}

        <Flex justify="space-between" w="full">
          <Button
            onClick={() => setSelectedProject(null)}
            sx={{
              color: "white",
              backgroundColor: "hsl(337, 93%, 66%)",
              _hover: {
                backgroundColor: "hsl(337, 93%, 66%)",
                textDecoration: "none",
              },
            }}
          >
            Add new project
          </Button>
          {selectedProject && (
            <Button
              onClick={() => handleDeleteProject(selectedProject._id)}
              sx={{
                color: "white",
                backgroundColor: "hsl(337, 93%, 66%)",
                _hover: {
                  backgroundColor: "hsl(337, 93%, 66%)",
                  textDecoration: "none",
                },
              }}
            >
              Delete
            </Button>
          )}
        </Flex>

        {/* Project list */}
        <Flex
          sx={{
            boxShadow: "inset #060606 0px 0px 7px 0px",
            backgroundColor: "hsl(215, 17%, 20%)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          direction="column"
          alignItems="center"
          justify="center"
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="md"
          mb={4}
          mt={8}
          w="full"
        >
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <Flex
                sx={{ boxShadow: "0px 0px 7px 0px #000000" }}
                key={index}
                direction="column"
                alignItems="flex-start"
                justify="center"
                bg="hsl(215, 17%, 20%)"
                p={4}
                borderRadius="md"
                boxShadow="md"
                mb={4}
                w="full"
                onClick={() => handleEditProject(project)}
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "hsl(215, 17%, 24%)",
                }}
              >
                <h2 style={{ color: "white" }}>{project.name}</h2>
                <p style={{ color: "white", opacity: "0.8" }}>
                  {project.description}
                </p>
                <p style={{ color: "white", opacity: "0.8" }}>
                  Keywords: {project.keywords.join(", ")}
                </p>
                <p style={{ color: "white", opacity: "0.8" }}>
                  Access Control: {project.accessControl}
                </p>
                <p style={{ color: "white", opacity: "0.8" }}>
                  Methodology: {project.methodology}
                </p>
                <p style={{ color: "white", opacity: "0.8" }}>
                  Analysis Tools: {project.analysisTools.join(", ")}
                </p>
              </Flex>
            ))
          ) : (
            <p>No projects available</p>
          )}
        </Flex>
      </Flex>
    </main>
  );
}
