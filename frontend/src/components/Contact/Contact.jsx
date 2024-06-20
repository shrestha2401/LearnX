import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = () => {

    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[message,setMessage] = useState("")
  return (
    <Container h="92vh">

        <VStack h="full" justifyContent={'center'} spacing={'16'}>
            <Heading children = "Contact Us" />
            <form style = {{width : "100%"}}>
                <Box my = {'4'}>
                <FormLabel htmlFor='name' children = "Name" />
                <Input required id = "name" value = {name} onChange={ e => setName(e.target.value)}
                placeholder='Your Name'
                type = "text"
                focusBorderColor='yellow.500' />
                </Box>
                <Box my = {'4'} >
                <FormLabel htmlFor='email' children = "Email" />
                <Input required id = "email" value = {email} onChange={ e => setEmail(e.target.value)}
                placeholder='Email'
                type = "email"
                focusBorderColor='yellow.500' />
                
                </Box>
                <Box my = {'4'}>
                <FormLabel htmlFor='message' children = "Message" />
                <Input required id = "message" value = {message} onChange={ e => setMessage(e.target.value)}
                placeholder='Message'
                
                focusBorderColor='yellow.500' />
                </Box>

                <Box display='flex' justifyContent='center' my='4'>
                    <Button colorScheme='yellow' type='submit'>
                    Send Message
                    </Button>
                </Box>

                <Box display='flex' justifyContent='center' my="4" >
                    Request For a course?&nbsp;<Link to='/request'><Button colorScheme='yellow' variant={'link'}> Click here</Button></Link>
                </Box>
                
                
            </form>
        </VStack>

    </Container>
  );
}

export default Contact