import { Icon } from '@chakra-ui/react';
import {MdHome, MdPerson} from 'react-icons/md';
import {HiUserGroup} from 'react-icons/hi'
import ListeAllCompany from 'pages/entreprise/ListeCompanyAll'
import ListeUsersAll from 'pages/contact/ListeUsersAll'
import ListeClientsAll from 'pages/client/ListeClientsAll'
import AddCompanyAdmin from'pages/entreprise/addCompanyAdmin'
import AddContactAdmin from "pages/contact/addContactAdmin";
import ListeContactsAll from "pages/contact/ListeContactsAll";
import ListTicketsAdmin from 'pages/ticket/ListTicketsAdmin';
import ListMsgsAdmin from 'pages/auth/ListeMsgsAll';
import MainDashboard from 'pages/dashboard';
import AddCompany from 'pages/entreprise/addCompany';

const routesAdmin = [
	{
		name: 'Dashboard',layout: '/admin',path: '/dashboard',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Tous Les Msgs',layout: '/admin',path: '/all-msgs',
		icon: <Icon as={HiUserGroup} width='20px' height='20px' color='inherit' />,
		component: ListMsgsAdmin
	},
	{
		name: 'Tous Les entreprises',layout: '/admin',path: '/all-companys',
		icon: <Icon as={HiUserGroup} width='20px' height='20px' color='inherit' />,
		component: ListeAllCompany
	},
	{
		name: 'Tous les users',layout: '/admin',path: '/all-users',
		icon: <Icon as={HiUserGroup} width='20px' height='20px' color='inherit' />,
		component: ListeUsersAll
	},
	{
		name: 'Tous les Clients',layout: '/admin',path: '/all-clients',
		icon: <Icon as={HiUserGroup} width='20px' height='20px' color='inherit' />,
		component: ListeClientsAll
	},
	{
		name: 'Tous les Contacts',layout: '/admin',path: '/all-contacts',
		icon: <Icon as={HiUserGroup} width='20px' height='20px' color='inherit' />,
		component: ListeContactsAll
	},
	{
		name: 'Tous les tickets',layout: '/admin',path: '/all-tickets',
		icon: <Icon as={HiUserGroup} width='20px' height='20px' color='inherit' />,
		component: ListTicketsAdmin
	},
	{
		name: 'Ajouter entreprise',layout: '/admin',path: '/add-company',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: AddCompanyAdmin
	},
	{
		name: 'Invite User',layout: '/admin',path: '/add-contact',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: AddContactAdmin
	},

];

export default routesAdmin;
