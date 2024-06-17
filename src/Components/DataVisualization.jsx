// import React, { useEffect, useState, useRef } from "react";
// import * as d3 from "d3";
// import axios from "axios";
// import { Center } from "@chakra-ui/react";

// export default function DataVisualization() {
//   const [visualizationData, setVisualizationData] = useState(null);
//   const svgRef = useRef(null);

//   useEffect(() => {
//     // Fetch data from backend API
//     const fetchVisualizationData = async () => {
//       try {
//         const response = await axios.post("/data-visual", {
//           name: "Sample Visualization",
//           type: "bar",
//           data: [
//             { x: "Category A", y: 20 },
//             { x: "Category B", y: 30 },
//             { x: "Category C", y: 25 },
//           ],
//           configuration: {
//             color: "blue",
//             xAxisLabel: "Categories",
//             yAxisLabel: "Values",
//           },
//         });
//         setVisualizationData(response.data);
//       } catch (error) {
//         console.error("Error fetching visualization data:", error);
//       }
//     };
//     fetchVisualizationData();
//   }, []);

//   useEffect(() => {
//     // Render visualization when data is available
//     if (visualizationData) {
//       renderVisualization(visualizationData);
//     }
//   }, [visualizationData]);

//   const renderVisualization = (data) => {
//     // D3.js code to render the visualization
//     // Example code for rendering a simple bar chart
//     const svg = d3.select(svgRef.current);
//     const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//     const width = +svg.attr("width") - margin.left - margin.right;
//     const height = +svg.attr("height") - margin.top - margin.bottom;

//     const x = d3
//       .scaleBand()
//       .rangeRound([0, width])
//       .padding(0.1)
//       .domain(data.data.map((d) => d.x));

//     const y = d3
//       .scaleLinear()
//       .rangeRound([height, 0])
//       .domain([0, d3.max(data.data, (d) => d.y)]);

//     const g = svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     g.append("g")
//       .attr("class", "axis axis-x")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x));

//     g.append("g")
//       .attr("class", "axis axis-y")
//       .call(d3.axisLeft(y).ticks(10, "%"))
//       .append("text")
//       .attr("y", 6)
//       .attr("dy", "0.71em")
//       .attr("text-anchor", "end")
//       .text("Frequency");

//     g.selectAll(".bar")
//       .data(data.data)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", (d) => x(d.x))
//       .attr("y", (d) => y(d.y))
//       .attr("width", x.bandwidth())
//       .attr("height", (d) => height - y(d.y));
//   };

//   return (
//     <main className="main" style={{ backgroundColor: "hsl(215, 17%, 20%)" }}>
//       <Center>
//         <svg width="960" height="500" ref={svgRef}></svg>
//       </Center>
//     </main>
//   );
// }

