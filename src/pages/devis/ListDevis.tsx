import { Box, SimpleGrid } from '@chakra-ui/react';
import CheckTableCommercial from 'components/client/components/CheckTableCommercial';
import CheckTableOffre from 'components/offre/CheckTableOffre';
import ATTENTETable from 'components/ticket/ATTENTETableRespTicket';
import FERMETable from 'components/ticket/FERMETableRespTicket';
import IDENTIFICATIONTable from 'components/ticket/IDENTIFICATIONTableRespTicket';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AllTickets } from 'state/user/ticket_Slice';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";   
import CheckTableDevis from 'components/Devis/CheckTableDevis';



export default function Settings() {
    const location = useLocation()
	const params = new URLSearchParams(location.search)
	

	// Chakra Color Mode
	return ( 

		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 1, md: 1 }} spacing={{ base: '20px', xl: '20px' }}>

            <CheckTableDevis id={localStorage.getItem("user")} />
			</SimpleGrid>
		</Box>


	);
}
