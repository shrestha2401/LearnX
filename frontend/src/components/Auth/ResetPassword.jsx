import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { resetpassword } from '../../redux/actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const ResetPassword = () => {
    const [password,setPassword] = useState("")

    const params = useParams()
    const navigate = useNavigate()
    const {loading, message, error} = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const submitHandler = e => {
      e.preventDefault()
      dispatch(resetpassword(params.token, password))
      navigate('/login')
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
    

    console.log(params.token)
    return (
      <Container py="16" height={"90vh"}>
          <form onSubmit={submitHandler}>
              <Heading children = "Reset Password" my="16" textTransform={"uppercase"} textAlign={['center','left']} />
              <VStack spacing = "8">
                  
                  
                  <Input required id = "password" value = {password} onChange={ e => setPassword(e.target.value)}
                  placeholder='New Password'
                  type = "password"
                  focusBorderColor='yellow.500' />
                 <Button isLoading = {loading} type="submit" w={"full"} colorScheme='yellow'>Update Password</Button> 
              </VStack>
          </form>
      </Container>
    )
}

export default ResetPassword