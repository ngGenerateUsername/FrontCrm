// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckTable from "components/produit/CheckTableAll";
import CheckTableCommercial from 'components/client/components/CheckTableCommercial';
import CheckTable2 from 'components/produit/checktableallcmd';
export default function listprodcmd() {
	//const location = useLocation()
	//const params = new URLSearchParams(location.search)
	

	// Chakra Color Mode
	return ( 
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <CheckTable2/>
        </SimpleGrid>
      </Box>

	);
}