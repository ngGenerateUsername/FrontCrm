// Chakra imports
import { Box, Text, useColorModeValue,Link ,Icon, DrawerOverlay, DrawerCloseButton, DrawerBody, DrawerHeader, DrawerFooter, Button, DrawerContent, Drawer, Input, useDisclosure} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import React from 'react';
// Assets
import { MdEdit } from 'react-icons/md';
export default function Information(props: { title: string; value: number | string; [x: string]: any }) {
	const { title, value,link,id  , ...rest} = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const bg = useColorModeValue('white', 'navy.700');

		const { isOpen, onOpen, onClose } = useDisclosure();
		const btnRef = React.useRef();
	  
	  
	return (
		<Card bg={bg} {...rest}>
			<Box>
				<Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
					{title}
				</Text>
				<Text color={textColorPrimary} fontWeight='500' fontSize='md'>
					{value}
				</Text>
			</Box>
		</Card>
	);
}
