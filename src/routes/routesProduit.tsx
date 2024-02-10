import { Icon } from '@chakra-ui/react';
import {MdPerson} from 'react-icons/md';
import listProduit from 'pages/produit/listProduit';

const routesProduit = [
	{
		name: 'Produit',layout: '/commercial',path: '/list',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component:listProduit
	},
];

export default routesProduit;
