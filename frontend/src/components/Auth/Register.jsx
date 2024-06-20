import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/user'

export const fileUploadCss = {
    cursor: "pointer", marginLeft:"-5%",
    width:"110%",
    border: 'none',
    height: "100%",
    color:"#ECC94B",
    backgroundColor:"white",
}

const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss
}
const Register = () => {
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [imagePrev,setImagePrev] = useState("")
    const[image, setImage] = useState("")

    const dispatch = useDispatch()
    const ChangeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(file);
            setImagePrev(reader.result);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const myform = new FormData()

        myform.append("name",name)
        myform.append("email",email)
        myform.append("password",password)
        myform.append("file",image)

        dispatch(register(myform))
    }

    
  return (
    <Container h={"95vh"}>
        <VStack h = {"full"} justifyContent={'center'} spacing={'16'}>
            <Heading textTransform = 'uppercase' children={"Registration"} />
            
            <form onSubmit={submitHandler} style = {{width : "100%"}}>
                <Box my = '4' display={"flex"} justifyContent={"center"}>
                    <Avatar src = {imagePrev} size={"2xl"} />
                </Box>
                <Box my = {'4'}>
                <FormLabel htmlFor='name' children = "Name" />
                <Input required id = "name" value = {name} onChange={ e => setName(e.target.value)}
                placeholder='Your Name'
                type = "text"
                focusBorderColor='yellow.500' />
                </Box>
                <Box my = {'4'}>
                <FormLabel htmlFor='email' children = "Email Address" />
                <Input required id = "email" value = {email} onChange={ e => setEmail(e.target.value)}
                placeholder='example@gmail.com'
                type = "email"
                focusBorderColor='yellow.500' />
                </Box>
                <Box my = {'4'} >
                <FormLabel htmlFor='password' children = "Password" />
                <Input required id = "password" value = {password} onChange={ e => setPassword(e.target.value)}
                placeholder='Password'
                type = "password"
                focusBorderColor='yellow.500' />
                
                </Box>
                <Box my = {'4'} >
                <FormLabel htmlFor='chooseAvatar' children = "Choose Avatar" />
                <Input accept='image/*' required id = "chooseAvatar"  type = "file" 
                focusBorderColor='yellow.500' 
                css = {fileUploadStyle}
                onChange = {ChangeImageHandler}
                />
                </Box>

                <Box display='flex' justifyContent='center' my='4'>
                    <Button colorScheme='yellow' type='submit'>
                    Register
                    </Button>
                </Box>
                
                <Box display='flex' justifyContent='center' my="4" >
                    Already Signed Up?&nbsp;<Link to='/login'><Button colorScheme='yellow' variant={'link'}> Login Here</Button></Link>
                </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Register