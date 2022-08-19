import { 
    Button,
    Flex
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useApp from '../context/AppContext'

function Indexes() {
    
    const {indices} = useApp()
    const navigate = useNavigate()

    const goToIndex =(o) => navigate({
        pathname: '/index',
        search: `?index=${o}`
    })

    const createIndice = async () => {

    }

    return (
        <Flex
            direction={'column'}
            gap={3}
        >

            <Button onClick={() => createIndice()}>Create</Button>

            {indices.length > 0 && indices.map(o => {
                return (
                    <Flex
                        cursor={'pointer'}
                        border={'1px'}
                        px={4}
                        py={2}
                        key={o}
                        borderRadius={20}
                        borderColor={'gray.600'}
                        transition={'all 0.2s ease'}
                        _hover={{
                            borderColor:'gray.400'
                        }}
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