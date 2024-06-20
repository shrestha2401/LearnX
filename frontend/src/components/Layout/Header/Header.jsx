import React from 'react'
import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from "react-icons/ri"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/actions/user'

const LinkButton = ({url = '/', title = 'Home', onClose}) =>
(
    <Link onClick = {onClose} to={url}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
);

const Header = ({isAuthenticated=false, user}) => {
    
    
    const {isOpen, onOpen, onClose} = useDisclosure();

    const dispatch = useDispatch()
    const logoutHandler = () => {


        console.log("logout")
        onClose();
        dispatch(logout())
    };

    return (

    <>
    <ColorModeSwitcher />

    <Button zIndex = {'overlay'} onClick = {onOpen}colorScheme='yellow' width = '12' height={'12'} rounded='full' position={'fixed'} top = '6' left = '6'>
        <RiMenu5Fill />
    </Button>
    <Drawer placement='left' onClose = {onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerHeader borderBottomWidth={'1px'}>LearnX</DrawerHeader>
            <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
             <LinkButton url = '/' title = 'Home' onClose= {onClose}></LinkButton>
             <LinkButton url = '/courses' title = 'Browse Courses' onClose= {onClose}></LinkButton>
             <LinkButton url = '/request' title = 'Request Courses' onClose= {onClose}></LinkButton>
             <LinkButton url = '/contact' title = 'Contact Us' onClose= {onClose}></LinkButton>
             <LinkButton url = '/about' title = 'About Us' onClose= {onClose}></LinkButton>
            
            <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>
                {isAuthenticated ? (<>
                <VStack>
                <HStack>
                <Link onClick = {onClose} to="/profile">
                    <Button variant = 'ghost' colorScheme='yellow'>Profile</Button>
                </Link>
                
                <Button variant = 'ghost' onClick = {logoutHandler}>
                <RiLogoutBoxLine />
                Logout</Button>
                </HStack>
                {user && user.role === "admin"  && (
                <Link onClick = {onClose} to = "/admin/dashboard" >
                    <Button colorScheme= 'purple' variant={'ghost'}>
                        <RiDashboardFill style={{margin: '4px'}}/>
                        Dashboard
                    </Button>
                </Link>
                )}
                </VStack>

                </>) : (<>
                
                <Link onClick = {onClose} to="/login">
                    <Button colorScheme='yellow'>Login</Button>
                </Link>

                <p>OR</p>

                <Link onClick = {onClose} to = "/register">
                    <Button colorScheme='yellow'>Sign Up</Button>
                </Link>

                </>)}
            </HStack>
            
            </VStack>
            </DrawerBody>
        </DrawerContent>

    </Drawer>
    </>
  )
}

export default Header

