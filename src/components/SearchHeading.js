import { Button, ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const SearchHeading = ({isVisible}) => {
  return (
    <Flex direction={"column"} justifyContent={"center"}>
      <Flex
        justifyContent={"center"}
        align={"center"}
        direction={"column"}
        // minH={"45vh"}
        h={!isVisible ? "45vh" : "0"}
        overflow={"hidden"}
        transition={"all 0.2s ease-in-out"}
      >
        <Heading
          fontFamily={`'Poppins', sans-serif;`}
          // color={useColorModeValue('cyan.600', 'cyan')}
          fontSize={["30px", "40px", "60px", "80px"]}
          // textTransform={'uppercase'}
          display={"flex"}
        >
          Let's look for a needle
        </Heading>
        <Text
          mt={5}
          fontSize={["16px", "16px", "25px", "30px"]}
          w={"75%"}
          textAlign={"center"}
          fontFamily={`'Poppins', sans-serif;`}
          fontWeight={"medium"}
        >
          in a HayStack
        </Text>
      </Flex>
    </Flex>
  );
};

export default SearchHeading;
