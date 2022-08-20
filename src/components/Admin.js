import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import AdminCard from "./AdminCard";

import { FiPlus } from "react-icons/fi";
import { HiOutlineTable } from "react-icons/hi";
import { FiDatabase,FiUpload } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
const Admin = () => {
  return (
    <Flex direction={"column"} py={6}>
      <Heading textAlign={"center"} fontSize={'5xl'}  >Dashboard</Heading>
      <Flex justifyContent={"space-evenly"} flexWrap={"wrap"} align={"center"} minH={"55vh"}>
        <AdminCard title={"Add Data to DB"} icon={FiPlus}  url={'/add'}/>
        <AdminCard title={"Upload File"} icon={FiUpload} />
        <AdminCard title={"Get Collections From DB"} icon={HiOutlineTable} url={'/indices'} />
        <AdminCard title={"Import SQL Dumps"} icon={FiDatabase} url={'/importsql'}/>
        <AdminCard title={"Get Stats"} icon={IoIosStats} />
      </Flex>
    </Flex>
  );
};

export default Admin;
