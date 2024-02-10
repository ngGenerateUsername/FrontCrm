import { Icon } from '@chakra-ui/react';
import {ImTicket} from 'react-icons/im';
import Categorie from 'pages/categorie/listeCategorie';

const routesCategorie = [
	
	
	{
		name: 'Categorie',layout: '/commercial',path: '/liste-categorie',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: Categorie
	}

	
];

export default routesCategorie;