import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import Sidebar from '../Dashboard/Sidebar'
import { RiDeleteBin7Line } from 'react-icons/ri'
import CourseModal from './CourseModal'


const AdminCourses = () => {
  const courses = [{
    _id:"asss",
    title: 'React Course',
    category : 'web-d',
    poster :{
      url: 'https://cdn.pixabay.com/photo/2016/06/13/07/59/pi-1453836_1280.jpg',
    },
    createdBy: '6PP',
    views : 123,
    lectures:2,

  }]

  const courseDetailsHandler = (userId) => {
    onOpen()
    console.log(userId);
  } 

  const deleteButtonHandler = (userId) => {
    console.log(userId);
  } 

  const deleteLectureButtonHandler = (courseId,lectureId) =>{
    console.log(courseId)
    console.log(lectureId)
  }

  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  }

  const {isOpen, onClose, onOpen} = useDisclosure()

  return (
    <Grid css = {{
        cursor : `url(${cursor}), default`,
    }}
    minH={"100vh"} templateColumns={['1fr', '5fr 1fr']}>

    <Box p={["0","16"]} overflow={"auto"}>
    <Heading textTransform={"uppercase"} children = "All Courses" my = "16" textAlign={["center","left"]} />
    <TableContainer w={['100vw','full']} >
      <Table variant={"simple"} size={"lg"} >
        <TableCaption>All available courses in Database</TableCaption>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Poster</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Creator</Th>
            <Th isNumeric>Views</Th>
            <Th isNumeric>Lectures</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            courses.map(item =>(
              <Row courseDetailsHandler={courseDetailsHandler} deleteButtonHandler={deleteButtonHandler} key={item._id} item={item} />
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>

    <CourseModal id={"abcd"} courseTitle = "React Course" isOpen= {isOpen} onClose = {onClose} deleteButtonHandler={deleteLectureButtonHandler} addLectureHandler = {addLectureHandler} lectures = {[]} />
    </Box>

    <Sidebar></Sidebar>
    </Grid>
  )
}

export default AdminCourses

function Row({item, courseDetailsHandler, deleteButtonHandler}){

  return(
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src = {item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.lectures}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button onClick={() => courseDetailsHandler(item._id)} variant={"outline"} color={"purple.500"}>View Lectures</Button>
          <Button onClick={() => deleteButtonHandler(item._id)} color={"purple.600"}>
            <RiDeleteBin7Line />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}