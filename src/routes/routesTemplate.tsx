import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdHome, MdOutlineShoppingCart } from 'react-icons/md';
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

const routesTemplate = [
	{
		name: 'Main Dashboard',
		layout: '/rtl',
		path: '/Dashboard',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'NFT Marketplace',
		layout: '/rtl',
		path: '/nft-marketplace',
		icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
		component: NFTMarketplace,
		secondary: true
	},
	{
		name: 'Data Tables',
		layout: '/rtl',
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: '/data-tables',
		component: DataTables
	},
	{
		name: 'RTL Admin',
		layout: '/rtl',
		path: '/rtl-default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: RTL
	},
];

export default routesTemplate;
