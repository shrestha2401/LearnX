import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialInstagramCircular, TiSocialFacebookCircular, TiSocialLinkedinCircular, TiSocialGithub} from "react-icons/ti"
const Footer = () => {
  return (
    <Box
    padding={'4'}
    bg={'blackAlpha.900'}
    minH={'10vh'}
    >
        <Stack direction={['column','row']} >
            <VStack alignItems={['center', 'flex-start']} width = "full" >
                <Heading children = "All Rights Reserved" color = {'white'} />
                <Heading fontFamily={'body'} size={'sm'} children = "@C&A IITG" color = {'yellow.400'}
                 />
            </VStack>
            <HStack spacing={["2","10"]} justifyContent={'center'} color={'white'}
            fontSize={'30'}>
                <a href=''>
                    <TiSocialLinkedinCircular />
                </a>
                <a href=''>
                    <TiSocialGithub />
                </a>
                <a href=''>
                    <TiSocialInstagramCircular />
                </a>
                <a href=''>
                    <TiSocialFacebookCircular />
                </a>
            </HStack>
        </Stack>
    </Box>
  )
}

export default Footer