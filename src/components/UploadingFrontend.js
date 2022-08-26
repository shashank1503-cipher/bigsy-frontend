import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const UploadingFrontend = ({ sending }) => {
  let isSending = sending !== 0;
  //   console.log(isSending);
  return (
    <Flex
      w={isSending ? "full" : "0vw"}
      overflow={"hidden"}
      justifyContent={"center"}
      align={"center"}
      direction={"column"}
      //   maxH={'85vh'}
      transition={"all 0.5s ease-in-out"}
      h = {isSending ? "85vh" : "0vh"}
    >
      <Heading fontFamily={`'Poppins',sans-serif`}>
        Take a Chill Pill, ....have a coffee
      </Heading>
      <img
        src={
          "https://res.cloudinary.com/dpjf6btln/image/upload/v1661502494/Coffee_break_1_lqh5zd.gif"
        }
      />

      <Text fontFamily={`'Poppins',sans-serif`}>
        While we process your data
      </Text>
    </Flex>
  );
};

export default UploadingFrontend;
