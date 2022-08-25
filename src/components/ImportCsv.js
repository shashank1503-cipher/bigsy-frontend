import { Button, Flex, Heading, Input, Text, useToast, Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink, } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";

function ImportCsv() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(0);
  const toast = useToast();
  let fileTypes = ["csv"];
  const handleChange = (file) => {
    setFile(file);
  };

  console.log(file);
  useEffect(() => {
    if (sending === 0) return;

    if (sending === 1) {
      toast({
        status: "loading",
        duration: null,
        title: "Sending Data...",
      });
    }

    if(sending === 3)
    {
        if (toast != null) toast.closeAll();

        setTimeout(
          () =>
            toast({
              status: "error",
              duration: 4000,
              title: "error in CSV",
              isClosable: true
            }),
          0
        );
  
        setSending(0);
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

  const ImportSql = async () => {
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

    const res = await fetch("http://127.0.0.1:8000/add_data/csvtoindex", {
      method: "POST",
      body: formdata,
    });

    if(res.status !== 200)
    {
      setSending(3)
    }
    else
    {
      const json = await res.json();
      console.log(json);

      // setTimeout(() => setSending(2),2000);

      setSending(2);
    }

    
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
          <Link to={"/importcsv"}>
            <BreadcrumbLink>Import_CSV</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>
    <Flex direction={"column"} textAlign={"center"} p={6}>
      <Flex direction={"column"} p={6} justifyContent={"space-between"} gap={5}>
        <Heading fontSize={"5xl"}>Import CSV</Heading>
        <Text>Drop Your CSV Here to Add it to the Database</Text>
      </Flex>
      <Flex direction={"column"} p={12} margin={"auto"} gap={5}>
        <Input
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the SQL Dump"
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
              <Text fontSize={"xl"}>Drop File Here</Text>
            </Flex>
          }
        />

        <Button onClick={() => ImportSql()}>Add Data</Button>
      </Flex>
    </Flex>
    </>
  );
}

export default ImportCsv;
