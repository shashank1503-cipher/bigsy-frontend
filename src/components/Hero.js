import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

const Hero = () => {
  let navigate = useNavigate();
  return (
    <Flex
      minH={"85vh"}
      justifyContent={"center"}
      align={"center"}
      direction={"column"}
    >
      <Heading
        fontFamily={`'Poppins', sans-serif;`}
        // color={useColorModeValue('cyan.600', 'cyan')}
        fontSize={["30px", "40px", "60px", "75px"]}
        // textTransform={'uppercase'}
        display={"flex"}
      >
        Big Data Search
      </Heading>
      <Text
        mt={5}
        fontSize={["16px", "16px", "18px", "20px"]}
        w={"75%"}
        textAlign={"center"}
        fontFamily={`'Poppins', sans-serif;`}
        fontWeight={"medium"}
      >
        &gt;_ made easy with BigSy
      </Text>
      <ButtonGroup spacing={10} mt={5}>
        <Button
          variant={"solid"}
          size={"lg"}
          colorScheme={"cyan"}
          borderRadius={"full"}
          onClick={() => navigate("/search")}
        >
          Get Started
        </Button>
        <Button
          variant={"ghost"}
          size={"lg"}
          colorScheme={"cyan"}
          borderRadius={"full"}
          onClick={() => navigate("/admin")}
        >
          Add Data
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Hero;
