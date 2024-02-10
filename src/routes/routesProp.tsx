import { Icon } from '@chakra-ui/react';
import {MdPerson} from 'react-icons/md';
import ListeClientsEntreprise from 'pages/entreprise/ListeClientsEntreprise'
import MyCompany from 'pages/entreprise/MyCompany'
import ListeContactAll from 'pages/client/ListeClientsEntreprise'

const routesProp = [
	{
		name: 'Mon entreprise',layout: '/prop',path: '/company',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: MyCompany
	},
	{
		name: 'Liste de tous les Clients',layout: '/prop',path: '/entreprise-clients',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: ListeContactAll
	},
];

export default routesProp;
