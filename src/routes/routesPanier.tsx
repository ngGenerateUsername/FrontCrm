import { Icon } from '@chakra-ui/react';
import CheckTable2 from 'components/produit/checktableallcmd';
import {MdPerson} from 'react-icons/md';
import {ImTicket} from 'react-icons/im';
import commande from 'components/commande/commande';


const routesPanier = [
	{
		name: 'Panier',layout: '/contact',path: '/mon_Panier',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: commande


    }
];
   export default routesPanier;
