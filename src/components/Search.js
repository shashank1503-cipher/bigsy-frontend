import React, { useEffect, useRef, useState } from 'react'
import {
  Input,
  Box, 
  Flex, 
  Button,
  Text,
  Toast,
  useToast,
  Image,
  position,

} from '@chakra-ui/react'


import {
  FaSearch,
  FaArrowRight,
  FaFilePdf,
  FaFileImage,
  FaFileAudio,
  FaFileWord
} from 'react-icons/fa'
import FilterModal from '../utils/FilterModal'

const Search = () => {

  const [search, setSearch] = useState("")
  const [rawData,setRawData] = useState(null)
  const [mainData, setMainData] = useState({
    text: [],
    image: [],
    doc: [],
    sound: []
  })
  const [totalPages, setTotalPages] = useState([])
  const [filters, setFilters] = useState({
    index: [],
    doc: []
  })

  const naviToDoc = (index,id) => {
    window.open(`http://localhost:3000/doc/${index}/${id}`)
  }

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
        return
      const url = `http://127.0.0.1:8000/search?q=${search}&page=${page}&filters=${JSON.stringify(filters)}`

      const res = await fetch(url)
      const json = await res.json()

      
      // console.log(json)
      if(dataType === 1)
      {
          let tp;
          if(json?.meta?.total%10 === 0)
            tp = (json?.meta?.total/10)
          else
          tp = (json?.meta?.total/10) + 1
          let arr = []
          for(let i = 1; i<=tp; i++)
            arr.push(i);

          console.log(arr)

          setTotalPages([...arr]);
      }

      setRawData({...json})
  }

  useEffect(() => {

    if(rawData)
    {
        let data = {
          text: [],
          image: [],
          doc: [],
          sound: []
        }
        rawData?.data?.map(m => {
            
          if(search.trim().length === 0)
            return null

          let arr1 = search.trim().split(" ")

          arr1 = arr1.map(a => a.toLowerCase())
          console.log(arr1)

          let main_index = null;
          let match_string = ""
          for(let i = 0; i<Object.keys(m._source).length; i++)
          {
            let arr2 = m?._source[Object.keys(m._source)[i]]?.toString().toLowerCase()
            
            const inter = arr1.filter(x => arr2?.includes(x) === true)
          
            if(inter.length > 0)
            {
              main_index = Object.keys(m._source)[i]
              match_string = inter[0]
              break;
            }
          }

          if(m?._source?.doc_type === 'pdf')
            data['doc'].push({...m, main_index, match_string:match_string})
          else 
            data[m?._source?.doc_type].push({...m, main_index, match_string:match_string})

        })

        setMainData({...data})

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
      transition="0.5s ease"
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

      {rawData && totalPages.length > 1?
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
            {totalPages?.map(p => {

              console.log("PAGE: ", p)
              if(p <= 2);
              else if(p >= totalPages?.length-2);
              else if(p < page-2)
                return <></>

              else if(p > page+3)
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
        gap={5}
        direction={'row'}  
        wrap={'wrap'}
        // alignItems={'flex-start'}
        w={'full'}
      >
        {mainData['text']?.map(m => {

          let match
          if(m?._source?.doc_type === 'text' || !m?._source?.doc_type)
          {
              match = m?._source[m?.main_index].toLowerCase().match(m?.match_string)
              match = match?.index
          }
          // console.log(m?.main_index)
          console.log(match, m._source[m?.main_index].length)

          return (
            <Flex
              w={'full'}
              alignItems={'center'}
              justifyContent={'center'}
              onClick={() => naviToDoc(m?._index, m._id)}
            >

              <Flex 
                key={m._id}
                justifyContent={'space-between'}
                _hover={{
                  transform: "scale(1.05)"
                }}
                transition={'all 0.2s ease-in-out'}
                w={'90%'}
                rounded={'md'}
                px={4}
                py={1}
                role={'group'}
                bg={'gray.800'}
                alignItems={'center'}
                cursor={'pointer'}
              >
              
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
                    >
                      {m?._source[m.main_index].slice(0, match)}
                      <Text as={'mark'} bgColor={'cyan.700'} color={'white'} p={1}>
                        {m?._source[m.main_index].slice(match, match+m?.match_string.length)}
                      </Text>
                      {m?._source[m.main_index].slice(match+m?.match_string.length)}
                    </Text>
                </Flex>
                <Text>{m.main_index}</Text>
              </Flex>
            </Flex>
          )

        })}

        

        {mainData['image']?.length > 0?
          <Flex
            direction={'column'}
            justifyContent="center"
            alignItems={'center'}
            w={'full'}
            gap={3}
          >
            <Text
              fontSize={20}
              fontWeight={500}
            >IMAGES</Text>
            <Flex
              gap={5}
              wrap={'wrap'}
            >
            {mainData['image']?.map(m => {

              return(
                <Flex
                  key={m._id}
                  _hover={{
                    transform: "scale(1.05)"
                  }}
                  transition={'all 0.2s ease-in-out'}
                  w={'90%'}
                  rounded={'md'}
                  px={4}
                  py={1}
                  role={'group'}
                  bg={'gray.800'}
                  alignItems={'center'}
                  cursor={'pointer'}
                  direction={'column'}
                  onClick={() => naviToDoc(m?._index, m?._id)}
                >
                  <Text>{m?._index}</Text>
                  <Image 
                    w={'200px'}
                    src={m?._source?.url}
                  />
                </Flex>
              )
            })}
            </Flex>
          </Flex>
          :<></>
        }


        {mainData['doc']?.length > 0?
          <Flex
            direction={'column'}
            justifyContent="center"
            alignItems={'center'}
            w={'full'}
            gap={3}
          >
            <Text
              fontSize={20}
              fontWeight={500}
            >DOCS</Text>
            <Flex
              gap={5}
            >
            {mainData['doc']?.map(m => {

              return(
                <Flex
                  key={m._id}
                  _hover={{
                    transform: "scale(1.05)"
                  }}
                  px={5}
                  py={3}
                  transition={'all 0.2s ease-in-out'}
                  w={'200px'}
                  h={'200px'}
                  rounded={'md'}
                  role={'group'}
                  bg={'gray.800'}
                  alignItems={'center'}
                  cursor={'pointer'}
                  direction={'column'}
                  position={'relative'}
                  onClick={() => window.open(m?._source?.url, '_blank')}
                >
                  <Text
                    position={'absolute'}
                  >{m?._index}</Text>

                    <Box
                      top={'35%'}
                      position={'relative'}
                    >

                    {m?._source?.doc_type === 'pdf'?
                      <FaFilePdf size={60}/>
                      :
                      <FaFileWord size={60}/>
                    }
                    </Box>

                </Flex>
              )
            })}
            </Flex>
          </Flex>
          :<></>
        }




        {mainData['sound']?.length > 0?
          <Flex
            direction={'column'}
            justifyContent="center"
            alignItems={'center'}
            w={'full'}
            gap={3}
          >
            <Text
              fontSize={20}
              fontWeight={500}
            >AUDIO</Text>
            <Flex
              gap={5}
            >
            {mainData['sound']?.map(m => {

              return(
                <Flex
                  key={m._id}
                  _hover={{
                    transform: "scale(1.05)"
                  }}
                  px={5}
                  py={3}
                  transition={'all 0.2s ease-in-out'}
                  w={'200px'}
                  h={'200px'}
                  rounded={'md'}
                  role={'group'}
                  bg={'gray.800'}
                  alignItems={'center'}
                  cursor={'pointer'}
                  direction={'column'}
                  position={'relative'}
                  onClick={() => window.open(m?._source?.url, '_blank')}

                >
                  <Text
                    position={'absolute'}
                  >{m?._index}</Text>

                    <Box
                      top={'35%'}
                      position={'relative'}
                      overflow={'hidden'}
                    >
                      <FaFileAudio size={60}/>
                      
                      {/* <ReactAudioPlayer
                        src={m?._source?.url}
                        controls
                        style={{
                          background: 'transparent',
                          color:'blue',
                          display: 'none'
                          
                        }}
                        id={'player'}
                      /> */}

                    </Box>

                </Flex>
              )
            })}
            </Flex>
          </Flex>
          :<></>
        }



      </Flex>

   </Flex>
  )
}
export default Search;


// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });