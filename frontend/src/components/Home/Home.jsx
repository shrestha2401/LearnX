import { Box, Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom'
import vg from "../../assets/images/bg.png"
import introvideo from '../../assets/videos/intro.mp4'
const Home = () => {
  return (
    <section classname = "home">
        <div className="container">
            <Stack
            direction = {["column","row"]}
            height = "100%"
            justifyContent={['center','space-between']}
            alignItems="center"
            spacing={['16','56']}
            >
             <VStack width = {"full"} alignItems={["center","flex-end"]} spacing={'8'}>
                <Heading children = "Learn from Experts" size = {'2xl'}/>
                <Text textAlign = {['center','left']}
                children = "Find Value content at reasonable Price" />
                <Link to = "/courses">
                    <Button size = {"lg"} colorScheme='yellow'>
                        Explore Now
                    </Button>
                </Link>
             </VStack>

             <Image className = "vector-graphics" boxSize={"md"} src = {vg} objectFit="contain" />
            </Stack>
        </div>
        <Box padding={'8'} bg = 'blackAlpha.800'>
            <Heading
            textAlign={"center"}
            fontFamily={"body"}
            color={"yellow.400"}
            children = "Our Brands"
            />
        
        <HStack className='brandsBanner' justifyContent={'space-evenly'}>
            
        </HStack>
        </Box>
        <div className="container2">
            <video
            controls controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback src = {introvideo}>
                
            </video>
        </div>
    </section>
  )
}

export default Home