import { 
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    FormControl,
    Switch,
} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import useApp from '../context/AppContext'

function FilterModal({selectedFields, filters}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectFields, setSelectFields] = useState({...filters})
    const {indices} = useApp()
    const docType = [
        'image',
        'pdf',
        'doc',
        'text',
        'sound'
    ]

    const apply = () => {
        selectedFields({...selectFields});
        onClose()
    }

    return (
        <Flex>
            <Button onClick={onOpen}>Filters</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Filters</ModalHeader>
                <ModalCloseButton />
                
                <ModalBody>
                    <Flex
                        direction={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={4}
                        // Index Search
                    >

                    <FormControl
                        textAlign={'center'}
                        fontSize={18}
                        fontWeight={500}
                    >
                        Show Relavent Searches <Switch id={'switch'} onChange={(e) => setSelectFields({
                            ...selectFields,
                            fuzzy: e.target.checked
                        })}/>
                    </FormControl>

                    <Text
                        fontSize={'18px'}
                        fontWeight={500}
                    >Select Index to search</Text>
                    <Flex
                        gap={3}
                        flexWrap={'wrap'}
                        justifyContent={'center'}
                    >

                    
                        {indices.map(f => {
                    
                            return (
                            
                                <Button onClick={() => {
                                    let fie = [...selectFields.index]
                                    if(fie.includes(f))
                                        fie = fie.filter(s => s!==f)
                                    else
                                        fie.push(f)

                                    console.log(fie)
                                    setSelectFields({
                                        ...selectFields,
                                        index: [...fie]
                                    })
                                }}
                                
                                transition={'all 0.15s ease'}
                                bg={selectFields.index.includes(f)?'cyan.700':""}
                                border={'1px'}
                                borderColor={'gray.600'}                                
                                >{f}</Button>
                            )
                                

                        })}
                    </Flex>
                    </Flex>


                    <Flex
                        direction={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={4}
                        mt={10}
                        // Doc Type Search
                    >
                    <Text
                        fontSize={'18px'}
                        fontWeight={500}
                    >Select Document type to search</Text>
                    <Flex
                        gap={3}
                        flexWrap={'wrap'}
                        justifyContent={'center'}
                    >

                    
                        {docType.map(f => {
                    
                            return (
                            
                                <Button onClick={() => {
                                    let fie = [...selectFields.doc]
                                    if(fie.includes(f))
                                        fie = fie.filter(s => s!==f)
                                    else
                                        fie.push(f)

                                    console.log(fie)
                                    setSelectFields({...selectFields, doc: [...fie]})
                                }}
                                
                                transition={'all 0.15s ease'}
                                bg={selectFields.doc.includes(f)?'cyan.700':""}
                                border={'1px'}
                                borderColor={'gray.600'}                                
                                >{f}</Button>
                            )
                                

                        })}
                    </Flex>
                    </Flex>

                </ModalBody>


                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => {setSelectFields({...filters});onClose()}}>
                    Close
                    </Button>
                    <Button variant='ghost' onClick={apply}>Apply</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default FilterModal