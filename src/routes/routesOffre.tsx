import { Icon } from '@chakra-ui/react';
import {ImTicket} from 'react-icons/im';
import SingleTicket from 'pages/ticket/SingleTicket';
import ListOffre from 'pages/offre/ListOffre';
import OffreDetails from 'pages/offre/OffreDetails';
import { MdPerson } from 'react-icons/md';
import { WalletIcon } from 'components/icons/Icons';



const routesOffre = [
	{
		name: 'Offre',layout: '/offre',path: '/details-Offre',
		icon: <></>,
		component: OffreDetails
	},
	{
		name: 'Offre',layout: '/commercial',path: '/list-offre',
		icon: <Icon as={WalletIcon} width='20px' height='20px' color='inherit' />,
		component: ListOffre
	},

	// {
	// 	name: 'Ticket',layout: '/ticket',path: '/detailsRespTicket',
	// 	icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
	// 	component: SingleTicketRespTicket
	// }
];

export default routesOffre;
