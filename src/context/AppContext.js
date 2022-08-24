import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIndices = async () => {
    const res = await fetch('http://localhost:8000/get/indices')
    const data = await res.json()
    // console.log(data)
    // let data = { data: ['Hello World'] };
    console.log(data);

    setIndices([...data?.data]);
  };

  useEffect(() => {
    const func = async () => {
      await getIndices();
      setLoading(false);
    };

    func();
  }, []);

  const memo = useMemo(
    () => ({
      indices,
    }),
    [indices]
  );

  return (
    <AppContext.Provider value={memo}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export default function useApp() {
  return useContext(AppContext);
}
