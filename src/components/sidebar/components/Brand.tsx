// Chakra imports
import { Flex, useColorModeValue,Image } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');
	const imagePath = `${process.env.PUBLIC_URL}/logo.png`;

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image src={require(`assets/img/avatars/crm.png`)} boxSize="100" color="white" />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
