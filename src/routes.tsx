import { Icon } from '@chakra-ui/react';
import {MdHome} from 'react-icons/md';

import LandingPage from 'pages/auth/LandingPage'

import routesAdmin from 'routes/routesAdmin';
import routesAuth from 'routes/routesAuth';
import routesMe from 'routes/routesMe';
import routesProfile from 'routes/routesProfile';
import routesProp from 'routes/routesProp';
import routesTemplate from 'routes/routesTemplate';
import routesTicket from 'routes/routesTicket';
import routesCommercial from 'routes/routesCommercial'
import routesRespTicket from 'routes/routesRespTicket'
import routesContact from 'routes/routesContact'
import testsocket from 'pages/testSocket'
import routesOffre from 'routes/routesOffre';

import routesDevis from 'routes/routesDevis';
import routesFacture from 'routes/routesFacture';

import routesProduit from 'routes/routesProduit';
import routesCategorie from 'routes/routesCategorie';
const routes = [
	{
		name: "page d'acceuil",layout: '/auth',path: '/default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: LandingPage
	},
	{
		name: "test",layout: '/me',path: '/testsocket',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: testsocket
	}
];
routesMe.forEach(element => {
	routes.push(element)
});
routesAdmin.forEach(element => {
	routes.push(element)
});
routesAuth.forEach(element => {
	routes.push(element)
});
routesProfile.forEach(element => {
	routes.push(element)
});
routesProp.forEach(element => {
	routes.push(element)
});
routesTemplate.forEach(element => {
	routes.push(element)
});
routesTicket.forEach(element => {
	routes.push(element)
});
routesCommercial.forEach(element => {
  routes.push(element);
});
routesRespTicket.forEach(element => {
	routes.push(element)
});
routesContact.forEach(element => {
	routes.push(element)
});
routesOffre.forEach(element => {
	routes.push(element)
});
routesDevis.forEach(element => {
	routes.push(element)
});
routesFacture.forEach(element => {
	routes.push(element)
});
routesProduit.forEach(element => {
	routes.push(element)
});

routesCategorie.forEach(element => {
	routes.push(element)
});

export default routes;
