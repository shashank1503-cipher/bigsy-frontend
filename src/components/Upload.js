import { Button, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FiImage, FiFile, FiUpload } from "react-icons/fi";
import { BsFileEarmarkWordFill, BsFilePdf } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";

const Upload = () => {
  const [params] = useSearchParams();
  let type = params.get("type");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  let fileTypeMap = {
    image: ["png", "jpg", "jpeg", "gif", "svg"],
    pdf: ["pdf"],
    doc: ["doc", "docx", "odt", "rtf", "txt"],
  };
  let fileTypes = fileTypeMap[type];
  const handleChange = (file) => {
    setFile(file);
  };
  let toast = useToast();

  function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }
  console.log(file);
  return (
    <Flex direction={"column"} textAlign={"center"} p={6}>
      <Flex direction={"column"} p={6} justifyContent={"space-between"} gap={5}>
        <Heading fontSize={"5xl"}>Upload Files </Heading>
        <Text>
          You can drop any of your files to add it to the database and search
          it.
        </Text>
      </Flex>
      <Flex wrap={"wrap"} p={8} margin={"auto"} gap={3}>
        <Card title={"Upload Image"} icon={FiImage} url={"image"} />
        <Card
          title={"Upload Doc Files"}
          icon={BsFileEarmarkWordFill}
          url={"doc"}
        />
        <Card title={"Upload PDF Files"} icon={BsFilePdf} url={"pdf"} />
      </Flex>
      {type && (
        <Flex direction={"column"} p={12} margin={"auto"} gap={5}>
          {" "}
          <Input
            type={"text"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of Index"
            focusBorderColor="blue.500"
            borderColor="gray.500"
            value={name}
          />
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            hoverTitle={`Drag and drop ${fileTypes} files here`}
            onTypeError={() =>
              toast({
                status: "warning",
                title: "Wrong File Type",
                description: "Wrong File Type",
                duration: 1000,
                isClosable: true,
              })
            }
            children={
              <Flex
                bg={"blackAlpha.600"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                w={["full", "full", "350px", "450px"]}
                p={12}
                borderStyle={"dashed"}
                borderWidth={"2px"}
                borderColor={"grey"}
                justifyContent={"space-evenly"}
                gap={10}
                direction={["column", "column", "row", "row"]}
                alignItems={"center"}
              >
                <Text fontSize={"3xl"}>
                  <FiUpload />
                </Text>
                <Text fontSize={"xl"}>Drop Your {capitalize(type)} Here</Text>
              </Flex>
            }
          />
          <Button
          // onClick={() => UploadFile()}
          >
            Add Data
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Upload;
