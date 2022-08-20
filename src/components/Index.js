import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Index() {

    const [params] = useSearchParams()
    const index = params.get('index')
    const [error, setError] = useState("")
    const [doc, setDoc] = useState(null)
    const [selected, setSelected] = useState([])

    useEffect(() => {

        console.log(index)

        const func = async () => {
            
            const doc = await fetch(`http://127.0.0.1:8000/get/index?q=${index}`)
            const doc_count = await fetch(`http://127.0.0.1:8000/get/count?q=${index}`)
            const data = await doc.json()
            const docc = await doc_count.json()
            
            if(doc.status === 404 || doc_count.status === 404)
                setError(`Index Doesn't exists`)
            else
                setDoc({...data, count: docc.count})
        }
        
        func()

    }, [params])

    useEffect(() => {
        console.log(doc)
    }, [doc])

    return (
        <Flex>
            {error?error:
                <Flex
                    direction={'row'}
                    w={'full'}
                    alignItems={'flex-start'}
                    gap={5}
                >
                    <Flex
                        direction={'column'}
                        
                        gap={4}
                        justifyContent={'center'}
                    >
                        <Box
                            p={4}
                            bg={'rgba(0,0,0,0.3)'}
                            rounded={'xl'}

                        >
                            <Text
                                fontSize={14}
                                color={'gray.500'}
                            >Total Docs</Text>
                            <Text

                            >{doc?.count}</Text>
                        </Box>

                        <Box
                            p={4}
                            bg={'rgba(0,0,0,0.3)'}
                            rounded={'xl'}
                        >
                            <Text
                                fontSize={14}
                                color={'gray.500'}
                            >Aliases</Text>

                            {doc? Object.keys(doc?.data?.aliases)?.length > 0 ? Object.keys(doc?.data?.aliases).map(k => {
                                return <Text>{k}</Text>
                            }):<Text>No Aliases for this index</Text>:""
                            
                            }
                        </Box>

                    </Flex>

                    <Flex
                        direction={'column'}
                        alignItems="center"
                        flex={1}
                        w={'full'}
                        p={2}
                        gap={5}
                        // bg={'red'}
                    >
                        <Input
                            w={"full"}
                            placeholder={'Search Index'}
                        />

                        <Box>
                            <Text mb={5} fontSize={20} fontWeight={500}>All Features <Text color={'gray.600'} fontSize={16}>You can select features to search through those </Text></Text>    

                            <Flex
                                direction={'row'}
                                wrap={'wrap'}
                                gap={2}
                                justifyContent={"space-evenly"}
                            >
                                {doc && Object.keys(doc?.data?.mappings.properties).map(k => {
                                    return <Text
                                        p={2}
                                        bg={selected.includes(k)?'cyan.600':'rgba(0,0,0,0.2)'}
                                        cursor={'pointer'}
                                        transition={'all 0.25s ease'}
                                        _hover={{
                                            bg:'cyan.600'
                                        }}

                                        onClick={() => {
                                            let sell = [...selected]
                                            if(selected.includes(k))
                                                sell = sell.filter(s => s!==k)
                                            else
                                                sell.push(k)

                                            setSelected([...sell])
                                        }}

                                        rounded={'md'}
                                    >{k}</Text>
                                })}

                            </Flex>
                        </Box>


                    </Flex>



                </Flex>
                
            }
        </Flex>
    )
}

export default Index