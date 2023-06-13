import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FaLocationArrow } from 'react-icons/fa'
import ReactAudioPlayer from 'react-audio-player'


const KeyPair = ({ keyy, value, cors }) => {

  console.log(keyy, value, cors)

  return (

    <Flex
      direction={'column'}
      bg={'rgba(0,0,0,0.2)'}
      p={2}
      rounded={'md'}
      cursor={cors ? "pointer" : ""}
    >
      <Text
        fontSize={20}
      >{keyy}</Text>

      <Text
        color={'gray.600'}
      >{value}</Text>

      {cors ?
        <Button></Button> : <></>}

    </Flex>

  )

}



function Doc() {

  let { index, id } = useParams()
  console.log(index, id)
  const [doc, setDoc] = useState({
    index: "",
    source: {},
    id: ""
  })


  const TextDoc = () => {
    return (
      <Flex
        direction={'row'}
        wrap={'wrap'}
        gap={5}
      >
        {doc && Object.keys(doc?.source)?.map(d => {
          return (
            <KeyPair
              keyy={d}
              value={doc?.source[d]}
            />
          )
        })
        }
      </Flex>
    )
  }

  const ImageDoc = () => {

    const { metadata, text_data, labels, objects, logos } = doc?.source
    const { location, coordinates, date } = metadata

    return (
      <Flex
        gap={4}
        alignItems={'flex-start'}
      >

        <Flex
          w={'full'}
          direction={'column'}
          gap={3}
        >
          <KeyPair keyy={'date'} value={date || "no Date"} />


          {/* <KeyPair keyy={'location'} value={location || "No Location"} cors={coordinates}/> */}
          <Flex
            direction={'row'}
            bg={'rgba(0,0,0,0.2)'}
            p={2}
            rounded={'md'}
            alignItems={'center'}
          >
            <Flex
              direction={'column'}
            >

              <Text
                fontSize={20}
              >Location</Text>

              <Text
                color={'gray.600'}
              >{coordinates ? `${coordinates?.lat},${coordinates?.long}` : "No Location"} </Text>
            </Flex>

            {coordinates ?
              <Box
                p={2}
                bg={'cyan.600'}
                transition={'all 0.25s ease'}
                rounded={'md'}
                _hover={{
                  bg: 'cyan.700'
                }}
                cursor="pointer"
                onClick={() => window.open(`https://maps.google.com/?q=${coordinates?.lat},${coordinates?.long}`)}
              >
                <FaLocationArrow fontSize={20} />
              </Box>
              : <></>}

          </Flex>

          <Box
            bg={'rgba(0,0,0,0.2)'}
            rounded={'md'}
            p={2}
          >
            <Text
              fontSize={20}
              fontWeight={500}
              color={'cyan.600'}
            >Texts{text_data?.original.length > 0 ? " (Original Text)" : ""}</Text>
            {text_data?.original.length > 0 ?
              <Flex
                direction={'column'}
              >
                <Flex
                  gap={2}
                  wrap={'wrap'}
                >
                  {text_data?.original.map(t => (
                    <Box bg={'gray.800'}>{t}</Box>
                  ))}
                </Flex>

                {text_data?.translated.length > 0 ?
                  <Flex
                    direction={'column'}
                  >
                    <Text fontSize={20} color={'cyan.600'} fontWeight={500}>Translated (to English)</Text>
                    <Flex
                      gap={2}
                      wrap={'wrap'}
                    >
                      {text_data?.translated.map(t => (
                        <Box bg={'gray.800'}>{t}</Box>
                      ))}

                    </Flex>
                  </Flex> : <></>
                }

              </Flex> : <Text>No text found in image</Text>

            }
          </Box>

          <Box
            bg={'rgba(0,0,0,0.2)'}
            rounded={'md'}
            p={2}
          >
            <Text
              fontSize={20}
              fontWeight={500}
              color={'cyan.600'}
            >Labels</Text>
            <Flex
              gap={2}
              wrap={'wrap'}
            >

              {labels.length > 0 ? labels?.map(l => (
                <Text
                  bg={'gray.800'}
                >{l}</Text>
              )) : "No labels detected"}
            </Flex>
          </Box>

          <Box
            bg={'rgba(0,0,0,0.2)'}
            rounded={'md'}
            p={2}
          >
            <Text
              fontSize={20}
              fontWeight={500}
              color={'cyan.600'}
            >Objects</Text>
            <Flex
              gap={2}
              wrap={'wrap'}
            >

              {objects?.length > 0 ? objects?.map(l => (
                <Text
                  bg={'gray.800'}
                >{l}</Text>
              )) : "No objects in this pic"}
            </Flex>
          </Box>


        </Flex>

        <Image
          w={'50vw'}
          maxW={'300px'}
          src={doc?.source?.url}
        />
      </Flex>
    )

  }


  const SoundDoc = () => {

    return (
      <Flex
        direction={'column'}
        gap={5}
        alignItems={'flex-start'}
        justifyContent={'center'}
        w={'full'}
      >

        <Box
          bg={'gray.800'}
          rounded={'md'}
          p={4}
        >
          <Text
            fontSize={20}
            fontWeight={500}
            color={'cyan.600'}
          >Text from the audio file</Text>
          <Text>{doc?.source?.content}</Text>
        </Box>



        <audio
          src={doc?.source?.url}
          autoPlay={true}
          controls
          controlsList='[noDownload]'
          style={{ css }

          }
        />

      </Flex>
    )

  }



  useEffect(() => {

    const func = async () => {
      console.log(index, id)
      const res = await fetch(`http://localhost:8000/get/doc/${index}/${id}`)

      const json = await res.json()
      console.log(json)
      setDoc({ ...json.data })

    }

    func()

  }, [])

  useEffect(() => {
    console.log(doc)
  }, [doc])

  return (
    <Flex
      wrap={'wrap'}
      direction={'column'}
      w={'full'}
      h={'full'}
    >
      <Flex
        w={'full'}
        justifyContent={'space-between'}
        position={'relative'}
        mb={5}
      >
        <Flex
          justifyContent={'center'}
          direction="column"
          alignItems={'center'}
          // border={'1px'}
          // borderColor={'gray.600'}
          w={'full'}
          py={2}
          bg={'red.700'}
        >
          <Text
            fontSize={'16px'}
          >INDEX</Text>
          <Text>{doc?.index}</Text>

        </Flex>
        <Flex
          justifyContent={'center'}
          direction="column"
          alignItems={'center'}
          // border={'1px'}
          // borderColor={'gray.600'}
          w={'full'}
          bg={'gray.700'}
        >
          <Text
            fontSize={'16px'}
          >DOC TYPE</Text>
          <Text>{doc?.source?.doc_type}</Text>

        </Flex>


      </Flex>

      {doc?.source?.doc_type === 'text' ?
        <TextDoc />
        : doc?.source?.doc_type === 'image' ?
          <ImageDoc /> :
          doc?.source?.doc_type === 'sound' ?
            <SoundDoc /> : <></>
      }

      {/* <Button
        position={'absolute'}
        bottom={10}
        bg={'red.600'}
      >Delete</Button> */}
    </Flex>
  )
}

export default Doc

const css = `
audio::-webkit-media-controls-panel {
  background-color: #56AEFF;
}

audio::-webkit-media-controls-volume-slider {
  background-color: #B1D4E0;
  border-radius: 25px;
  padding-left: 8px;
  padding-right: 8px;
}
`