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
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
import FileInput from "./FilesContrat";
import { UploadFile } from "state/user/Upload_Slice";
import {
  AddFile,
  FilesForContrat,
  deleteFile,
} from "state/user/File_Slice";
import { SendMailContrat } from "state/user/Mailer_Slice";

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

const Contrat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [isOpenMail, setIsOpenMail] = useState(false);
  const onCloseMail = () => setIsOpenMail(false);

  const cancelRef = useRef();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [isMailSent, setIsMailSent] = useState(false);
  let history = useHistory();
  useEffect(() => {
    dispatch(DetailsContrat(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser(res.idCommercial) as any);
        dispatch(fetchSingleUser2(res.idSignataire) as any);
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusContrats, record: recordContrats } =
    useSelector((state: any) => state.DetailsContratExport) || {};
  console.log("Contrats", recordContrats, statusContrats);

  const { status: statusClient, record: recordClient } =
    useSelector((state: any) => state.fetchSingleClientExport) || {};
  console.log("Client", recordClient, statusClient);

  const { status: statusEntreprise, record: recordEntreprise } =
    useSelector((state: any) => state.fetchSingleUserEntrepriseExport) || {};
  console.log("Entreprise", recordEntreprise, statusEntreprise);

  const { status: statusSignataire, record: recordSignataire } =
    useSelector((state: any) => state.fetchSingleUserExport2) || {};
  console.log("Signataire", recordSignataire, statusSignataire);

  const { status: statusCommercial, record: recordCommercial } =
    useSelector((state: any) => state.fetchSingleUserExport) || {};
  console.log("Commercial", recordCommercial, statusCommercial);

  const handleLinkClick = () => {
    const url = `/profile/profile-contact?id=${recordContrats.idCommercial}`;
    history.push(url);
  };

  const handleLink2Click = () => {
    const url = `/profile/profile-contact?id=${recordContrats.idSignataire}`;
    history.push(url);
  };
  const [selectedFiles, setSelectedFiles] = useState(null);
  const handleFilesSelected = (selectedFiles: any) => {
    setSelectedFiles(selectedFiles);
  };
  useEffect(() => {
    dispatch(FilesForContrat(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(deleteFile(res.idFile) as any);
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusFilesForContrat, record: recordFilesForContrat } =
    useSelector((state: any) => state.FilesForContratExport) || {};
  console.log("FilesForContrat", recordFilesForContrat, statusFilesForContrat);

  const { status: statusdeleteFile, record: recorddeleteFile } =
    useSelector((state: any) => state.deleteFileExport) || {};
  console.log("deleteFile", recorddeleteFile, statusdeleteFile);
  const pdfupload = async () => {
    if (selectedFiles.length === 0) {
      alert("Veuillez sélectionner au moins un fichier PDF d'abord !");
    } else {
      selectedFiles.forEach(async (file: any) => {
        const formData = new FormData();
        formData.append("dataFile", file);

        try {
          const res = await dispatch(UploadFile(formData) as any);
          await dispatch(
            AddFile({
              idContrat: recordContrats.idContrat,
              nom: res.payload.file.filename,
              taille: res.payload.file.size,
              dateAjout: new Date(),
            }) as any
          );
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  const handleFilesSubmit = () => {
    pdfupload();
    window.location.reload();
  };

  const handleDeleteFile = (fileId: any) => {
    dispatch(deleteFile(fileId) as any)
      .unwrap()
      .then(() => {
        setIsOpen(false);
        window.location.reload();
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  const handleSendMail = () => {
    setIsOpen(true);
  };

  const handleConfirmMail = () => {
    setIsOpenMail(false);

    dispatch(
      SendMailContrat({
        data: recordSignataire,
        data2: recordContrats.opportunite,
        data3: recordContrats,
        data4: recordEntreprise,
        data5: recordCommercial,
      }) as any
    )
      .unwrap()
      .then(() => {
        setIsMailSent(true);
        console.log("E-mail sent successfully");
      })
      .catch((error: Error) => {
        console.error("Failed to send e-mail:", error);
      });
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Tabs bg="white" borderRadius="md" boxShadow="md" p="5" variant="enclosed" colorScheme='blue' isFitted >
        <TabList>
          <Tab>Fiche Contrat</Tab>
          <Tab>Contact/Adresses</Tab>
          <Tab>Notes</Tab>
          <Tab>
            Fichiers Joints
            <Box
              bg="gray.500"
              borderRadius="full"
              w="20px"
              h="20px"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              ml="2"
            >
              <Text color="white" fontSize="xs">
                {recordFilesForContrat.length}
              </Text>
            </Box>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box p={4} borderWidth={1} borderRadius="md">
              <Flex alignItems="center">
                <Box mr={4} w={10} h={10}>
                  <Image
                    src={require("assets/img/avatars/Contrat.png")}
                    bg="transparent"
                  />
                </Box>
                <Flex direction="column">
                  <Text color="blue.500" fontWeight="bold" fontSize="xl">
                    Contrat n° {recordContrats.idContrat}
                  </Text>
                  <Text>Client: {recordClient.nomEntreprise}</Text>
                  <Text>
                    <Text>
                      Fournisseur:{" "}
                      <Image
                        src={require("assets/img/avatars/company.png")}
                        display="inline-block"
                        boxSize={4}
                        mr={2}
                      />
                      {recordEntreprise.nomEntreprise}
                    </Text>
                  </Text>
                  <Text>
                    Projet:{" "}
                    {recordContrats.opportunite &&
                      recordContrats.opportunite.titre}
                  </Text>
                </Flex>
              </Flex>
              <Divider m="2" />
              <Text>
                <strong>Date du contrat:</strong> {recordContrats.dateSignature}
              </Text>
              <Divider m="2" />
              <Text>
                <strong>Statut du contrat:</strong>{" "}
                {recordContrats.statusContrat}
              </Text>
              <Divider mt="2" mb="10" />
              <Table>
                <Thead>
                  <Tr bg="gray.300">
                    <Th width="66.67%">SERVICE</Th>
                    <Th>Revenu espéré</Th>
                    <Th>Pourcentage</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td width="66.67%">
                      <Image
                        src={require("assets/img/avatars/bell.png")}
                        display="inline-block"
                        boxSize={4}
                        mr={2}
                      />{" "}
                      {recordContrats.opportunite &&
                        recordContrats.opportunite.titre}
                    </Td>
                    <Td>
                      {recordContrats.opportunite &&
                        recordContrats.opportunite.revenuespere}{" "}
                      €
                    </Td>
                    <Td>
                      {recordContrats.opportunite &&
                        recordContrats.opportunite.pourcentage}{" "}
                      %
                    </Td>
                  </Tr>
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
                  onClick={() => setIsOpen(true)}
                >
                  Supprimer
                </Button>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer le fichier
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Êtes-vous sûr de vouloir supprimer ce fichier ?
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Annuler
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={handleDeleteFile}
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
                >
                  Modifier
                </Button>
                <Button
                  leftIcon={<EmailIcon />}
                  colorScheme="teal"
                  bg="brand.900"
                  color="white"
                  borderRadius="md"
                  _hover={{ bg: "teal.600" }}
                  onClick={() => setIsOpenMail(true)}
                >
                  Envoyer mail
                </Button>
                <CustomAlertDialog
                  isOpenMail={isOpenMail}
                  leastDestructiveRef={cancelRef}
                  onCloseMail={() => setIsOpenMail(false)}
                  handleConfirmMail={handleConfirmMail}
                />
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4} borderWidth={1} borderRadius="md" >
              <Flex alignItems="center">
                <Box mr={4} w={10} h={10}>
                  <Image
                    src={require("assets/img/avatars/Contrat.png")}
                    bg="transparent"
                  />
                </Box>
                <Flex direction="column">
                  <Text color="blue.500" fontWeight="bold" fontSize="xl">
                    Contrat n° {recordContrats.idContrat}
                  </Text>
                  <Text>Client: {recordClient.nomEntreprise}</Text>
                  <Text>
                    <Text>
                      Fournisseur:{" "}
                      <Image
                        src={require("assets/img/avatars/company.png")}
                        display="inline-block"
                        boxSize={4}
                        mr={2}
                      />
                      {recordEntreprise.nomEntreprise}
                    </Text>
                  </Text>
                  <Text>
                    Projet:{" "}
                    {recordContrats.opportunite &&
                      recordContrats.opportunite.titre}
                  </Text>
                </Flex>
              </Flex>
              <Divider m="2" />
              <Text>
                <strong>Date du contrat:</strong> {recordContrats.dateSignature}
              </Text>
              <Divider m="2" />
              <Text>
                <strong>Statut du contrat:</strong>{" "}
                {recordContrats.statusContrat}
              </Text>
              <Divider mt="2" mb="10" />
              <Table>
                <Thead>
                  <Tr bg="gray.300">
                    <Th>Entreprise</Th>
                    <Th>Contact</Th>
                    <Th>Type Contact</Th>
                    <Th>état</Th>
                    <Th>lien</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{recordEntreprise.nomEntreprise}</Td>
                    <Td>
                      <Image
                        src={require("assets/img/avatars/user.png")}
                        display="inline-block"
                        boxSize={4}
                        mr={2}
                      />{" "}
                      {recordCommercial.nom} {recordCommercial.prenom}
                    </Td>
                    <Td>Commercial suivi Contrat</Td>
                    <Td>
                      <span
                        style={{
                          display: "inline-block",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "green",
                        }}
                      ></span>
                    </Td>
                    <Td>
                      {" "}
                      <Link onClick={handleLinkClick} display="inline-block">
                        <FaLink size={20} />
                      </Link>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>{recordClient.nomEntreprise}</Td>
                    <Td>
                      {statusSignataire == "succeeded" && (
                        <>
                          <Avatar
                            src={require("assets/img/avatars/" +
                              recordSignataire.image)}
                            display="inline-block"
                            boxSize={4}
                            mr={2}
                          />
                        </>
                      )}{" "}
                      {recordSignataire.nom} {recordSignataire.prenom}
                    </Td>
                    <Td>Commercial Signataire du Contrat</Td>
                    <Td>
                      <span
                        style={{
                          display: "inline-block",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "green",
                        }}
                      ></span>
                    </Td>
                    <Td>
                      {" "}
                      <Link onClick={handleLink2Click} display="inline-block">
                        <FaLink size={20} />
                      </Link>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Divider mt="2" mb="10" />
            </Box>
            {/* Ajoutez ici le contenu des contacts/adresses */}
          </TabPanel>
          <TabPanel>
            <h2>Contenu des notes</h2>
            <Box p={4} borderWidth={1} borderRadius="md" >
              <Flex alignItems="center">
                <Box mr={4} w={10} h={10}>
                  <Image
                    src={require("assets/img/avatars/Contrat.png")}
                    bg="transparent"
                  />
                </Box>
                <Flex direction="column">
                  <Text color="blue.500" fontWeight="bold" fontSize="xl">
                    Contrat n° {recordContrats.idContrat}
                  </Text>
                  <Text>Client: {recordClient.nomEntreprise}</Text>
                  <Text>
                    <Text>
                      Fournisseur:{" "}
                      <Image
                        src={require("assets/img/avatars/company.png")}
                        display="inline-block"
                        boxSize={4}
                        mr={2}
                      />
                      {recordEntreprise.nomEntreprise}
                    </Text>
                  </Text>
                  <Text>
                    Projet:{" "}
                    {recordContrats.opportunite &&
                      recordContrats.opportunite.titre}
                  </Text>
                </Flex>
              </Flex>

              <Divider mt="2" mb="10" />
              <Table>
                <Thead>
                  <Tr bg="gray.300">
                    <Th>Notes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td> {recordContrats.notes}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Divider mt="2" mb="10" />
              <Flex justifyContent="flex-end">
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="blue"
                  mr={2}
                  bg="brand.900"
                  color="white"
                  borderRadius="md"
                  _hover={{ bg: "blue.600" }}
                >
                  Modifier
                </Button>
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4} borderWidth={1} borderRadius="md">
              <Flex alignItems="center">
                <Box mr={4} w={10} h={10}>
                  <Image
                    src={require("assets/img/avatars/Contrat.png")}
                    bg="transparent"
                  />
                </Box>
                <Flex direction="column">
                  <Text color="blue.500" fontWeight="bold" fontSize="xl">
                    Contrat n° {recordContrats.idContrat}
                  </Text>
                  <Text>Client: {recordClient.nomEntreprise}</Text>
                  <Text>
                    <Text>
                      Fournisseur:{" "}
                      <Image
                        src={require("assets/img/avatars/company.png")}
                        display="inline-block"
                        boxSize={4}
                        mr={2}
                      />
                      {recordEntreprise.nomEntreprise}
                    </Text>
                  </Text>
                  <Text>
                    Projet:{" "}
                    {recordContrats.opportunite &&
                      recordContrats.opportunite.titre}
                  </Text>
                </Flex>
              </Flex>
              <Divider m="2" />
              <Text>
                <strong>Nombre de fichiers/documents liés:</strong>{" "}
                {recordFilesForContrat.length}
              </Text>

              <Divider mt="2" mb="10" />
              <Heading as="h4" size="md" color="blue.500" mb="5">
                Ajouter un nouveau fichier/document
              </Heading>
              <FileInput
                onFilesSelected={handleFilesSelected}
                onFilesSubmit={handleFilesSubmit}
              />
              <Divider mt="2" mb="5" />
              <Heading as="h4" size="md" color="blue.500" mb="5">
                fichiers/documents joints
              </Heading>
              <Table>
                <Thead>
                  <Tr bg="gray.300">
                    <Th width="50%">Documents</Th>
                    <Th>Taille</Th>
                    <Th>Date</Th>
                    <Th width="5%"></Th>
                    <Th width="5%"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recordFilesForContrat.map((record: any) => (
                    <Tr key={record.id}>
                      <Td>
                        <Flex alignItems="center">
                          <Image
                            src={require("assets/img/avatars/pdf.png")}
                            alt="PDF Logo Colored"
                            boxSize={6}
                            mr="2"
                          />{" "}
                          {record.nom}
                        </Flex>
                      </Td>
                      <Td>
                        <Text fontSize="md">
                          {" "}
                          {formatFileSize(record.taille)}
                        </Text>
                      </Td>
                      <Td>{record.dateAjout}</Td>
                      <Td>
                        <Button
                          as={Link}
                          href={`http://localhost:3001/download/${record.nom}`}
                          colorScheme="blue"
                          leftIcon={<DownloadIcon />}
                          size="sm"
                        >
                          Téléchager
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          leftIcon={<DeleteIcon />}
                          size="sm"
                          onClick={() => setIsOpen(true)}
                        >
                          Supprimer
                        </Button>
                        <AlertDialog
                          isOpen={isOpen}
                          leastDestructiveRef={cancelRef}
                          onClose={onClose}
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                Supprimer le fichier
                              </AlertDialogHeader>

                              <AlertDialogBody>
                                Êtes-vous sûr de vouloir supprimer ce fichier ?
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                  Annuler
                                </Button>
                                <Button
                                  colorScheme="red"
                                  onClick={() =>
                                    handleDeleteFile(record.idFile)
                                  }
                                  ml={3}
                                >
                                  Supprimer
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Contrat;
