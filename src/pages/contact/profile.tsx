// Chakra imports
import { Box, Text, Grid, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Banner from '../../components/profile/components/Banner';
import General from '../../components/profile/components/General2';
import HistoryItem from '../../components/profile/components/HistoryItem2';

// Assets
import banner from 'assets/img/auth/banner.png';
import { useEffect } from 'react';
import Card from 'components/card/Card';
import Nft5 from 'assets/img/nfts/Nft5.png';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUser } from "state/user/Users_Slice";
import { entreprisePerContact } from "state/user/Role_Slice"

export default function Overview() {

	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const location = useLocation()
	const params = new URLSearchParams(location.search)

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSingleUser(params.get("id")) as any)
	}, [dispatch]);

	const { status: userStatus, record: userRecord } = useSelector((state: any) => state.fetchSingleUserExport);
	console.log(userRecord, userStatus);


	useEffect(() => {
		dispatch(entreprisePerContact(params.get("id")) as any)
	}, [dispatch]);

	const { status, record } = useSelector((state: any) => state.entreprisePerContactExport);
	console.log(status, record);
	const renderDataUser = () => {
		if (userStatus === "loading")
			return (
				<Banner
					gridArea='1 / 1 / 4 / 4'
					banner={banner}
					avatar={require('assets/img/avatars/user.png')}
					name="loading"
					job="loading"
				/>
			);
		if (userStatus === "failed")
			return (
				<Banner
					gridArea='1 / 1 / 4 / 4'
					banner={banner}
					avatar={require('assets/img/avatars/user.png')}
					name="failed"
					job="failed"
				/>
			);

		if (userStatus === "succeeded") {
			return (
				<Banner
					gridArea='1 / 1 / 4 / 4'
					banner={banner}
					avatar={require('assets/img/avatars/' + userRecord.image)}
					name={userRecord.nom}
					job={userRecord.roles[0].name.substring(5)}
				/>
			);
		}
	};
	const renderDataEntreprise = () => {
		if (status === "loading")
			return (
				<HistoryItem
					name="loading"
					author="loading"
					image={Nft5}
					id="loading"
				/>
			);
		if (status === "failed")
			return (
				<HistoryItem
					name="failed"
					author="failed"
					image={Nft5}
					id="failed"
				/>
			);

		if (status === "succeeded") {
			return (
				<HistoryItem
					name={record.nomEntreprise}
					author={record.mail}
					image={Nft5}
					id={record.idUser}
				/>
			);
		}
	};

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			{/* Main Fields */}
			<Grid
				templateColumns={{
					base: '1fr',
					lg: '1.34fr 1fr 1.62fr'
				}}
				templateRows={{
					base: 'repeat(3, 1fr)',
					lg: '1fr'
				}}
				gap={{ base: '20px', xl: '20px' }}>

			</Grid>
			{renderDataUser()}
{record.idUser != null && <>			<Grid

				templateColumns={{
					base: '1fr',
					lg: 'repeat(2, 1fr)',
					'2xl': '1.34fr 1.62fr 1fr'
				}}
				templateRows={{
					base: '1fr',
					lg: 'repeat(2, 1fr)',
					'2xl': '1fr'
				}}
				gap={{ base: '20px', xl: '20px' }}>
				<Text gridArea='1 / 1 / 4/ 4' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
					Entreprise
				</Text>
				<Card p='0px' gridArea='1 / 2 / 4 / 4'>
					{renderDataEntreprise()}
				</Card>
			</Grid>
			</>}
			<br></br>
			<Grid
				mb='20px'
				templateColumns={{
					base: '1fr',
					lg: 'repeat(2, 1fr)',
					'2xl': '1.34fr 1.62fr 1fr'
				}}
				templateRows={{
					base: '1fr',
					lg: 'repeat(2, 1fr)',
					'2xl': '1fr'
				}}
				gap={{ base: '20px', xl: '20px' }}>
				<General gridArea='1 / 1 / 4 / 4' minH='365px' pe='20px' user={userRecord} />
			</Grid>
		</Box>

	);
}
