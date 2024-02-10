import { Icon } from '@chakra-ui/react';
import { CreditIcon, DocumentIcon, InvoiceIcon, MastercardIcon, StatsIcon } from 'components/icons/Icons';




import ListDevis from 'pages/devis/ListDevis';
import FactureDetails from 'pages/facture/FactureDetails';
import ListFacture from 'pages/facture/ListFacture';


import ListOffre from 'pages/offre/ListOffre';
import OffreDetails from 'pages/offre/OffreDetails';
import { MdPerson, MdReceipt } from 'react-icons/md';



const routesFacture = [

	{
		name: 'Facture',layout: '/commercial',path: '/list-facture',
		icon: <Icon as={MdReceipt } width='20px' height='20px' color='inherit' />,
		component: ListFacture
	},
	{
		name: 'Facture',layout: '/facture',path: '/details-facture',
		icon: <></>,
		component: FactureDetails
	},


];

export default routesFacture;