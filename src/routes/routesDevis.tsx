import { Icon } from '@chakra-ui/react';
import { CreditIcon } from 'components/icons/Icons';
import DevisDetails from 'pages/devis/DevisDetails';
import ListDevis from 'pages/devis/ListDevis';



import { MdPerson } from 'react-icons/md';



const routesDevis = [

	{
		name: 'Devis',layout: '/commercial',path: '/list-devis',
		icon: <Icon as={CreditIcon} width='20px' height='20px' color='inherit' />,
		component: ListDevis
	},
	{
		name: 'Devis',layout: '/devis',path: '/details-devis',
		icon: <></>,
		component: DevisDetails
	},


];

export default routesDevis;