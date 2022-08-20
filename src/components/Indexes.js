import { 
    Button,
    Flex,
    useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useApp from '../context/AppContext'

function Indexes() {
    
    const {indices} = useApp()
    const navigate = useNavigate()

    const color = useColorModeValue("white", "gray.800")

    const goToIndex =(o) => navigate({
        pathname: '/index',
        search: `?index=${o}`
    })

    
    return (
        <Flex
            direction={'row'}
            wrap={'wrap'}
            gap={5}
            justifyContent="space-evenly"
        >
            {indices.length > 0 && indices.map(o => {
                return (
                    <Flex
                        cursor={'pointer'}
                        px={5}
                        py={5}
                        key={o}
                        maxW={'250px'}
                        minW={'200px'}
                        bg={color}
                        alignItems={'center'}
                        justifyContent={'center'}
                        fontWeight={500}
                        boxShadow={"2xl"}
                        rounded={"md"}
                        transition={'all 0.2s ease'}
                        _hover={{ transform: "scale(1.1)" }}
                        onClick={() => goToIndex(o)}
                    >
                        {o}
                    </Flex>
                )
            })}
        </Flex>
    )
}

export default Indexes