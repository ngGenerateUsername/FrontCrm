import { Icon } from '@chakra-ui/react';
import {ImTicket} from 'react-icons/im';
import AddTicket from "pages/ticket/addTicket"
import ListTicketsContact from 'pages/ticket/ListTicketsContact';
import ListClientsContact from 'pages/client/ListeClientsContact'
import CheckTable2 from 'components/produit/checktableallcmd';
const routesContact = [
	{
		name: 'produits',layout: '/contact',path: '/checktableallcmd',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: CheckTable2
	},
	{
		name: 'Liste Clients Attribuées',layout: '/contact',path: '/liste-clients',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: ListClientsContact
	},
	{
		name: 'Creer ticket',layout: '/contact',path: '/add-ticket',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: AddTicket
	},
	{
		name: 'Liste Tickets',layout: '/contact',path: '/liste-tickets',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: ListTicketsContact
	},

	
];

export default routesContact;
