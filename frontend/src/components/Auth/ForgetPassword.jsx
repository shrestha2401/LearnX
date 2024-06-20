import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetpassword } from '../../redux/actions/profile'
import { toast } from 'react-hot-toast'

const ForgetPassword = () => {
    const [email,setEmail] = useState("")
    const {loading, message, error} = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const submitHandler = e => {
      e.preventDefault()
      dispatch(forgetpassword(email))
    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({ type: 'clearError'})
      }
      if(message){
        toast.success(message);
        dispatch({type: 'clearMessage'});
      }
    })
    
  return (
    <Container py="16" height={"90vh"}>
        <form onSubmit={submitHandler}>
            <Heading children = "Forget Password" my="16" textTransform={"uppercase"} textAlign={['center','left']} />
            <VStack spacing = "8">
                <Input required id = "email" value = {email} onChange={ e => setEmail(e.target.value)}
                placeholder='example@gmail.com'
                type = "email"
                focusBorderColor='yellow.500' />
               <Button type="submit" w={"full"} colorScheme='yellow'>Send reset link</Button> 
            </VStack>
        </form>
    </Container>
  )
}

export default ForgetPassword