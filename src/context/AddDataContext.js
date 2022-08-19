import { createContext, useState } from "react";

const AddDataContext = createContext();

export default AddDataContext;

export const AddDataProvider = ({ children }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  let contextData = {
    key: key,
    setKey: setKey,
    value: value,
    setValue: setValue,
  };
  return (
    <AddDataContext.Provider value={contextData}>
      {children}
    </AddDataContext.Provider>
  );
};
