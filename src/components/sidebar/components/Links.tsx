/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	//   Chakra color mode
	let location = useLocation();
	let activeColor = useColorModeValue('brand.300', 'white');
	let inactiveColor = useColorModeValue('brand.400', 'brand.400');
	let activeIcon = useColorModeValue('white', 'white');
	let textColor = useColorModeValue('white', 'white');
	let brandColor = useColorModeValue('white', 'brand.400');

	const { routes } = props;
	const  tokenn:any = jwtDecode(localStorage.getItem('token'));
	console.log(tokenn.aud)
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (
		routes: RoutesType[], 
	) => {
		return routes.map(
			(
				route: RoutesType,
				index: number
			) => {
				if(tokenn.aud === '[ROLE_COMMERCIAL]' ){
				if (route.layout === '/commercial' || route.layout === '/me') {
					return (
						<NavLink key={index} to={route.layout + route.path}>
							{route.icon ? (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Flex w='100%' alignItems='center' justifyContent='center'>
											<Box
												color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
												me='18px'>
												{route.icon}
											</Box>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
										</Flex>
										<Box
											h='36px'
											w='4px'
											bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
											borderRadius='5px'
										/>
									</HStack>
								</Box>
							) : (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Text
											me='auto'
											color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
											fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
											{route.name}
										</Text>
										<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
									</HStack>
								</Box>
							)}
						</NavLink>
					);
				}
				}
				if(tokenn.aud === '[ROLE_RESPONSABLETICKET]' ){
				if (route.layout === '/respTicket' || route.layout === '/me') {
						return (
							<NavLink key={index} to={route.layout + route.path}>
								{route.icon ? (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Flex w='100%' alignItems='center' justifyContent='center'>
												<Box
													color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
													me='18px'>
													{route.icon}
												</Box>
												<Text
													me='auto'
													color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
													fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
													{route.name}
												</Text>
											</Flex>
											<Box
												h='36px'
												w='4px'
												bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
												borderRadius='5px'
											/>
										</HStack>
									</Box>
								) : (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
											<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
										</HStack>
									</Box>
								)}
							</NavLink>
						);
				}
				}
				if(tokenn.aud === '[ROLE_PROPRIETAIRE]' ){
				if (route.layout === '/prop' || route.layout === '/me') {
					return (
						<NavLink key={index} to={route.layout + route.path}>
							{route.icon ? (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Flex w='100%' alignItems='center' justifyContent='center'>
											<Box
												color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
												me='18px'>
												{route.icon}
											</Box>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
										</Flex>
										<Box
											h='36px'
											w='4px'
											bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
											borderRadius='5px'
										/>
									</HStack>
								</Box>
							) : (
								<Box>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Text
											me='auto'
											color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
											fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
											{route.name}
										</Text>
										<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
									</HStack>
								</Box>
							)}
						</NavLink>
					);
				}
				}
				if(tokenn.aud === '[ROLE_ADMIN]' ){
				if (route.layout === '/me' || route.layout === '/admin') {
						return (
							<NavLink key={index} to={route.layout + route.path}>
								{route.icon ? (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Flex w='100%' alignItems='center' justifyContent='center'>
												<Box
													color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
													me='18px'>
													{route.icon}
												</Box>
												<Text
													me='auto'
													color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
													fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
													{route.name}
												</Text>
											</Flex>
											<Box
												h='36px'
												w='4px'
												bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
												borderRadius='5px'
											/>
										</HStack>
									</Box>
								) : (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
											<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
										</HStack>
									</Box>
								)}
							</NavLink>
						);
				}
				}
				if(tokenn.aud === '[ROLE_CONTACT]' ){
				if (route.layout === '/contact' || route.layout === '/me') {
							return (
								<NavLink key={index} to={route.layout + route.path}>
									{route.icon ? (
										<Box>
											<HStack
												spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
												py='5px'
												ps='10px'>
												<Flex w='100%' alignItems='center' justifyContent='center'>
													<Box
														color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
														me='18px'>
														{route.icon}
													</Box>
													<Text
														me='auto'
														color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
														fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
														{route.name}
													</Text>
												</Flex>
												<Box
													h='36px'
													w='4px'
													bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
													borderRadius='5px'
												/>
											</HStack>
										</Box>
									) : (
										<Box>
											<HStack
												spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
												py='5px'
												ps='10px'>
												<Text
													me='auto'
													color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
													fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
													{route.name}
												</Text>
												<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
											</HStack>
										</Box>
									)}
								</NavLink>
							);
				}
				}
				}
		);
	};
	//  BRAND
	return <>{createLinks(routes)}</>
}

export default SidebarLinks;
