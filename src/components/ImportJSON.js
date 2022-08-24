import {
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
import { FileUploader } from "react-drag-drop-files";
import { FiFile, FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";

function ImportJSON() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(0);
  const [dragging, setDragging] = useState(false);
  const toast = useToast();
  let fileTypes = ["json"];
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    if (sending === 0) return;

    if (sending === 1) {
      toast({
        status: "loading",
        duration: null,
        title: "Sending Data...",
      });
    }

    if (sending === 2) {
      if (toast != null) toast.closeAll();

      setTimeout(
        () =>
          toast({
            status: "success",
            duration: 4000,
            title: "Data posted",
          }),
        0
      );

      setSending(0);
    }
  }, [sending, toast]);

  const ImportJSON = async () => {
    if (!name || !file) {
      toast({
        status: "warning",
        title: "Empty Field",
        description: "empty field",
        duration: 1000,
      });
      return;
    }

    if (sending) {
      toast({
        status: "warning",
        title: "Already sending data",
        description: "sending data",
        duration: 1000,
      });
      return;
    }

    setSending(1);

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("file", file);

    console.log(formdata);

    const res = await fetch("http://127.0.0.1:8000/add_data/jsontoindex", {
      method: "POST",
      body: formdata,
    });

    const json = await res.json();
    console.log(json);

    // setTimeout(() => setSending(2),2000);

    setSending(2);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={"/admin"}>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link to={"/importjson"}>
            <BreadcrumbLink>Import JSON</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex direction={"column"} textAlign={"center"} p={6}>
        <Flex
          direction={"column"}
          p={6}
          justifyContent={"space-between"}
          gap={5}
        >
          <Heading fontSize={"5xl"}>Import JSON</Heading>
          <Text>Drop Your .json File Here to Add it to the Database</Text>
        </Flex>
        <Flex direction={"column"} p={12} margin={"auto"} gap={5}>
          <Input
            type={"text"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of .json File"
            focusBorderColor="blue.500"
            borderColor="gray.500"
            value={name}
          />
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            hoverTitle={`Drag and drop ${fileTypes} files here`}
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
                    <Text fontSize={"xl"}>Drop Your JSON Here</Text>
                  </>
                )}
              </Flex>
            }
          />

          <Button onClick={() => ImportJSON()}>Add Data</Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ImportJSON;
