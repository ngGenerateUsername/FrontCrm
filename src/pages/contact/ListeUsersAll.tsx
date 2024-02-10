// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CheckTable from 'components/profile/components/CheckTableAll'
export default function Settings() {

	

	// Chakra Color Mode
	return ( 
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>
				<CheckTable/>
			</SimpleGrid>
		</Box>

	);
}
