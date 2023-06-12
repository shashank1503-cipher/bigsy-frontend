import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Input,
  Spacer,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FiImage, FiFile, FiUpload } from "react-icons/fi";
import { BsFileEarmarkWordFill, BsFilePdf, BsSoundwave } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import useApp from "../context/AppContext";

const Upload = () => {
  const [params] = useSearchParams();
  let { getIndices } = useApp();
  
  let type = params.get("type");

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  let fileTypeMap = {
    image: ["png", "jpg", "jpeg", "gif", "svg"],
    pdf: ["pdf"],
    doc: ["doc", "docx", "odt", "rtf", "txt"],
    sound: ["wav", "mp3", "ogg"],
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
  let uploadFile = async () => {
    setUploading(true);
    if (file) {
      setUploading(true);
      let formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(
          "http://localhost:5500/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          setFileUrl(data.url);
          toast({
            title: "File Uploaded Successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          getIndices();
          
        } else {
          const data = await res.json();
          console.log(data);
          toast({
            title: "Error",
            description: `${data.error} - ${res.status}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `Something went wrong - ${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setUploading(false);
      }
    } else {
      setUploading(false);
    }
  };

  let sendData = async () => {
    let urlMap = {
      image: "singleimagefiletoindex",
      doc: "wordtoindex",
      pdf: "pdftoindex",
      sound: "soundtoindex",
    };
    if (!fileUrl) {
      toast({
        title: "Error",
        description: `File is Not Uploaded Yet`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (!name) {
      toast({
        title: "Error",
        description: `Please Add Name`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      let data = {
        url: fileUrl,
        index: name,
        doc_type: type,
      };
      let url = `http://localhost:8000/add_data/${urlMap[type]}`;
      try {
        setIsloading(true);
        let resp = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (resp.status === 200) {
          let json = await resp.json();
          toast({
            title: "Success",
            description: `Succesfully Added it to Index`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setFile(null);
          setFileUrl(null);
          setName("");
        } else {
          let json = await resp.json();
          toast({
            title: "Error",
            description: `${json.detail} - ${resp.status}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Something went wrong - ${err.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsloading(false);
      }
    }
  };

  useEffect(() => {
    uploadFile();
  }, [file]);

  useEffect(() => {
    setFile(null);
  }, [type]);


  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/admin"}>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link to={"/upload"}>
            <BreadcrumbLink>Upload</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        {type && (
          <BreadcrumbItem>
            <BreadcrumbLink>{capitalize(type)}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex direction={"column"} textAlign={"center"} p={6}>
        <Flex
          direction={"column"}
          p={6}
          justifyContent={"space-between"}
          gap={5}
        >
          <Heading fontSize={"5xl"}>Upload File</Heading>
          <Text>
            You can drop any of your file to add it to the database and search
            it.
          </Text>
        </Flex>
        <Flex wrap={"wrap"} p={4} margin={"auto"} gap={3}
        
          justifyContent={'center'}
        >

          <Card title={"Upload Image"} icon={FiImage} url={"image"}/>
          <Card
            title={"Upload Doc File"}
            icon={BsFileEarmarkWordFill}
            url={"doc"}
            
          />
          <Card title={"Upload PDF File"} icon={BsFilePdf} url={"pdf"} />
          <Card title={"Upload Sound File"} icon={BsSoundwave} url={"sound"} />
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
              hoverTitle={`Drag and drop ${fileTypes} file here`}
              onDraggingStateChange={() => {
                console.log("Called");
                setDragging(!dragging);
              }}
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
                  {!dragging ? (
                    <Spacer h={8} />
                  ) : uploading ? (
                    <>
                      <Spinner />
                    </>
                  ) : file ? (
                  <>
                    <Text fontSize={"3xl"}>
                      <FiFile />
                    </Text>
                    <Text fontSize={"xl"}>{file.name}</Text>
                  </>
                ) : (
                  <>
                    <Text fontSize={"3xl"}>
                      <FiUpload />
                    </Text>
                    <Text fontSize={"xl"}>Drop Your {capitalize(type)} Here</Text>
                  </>
                  )}
                </Flex>
              }
            />
            <Button
              onClick={() => sendData()}
              disabled={uploading}
              isLoading={isLoading}
            >
              Add Data
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Upload;
