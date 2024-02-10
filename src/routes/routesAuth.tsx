import { Icon } from '@chakra-ui/react';
import {MdLock} from 'react-icons/md';
import SignInCentered from 'pages/auth/SignIn';
import SignUp from 'pages/auth/signUp';
import forgotPassword from 'pages/auth/forgotPassword';
import resetPassword from 'pages/auth/newPasswordFromForgetPassword';
import SignUpCommercialOrResponsaable from 'pages/auth/signUpCommercialOrResp'
import VerifyAccount from 'pages/auth/VerifyInterface'

const routesAuth = [	
	{
		name: 'S identifier',layout: '/auth',path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
	{

		name: 'S inscrire',layout: '/auth',path: '/sign-up',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignUp
	},
	{

		name: 'S inscrire',layout: '/auth',path: '/sign-upCommercialOrResponsaable',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignUpCommercialOrResponsaable
	},
	{

		name: 'Mot de passe oublié',layout: '/auth',path: '/forgot-password',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: forgotPassword
	},
	{

		name: 'Réinitialiser le mot de passe',layout: '/auth',path: '/reset-password',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: resetPassword
	},	
	{
		name: 'Verification du compte',layout: '/auth',path: '/verify',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: VerifyAccount
	},
];

export default routesAuth;
