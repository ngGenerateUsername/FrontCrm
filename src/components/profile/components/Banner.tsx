// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue ,Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Upload from "components/profile/components/Upload";
import { useState } from 'react';
export default function Banner(props: {
	banner: string;
	avatar: string;
	name: string;
	job: string;
	//posts: number | string;
	//followers: number | string;
	//following: number | string;
	[x: string]: any;
}) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { banner, avatar, name, job, posts, followers, following, ...rest } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const borderColor = useColorModeValue('white !important', '#111C44 !important');
	

	return (
		<Card mb={{ base: '0px', lg: '20px' }} alignItems='center' {...rest}>
			<Box bg={`url(${banner})`} bgSize='cover' borderRadius='16px' h='131px' w='100%' />
			<Avatar size='2xl' mx='auto' src={avatar} mt='-43px' border='4px solid' borderColor={borderColor} />
			<Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
				{name}
			</Text>
			<Text color={textColorSecondary} fontSize='sm'>
				{job}
			</Text>
		</Card>

	);
}
