import React, { useEffect, useRef, useState } from 'react'
import {
  Input,
  Box, 
  Flex, 
  Button,
  Text,
  Toast,
  useToast,
} from '@chakra-ui/react'

import {
  FaSearch,
  FaArrowRight,
  FaFilePdf,
  FaFileImage,
  FaFileAudio
} from 'react-icons/fa'
import FilterModal from '../utils/FilterModal'



const Search = () => {

  const [search, setSearch] = useState("")
  const [rawData,setRawData] = useState(null)
  const [mainData, setMainData] = useState([])
  const [totalPages, setTotalPages] = useState([])
  const [filters, setFilters] = useState({
    index: [],
    doc: []
  })
  const [page,  setPage] = useState(1)
  const toast = useToast()

  useEffect(() => {
    console.log(filters)
  }, [filters])

  const fetchData = async (dataType=0) => {

      if(dataType === 1)
      {
        setMainData([])
        setRawData(null)
        setPage(1)
        setTotalPages([])
      }

      console.log('page', page)

      if(search.length === 0)
        return;
      const url = `http://127.0.0.1:8000/search?q=${search}&page=${page}&filters=${JSON.stringify(filters)}`
      console.log(url)
      const res = await fetch(url)
      const json = await res.json()

      console.log(json)
      
      // console.log(json)
      if(dataType === 1)
      {
          let tp = (json?.meta?.total/10) + 1
          let arr = []
          for(let i = 1; i<=tp; i++)
            arr.push(i);

          setTotalPages([...arr]);
      }

      setRawData({...json})
  }

  useEffect(() => {

    if(rawData)
    {
        let data = []
        rawData?.data?.map(m => {
            
          if(search.trim().length === 0)
            return null

          let arr1 = search.trim().split(" ")

          arr1 = arr1.map(a => a.toLowerCase())
          console.log(arr1)

          let main_index = null;
          for(let i = 0; i<Object.keys(m._source).length; i++)
          {
            let arr2 = m._source[Object.keys(m._source)[i]].toString().toLowerCase()
            
            const inter = arr1.filter(x => arr2.includes(x) === true)
          
            if(inter.length > 0)
            {
              main_index = Object.keys(m._source)[i]
              break;
            }
          }

          data.push({...m, main_index})

        })

        setMainData([...data])

    }

  }, [rawData])

  const searchPage = (p) => {

    if(p > totalPages.length || p < 0)
    {
      toast({
        status:'error',
        duration: 6000,
        isClosable: true,
        title: 'page not found!'
    })
    }
    else
    {
      setPage(parseInt(p))
    }

  }

  useEffect(() => {

    fetchData()

  }, [page])

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      gap={3}
    >
      <Flex
        gap={2}
      >
        <Input 
          placeholder='Search' 
          focusBorderColor = "blue.500" 
          borderColor="gray.500"
          value={search}
          onKeyDown={e => e.key==='Enter'?fetchData(1):null}
          onChange={(e) => setSearch(e.target.value)}
          />

        <Button
          borderRadius={'50%'}
          p={2}
          onClick={() => fetchData(1)}
        ><FaSearch/></Button>

        <FilterModal selectedFields={setFilters} filters={filters}/>

      </Flex>

      {rawData?
        <Text textAlign={'center'}>Total Docs : {rawData?.meta?.total}</Text>:<></>
      }
      {mainData.length > 0?
      <Flex
        w={'100%'}
        justifyContent='space-evenly'
        alignItems={'center'}
        position={'relative'}
      
        // bg={'red.200'}
      >
        <Flex
          gap={1}
          // bg={'blue.300'}
        >
          {totalPages.map(p => {

            if(p <= 2);
            else if(p >= totalPages.length-2);
            else if(p < page)
              return <></>

            else if(p > page+5)
              return <></>


            return (
              <Button key={p}
                onClick={() => setPage(p)}
                bg={p === page?'cyan.700':""}

              >{p}</Button>
              )
            })}

          </Flex>

          <Flex
            gap={4}
            position="relative"
            // bg={'yellow.600'}
          >
            <Input          
              id={'pageinput'}
              placeholder="Page"
              type={'number'}
              maxW={'30%'}
              onKeyDown={e => e.key === 'Enter'?searchPage(e.target.value):null}
            />
            <Button
              onClick={() => searchPage(document.getElementById('pageinput').value || 1)}
            >
              <FaArrowRight/>
            </Button>
          </Flex>

      </Flex>:null}



      <Flex
        gap={2}
        direction={'column'}  
      >
        {mainData.map(m => {

          return (
    
            <Flex 
              key={m._id}
              justifyContent={'space-between'}
              _hover={{
                borderColor:'cyan.600'
              }}
              border={"1px"}
              borderColor='gray.600'
              borderRadius={10}
              px={4}
              py={1}
              role={'group'}
              alignItems={'center'}
              cursor={'pointer'}
            >
              {m?._source?.doctype === 'text'?
              <>
                <Flex
                  direction={'column'}
                >

                    <Text
                      fontSize={20}
                      _groupHover={{
                        color: 'cyan.700'
                      }}
                    >{m?._index}</Text>
                    
                    <Text
                      color={'gray.500'}
                      fontSize={'14px'}
                    >{m?._source[m.main_index]}</Text>
                </Flex>
                <Text>{m.main_index}</Text>
              </>:
              <Flex
                justifyContent={'space-between'}
                px={4}
                w={'full'}
                alignItems={'center'}
                onClick={() => window.open(m?._source?.url)}
              >

                  <Text
                    fontSize={20}
                    _groupHover={{
                      color: 'cyan.700'
                    }}
                  >{m?._index}</Text>

                  {m?._source?.doctype === 'pdf' || m?._source?.doctype === 'doc'?
                  <FaFilePdf size={20}/>:""}

                  {m?._source?.doctype === 'img'?
                  <FaFileImage size={20}/>:""}

              </Flex>
              } 

            </Flex>
          )

        })}

      </Flex>

   </Flex>
  )
}
export default Search;