import { Icon } from '@chakra-ui/react';
import {ImTicket} from 'react-icons/im';
import AddTicket from "pages/ticket/addTicket"
import ListTicketsContact from 'pages/ticket/ListTicketsContact';
import ListClientsContact from 'pages/client/ListeClientsContact'
import CheckTable2 from 'components/produit/checktableallcmd';
import commande from 'components/commande/commande';
import mycommande from 'components/commande/mycommande';
import Details from 'pages/Commande/Details';
import ClientSelector from 'components/produit/ClientSelector';
const routesContact = [
	{
		name: 'produits',layout: '/contact',path: '/checktableallcmd',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: ClientSelector
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
	{
		name: 'mes commandes',layout: '/contact',path: '/mes_commandes',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: mycommande

	},
	
	
	
];

export default routesContact;
