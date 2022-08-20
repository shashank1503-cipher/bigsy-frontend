import { Flex, Input } from "@chakra-ui/react";
import React, { useContext } from "react";
import AddDataContext from "../context/AddDataContext";

const KeyValue = () => {
    let {key, setKey, value, setValue} = useContext(AddDataContext);
    return (
    <Flex gap={5}>
      <Input
        type={"text"}
        placeholder="Key"
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
        }}
        required
      />
      <Input
        type={"text"}
        placeholder="Value"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        required
      />
    </Flex>
  );
};

export default KeyValue;
