import { Flex } from '@chakra-ui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function Index() {

    const [params] = useSearchParams()
    const index = params.get('index')
    const [doc, setDoc] = useState(null)

    useEffect(() => {

        console.log(index)

        const func = async () => {
            
            const doc = await fetch(`http://127.0.0.1:8000/get/index?q=${index}`)

            const data = await doc.json()
            setDoc({...data})
            console.log(data)
        }
        
        func()

    }, [params])

    return (
        <Flex>

        </Flex>
    )
}

export default Index