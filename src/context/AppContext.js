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

  const [statData, setStatData] = useState({})

  let fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/get/stats");
      const data = await res.json();
      console.log(data)
      setStatData({...data.data});
    } catch (error) {
      
    }
  };


    const getIndices = async () => {

        try
        {
            const res = await fetch('http://localhost:8000/get/indices')
            const data = await res.json()
            // console.log(data)
            console.log(data)

            setIndices([...data?.data])
        }
        catch{
            
        }
        

    }

    useEffect(() => {

        const func = async () => {

            await getIndices()
            await fetchData()
            setLoading(false)

        }

        func()

    }, [])

    const memo = useMemo(() => ({
        indices,
        getIndices,
        fetchData,
        statData
    }), [indices, statData])

  return (
    <AppContext.Provider value={memo}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export default function useApp() {
  return useContext(AppContext);
}
