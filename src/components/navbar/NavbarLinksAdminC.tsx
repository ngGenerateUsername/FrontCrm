import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useColorMode,
} from '@chakra-ui/react';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { contactsPerEntreprise, entreprisePerContact } from 'state/user/Role_Slice';

export default function HeaderLinksC(props: { secondary: boolean }) {
    const { secondary } = props;
    const { colorMode, toggleColorMode } = useColorMode();
    const navbarIcon = useColorModeValue('gray.400', 'white');
    const menuBg = useColorModeValue('white', 'navy.800');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const shadow = useColorModeValue(
        '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
        '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
    );
    const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
    const [profileDetail, setProfileDetail] = useState(null);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [identreprise, setIdentreprise] = useState<string | null>(null);

    const [unreadCount, setUnreadCount] = useState(0);
    const history = useHistory();

    // Fetch profile details on component load
    useEffect(() => {
        fetch('http://localhost:8080/api/contact/profileContact?id=' + localStorage.getItem('user'))
            .then((res) => res.json())
            .then((data) => {
                setProfileDetail(data);
            })
            .catch((error) => console.error('Error fetching profile:', error));
    }, []);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(entreprisePerContact(localStorage.getItem('user')) as any)
            .unwrap()
            .then((res: any) => {
                // Assuming res.idUser contains the connected entreprise ID
                setIdentreprise(res.idUser);
                dispatch(contactsPerEntreprise(res.idUser) as any);
            })
            .catch((error: Error) => console.log(error));
    }, [dispatch]);

    // Use effect to fetch notifications and filter by entreprise ID
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/Produit/allnotif');
              //  console.log('Response from API:', response);

                if (response.data && Array.isArray(response.data)) {
                    // Filter notifications based on `identreprise`
                    const filteredNotifications = response.data.filter(
                        (notification: any) => notification.idetse === identreprise
                    );

                    setNotifications(filteredNotifications);
                    setUnreadCount(filteredNotifications.length);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Fetch notifications only if `identreprise` is set
        if (identreprise) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

            return () => {
                clearInterval(interval);
            };
        }
    }, [identreprise]); // Re-run effect when `identreprise` changes

      
    // Handle click on notifications icon (reset unread count)
    const handleNotificationsClick = () => {
    };

    // Logout handler
    const logout = async () => {
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        history.push('/');
    };

    // Navigate to profile page
    const myProfile = async () => {
        history.push('/me/my-profile');
    };

    return (
        <Flex
            w={{ sm: '100%', md: 'auto' }}
            alignItems='center'
            flexDirection='row'
            bg={menuBg}
            flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
            p='10px'
            borderRadius='30px'
            boxShadow={shadow}
        >
            <Text w='max-content' color='gray.700' fontSize='sm' fontWeight='700' me='6px'>
                👋&nbsp; Hey, {profileDetail && profileDetail.nom} {profileDetail && profileDetail.prenom} &nbsp;&nbsp;
                {new Date().toUTCString()}
            </Text>
            <Menu>
                <MenuButton p='10px' onClick={handleNotificationsClick}>
                    <Flex position='relative'>
                        <Icon mt='px' as={MdNotificationsNone} color={navbarIcon} w='18px' h='18px' me='10px' />
                        {unreadCount > 0 && (
                            <Flex
                                position='absolute'
                                top='-1px'
                                right='-1px'
                                bg='red.500'
                                borderRadius='full'
                                w='16px'
                                h='16px'
                                alignItems='center'
                                justifyContent='center'
                            >
                                <Text fontSize='xs' color='white'>
                                    {unreadCount}
                                </Text>
                            </Flex>
                        )}
                    </Flex>
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p='20px'
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'
                    mt='22px'
                    me={{ base: '30px', md: 'unset' }}
                    minW={{ base: 'unset', md: '400px', xl: '450px' }}
                    maxW={{ base: '360px', md: 'unset' }}
                >
                    <Flex w='100%' mb='20px'>
                        <Text fontSize='md' fontWeight='600' color={textColor}>
                            Notifications
                        </Text>
                    </Flex>
                    <Flex flexDirection='column'>
                        {notifications.map((notification, index) => (
                            <MenuItem
                                key={index}
                                _hover={{ bg: 'none' }}
                                _focus={{ bg: 'none' }}
                                px='0'
                                borderRadius='8px'
                                mb='10px'
                            >
                                <Text>{notification.msg}</Text>
                            </MenuItem>
                        ))}
                    </Flex>
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton p='0px'>
                    <Icon mt='6px' as={MdInfoOutline} color={navbarIcon} w='18px' h='18px' me='10px' />
                </MenuButton>
                <MenuList
                    boxShadow={shadow}
                    p='20px'
                    me={{ base: '30px', md: 'unset' }}
                    borderRadius='20px'
                    bg={menuBg}
                    border='none'
                    mt='22px'
                    minW={{ base: 'unset' }}
                    maxW={{ base: '360px', md: 'unset' }}
                >
                    <Flex flexDirection='column'>
                        <Text>Additional Information</Text>
                    </Flex>
                </MenuList>
            </Menu>
            <Button
                variant='no-hover'
                bg='transparent'
                p='0px'
                minW='unset'
                minH='unset'
                h='18px'
                w='max-content'
                onClick={toggleColorMode}
            >
                <Icon
                    me='10px'
                    h='18px'
                    w='18px'
                    color={navbarIcon}
                    as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
                />
            </Button>
            <Menu>
                <MenuButton p='0px'>
                    <Avatar _hover={{ cursor: 'pointer' }} color='white' name='Adela Parkson' bg='#11047A' size='sm' w='40px' h='40px' />
                </MenuButton>
                <MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
                    <Flex w='100%' mb='0px'>
                        <Text
                            ps='20px'
                            pt='16px'
                            pb='10px'
                            w='100%'
                            borderBottom='1px solid'
                            borderColor='rgba(135, 140, 189, 0.3)'
                            fontSize='sm'
                            fontWeight='700'
                            color={textColor}
                        >
                            👋&nbsp; Hey, {profileDetail && profileDetail.nom} {profileDetail && profileDetail.prenom}
                        </Text>
                    </Flex>
                    <Flex flexDirection='column' p='10px'>
                        <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px' onClick={myProfile}>
                            <Text fontSize='sm'>My Profile</Text>
                        </MenuItem>
                        <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
                            <Text fontSize='sm'>Settings</Text>
                        </MenuItem>
                        <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px' onClick={logout}>
                            <Text fontSize='sm'>Log out</Text>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
}

HeaderLinksC.propTypes = {
    secondary: PropTypes.bool,
};
