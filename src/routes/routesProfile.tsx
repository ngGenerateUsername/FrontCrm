import { Icon } from '@chakra-ui/react';
import {MdPerson} from 'react-icons/md';

import ProfileCompany from 'pages/entreprise/ProfilCompany';
import EditCompany from 'pages/entreprise/EditCompany';
import Profile from 'pages/contact/profile';
import EditUser from 'pages/contact/EditProfile';

import ProfileClient from 'pages/client/ProfilClient';
import EditClient from 'pages/client/EditClient';


const routesProfile = [
	{
		name: 'Profile',layout: '/profile',path: '/profile-contact',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: Profile
	},
	{
		name: 'Profile',layout: '/profile',path: '/edit-user',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: EditUser
	},
	{
		name: 'Profile entreprise',layout: '/profile',path: '/profile-company',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: ProfileCompany
	},
	{
		name: 'Edit entreprise',layout: '/profile',path: '/edit-company',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: EditCompany
	},
	{
		name: 'Profile client',layout: '/profile',path: '/profile-client',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: ProfileClient
	},
	{
		name: 'Edit client',layout: '/profile',path: '/edit-client',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: EditClient
	},
];

export default routesProfile;
