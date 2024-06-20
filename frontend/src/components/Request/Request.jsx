import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Request = () => {
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[course, setCourse] = useState("")
  return (
    <Container h="92vh">

        <VStack h="full" justifyContent={'center'} spacing={'16'}>
            <Heading children = "Request a course" />
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
                <FormLabel htmlFor='course' children = "Course" />
                <Input required id = "course" value = {course} onChange={ e => setCourse(e.target.value)}
                placeholder='Explain the course'
                
                focusBorderColor='yellow.500' />
                </Box>

                <Box display='flex' justifyContent='center' my='4'>
                    <Button colorScheme='yellow' type='submit'>
                    Send Request
                    </Button>
                </Box>

                <Box display='flex' justifyContent='center' my="4" >
                    See Available courses&nbsp;<Link to='/courses'><Button colorScheme='yellow' variant={'link'}> Click here</Button></Link>
                </Box>
                
                
            </form>
        </VStack>

    </Container>
  )
}

export default Request