import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../../redux/actions/course'
import { toast } from 'react-hot-toast'

const Courses = () => {

    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("")
    const categories = ['Physics', 'Chemistry', 'Math', 'Data Structures', 'Algorithms']
    const addToPlaylistHandler = (courseId) => {
        console.log("Added To Playlist",courseId)
    }


    const {loading, courses, error} = useSelector(state => state.courses)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCourses(category, keyword))
        if(error){
            toast.error(error)
            dispatch({ type: 'clearError'})
          }
          
    },[category, keyword, dispatch,error])

    const Course = ({Views, title, imageSrc, id, addToPlaylistHandler,creator, description,lecturecount}) => {
        return (
            <VStack className='course' alignItems={['center','flex-start']}>
                <Image src = {imageSrc} boxSize={'60'} objectFit={'contain'}/>
                <Heading textAlign={['center','left']} maxW={'200px'} fontFamily={'sans-serif'}
                size = "sm"
                noOfLines={3} children = {title}/>
                <Text children = {description} noOfLines={2} />
                <HStack>
                <Text fontWeight = "Bold" textTransform = "uppercase" children = "creator" noOfLines={2} />
                <Text fontFamily = "body"  textTransform = "uppercase" children = {creator} noOfLines={2} />
                </HStack>
                <Heading textAlign={"center"} textTransform={"uppercase"} size={"xs"} children = {`Lectures - ${lecturecount} `} />
                <Heading textAlign={"center"} textTransform={"uppercase"} size={"xs"} children = {`Views - ${Views} `} />
                <Stack direction={['column','row']} alignItems={'center'}>
                    <Link to = {`/courses/${id}`}>
                        <Button colorScheme='yellow'>
                            Start Course
                        </Button>
                    </Link>
                    <Button variant = "ghost" colorScheme='yellow' onClick={() => addToPlaylistHandler(id)}>
                            Add to Playlist
                        </Button>
                </Stack>
            
            </VStack>

        )
    }
    return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY={'8'}>
        <Heading children = "All Courses" margin={'8'} />

        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search a Course...' 
        type='text'
        focusBorderColor='yellow.500'/>

        <HStack overflowX={"auto"} paddingY = '8' css = {{"&::-webkit-scrollbar" : {
            display:"none"
        }}}>
            {
                categories.map((item, index) =>(
                    <Button key = {index} onClick = {() => setCategory(item)} minW={'60'}>
                        <Text children = {item} />
                    </Button>

                ))
            }
        </HStack>

        <Stack
        direction={['column','row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start','space-evenly']}
        alignItems = {['center','flex-start']}>

            {
                courses && courses.length > 0?
                 courses.map((item) => (
                    <Course 
            key = {item._id}
            title = {item.title}
            description={item.description}
            Views={item.views}
            imageSrc={item.poster.url}
            id = {item._id}
            creator={item.createdBy}
            lecturecount={item.numOfVideos}
            addToPlaylistHandler={addToPlaylistHandler}
            />

                )): (<Heading opacity={"0.5"} mt="4" children = "No Courses Found" />)
            }
        </Stack>
    </Container>
  )
}

export default Courses