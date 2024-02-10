import { Box, SimpleGrid } from '@chakra-ui/react';
import ATTENTETable from 'components/ticket/ATTENTETable';
import FERMETable from 'components/ticket/FERMETable';
import IDENTIFICATIONTable from 'components/ticket/IDENTIFICATIONTable';


import tableDataComplex from 'components/ticket/tableDataComplex';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllticketsPerContact } from 'state/user/ticket_Slice';

export default function Settings() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(AllticketsPerContact(localStorage.getItem("user")) as any)
		  .unwrap()
		  .then((res: any) => {
			console.log(res);
		  })
		  .catch((error: Error) => console.log(error));
	  }, [dispatch]);
	
	  const { status, record } = useSelector(
		(state: any) => state.AllticketsPerContactExport
	  );
	  console.log(
		"liste tickets",
		record,
		status
	  );
		console.log(
			record.filter(
			(a: any) => a.statusTicket === "IDENTIFICATION"
		  ))


	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 1, md: 3 }} spacing={{ base: '20px', xl: '20px' }}>
				<ATTENTETable tableData={record.filter((a: any) => a.statusTicket === "ATTENTE")} status={status}/>
				<IDENTIFICATIONTable tableData={record.filter((a: any) => a.statusTicket === "IDENTIFICATION")}  status={status}/>
				<FERMETable tableData={record.filter((a: any) => a.statusTicket === "FERME_ECHEC" )}  status={status}/>
			</SimpleGrid>
		</Box>
	);
}
