import { Icon } from '@chakra-ui/react';
import {ImTicket} from 'react-icons/im';
import SingleTicket from 'pages/ticket/SingleTicket';
import SingleTicketRespTicket from 'pages/ticket/SingleTicketRespTicket';


const routesTicket = [
	{
		name: 'Ticket',layout: '/ticket',path: '/details',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: SingleTicket
	},
	{
		name: 'Ticket',layout: '/ticket',path: '/detailsRespTicket',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: SingleTicketRespTicket
	}
];

export default routesTicket;
