import { Button, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import fs from 'fs'

function ImportSql() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(0);
  const toast = useToast();

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

    const res = await fetch("http://127.0.0.1:8000/add", {
      method: "POST",
      body: formdata,
    });

    const json = await res.json();
    console.log(json);

    // setTimeout(() => setSending(2),2000);

    setSending(2);
  };

  return (
    <Flex direction={"column"} textAlign={"center"} p={6}>
      <Flex direction={"column"} p={6} justifyContent={"space-between"} gap={5}>
        <Heading fontSize={"5xl"}>Import SQL</Heading>
        <Text>Drop Your SQL Dumps Here to Add it to the Database</Text>
      </Flex>
      <Flex direction={"column"} p={12} margin={'auto'} gap={5}>
        <Input
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of the SQL Dump"
          focusBorderColor="blue.500"
          borderColor="gray.500"
          value={name}
        />
        <Input
          type={"file"}
          onChange={(e) => setFile(e.target.files[0])}
          border={"none"}
        />

        <Button onClick={() => ImportSql()}>Add Data</Button>
      </Flex>
    </Flex>
  );
}

export default ImportSql;
