import { Icon } from '@chakra-ui/react';
import {ImTicket} from 'react-icons/im';
import ListTicketsRespTicket from 'pages/ticket/ListTicketsRespTicket';
import ListTicketsEntreprise from 'pages/ticket/ListTicketsEntreprise';
import MyCompany from 'pages/entreprise/MyCompany';
import {MdPerson,MdSchedule} from 'react-icons/md';
import MesActivites  from'pages/opportunity/Myactivities';
const routesTicket = [
	{
		name: 'Mon entreprise',layout: '/respTicket',path: '/company',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: MyCompany
	},
	{
		name: 'Liste Tickets Attribuées',layout: '/respTicket',path: '/liste-tickets-resp',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: ListTicketsRespTicket
	},
	{
		name: 'Liste Tickets',layout: '/respTicket',path: '/liste-tickets-entreprise',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: ListTicketsEntreprise
	},
	{
		name: 'Mes Activités',layout: '/respTicket',path: '/activities',
		icon: <Icon as={MdSchedule} width='20px' height='20px' color='inherit' />,
		component: MesActivites
	},

];

export default routesTicket;
