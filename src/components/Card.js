import {
  Box,
  Center,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  let navigate = useNavigate();

  const handleNavigate = (val) =>
    navigate({
      pathname: "/upload",
      search: `?type=${val}`,
    });
  return (
    <Center
      p={6}
      onClick={() => {
        handleNavigate(props.url);
      }}
    >
      <Box
        transition={"all 0.2s ease-in-out"}
        maxW={"330px"}
        w={"full"}
        boxShadow={"xl"}
        rounded={"md"}
        overflow={"hidden"}
        minW={"150px"}
        _hover={{ transform: "scale(1.05)" }}
        cursor={"pointer"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Stack
          textAlign={"center"}
          p={8}
          // color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text color={""} fontSize={"5xl"}>
            {props.icon && <Icon as={props.icon} />}
          </Text>
          <Text>{props.title}</Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default Card;
