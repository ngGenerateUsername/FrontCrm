import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Box,
	Flex,
	Image,
	Text,
	Divider,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	Link,
	Heading,
	Avatar,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useToast,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerOverlay,

	DrawerCloseButton,
	useDisclosure,
  } from "@chakra-ui/react";
  import React, { useEffect, useState, useRef } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useHistory, useLocation, useParams } from "react-router-dom";
  import { fetchSingleClient } from "state/user/Client_Slice";
  import { DetailsContrat } from "state/user/Contrat_Slice";
  import { fetchSingleUserEntreprise } from "state/user/Entreprise_Slice";
  import {
	DeleteIcon,
	EditIcon,
	EmailIcon,
	DownloadIcon,
  } from "@chakra-ui/icons";
  import { fetchSingleUser, fetchSingleUser2 } from "state/user/Users_Slice";
  import { FaLink } from "react-icons/fa";

  import { UploadFile } from "state/user/Upload_Slice";
  import {
	AddFile,
	FilesForContrat,
	deleteFile,
  } from "state/user/File_Slice";
  import { SendMailContrat } from "state/user/Mailer_Slice";
import { DeleteOffre, OffreDetailsThunk } from "state/Offre/OffreSlices";
import OverviewOffre from "./addOffre";
import OverviewOffreEdit from "./EditOffre";
import { DateDisplay } from "helpers/DateDisplay";
  
  function formatFileSize(fileSize: number): string {
	const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
	return `${sizeInMB} MB`;
  }
  
  const CustomAlertDialog = ({
	isOpenMail,
	leastDestructiveRef,
	onCloseMail,
	handleConfirmMail,
  }: any) => {
	return (
	  <AlertDialog
		isOpen={isOpenMail}
		leastDestructiveRef={leastDestructiveRef}
		onClose={onCloseMail}
	  >
		<AlertDialogOverlay>
		  <AlertDialogContent>
			<AlertDialogHeader fontSize="lg" fontWeight="bold">
			  Confirmation d'envoi du mail
			</AlertDialogHeader>
			<AlertDialogBody>
			  Êtes-vous sûr de vouloir envoyer un e-mail ?
			</AlertDialogBody>
			<AlertDialogFooter>
			  <Button ref={leastDestructiveRef} onClick={onCloseMail}>
				Annuler
			  </Button>
			  <Button colorScheme="teal" onClick={handleConfirmMail} ml={3}>
				Envoyer
			  </Button>
			</AlertDialogFooter>
		  </AlertDialogContent>
		</AlertDialogOverlay>
	  </AlertDialog>
	);
  };
  
  const OffreDetails = () => {
	const [isOpenD, setIsOpenD] = useState(false);
	const onCloseD = () => setIsOpenD(false);
	const [isOpenMail, setIsOpenMail] = useState(false);
	const onCloseMail = () => setIsOpenMail(false);
  
	const cancelRef = useRef();
	const location = useLocation();

	const dispatch = useDispatch();
	const [isMailSent, setIsMailSent] = useState(false);
	let history = useHistory();
	const searchParams = new URLSearchParams(location.search);
	const id = searchParams.get('id');
	useEffect(() => {
	  dispatch(OffreDetailsThunk(id) as any )
		
		// .unwrap()
		// .then((res: any) => {
		//   dispatch(fetchSingleClient(res.idClient) as any);
		//   dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
		//   dispatch(fetchSingleUser(res.idCommercial) as any);
		//   dispatch(fetchSingleUser2(res.idSignataire) as any);
		//   console.log(res);
		// })
		// .catch((error: Error) => console.log(error));
	}, [dispatch]);
	const {  status,record } = useSelector((state: any) => state.OffreDetailsExport);
	const [offreDetails,setOffreDetails]=useState<any>({})
	useEffect(()=>{
		setOffreDetails(record);
	},[record])
	

	

  
	const toast = useToast();
  
	const handleDeleteOffre = () => {
	  dispatch(DeleteOffre(id) as any)
		.unwrap()
		.then(() => {
		  setIsOpenD(false);
		  toast({
			title: "offre supprimé",
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top',
		  })
		  history.push("/commercial/list-offre");
		 
		})
		.catch((error: Error) => {
			toast({
				title: "server error",
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			  })
		});
	};
  
	

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	
	return (
	  <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
		<Tabs bg="white" borderRadius="md" boxShadow="md" p="5" variant="enclosed" colorScheme='blue' isFitted >
		  
  
		  <TabPanels>
			<TabPanel>
				{offreDetails && 
				  <Box p={4} borderWidth={1} borderRadius="md">
				  <Flex alignItems="center">
					<Box mr={4} w={12} h={14}>
					  <Image
						src={require("assets/img/avatars/offre.png")}
						bg="transparent"
					  />
					</Box>
					<Flex direction="column">
					  <Text color="blue.500" fontWeight="bold" fontSize="xl">
						Offre n° {offreDetails.idOffre}
					  </Text>
					  <Text><strong>Titre: </strong>{offreDetails?.title}</Text>
				  
					  <Text >
					   <strong> Montant TVA:</strong><span style={{ marginLeft: '10px'  ,fontStyle: 'italic',color:' #007bff',fontFamily: 'Arial, sans-serif'}}>{offreDetails.tvaMontant?.toFixed(3)} DT</span>
					   
					  </Text>
					  <Text>
						<strong >Totale HT: </strong> <span style={{ marginLeft: '10px' ,fontStyle: 'italic',color:' #007bff',fontFamily: 'Arial, sans-serif' }}>{offreDetails.totaleHT?.toFixed(3)} DT</span>
					   
					  </Text>
					  <Text>
						<strong>Totale TTC:</strong ><span style={{ marginLeft: '10px' ,fontStyle: 'italic',color:' #007bff' ,fontFamily: 'Arial, sans-serif'}}>{offreDetails.totaleHTTC?.toFixed(3)} DT</span>
					   
					  </Text>
					</Flex>
				  </Flex>
				  <Divider m="2" />
				  <Text>
					<strong>Date du l'offre:  </strong> <DateDisplay dateTimeString={offreDetails.createdAt} /> 
				  </Text>
				  <Divider m="2" />
				  
	  
				  <Table>
					<Thead>
					  <Tr bg="gray.300">
						<Th >PRODUIT</Th>
						<Th>Quantité</Th>
						<Th>Remise (%)</Th>
						<Th>Totale HT (DT)</Th>
						<Th>Totale TTC (DT)</Th>
					  </Tr>
					</Thead>
					<Tbody>
				   {offreDetails ?  offreDetails?.ligneOffres?.map((prod: any) =>(
							  <Tr>
							  <Td >
								{prod.produit.nom}
							  </Td>
							  <Td>
							  {prod.qte}
							  </Td>
							  <Td>
							  {prod.remise} %
							  </Td>
							  <Td >
							  {prod.prixHT.toFixed(3)} 
							  </Td>
							  <Td >
							  {prod.prixTTC.toFixed(3)}
							  </Td>
							</Tr>
				   )):<></>} 
					  
					</Tbody>
				  </Table>
				  <Divider mt="2" mb="10" />
				  <Flex justifyContent="flex-end">
					<Button
					  leftIcon={<DeleteIcon />}
					  colorScheme="red"
					  mr={2}
					  bg="brand.900"
					  color="white"
					  borderRadius="md"
					  _hover={{ bg: "red.600" }}
					  onClick={() => setIsOpenD(true)}
					>
					  Supprimer
					</Button>
					<AlertDialog
					  isOpen={isOpenD}
					  leastDestructiveRef={cancelRef}
					  onClose={onCloseD}
					>
					  <AlertDialogOverlay>
						<AlertDialogContent>
						  <AlertDialogHeader fontSize="lg" fontWeight="bold">
							Supprimer L'offre "{record.title}"
						  </AlertDialogHeader>
	
						  <AlertDialogBody>
							Êtes-vous sûr de vouloir supprimer cette offre ?
						  </AlertDialogBody>
	
						  <AlertDialogFooter>
							<Button ref={cancelRef} onClick={onCloseD}>
							  Annuler
							</Button>
							<Button
							  colorScheme="red"
							  onClick={handleDeleteOffre}
							  ml={3}
							>
							  Supprimer
							</Button>
						  </AlertDialogFooter>
						</AlertDialogContent>
					  </AlertDialogOverlay>
					</AlertDialog>
	
					<Button
					  leftIcon={<EditIcon />}
					  colorScheme="blue"
					  mr={2}
					  bg="brand.900"
					  color="white"
					  borderRadius="md"
					  _hover={{ bg: "blue.600" }}
					  onClick={onOpen}
					>
					  Modifier
					</Button>
				
					<CustomAlertDialog
					  isOpenMail={isOpenMail}
					  leastDestructiveRef={cancelRef}
					  onCloseMail={() => setIsOpenMail(false)}
				  
					/>
				  </Flex>
				</Box>
				}
			
			</TabPanel>

		  </TabPanels>
		</Tabs>


		<Drawer
              size="xl"
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}

              >
                <DrawerOverlay />
                <Box  >
                <DrawerContent  >
                  <DrawerCloseButton />
                  <DrawerHeader>Modifier Offre</DrawerHeader>
                  <DrawerBody>

                  <OverviewOffreEdit onClose={onClose} offreDetails={offreDetails} setOffreDetails={setOffreDetails}></OverviewOffreEdit>
                  </DrawerBody>
                  {/* <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Retour
                    </Button>
                    <Button colorScheme="brand">Enregistrer</Button>
                  </DrawerFooter> */}
                </DrawerContent>
                </Box>
              </Drawer>

	  </Box>
	);
  };

  export default OffreDetails;
  