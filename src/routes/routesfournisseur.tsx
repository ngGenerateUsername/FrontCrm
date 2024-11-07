import { Icon } from '@chakra-ui/react';
import { CreditIcon, DocumentIcon, InvoiceIcon, MastercardIcon, StatsIcon } from 'components/icons/Icons';
import appeloffrecf from 'pages/apple offre/appeloffrecf';
import getallao from 'pages/apple offre/getallao';
import { ImTicket } from 'react-icons/im';
import { MdPerson, MdReceipt } from 'react-icons/md';

const routesFournisseur = [

	{

		name: 'Ao',layout: '/fournisseur',path: '/allao',
		icon: <Icon as={MdReceipt } width='20px' height='20px' color='inherit' />,

		component: getallao
	},
	{
		name: '',layout: '/produit',path: '/Detaileappelloffre',
		icon: <Icon as={ImTicket} width='20px' height='20px' color='inherit' />,
		component: appeloffrecf

	},


];

export default routesFournisseur;