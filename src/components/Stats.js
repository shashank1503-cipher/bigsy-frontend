import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillFileWord } from "react-icons/ai";
import { BiCodeCurly } from "react-icons/bi";
import { FiAlertCircle, FiCheckCircle, FiImage, FiMusic } from "react-icons/fi";
import useApp from "../context/AppContext";

const Stats = () => {
  let { indices } = useApp();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/get/stats");
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let bg = useColorModeValue("white", "gray.800");

  return (
    <Flex direction={"column"} justifyContent={"center"} gap={5}>
      <Heading textAlign={"center"}>Statistics</Heading>
      {loading ? (
        <Flex h={"65vh"} align={"center"} justifyContent={"center"}>
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex h={"65vh"}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error Fetching Data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Flex>
      ) : (
        <Flex wrap={"wrap"} gap={10} justifyContent={"center"}>
          <Flex
            justifyContent={"center"}
            transition={"all 0.2s ease-in-out"}
            maxW={"380px"}
            w={"full"}
            bg={bg}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            minW={"250px"}
            _hover={{ transform: "scale(1.05)" }}
            cursor={"pointer"}
            direction={"column"}
            align={"center"}
          >
            <Stack
              textAlign={"center"}
              p={8}
              // color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <Heading color={""} fontSize={"2xl"}>
                Total Collections
              </Heading>
              <Heading>{indices.length}</Heading>
            </Stack>
            <Stack
              textAlign={"center"}
              p={8}
              // color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <Heading color={""} fontSize={"2xl"}>
                Total Search Indexes Created
              </Heading>
              <Heading>{data?.data?.total_indexes}</Heading>
            </Stack>
          </Flex>
          <Box
            justifyContent={"center"}
            transition={"all 0.2s ease-in-out"}
            maxW={"380px"}
            w={"full"}
            bg={bg}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            minW={"250px"}
            _hover={{ transform: "scale(1.05)" }}
            cursor={"pointer"}
          >
            <Stack
              textAlign={"center"}
              p={8}
              // color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <Heading color={""} fontSize={"l"}>
                Memory Usage
              </Heading>
              <CircularProgress
                value={
                  data?.data?.memory_usage?.available_in_bytes /
                  data?.data?.memory_usage?.total_in_bytes
                }
                color="green.400"
                size={"l"}
                minW={250}
                minH={250}
              >
                <CircularProgressLabel fontSize={"xl"}>
                  {data?.data?.memory_usage_pretty?.available +
                    "/" +
                    data?.data?.memory_usage_pretty?.total}
                </CircularProgressLabel>
              </CircularProgress>
            </Stack>
          </Box>
          <Box
            justifyContent={"center"}
            transition={"all 0.2s ease-in-out"}
            maxW={"380px"}
            w={"full"}
            bg={bg}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            minW={"250px"}
            _hover={{ transform: "scale(1.05)" }}
            cursor={"pointer"}
          >
            <Stack
              textAlign={"center"}
              p={8}
              // color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <Heading color={""} fontSize={"2xl"}>
                Cluster Details
              </Heading>
            </Stack>
            <Flex justifyContent={"center"} p={8} direction={"column"} gap={5}>
              {data?.data?.cluster_health?.status === "green" ? (
                <Flex gap={2}>
                  <Text color={"green.400"} fontSize={"3xl"}>
                    <FiCheckCircle color={"green.400"} />
                  </Text>
                  <Text fontSize={"xl"}>Healthy</Text>
                </Flex>
              ) : (
                <Flex>
                  <Text color={"red.400"}>
                    <FiAlertCircle color={"red.400"} />
                  </Text>
                  <Text>Unhealthy</Text>
                </Flex>
              )}
              <Text fontSize={"xl"}>
                {data?.data?.cluster_health?.number_of_nodes} nodes
              </Text>
              <Text fontSize={"xl"}>
                {data?.data?.cluster_health?.active_shards} Active Shards{" "}
              </Text>
              <Text fontSize={"xl"}>
                {data?.data?.cluster_health?.unassigned_shards} Unassigned Shards{" "}
              </Text>
              <Text fontSize={"xl"}>
                {data?.data?.cluster_health?.number_of_pending_tasks} Pending Tasks{" "}
              </Text>
            </Flex>
          </Box>
          <Box
            justifyContent={"center"}
            transition={"all 0.2s ease-in-out"}
            maxW={"380px"}
            w={"full"}
            bg={bg}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            minW={"250px"}
            _hover={{ transform: "scale(1.05)" }}
            cursor={"pointer"}
          >
            <Stack
              textAlign={"center"}
              p={8}
              // color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              <Heading color={""} fontSize={"2xl"}>
                Total Documents
              </Heading>
              <Heading>{data?.data?.total_documents}</Heading>
            </Stack>
            <Flex wrap={"wrap"} gap={5} justifyContent={"center"} p={8}>
              <CircularProgress
                value={
                  (data?.data?.total_audio / data?.data?.total_documents) * 100
                }
                color="blue.400"
                size={"20"}
              >
                <CircularProgressLabel fontSize={"md"}>
                  <Flex direction={"column"} align={"center"}>
                    <FiMusic />
                    {data?.data?.total_audio}
                  </Flex>
                </CircularProgressLabel>
              </CircularProgress>
              <CircularProgress
                value={(data?.data?.total_docx / data?.data?.total_documents) * 100}
                color="blue.400"
                size={"20"}
              >
                <CircularProgressLabel fontSize={"md"}>
                  <Flex direction={"column"} align={"center"}>
                    <AiFillFileWord />
                    {data?.data?.total_docx}
                  </Flex>
                </CircularProgressLabel>
              </CircularProgress>
              <CircularProgress
                value={
                  (data?.data?.total_images / data?.data?.total_documents) * 100
                }
                color="blue.400"
                size={"20"}
              >
                <CircularProgressLabel fontSize={"md"}>
                  <Flex direction={"column"} align={"center"}>
                    <FiImage />
                    {data?.data?.total_images}
                  </Flex>
                </CircularProgressLabel>
              </CircularProgress>
              <CircularProgress
                value={(data?.data?.total_text / data?.data?.total_documents) * 100}
                color="blue.400"
                size={"20"}
              >
                <CircularProgressLabel fontSize={"md"}>
                  <Flex direction={"column"} align={"center"}>
                    <BiCodeCurly />
                    {data?.data?.total_text}
                  </Flex>
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Stats;
