import React, { useEffect, useState } from 'react'
import {
  Input,
  Box, 
  Flex, 
  Button,
  Text
} from '@chakra-ui/react'

import {
  FaSearch
} from 'react-icons/fa'



const Search = () => {

  const [search, setSearch] = useState("")
  const [rawData,setRawData] = useState(null)

  const fetchData = async () => {

    if(search.length === 0)
      return;
    
    const res = await fetch(`http://127.0.0.1:8000/search?q=${search}`)
    const json = await res.json()

    setRawData({...json});
    console.log(json)
  }

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
          
          onChange={(e) => setSearch(e.target.value)}
          />

        <Button
          borderRadius={'50%'}
          p={2}
          onClick={() => fetchData()}
        ><FaSearch/></Button>
      </Flex>

      {rawData?
        <Text textAlign={'center'}>Total Docs : {rawData?.meta?.total}</Text>:<></>
      }

      <Flex
        gap={2}
        direction={'column'}
      >
        {rawData?.data.map(m => {
          
            if(search.trim().length === 0)
              return <></>

            let arr1 = search.trim().split(" ")

            
            arr1 = arr1.map(a => a.toLowerCase())
            console.log(arr1)

            let main_index = null;
            for(let i = 0; i<Object.keys(m._source).length; i++)
            {
              let arr2 = m._source[Object.keys(m._source)[i]].toString().toLowerCase()
              // console.log(arr2)
              
              const inter = arr1.filter(x => arr2.includes(x) === true)
              // console.log(arr2, inter)
              if(inter.length > 0)
              {
                // console.log(inter)
                main_index = Object.keys(m._source)[i]
                break;
              }
            }

            if(!main_index)
              return <></>

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
              <Flex
                direction={'column'}
              >
                <Text
                  fontSize={20}
                  _groupHover={{
                    color: 'cyan.600'
                  }}
                >{m?._index}</Text>
                
                <Text
                  color={'gray.500'}
                  fontSize={'14px'}
                >{m?._source[main_index]}</Text>
              </Flex>
              <Text>{main_index}</Text>
            </Flex>
          )

        })}

      </Flex>

   </Flex>
  )
}
export default Search;