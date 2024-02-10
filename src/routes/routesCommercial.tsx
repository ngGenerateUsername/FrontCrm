import { Icon } from '@chakra-ui/react';
import {MdPerson,MdLeaderboard,MdSchedule,MdReceiptLong,MdAssignmentInd,MdSupervisedUserCircle,MdApartment} from 'react-icons/md';
import ListeClientsCommercial from 'pages/client/ListeClientsCommercial';
import ListeContactAll from 'pages/client/ListeClientsEntreprise';
import MyCompany from 'pages/entreprise/MyCompany';
import opportunite from'pages/opportunity/opportunite';
import ListOpportunites from'pages/opportunity/ListOpportunities';
import addOpportunite from'pages/opportunity/addOpportunite';
import ExampleComponent  from'pages/opportunity/SingleActivity';
import MesActivites  from'pages/opportunity/Myactivities';
import ContratList  from'pages/opportunity/ListContrats';
import Contrat from'pages/opportunity/SingleContrat';
import Kanban from'pages/Test';



const routesMe = [
	{
		name: 'Mon entreprise',layout: '/commercial',path: '/company',
		icon: <Icon as={MdApartment} width='20px' height='20px' color='inherit' />,
		component: MyCompany
	},
	{
		name: 'Liste de mes Clients',layout: '/commercial',path: '/commercial-clients',
		icon: <Icon as={MdAssignmentInd} width='20px' height='20px' color='inherit' />,
		component: ListeClientsCommercial
	},
	{
		name: 'Liste de tous les Clients',layout: '/commercial',path: '/entreprise-clients',
		icon: <Icon as={MdSupervisedUserCircle} width='20px' height='20px' color='inherit' />,
		component: ListeContactAll
	},
	{
		name: 'Opportunité',layout: '/opportunite',path: '/detailsopportunite',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: opportunite
	},
	{
		name: 'Mes opportunités',layout: '/commercial',path: '/allopportunite',
		icon: <Icon as={MdLeaderboard} width='20px' height='20px' color='inherit' />,
		component: ListOpportunites
	},
	{
		name: 'Ajouter Opportunite',layout: '/opportunite',path: '/add-opportunite',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: addOpportunite
	},
	{
		name: 'Activité',layout: '/opportunite',path: '/activite',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: ExampleComponent
	},

	{
		name: 'Mes Activités',layout: '/commercial',path: '/activities',
		icon: <Icon as={MdSchedule} width='20px' height='20px' color='inherit' />,
		component: MesActivites
	},
	{
		name: 'Mes Contrats ',layout: '/commercial',path: '/contrat-list',
		icon: <Icon as={MdReceiptLong} width='20px' height='20px' color='inherit' />,
		component: ContratList
	},
	{
		name: 'test ',layout: '/commercial',path: '/test',
		icon: <Icon as={MdReceiptLong} width='20px' height='20px' color='inherit' />,
		component: () => <Kanban />
	},
	{
		name: 'Détails du contrat',layout: '/opportunite',path: '/details',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: Contrat
	},


	

];

export default routesMe;
