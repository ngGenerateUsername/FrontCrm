import { Icon } from '@chakra-ui/react';
import {MdPerson} from 'react-icons/md';
import MyProfile from 'pages/contact/MyProfile';

const routesMe = [
	{
		name: 'Mon profile',layout: '/me',path: '/my-profile',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: MyProfile
	},
];

export default routesMe;
