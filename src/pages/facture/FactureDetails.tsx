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
	Center,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { fetchSingleClient } from "state/user/Client_Slice";
import { DetailsContrat } from "state/user/Contrat_Slice";
import { fetchSingleUserEntreprise } from "state/user/Entreprise_Slice";
import { PDFViewer } from '@react-pdf/renderer';
import {
	DeleteIcon,
	EditIcon,
	EmailIcon,
	DownloadIcon,
	AttachmentIcon,
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

import { DateDisplay } from "helpers/DateDisplay";
import { DeleteFacture, FactureDetailsThunk } from "state/Facture/FactureSlices";


import { DeleteDevis, DetailDevis } from "state/devis/devis_Slice";
import Invoice from "pages/Invoice/Invoice";
import { Dialog } from "primereact/dialog";



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

const DevisDetails = () => {
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
	const [facture, setFacture] = useState(null);
	const [offres, setOffres] = useState([]);
	const [offresDeFacture, setOffresDeFacture] = useState<any>([]);

	const [factureDetails, setFactureDetails] = useState<any>({})

	useEffect(() => {
		dispatch(FactureDetailsThunk(id) as any)

			.unwrap()
			.then((res: any) => {
				setFacture(res);
				console.log("res ", res)
				dispatch(fetchSingleClient(res.idClient) as any);

				const offrePromises = res.lignes.map((offre: any) =>
					dispatch(OffreDetailsThunk(offre.idOffre) as any));
				Promise.all(offrePromises)
					.then((offresData) => {
						setOffres(offresData);

					})
					.catch((error) => {
						console.error('Error fetching offre details:', error);
					})
			})
			.catch((error: any) => {
				console.error('Error fetching devis:', error);
			});
	}, [id])



	useEffect(() => {
		setFactureDetails(facture);
		if (facture) {
			dispatch(fetchSingleClient(facture.idClient) as any);
		}



	}, [facture]);
	const { status: clientStatus, record: client, error } = useSelector((state: any) => state.fetchSingleClientExport);
	console.log("clinet........", client)
	useEffect(() => {
		setOffresDeFacture(offres);
		console.log("ffffffffffff", offres)
	}, [offres]);




	const toast = useToast();

	const handleDeleteFacture = () => {
		dispatch(DeleteFacture(id) as any)
			.unwrap()
			.then(() => {
				setIsOpenD(false);
				toast({
					title: "Devis supprimé",
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'top',
				})
				history.push("/commercial/list-facture");

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



	//*************************************************** Facture PDF **************************************
	const [visible, setVisible] = useState(false);
	const [invoiceData, setInvoiceData] = useState(
		{
			devis:false,
			company: {
				name: 'BI DATA CONSULTING TUNISIE',
				address: 'Centre d innovation, Ras Jebal, TUN',
				phone: '+216 29 789 962',
				email:'contact@bidata-consulting.tn'
			},
			client: {
				name: client.nomEntreprise,
				address: client.adresse,
				email: client.mail,
				phone: client.numTel,
			},
			invoiceNumber: '',
			invoiceTitle: '',
			date: '',
			offres:[],
			
			totalHT: 240,
			TVA: 200, 
			remise: 260, 
			timbre: 1, 
			totalTTC:500,
			devise:""
		}
	)

	useEffect(() => {
		const date = new Date(factureDetails?.created_at).toLocaleDateString()
		setInvoiceData((prevInvoiceData) => ({
			...prevInvoiceData,
			client: {
				name: client.nomEntreprise,
				address: client.adresse,
				email: client.mail,
				phone: client.numTel,
			},
			invoiceNumber: factureDetails?.id,
			invoiceTitle: factureDetails?.title,
			date: date,
			offres:offresDeFacture,
			titreFacture:factureDetails?.title,
			totalHT: factureDetails?.montantTotalHT,
			TVA: factureDetails?.montantTotalHTTC-factureDetails?.montantTotalHT-1, 
			timbre: 1, 
			totalTTC:factureDetails?.montantTotalHTTC,
			devise : offresDeFacture[0]?.payload?.ligneOffres[0].produit.typeDevis
		}
		
		));
		console.log("ofresss ",offresDeFacture)
	}, [offresDeFacture]);

	//*************************************************** End Facture PDF **************************************

	return (
		<Box pt={{ base: "180px", md: "80px", xl: "80px" }}>

			<Dialog blockScroll header="PDF Viewer" visible={visible}   onHide={() => setVisible(false)}>
				<Flex justifyContent='center'>
					<PDFViewer width={700} height={500}  >
						<Invoice invoice={invoiceData} />
					</PDFViewer>
				</Flex>

			</Dialog>




			<Tabs bg="white" borderRadius="md" boxShadow="md" p="5" variant="enclosed" colorScheme='blue' isFitted >
				<Flex justifyContent="flex-end">
					<Button
						leftIcon={<AttachmentIcon />}
						colorScheme="red"
						mr={2}
						bg="brand.900"
						color="white"
						borderRadius="md"
						_hover={{ bg: "red.600" }}
						onClick={() => setVisible(true)} >show pdf
					</Button>
				</Flex>
				<TabPanels>
					<TabPanel>
						{factureDetails &&
							<Box p={4} borderWidth={1} borderRadius="md">
								<Flex alignItems="center">
									<Box mr={4} w={16} h={14}>
										<Image
											src={require("assets/img/avatars/facture.png")}
											bg="transparent"
										/>
									</Box>
									<Flex direction="column">
										<Text color="blue.500" fontWeight="bold" fontSize="xl">
											Facture n° {factureDetails.id}
										</Text>
										<Text><strong>Titre: </strong>{factureDetails?.title}</Text>

										<Text >
											<strong> Client:</strong><span style={{ marginLeft: '10px', fontStyle: 'italic', color: ' #007bff', fontFamily: 'Arial, sans-serif' }}>{client.nomEntreprise}</span>

										</Text>
										<Text>
											<strong >Totale HT: </strong> <span style={{ marginLeft: '10px', fontStyle: 'italic', color: ' #007bff', fontFamily: 'Arial, sans-serif' }}>{factureDetails.montantTotalHT?.toFixed(3)}  {offresDeFacture[0]?.payload?.ligneOffres[0].produit.typeDevis}</span>

										</Text>
										<Text>
											<strong>Totale TTC:</strong ><span style={{ marginLeft: '10px', fontStyle: 'italic', color: ' #007bff', fontFamily: 'Arial, sans-serif' }}>{factureDetails.montantTotalHTTC?.toFixed(3)} {offresDeFacture[0]?.payload?.ligneOffres[0].produit.typeDevis}</span>

										</Text>
									</Flex>
								</Flex>
								<Divider m="2" />
								<Text>
									<strong>Date :  </strong> <DateDisplay dateTimeString={factureDetails.created_at} />
								</Text>
								<Divider m="2" />
								{offresDeFacture ? offresDeFacture.map((offre: any) => (
									<div key={offre?.payload?.idOffre} style={{ margin: "20px" }}>
										<Flex justify={"space-between"}>

											<Text color="blue.500" fontWeight="bold" fontSize="l">
												Offre n° {offre?.payload?.idOffre} : <span style={{ color: 'black' }}>{offre?.payload?.title} </span>
											</Text>
											<Text color="black.500" fontWeight="bold" fontSize="l">

												<DateDisplay dateTimeString={offre?.payload?.createdAt} />
											</Text>

										</Flex>


										<Table variant="facebook">
											<Thead>
												<Tr bg="gray.300">
													<Th >PRODUIT</Th>
													<Th>Quantité</Th>
													<Th>Remise (%)</Th>
													<Th>Totale HT ({offresDeFacture[0]?.payload?.ligneOffres[0].produit.typeDevis})</Th>
													<Th>Totale TTC ({offresDeFacture[0]?.payload?.ligneOffres[0].produit.typeDevis})</Th>
												</Tr>
											</Thead>

											<Tbody>
												{offre?.payload.ligneOffres?.map((prod: any) => (
													<Tr >
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

												))}
												<Tr  >
													<Td></Td>
													<Td></Td>

													<Td><strong>TOTAL</strong></Td>

													<Td><strong>{offre.payload.totaleHT?.toFixed(3)}</strong>  </Td>
													<Td><strong>{offre.payload.totaleHTTC?.toFixed(3)}</strong> </Td>

												</Tr>

											</Tbody>
										</Table>
									</div>
								)) : <></>}
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
													Supprimer L'Facture
												</AlertDialogHeader>

												<AlertDialogBody>
													Êtes-vous sûr de vouloir supprimer cette Facture ?
												</AlertDialogBody>

												<AlertDialogFooter>
													<Button ref={cancelRef} onClick={onCloseD}>
														Annuler
													</Button>
													<Button
														colorScheme="red"
														onClick={handleDeleteFacture}
														ml={3}
													>
														Supprimer
													</Button>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialogOverlay>
									</AlertDialog>



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



		</Box>
	);
};

export default DevisDetails;
