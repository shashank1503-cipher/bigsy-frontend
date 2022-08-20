import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import KeyValue from "./KeyValue";
import { FiPlus, FiDelete, FiCheckCircle } from "react-icons/fi";
import AddDataContext from "../context/AddDataContext";
const AddDataToDB = () => {
  let { key, value, setKey, setValue } = useContext(AddDataContext);
  const [countFields, setCountFields] = useState(1);
  const [name, setName] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [sending, setSending] = useState(false);
  let toast = useToast();
  const addField = () => {
    let data = { key: key, value: value };
    setCurrentData([...currentData, data]);
    setKey("");
    setValue("");
    setCountFields(countFields + 1);
  };
  const deleteField = (index) => {
    console.log(index);
    let data = currentData.filter((item, i) => i !== index);
    setCurrentData(data);
  };
  let addData = async () => {
    setSending(true);
    if (name === "") {
      toast({
        status: "error",
        title: "Empty Field",
        description: "Empty Collection Name",
        duration: 1000,
        isClosable: true,
      });
      setSending(false);
    } else if (currentData.length === 0) {
      toast({
        status: "error",
        title: "Empty Field",
        description: "Empty Fields",
        duration: 1000,
        isClosable: true,
      });
      setSending(false);
    } else {
      let data = {};
      currentData.forEach((item) => {
        data[item.key] = item.value;
      });
      let dataToSend = {
        index: name,
        data: data,
        doc_type: "text",
      };
      try {
        let response = await fetch(
          "http://127.0.0.1:8000/add_data/texttoindex",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
        if (response.status === 200) {
          let json = await response.json();
          toast({
            status: "success",
            title: "Success",
            description: json.message,
            duration: 1000,
            isClosable: true,
          });
          setName("");
          setCurrentData([]);
        } else {
          let json = await response.json();
          toast({
            status: "error",
            title: "Error",
            description: json.detail,
            duration: 1000,
            isClosable: true,
          });
        }
      } catch (err) {
        toast({
          status: "error",
          title: "Error",
          description: "Server Error" + err,
          duration: 1000,
          isClosable: true,
        });
      } finally {
        setSending(false);
      }
    }
  };

  return (
    <Flex direction={"column"} gap={10}>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        textAlign={"center"}
        gap={5}
        p={6}
      >
        <Heading>Add Data To DB</Heading>
      </Flex>
      <Flex
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        flexDirection={"column"}
        justifyContent={"center"}
        textAlign={"center"}
        gap={5}
        w={"75%"}
        margin={"auto"}
      >
        <Text fontWeight={"bold"}>Collection Name</Text>
        <Input
          type={"text"}
          placeholder="Enter Collection Name You Want to Add Data to"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </Flex>
      <Flex
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        justifyContent={"center"}
        textAlign={"center"}
        gap={5}
        w={"75%"}
        margin={"auto"}
        flexDirection={"column"}
      >
        <Text fontWeight={"bold"}>Data</Text>

        {currentData.map((x, i) => (
          <Flex justifyContent={"space-between"} gap={5}>
            <Text
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
              bg={"gray.700"}
              p={3}
              justifyContent={"center"}
              textAlign={"center"}
              w={"full"}
            >
              {x.key}
            </Text>
            <Text
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
              bg={"gray.700"}
              p={3}
              justifyContent={"center"}
              textAlign={"center"}
              w={"full"}
            >
              {x.value}
            </Text>
            <IconButton
              icon={<FiDelete />}
              onClick={() => {
                deleteField(i);
              }}
              colorScheme={"red"}
            />
          </Flex>
        ))}
        <KeyValue />
        <Flex justifyContent={"flex-end"}>
          <Button
            onClick={addField}
            leftIcon={<FiPlus />}
            disabled={key === "" || value === ""}
            colorScheme={"green"}
          >
            Add Field
          </Button>
        </Flex>
      </Flex>
      <Button
        colorScheme={"blue"}
        leftIcon={<FiCheckCircle />}
        margin={"auto"}
        w={"50%"}
        onClick={addData}
        isLoading={sending}
      >
        Add Data
      </Button>
    </Flex>
  );
};

export default AddDataToDB;
