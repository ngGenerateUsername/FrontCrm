import { Icon } from '@chakra-ui/react';
import { CreditIcon, DocumentIcon, InvoiceIcon, MastercardIcon, StatsIcon } from 'components/icons/Icons';
import Settings from 'pages/categorie/listeCategorie';




import FactureDetails from 'pages/facture/FactureDetails';
import ListFacture from 'pages/facture/ListFacture';


import ListOffre from 'pages/offre/ListOffre';
import OffreDetails from 'pages/offre/OffreDetails';
import { MdPerson, MdReceipt } from 'react-icons/md';



const routesFournisseur = [

	/*{
		name: 'Facture',layout: '/commercial',path: '/list-facture',
		icon: <Icon as={MdReceipt } width='20px' height='20px' color='inherit' />,
		component: ListFacture
	},*/
	{
		name: 'Ao',layout: '/FOUURNISSEUR',path: '/allao',
		icon: <></>,
		component: Settings
	},


];

export default routesFournisseur;