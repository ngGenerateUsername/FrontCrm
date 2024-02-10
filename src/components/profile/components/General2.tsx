// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { useEffect, useState } from 'react';
import Information from './Information2';

// Assets
export default function GeneralInformation(props: {  user: any ,[x: string]: any }) {
	const { ...rest } = props;
	const { user } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	return (
		
		<Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px' mb='4px'>	
			Informations générales
			</Text>
			<Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
			</Text>
			<SimpleGrid columns={2} gap='20px'>
				<Information boxShadow={cardShadow} title="Prénom" value={user.nom} id="nom"/>
				<Information boxShadow={cardShadow} title="nom de famille" value={user.prenom} id ="prenom" />
				<Information boxShadow={cardShadow} title="E-mail" value={user.mail} id="mail"/>
				<Information boxShadow={cardShadow} title="Numero de Tel" value={user.numTel} id="numTel" />
				<Information boxShadow={cardShadow} title="Adresse" value={user.adresse} id="adresse"/>
			</SimpleGrid>
		</Card>
	);
}
