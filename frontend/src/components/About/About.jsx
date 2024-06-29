import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introvideo from '../../assets/videos/intro.mp4' // add your own customised video , currently i dont have one
import { RiSecurePaymentFill } from 'react-icons/ri'
const Founder = () => (
    <Stack direction={['column','row']} spacing = {['4', '16']} padding={'8'}>
        <VStack>
        <Avatar src='https://avatarfiles.alphacoders.com/126/126174.jpg' boxSize={["40","48"]} />
        <Text children = "Co-Founder" opacity = {0.7}/>
        </VStack>
        <VStack justifyContent={'center'} alignContent={['center','flex-start']}>
            <Heading children = "Shrestha" size = {['md','xl']} />
            <Text 
            textAlign={['center','left']}
            children = {'Hi, I am a full stack dveloper and an IITIAN. Our mission is to help aspirants in their JEE journey'} />
        </VStack>
    </Stack>
)
const VideoPlayer = () => (
    <Box>
        <video
            autoPlay
            muted
            controls controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback src = {introvideo}>

        </video>
    </Box>
)

const TandC = ({termsAndCodition}) => (
    <Box>
        <Heading size = {'md'} children = 'Terms & Conditions' textAlign = {['center','left']} my = "4" ></Heading>
        <Box h="sm" p="4" >

            <Text fontFamily={'heading'} letterSpacing = {'widest'} textAlign={['center','left']}>{termsAndCodition}</Text>
            <Heading my = "4" size = "xs" children = "Refund applicable for cancelation within 7 days" /> 
        </Box>
    
    </Box>
)
const About = () => {
  return (
    <Container maxW = {'container.lg'} padding={'16'} boxShadow={'lg'}>
        <Heading children = "About Us" textAlign={['center','left']}/>
        <Founder />
        <Stack m="8" direction={['column','row']} alignItems={"center"}>
            <Text fontFamily = "cursive" m = "8" textAlign={['center','left']}>
                We are an online study material provider
            </Text>
            <Link to = "/subscribe">
                <Button variant={"ghost"} colorScheme='yellow'>
                    Checkout our plans
                </Button>
            </Link>
        </Stack>
        <VideoPlayer />
        <TandC termsAndCodition = {'All rights reserved by Navin Patwari.'} />
        <HStack my = "4" padding={"4"}>
            <RiSecurePaymentFill />
            <Heading 
            
            size = {'xs'} fontFamily={'sans-serif'} textTransform={'uppercase'} children = {"Payment is secured by Razorpay"} />
        </HStack>
    </Container>
  )
}
export default About
