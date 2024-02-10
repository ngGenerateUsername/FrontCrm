import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Button } from '@chakra-ui/react';
import * as React from 'react';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useEffect, useState } from 'react';
import { Console } from 'console';
import { useHistory } from 'react-router-dom';

type RowObj = {
	name: [string, boolean];
	Domaine: string;
	id: number;
};
 
const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function CheckTable() {
	const [waitttttt , setWait] = useState(false);
	const [listEntreprise , setlistEntreprise] = useState(null);
	useEffect(()=>
	{	
	fetch('http://localhost:8080/api/role_entreprise/entreprisePerProp?id='+localStorage.getItem("user"))
	.then(res=>{
	return res.json()
	})
	.then(data=>{
			setlistEntreprise(data);
			console.log(data)
	  setWait(true);
	})
	},[]);
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	
	let history = useHistory();

	
	 return (	
		<>
			{waitttttt &&(
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Check Table
				</Text>
				<Menu />
			</Flex>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
					<Thead>
										<Th
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'>
										<Flex
											justifyContent='space-between'
											align='center'
											fontSize={{ sm: '10px', lg: '12px' }}
											color='gray.400'>
										</Flex>
										<Text
											justifyContent='space-between'
											align='center'
											fontSize={{ sm: '10px', lg: '12px' }}
											color='gray.400'>
										Nom de L'entreprise
										</Text>
										</Th>
										<Th
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
											</Flex>
											<Text
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
											Domaine
											</Text>
										</Th>
										<Th 											
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'>
										<Text
											justifyContent='space-between'
											align='center'
										fontSize={{ sm: '10px', lg: '12px' }}
										color='gray.400'>
										Details
										</Text>
				</Th>
				<Th 											
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'>
										<Text
											justifyContent='space-between'
											align='center'
										fontSize={{ sm: '10px', lg: '12px' }}
										color='gray.400'>
										
										</Text>
				</Th>
					</Thead>
				<Tbody>
				{listEntreprise.map((e:any,index:any) => (
					<Tr>

<Td>
										<Flex
											justifyContent='space-between'
											align='center'
											fontSize={{ sm: '10px', lg: '12px' }}
											color='gray.400'>
										</Flex>
										<Text
											justifyContent='space-between'
											align='center'
											color={textColor} fontSize='sm' fontWeight='700'>
										{e.nomEntreprise}
										</Text>
										</Td>

										<Td>
										<Flex
											justifyContent='space-between'
											align='center'
											fontSize={{ sm: '10px', lg: '12px' }}
											color='gray.400'>
										</Flex>
										<Text
											justifyContent='space-between'
											align='center'
											color={textColor} fontSize='sm' fontWeight='700'>
										{e.domaine}
										</Text>
										</Td>
										<Td>
										<Flex
											justifyContent='space-between'
											align='center'
											fontSize={{ sm: '10px', lg: '12px' }}
											color='gray.400'>
										</Flex>
										<Button  onClick={async () => {
  
  history.push("/profile/edit-company?id="+e.idUser);
}} marginLeft='40%' color='white' variant='brand' fontSize='sm' fontWeight='700'>
					Plus de Details
				</Button>
										</Td>
										<Td>
										<Flex
											justifyContent='space-between'
											align='center'
											fontSize={{ sm: '10px', lg: '12px' }}
											color='gray.400'>
										</Flex>
										<Button  onClick={async () => {
  
  history.push("/prop/clients?id="+e.idUser);
}} marginLeft='40%' color='white' variant='brand' fontSize='sm' fontWeight='700'>
					Liste Clients
				</Button>
										</Td>
</Tr>
				))}

				</Tbody>
				</Table>
			</Box>
		</Card>
		
		
		)}	
		</>	
	);

} 