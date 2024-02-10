import React from 'react';
// Chakra imports
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormLabel, Icon, Image, Input, Select,  Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { FaEthereum } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
export default function NFT(props: {
	image: string;
	name: string;
	author: string;
	id: string;
}) {
	const { image, name, author , id} = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('brands.900', 'white');
	const bgItem = useColorModeValue(
		{ bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
		{ bg: 'navy.700', boxShadow: 'unset' }
	);
	const textColorDate = useColorModeValue('secondaryGray.600', 'white');
	const [size, setSize] = React.useState("xl")
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRefContact = React.useRef();

	let history = useHistory();
	const profileProp =  async () => {
  
	  history.push("/profile/profile-company?id="+id);
	}
	return (
		<Card _hover={bgItem} bg='transparent' boxShadow='unset' px='24px' py='21px' transition='0.2s linear'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Flex position='relative' align='center'>
					<Image src={image} w='66px' h='66px' borderRadius='20px' me='16px' />
					<Flex
						direction='column'
						w={{ base: '70%', md: '100%' }}
						me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }}>
						<Text
							color={textColor}
							fontSize={{
								base: 'md'
							}}
							mb='5px'
							fontWeight='bold'
							me='14px'>
							{name}
						</Text>
						<Text
							color='secondaryGray.600'
							fontSize={{
								base: 'sm'
							}}
							fontWeight='400'
							me='14px'>
							{author}
						</Text>
					</Flex>
					<Flex me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }} align='center'>
					<Button
					variant='darkBrand'ref={btnRefContact} colorScheme="brand" onClick={profileProp} 
								color='white'
								fontSize='sm'
								fontWeight='500'
								borderRadius='70px'
								px='24px'
								py='5px'>
								Profile
							</Button>
					</Flex>
				</Flex>
			</Flex>

			
			<Drawer
			  isOpen={isOpen}
			  placement="left"
			  onClose={onClose}
			  finalFocusRef={btnRefContact}
			  size="xl"
			>
			  <DrawerOverlay />
			  <DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Ajouter Contact</DrawerHeader>
	  
				<DrawerBody>
				<Stack spacing="24px">
</Stack>	
					</DrawerBody>
	  
				<DrawerFooter>
					
				  <Button variant="outline" mr={3} onClick={onClose}>
					Retour
				  </Button>
				  <Button colorScheme="brand">Enregistrer</Button>
				</DrawerFooter>
			  </DrawerContent>
			</Drawer>
		</Card>
	);
}