// code-2
import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import axios from "axios";
import {
  Center,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";

export default function DataVisualization() {
  const [visualizationData, setVisualizationData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    data: "",
    configuration: "",
  });

  const svgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(formData.data);
      const configuration = JSON.parse(formData.configuration);

      const requestData = {
        name: formData.name,
        type: formData.type,
        data: data,
        configuration: configuration,
      };

      const response = await axios.post("/data-visual", requestData);
      setVisualizationData(response.data);
    } catch (error) {
      console.error("Error fetching visualization data:", error);
    }
  };

  // const renderVisualization = (data) => {
  //   const svg = d3.select(svgRef.current);
  //   svg.selectAll("*").remove(); // Clear previous visualization

  //   const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  //   const width = +svg.attr("width") - margin.left - margin.right;
  //   const height = +svg.attr("height") - margin.top - margin.bottom;

  //   const x = d3
  //     .scaleBand()
  //     .rangeRound([0, width])
  //     .padding(0.1)
  //     .domain(data.data.map((d) => d.x));

  //   const y = d3
  //     .scaleLinear()
  //     .rangeRound([height, 0])
  //     .domain([0, d3.max(data.data, (d) => d.y)]);

  //   const g = svg
  //     .append("g")
  //     .attr("transform", `translate(${margin.left},${margin.top})`);

  //   g.append("g")
  //     .attr("class", "axis axis-x")
  //     .attr("transform", `translate(0,${height})`)
  //     .call(d3.axisBottom(x).ticks(data.configuration.xAxisTicks));

  //   g.append("g")
  //     .attr("class", "axis axis-y")
  //     .call(d3.axisLeft(y).ticks(data.configuration.yAxisTicks))
  //     .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", "0.71em")
  //     .attr("text-anchor", "end")
  //     .text(data.configuration.yAxisLabel);

  //   g.append("text")
  //     .attr("x", width / 2)
  //     .attr("y", -20)
  //     .attr("text-anchor", "middle")
  //     .style("font-size", "20px")
  //     .text(data.configuration.title || data.name);

  //   // Render different types of visualizations
  //   if (data.type === "bar") {
  //     renderBarChart(g, data, x, y, height);
  //   } else if (data.type === "line") {
  //     renderLineChart(g, data, x, y);
  //   } else if (data.type === "scatter") {
  //     renderScatterPlot(g, data, x, y);
  //   }
  // };

  const renderVisualization = (data) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous visualization

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.data.map((d) => d.x));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data.data, (d) => d.y)]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(data.configuration.xAxisTicks));

    g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(data.configuration.yAxisTicks))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(data.configuration.yAxisLabel);

    g.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("fill", "white")
      .text(data.configuration.title || data.name);

    // Add xAxisLabel
    g.append("text")
      .attr("transform", `translate(${width / 2},${height + 40})`)
      .style("fill", "white")
      .style("text-anchor", "middle")
      .text(data.configuration.xAxisLabel || "");

    // Add yAxisLabel
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .text(data.configuration.yAxisLabel || "");

    // Render different types of visualizations
    if (data.type === "bar") {
      renderBarChart(g, data, x, y, height, data.configuration);
    } else if (data.type === "line") {
      renderLineChart(g, data, x, y);
    } else if (data.type === "scatter") {
      renderScatterPlot(g, data, x, y, data.configuration);
    }
  };

  // const renderBarChart = (g, data, x, y, height, configuration) => {
  //   g.selectAll(".bar")
  //     .data(data.data)
  //     .enter()
  //     .append("rect")
  //     .attr("class", "bar")
  //     .attr("x", (d) => x(d.x))
  //     .attr("width", configuration.barWidth || x.bandwidth())
  //     .attr("y", (d) => y(d.y))
  //     .attr("height", (d) => height - y(d.y))
  //     .attr("fill", configuration.color || "steelblue");
  // };
  const renderBarChart = (g, data, x, y, height, configuration) => {
    g.selectAll(".bar")
      .data(data.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.x))
      .attr("width", configuration.barWidth || x.bandwidth())
      .attr("y", (d) => y(d.y))
      .attr("height", (d) => height - y(d.y))
      .attr("fill", (d) => d.color || configuration.color || "steelblue");
  };

  const renderLineChart = (g, data, x, y) => {
    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    g.append("path")
      .datum(data.data)
      .attr("fill", "none")
      .attr("stroke", data.configuration.color || "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  };

  // const renderScatterPlot = (g, data, x, y) => {
  //   g.selectAll(".dot")
  //     .data(data.data)
  //     .enter()
  //     .append("circle")
  //     .attr("class", "dot")
  //     .attr("cx", (d) => x(d.x))
  //     .attr("cy", (d) => y(d.y))
  //     .attr("r", 5)
  //     .attr("fill", (d) => d.color || "steelblue");
  // };

  // const renderScatterPlot = (g, data, x, y, configuration) => {
  //   g.selectAll(".dot")
  //     .data(data.data)
  //     .enter()
  //     .append("circle")
  //     .attr("class", "dot")
  //     .attr("cx", (d) => x(d.x))
  //     .attr("cy", (d) => y(d.y))
  //     .attr("r", configuration.scatterRadius || 5)
  //     .attr("fill", configuration.color || "steelblue");
  // };
  const renderScatterPlot = (g, data, x, y, configuration) => {
    g.selectAll(".dot")
      .data(data.data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", configuration.scatterRadius || 5)
      .attr("fill", (d) => d.color || configuration.color || "steelblue");
  };

  useEffect(() => {
    if (visualizationData) {
      renderVisualization(visualizationData);
    }
  }, [visualizationData]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap={50}
      p={150}
      h="100vh"
      bg="hsl(215, 17%, 20%)"
    >
      <Box
        bg="hsl(215, 17%, 20%)"
        p={8}
        sx={{ backgroundColor: "0 0 5px 0px #171616" }}
        borderRadius="md"
        minW="500px"
        maxW="700px"
      >
        <Center>
          <Heading mb={6}>Data Visualization</Heading>
        </Center>
        <Flex direction="column" gap={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Input name="type" value={formData.type} onChange={handleChange} />
            <FormHelperText>Type: bar, line, or scatter</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Data</FormLabel>
            <Input name="data" value={formData.data} onChange={handleChange} />
            <FormHelperText>
              Data format: JSON array of objects, e.g.,{" "}
              <span>[{'{"x": "Category A", "y": 20, "color": "red"}'}]</span>
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Configuration</FormLabel>
            <Input
              name="configuration"
              value={formData.configuration}
              onChange={handleChange}
            />
            <FormHelperText>
              Configuration format: JSON object, e.g.,{" "}
              <span>
                {
                  '{"color": "blue", "xAxisLabel": "Categories", "yAxisLabel": "Values", "title": "My Complex Visualization", "barWidth": 30, "barPadding": 5, "xAxisTicks": 10, "yAxisTicks": 5}'
                }
              </span>
            </FormHelperText>
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </Flex>
      </Box>
      {visualizationData && (
        <Box
          mt={8}
          p="30"
          borderRadius="lg"
          sx={{ boxShadow: "inset #060606 0px 0px 5px 0px" }}
        >
          <svg width="760" height="400" ref={svgRef}></svg>
        </Box>
      )}
    </Flex>
  );
}
