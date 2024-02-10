import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import MeLayout from './layouts/me';
import ProfileLayout from './layouts/profile';
import PropLayout from './layouts/prop';
import CommercialLayout from './layouts/commercial';
import RespTicketLayout from './layouts/respTicket';
import RTLLayout from './layouts/rtl';
import TicketLayout from './layouts/ticket'
import OffreLayout from './layouts/offre'
import OpportuniteLayout from './layouts/opportunite'
import Ajout from 'layouts/ajout'
import Contact from 'layouts/contact'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import axios from 'axios';
import store from 'state/store';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode'
import FactureLayout from './layouts/facture'
import DevisLayout from './layouts/devis'
import factureLayout from './layouts/facture';
import ProduitLayout from './layouts/produit';


let token_decrypt:any = null ;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
if(localStorage.getItem("token") != null){
	token_decrypt = jwt_decode(localStorage.getItem("token"))
}
ReactDOM.render(
	<Provider store={store}>
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<HashRouter>
				<Switch>

					<Route path={`/auth`} component={AuthLayout} />
					<Route path={`/me`} component={MeLayout} />
					{token_decrypt !== null && token_decrypt.aud === '[ROLE_ADMIN]' && <Route path={`/admin`} component={AdminLayout} />	}
					{token_decrypt !== null && token_decrypt.aud === '[ROLE_COMMERCIAL]' && <Route path={`/commercial`} component={CommercialLayout} />	}
					{token_decrypt !== null && token_decrypt.aud === '[ROLE_RESPONSABLETICKET]' && <Route path={`/respTicket`} component={CommercialLayout} />	}
					{token_decrypt !== null && token_decrypt.aud === '[ROLE_CONTACT]' && <Route path={`/contact`} component={CommercialLayout} />	}
						{/* what is above here is useless */}
					<Route path={`/profile`} component={ProfileLayout} />
					<Route path={`/prop`} component={PropLayout} />
					<Route path={`/ticket`} component={TicketLayout} />
					<Route path={`/offre`} component={OffreLayout} />
					<Route path={`/facture`} component={FactureLayout} />
					<Route path={`/devis`} component={DevisLayout} />
					<Route path={`/opportunite`} component={OpportuniteLayout} />
		
					<Route path={`/rtl`} component={RTLLayout} />
					<Route path={`/produit`} component={ProduitLayout} />
					<Redirect from='/' to='/auth' />
				</Switch>
			</HashRouter>
		</React.StrictMode>
	</ChakraProvider>
	</Provider>,
	document.getElementById('root')
);
