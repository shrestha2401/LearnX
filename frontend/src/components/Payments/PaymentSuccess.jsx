import { Box, Button, Container, Heading, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxBlankCircleFill, RiCheckboxCircleFill } from 'react-icons/ri'

const PaymentSuccess = () => {
  return (
    <Container h={'90vh'} p= "16">
        <Heading my = "8" textAlign = "center"> You are now a premium member</Heading>
        <VStack boxShadow={"lg"} pb={"16"} alignItems = "center" borderRadius={"lg"} >
            <Box w={"full"} bgColor={"yellow.400"} p={"4"}
            css = {{borderRadius: '8px 8px 0 0'}}>
                <Text color = "black">
                    Payment Sucess
                </Text>
            </Box>

            <Box p="4">
                <VStack textAlign={"center"} px={"8"}
                mt={"4"} spacing={"8"} >
                    <Text>
                        Congratulations! You now have access to premium content.
                    </Text>

                    <Heading size={"4xl"}>
                    <RiCheckboxCircleFill />
                    </Heading>
                </VStack>
            </Box>

            <Link href="/profile">
                <Button variant={"ghost"}>Go to Profile</Button>
            </Link>

            <Heading size={"xs"}>
                Reference : n-u-l-l
            </Heading>
        </VStack>
    </Container>
  )
}

export default PaymentSuccess