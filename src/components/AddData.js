import { Button, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import fs from 'fs'

function AddData() {

    const [file, setFile] = useState("")
    const [name, setName] = useState("")
    const [sending, setSending] = useState(0)
    const toast = useToast()

    useEffect(() => {

        if(sending === 0)
            return;
        
        if(sending === 1)
        {
            toast({
                status:'loading',
                duration: null,
                title: 'Sending Data...'
            })
        }

        if(sending === 2)
        {
            if(toast!=null)
                toast.closeAll()

            setTimeout(() => 
                toast({
                    status:'success',
                    duration: 4000,
                    title: 'Data posted'
                }), 0
            )

            setSending(0)
        }

        if(sending === 3)
        {
            if(toast!=null)
                toast.closeAll()

            setTimeout(() => 
                toast({
                    status:'error',
                    duration: 6000,
                    isClosable: true,
                    title: 'Error posting data!'
                }), 0
            )

            setSending(0)
        }

    }, [sending, toast])

    const addData = async () => {

        if(!name || !file)
        {
            toast({
                status: 'warning',
                title: 'Empty Field',
                description: 'empty field',
                duration: 1000
            })
            return;
        }

        if(sending)
        {
            toast({
                status: 'warning',
                title: 'Already sending data',
                description: 'sending data',
                duration: 1000
            })
            return;
        }
        
        setSending(1);

        const formdata = new FormData()
        formdata.append('name', name);
        formdata.append('file', file)

        console.log(formdata)

        const res = await fetch('http://127.0.0.1:8000/add', {
            method: "POST",
            body: formdata
        })

        const json = await res.json()
        console.log(json)

        
        if(json.status === 0)
            setSending(3)

        else
        setSending(2);

    }

    return (
        <Flex
            direction={'column'}
            gap={2}
        >
            <Input
                type={'text'}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                focusBorderColor = "blue.500" 
                borderColor="gray.500"
                value={name}
            />
            <Input
                type={'file'}
                onChange={(e) => setFile(e.target.files[0])}
                border={'none'}
            />

            <Button onClick={() => addData()}>Add Data</Button>

        </Flex>
    )
}

export default AddData