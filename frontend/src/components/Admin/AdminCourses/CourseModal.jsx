import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useStatStyles } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileUploadCss } from '../../Auth/Register'

const CourseModal = ({isOpen, onClose, id, deleteButtonHandler, addLectureHandler, courseTitle, lectures}) => {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [video, setVideo] = useState("")
    const [videoPrev, setVideoPrev] = useState("")

    const ChangeVideoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setVideo(file);
            setVideoPrev(reader.result);
        }
    }
    const handleClose = () => {
        setTitle("")
        setDescription("")
        setVideo("")
        setVideoPrev("")
        onClose()
    }
  return (
    <Modal isOpen = {isOpen} onClose={handleClose} size={'full'} scrollBehavior='outside' >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                {courseTitle}
            </ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody p={"16"} >
                <Grid templateColumns={['1fr', '3fr 1fr']}>
                    <Box px = {['0','16']} >
                        <Box my={'5'} >
                            <Heading children = {courseTitle} />
                            <Heading children = {`#${id}`} size={'sm'} opacity = {0.4} />
                        </Box>

                        <Heading children = "Lectures" size = "lg" />

                        <VideoCard title = "Sample" description = "Sample" num = {12} lectureId = {1} courseId = "Something" deleteButtonHandler = {deleteButtonHandler} />
                    </Box>

                    <Box>
                        <form onSubmit={e => addLectureHandler(e,id,title,description, video)}>
                            <VStack spacing={'4'} >
                                <Heading children = "Add Lecture" size={"md"} textTransform={"uppercase"} />
                                <Input focusBorderColor='purple.300' placeholder='Title' value={title} onChange = {e => setTitle(e.target.value)} />
                                <Input focusBorderColor='purple.300' placeholder='Description' value={description} onChange = {e => setDescription(e.target.value)} />
                                <Input accept='video/mp4' required  type = "file" 
                                    focusBorderColor='purple.300' 
                                    css = {{
                                        '&::file-selector-button' : {
                                            ...fileUploadCss, color:"purple"
                                        }
                                    }}
                                    onChange = {ChangeVideoHandler}
                                />

                                {
                                    videoPrev && (
                                        <video controlsList='nodownload' controls src={videoPrev} />

                                    )

                                }

                                <Button w="full" colorScheme='purple' type='submit'>
                                    Upload
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                </Grid>
            </ModalBody>
            <ModalFooter>
                <Button onClick = {handleClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default CourseModal

function VideoCard ({title, description, num, lectureId, courseId, deleteButtonHandler}) {
    return (
        <Stack direction = {['column','row']} my={"8"} borderRadius={'lg'} boxShadow={'0 0 10px rgba(107, 70, 193, 0.5)'} 
        justifyContent={['flex-start','space-between']}
        p={['4','8']}>
            <Box>
                <Heading size = {"sm"} children = {`#${num} ${title}`} />
                <Text children = {description} />
            </Box>
            <Button color={"purple.600"} onClick={() => deleteButtonHandler(courseId,lectureId)}>
                <RiDeleteBin7Fill />
            </Button>
            
        </Stack>
    )
}