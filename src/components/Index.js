import { 
    Box,
    Button,
    Flex, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalHeader, 
    ModalOverlay, 
    Text, 
    Toast, 
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useApp from '../context/AppContext'

function Index() {

    const [params] = useSearchParams()
    const index = params.get('index')
    const [error, setError] = useState("")
    const [doc, setDoc] = useState(null)
    const [selected, setSelected] = useState([])
    const {getIndices} = useApp()
    const toast = useToast()

    const navigate = useNavigate()

    const [deleteOpen, setDeleteOpen] = useState(false)

    const deleteIndex = async () => {

        try{
        
        const res = await fetch("http://localhost:8000/get/delete",{
            method: "POST",
            body: JSON.stringify({
                index: index
            })
        })

        if(res.status !== 200)
        {
            toast({
                status: "error",
                title: "Error deleting collection"
            })

            setDeleteOpen(false)
            
        }
        else{
            getIndices()
            navigate(-1)
        }

        // const json = await res.json()
        // // console.log(json)
        }

        catch{
            toast({
                status: "error",
                title: "Error deleting collection"
            })

            setDeleteOpen(false)
        }

    }

    useEffect(() => {

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

            <>
            {deleteOpen?
                <Flex
                    bg={'rgba(0,0,0,0.2)'}
                    backdropFilter={'blur(5px)'}
                    transform={'scale(1)'}
                    w={'full'}
                    h={'full'}
                    top={0}
                    left={0}
                    position="fixed"
                    zIndex={1}
                    justifyContent="center"
                    alignItems={'center'}
                >
                    <Box>
                        <Text
                            fontWeight={500}
                            fontSize={24}
                        >Delete Collection</Text>
                        <Text
                            color={'gray.500'}
                            mb={5}
                        >This action will delete this collection along all the documents</Text>
                        <Flex
                            gap={2}
                            alignSelf={'flex-end'}
                        >

                        <Button
                            bg={'red.600'}
                            _hover={{
                                bg:'red.700'
                            }}
                            transition="all 0.25s ease"
                            onClick={() => deleteIndex()}
                        >Delete</Button>

                        <Button onClick={() => setDeleteOpen(!deleteOpen)}>Cancel</Button>

                        </Flex>
                    </Box>
                </Flex>
                :
                ""
            }
            </>

            <>
            {error?error:
                <Flex
                    direction={'row'}
                    w={'full'}
                    alignItems={'flex-start'}
                    gap={5}
                >
                    <Flex
                        direction={'column'}
                        alignItems={'flex-start'}
                        gap={4}
                        justifyContent={'center'}
                        position="relative"
                    >
                        <Box
                            p={4}
                            bg={'rgba(0,0,0,0.3)'}
                            rounded={'xl'}
                            minW={'150px'}

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
                        
                        <Box
                            p={4}
                            rounded={'xl'}
                            w={'150px'}
                        >
                            <Button bg={'red.600'}
                                transition={'all 0.25s ease-in-out'}
                                _hover={{
                                    bg:'red.700'
                                }}
                                onClick={() => setDeleteOpen(true)}
                            >Delete</Button>
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
                                {doc && Object.keys(doc?.data?.mappings)?.length>0?Object.keys(doc?.data?.mappings?.properties)?.map(k => {
                                    return <Text
                                        p={2}
                                        bg={selected?.includes(k)?'cyan.600':'rgba(0,0,0,0.2)'}
                                        cursor={'pointer'}
                                        transition={'all 0.25s ease'}
                                        _hover={{
                                            bg:'cyan.600'
                                        }}

                                        onClick={() => {
                                            let sell = [...selected]
                                            if(selected?.includes(k))
                                                sell = sell?.filter(s => s!==k)
                                            else
                                                sell.push(k)

                                            setSelected([...sell])
                                        }}

                                        rounded={'md'}
                                    >{k}</Text>
                                    
                                })
                                :
                                    <Text>No Features in this collection</Text>
                            }
                                

                            </Flex>
                        </Box>


                    </Flex>

                </Flex>
                
            }
            </>
        </Flex>
    )
}

export default Index