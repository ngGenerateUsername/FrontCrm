import { Icon } from '@chakra-ui/react';
import {MdPerson} from 'react-icons/md';
import listProduit from 'pages/produit/listProduit';
import ClientSelector from 'components/produit/ClientSelector';
import CheckTable2 from 'components/produit/checktableallcmd';

const routesProduit = [
	{
		name: 'Produit',layout: '/commercial',path: '/produit-list',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component:listProduit
	},
	{
		
		name: 'Produit',layout: '/produit',path: '/produit-cmd',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component:CheckTable2
	},

];	

export default routesProduit;	
