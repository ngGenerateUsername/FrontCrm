import React from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightAddon,
  Spacer,
  Stack,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  Modal,
  Input,
  GridItem,
  Select,
  Textarea,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Avatar,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import { HSeparator } from "components/separator/Separator";
import ActiviteModal from "./addActivity";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddOpportunite, AllOpportunites } from "state/user/Oportunity_Slice";
import { fetchSingleUser, fetchSingleUser2 } from "state/user/Users_Slice";
// Assets
import { ChevronRightIcon, TimeIcon } from "@chakra-ui/icons";
import {
  CLientsOfMyEntreprise,
  MyContacts,
} from "state/user/RelationClientUser_Slice";
import {
  CommerciauxPerEntreprise,
  entreprisePerContact,
} from "state/user/Role_Slice";
import { fetchSingleClient } from "state/user/Client_Slice";
export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [value, setValue] = useState("");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllOpportunites() as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status, record } = useSelector(
    (state: any) => state.AllOpportunitesExport
  );
  console.log(record, status);

  const [titre, setTitre] = useState("");
  const [revenuespere, setRevenuespere] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [prioriteOpportunite, setPrioriteOpportunite] = useState("");
  const [notes, setNotes] = useState("");
  const [pourcentage, setPourcentage] = useState("");
  const [postes, setPostes] = useState("");
  const [mobileContact, setMobileContact] = useState("");
  const [date, setDate] = useState("");
  const [SelectCommercial, setSelectCommercial] = useState("");
  const [SelectClientEntreprise, setSelectClientEntreprise] = useState("");
  const [SelectContactClient, setSelectContactClient] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [selectedClientId, setSelectedClientId] = useState("");

  useEffect(() => {
    dispatch(CLientsOfMyEntreprise(localStorage.getItem("user")) as any)
      .unwrap()
      .then(() => {})
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    dispatch(entreprisePerContact(localStorage.getItem("user")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(CommerciauxPerEntreprise(res.idUser) as any)
          .unwrap()
          .then((res: any) => {
            console.log(res);
          });
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    dispatch(MyContacts(params.get("id")) as any).catch((error: Error) =>
      console.log(error)
    );
  }, [dispatch]);

  const {
    status: statusentreprisePerContact,
    record: recordentreprisePerContact,
  } = useSelector((state: any) => state.entreprisePerContactExport);
  console.log(recordentreprisePerContact, statusentreprisePerContact);
  const {
    status: statuscontactsPerEntreprise,
    record: recordcontactsPerEntreprise,
  } = useSelector((state: any) => state.CommerciauxPerEntrepriseExport);

  console.log(
    "liste commerciaux",
    recordcontactsPerEntreprise,
    statuscontactsPerEntreprise
  );

  const {
    status: statusclientsPerEntreprise,
    record: recordclientsPerEntreprise,
  } = useSelector((state: any) => state.CLientsOfMyEntrepriseExport);

  console.log(
    "liste commerciaux",
    recordclientsPerEntreprise,
    statusclientsPerEntreprise
  );

  const [selectedClient, setSelectedClient] = useState("");
  const [showContacts, setShowContacts] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [selectedCommercialId, setSelectedCommercialId] = useState("");

  useEffect(() => {
    if (selectedClient) {
      dispatch(MyContacts(selectedClient) as any).catch((error: Error) =>
        console.log(error)
      );
    }
  }, [selectedClient]);

  const handleClientChange = (event: any) => {
    const client = event.currentTarget.value;
    setSelectedClient(client);
    setShowContacts(client !== "0");
  };

  const handleContactChange = (event: any) => {
    const contactId = event.target.value;
    setSelectedContactId(contactId);
    setShowClients(contactId !== "0");
  };
  const handleCommercialChange = (event: any) => {
    const commercialId = event.target.value;
    setSelectedCommercialId(commercialId);
  };

  useEffect(() => {
    if (selectedClientId) {
      dispatch(MyContacts(selectedClientId) as any).catch((error: Error) =>
        console.log(error)
      );
    }
  }, [selectedClientId, dispatch]);
  const { record: recordContacts } = useSelector(
    (state: any) => state.MyContactsExport
  );
  useEffect(() => {
    if (selectedContactId) {
      dispatch(fetchSingleUser(selectedContactId) as any)
        .unwrap()
        .then((res: any) => {})
        .catch((error: Error) => console.log(error));
    }
  }, [selectedContactId, dispatch]);

  useEffect(() => {
    if (selectedCommercialId) {
      dispatch(fetchSingleUser2(selectedCommercialId) as any)
        .unwrap()
        .then((res: any) => {})
        .catch((error: Error) => console.log(error));
    }
  }, [selectedCommercialId, dispatch]);
  const { status: statusCommercialInf, record: recordCommercialInf } =
    useSelector((state: any) => state.fetchSingleUserExport2);
  const { status: statusContactInf, record: recordContactInf } = useSelector(
    (state: any) => state.fetchSingleUserExport
  );
  useEffect(() => {
    if (selectedClient) {
      dispatch(fetchSingleClient(selectedClient) as any)
        .unwrap()
        .then((res: any) => {})
        .catch((error: Error) => console.log(error));
    }
  }, [selectedClient, dispatch]);

  const { status: statusClientDetail, record: recordClientDetail } =
    useSelector((state: any) => state.fetchSingleClientExport);
  console.log("liste clients", statusClientDetail, recordClientDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // Redirige vers la page précédente
    window.history.back();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const AddOpportuniteF = async () => {
    try {
      console.log("test 1");
      await dispatch(
        AddOpportunite({
          titre: titre,
          revenuespere: revenuespere,
          pourcentage: pourcentage,
          telephone: recordClientDetail.numTel,
          email: recordClientDetail.mail,
          notes: notes,
          prioriteOpportunite: prioriteOpportunite,
          nomSocieteContact: recordClientDetail.nomEntreprise,
          nomContact: recordContactInf.prenom + " " + recordContactInf.nom,
          imagecontact: recordContactInf.image,
          nomCommercial:
            recordCommercialInf.prenom + " " + recordCommercialInf.nom,
          nomEntreprise: recordentreprisePerContact.nomEntreprise,
          dateDeFermeturePrevue: date,
          idClient: SelectClientEntreprise,
          idEntreprise: recordentreprisePerContact.idUser,
          idCommercial: selectedCommercialId,
          imageComercial: recordCommercialInf.image,
          idContact: SelectContactClient,
          statusOpportunite: "PISTE",
          idCreateur: localStorage.getItem("user"),
        }) as any
      )
        .then(() => {
          alert("creation opportunité avec succes");
          history.push("/commercial/allopportunite");
        })
        .catch((error: Error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          {/* <Banner /> */}
          <Flex direction="column">
            <Box pt={{ base: "180px", md: "50px", xl: "20px" }} bg="white">
              <Flex>
                <Box>
                  <Flex position="relative" align="center">
                    <Text
                      mt="15px"
                      mb="26px"
                      color={textColor}
                      fontSize="2xl"
                      ms="24px"
                      fontWeight="700"
                      alignContent={"center"}
                    >
                      Pipeline /
                    </Text>

                    <Text
                      mt="15px"
                      mb="26px"
                      color={"grey"}
                      fontSize="2xl"
                      ms="14px"
                      fontWeight="700"
                      alignContent={"center"}
                    >
                      {value}
                    </Text>
                  </Flex>
                  <Stack direction="row" spacing={4} ml="10px" mb="2">
                    <Button variant="darkBrand" onClick={AddOpportuniteF}>
                      SAUVEGARDER
                    </Button>

                    <Button variant="outline" onClick={handleClick}>
                      NE PAS SAUVEGARDER
                    </Button>

                    <Modal isOpen={isModalOpen} onClose={handleCancel}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          Toutes les modifications ne seront pas enregistrées.
                        </ModalHeader>
                        <ModalBody>
                          <p>Êtes-vous sûr de vouloir quitter cette page ?</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="red"
                            mr={3}
                            onClick={handleConfirm}
                          >
                            Confirmer
                          </Button>
                          <Button onClick={handleCancel}>Annuler</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Stack>
                </Box>
                <Spacer />
              </Flex>
              <HSeparator />
              <Flex
                mt="10px"
                ml="10px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
              >
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  px="24px"
                  py="5px"
                >
                  marquer comme gagné
                </Button>
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="70px"
                  marginLeft={"-20%"}
                  px="24px"
                  py="5px"
                >
                  marquer comme perdue
                </Button>

                <Flex
                  align="center"
                  me="20px"
                  ms={{ base: "24px", md: "0px" }}
                  mt={{ base: "20px", md: "0px" }}
                >
                  <Breadcrumb
                    spacing="8px"
                    separator={<ChevronRightIcon color="gray.500" />}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink color={textColorBrand} fontWeight="500">
                        Piste
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink>Potentiel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink>Confirmée</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink>Perdue</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Flex>
              </Flex>
            </Box>
            <Box
              pt={{ base: "180px", md: "50px", xl: "20px" }}
              bg="white"
              mt="10px"
            >
              <Box padding="6" boxShadow="lg" bg="white" m="20px">
                <div>
                  <Text
                    mb="10px"
                    color={textColor}
                    fontSize="xl"
                    fontWeight="700"
                  >
                    Opportunité
                  </Text>
                  <Input
                    name="titre"
                    variant="flushed"
                    onChange={(e) => {
                      setTitre(e.target.value);
                      handleChange(e);
                    }}
                    placeholder="EX. TRAFICATION DES PRODUITS"
                    size="lg"
                    mb={5}
                  />
                </div>
                <div>
                  <Flex
                    position="relative"
                    align="center"
                    w={{ base: "70%", md: "60%" }}
                    mb={2}
                  >
                    <Flex
                      direction="column"
                      w={{ base: "70%", md: "100%" }}
                      me={{
                        base: "4px",
                        md: "32px",
                        xl: "10px",
                        "3xl": "32px",
                      }}
                    >
                      <Text
                        color={textColor}
                        fontSize="xl"
                        fontWeight="700"
                        alignContent={"center"}
                      >
                        Revenu espéré
                      </Text>
                    </Flex>

                    <Flex
                      direction="column"
                      w={{ base: "70%", md: "100%" }}
                      me={{
                        base: "4px",
                        md: "32px",
                        xl: "10px",
                        "3xl": "32px",
                      }}
                    >
                      <Text
                        color={textColor}
                        fontSize="xl"
                        fontWeight="700"
                        alignContent={"center"}
                      >
                        Probabilité
                      </Text>
                    </Flex>
                  </Flex>
                </div>
                <div>
                  <Flex
                    position="relative"
                    align="center"
                    w={{ base: "70%", md: "50%" }}
                    mb={5}
                  >
                    <Flex
                      direction="column"
                      w={{ base: "70%", md: "100%" }}
                      me={{
                        base: "4px",
                        md: "32px",
                        xl: "10px",
                        "3xl": "32px",
                      }}
                    >
                      <InputGroup size="sm">
                        <Input
                          name="revenuespere"
                          type="number"
                          placeholder="Revenu espéré"
                          size="sm"
                          defaultValue={"0,00"}
                          onChange={(e) => setRevenuespere(e.target.value)}
                        />
                        <InputRightAddon children="€" />
                      </InputGroup>
                    </Flex>

                    <Flex
                      direction="column"
                      w={{ base: "70%", md: "10%" }}
                      me={{
                        base: "4px",
                      }}
                    >
                      <Text>à</Text>
                    </Flex>

                    <Flex
                      direction="column"
                      w={{ base: "70%", md: "100%" }}
                      me={{
                        base: "4px",
                        md: "32px",
                        xl: "10px",
                        "3xl": "32px",
                      }}
                    >
                      <InputGroup size="sm">
                        <Input
                          name="pourcentage"
                          onChange={(e) => setPourcentage(e.target.value)}
                          type="number"
                          placeholder="%"
                          defaultValue={"99,76"}
                        />
                        <InputRightAddon children="%" />
                      </InputGroup>
                    </Flex>
                  </Flex>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="20">
                      <Text fontWeight="600">Client</Text>
                    </GridItem>
                    <GridItem w="100%" h="20">
                      <Select
                        name="ss"
                        id="ss"
                        variant="flushed"
                        size="sm"
                        value={selectedClient}
                        onChange={(e) => {
                          handleClientChange(e);
                          setSelectClientEntreprise(e.target.value);
                        }}
                      >
                        <option value="0">--</option>
                        {recordclientsPerEntreprise.map((e: any) => (
                          <option
                            value={e.client.idClient}
                            key={e.client.idClient}
                          >
                            {e.client.nomEntreprise}
                          </option>
                        ))}
                      </Select>
                    </GridItem>
                    <GridItem w="100%" h="20" />
                    <GridItem w="100%" h="20">
                      <Text fontWeight="600">Date de fermeture prévue</Text>
                    </GridItem>
                    <GridItem w="100%" h="20">
                      <Input
                        name="dateDeFermeturePrevue"
                        onChange={(e) => setDate(e.target.value)}
                        placeholder=""
                        type="date"
                        variant="flushed"
                      />
                    </GridItem>
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Email</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Input
                        value={recordClientDetail.mail}
                        name="Email"
                        type="email"
                        placeholder="Email"
                        variant="flushed"
                        size="sm"
                      />
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" fontWeight="600">
                      <Text>Priorité</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Select
                        placeholder="Selectioner la priorité"
                        variant="flushed"
                        size="sm"
                        onChange={(e) => setPrioriteOpportunite(e.target.value)}
                      >
                        <option value="FAIBLE">FAIBLE</option>
                        <option value="MOYEN">MOYEN</option>
                        <option value="ELEVE">ELEVE</option>
                        <option value="TRES_HAUT">TRES_HAUT</option>
                      </Select>
                    </GridItem>
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Téléphone</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Input
                        name="telephone"
                        type="tel"
                        placeholder="téléphone"
                        variant="flushed"
                        size="sm"
                        value={recordClientDetail.numTel}
                      />
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" fontWeight="600">
                      <Text>Société</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text>{recordentreprisePerContact.nomEntreprise}</Text>
                    </GridItem>
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6} mt={10}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Vendeur</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Select
                        variant="flushed"
                        size="sm"
                        name="ss"
                        id="ss"
                        value={selectedCommercialId}
                        onChange={(e) => {
                          setSelectedCommercialId(e.target.value);
                        }}
                      >
                        <option value="0">--</option>
                        {recordcontactsPerEntreprise.map((e: any) => (
                          <option value={e.idUser} key={e.idUser}>
                            {e.nom} {e.prenom}
                          </option>
                        ))}
                      </Select>
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      {showContacts && (
                        <Text fontWeight="600">Contact du Client</Text>
                      )}
                    </GridItem>
                    <GridItem w="100%" h="10">
                      {showContacts && (
                        <Select
                          variant="flushed"
                          size="sm"
                          value={selectedContactId}
                          onChange={(e) => {
                            handleContactChange(e);
                            setSelectContactClient(e.target.value);
                          }}
                        >
                          <option value="0">--</option>
                          {recordContacts.map((contact: any) => (
                            <option value={contact.idUser} key={contact.idUser}>
                              {contact.username}
                            </option>
                          ))}
                        </Select>
                      )}
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                  </Grid>
                </div>
              </Box>

              <Tabs isManual variant="enclosed">
                <TabList>
                  <Tab>Informations supplémentaires</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Accordion allowMultiple>
                      {showContacts && (
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                <strong>Informations du client</strong>{" "}
                                <Avatar
                                  src={require(`assets/img/avatars/company.png`)}
                                  boxSize={5}
                                  ml="4"
                                />
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <Box
                              bg="#f2f2f2"
                              border="1px solid #ccc"
                              borderRadius="5px"
                              p="20px"
                              w="600px"
                            >
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                {statusClientDetail == "succeeded" && (
                                  <>
                                    <Image
                                      src={require(`assets/img/avatars/` +
                                        recordClientDetail.image)}
                                      boxSize={20}
                                      ml="4"
                                    />
                                  </>
                                )}
                              </Flex>
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold" mb="10px">
                                  Nom de l'Entreprise
                                </Text>
                                <Text>
                                  {recordClientDetail.nomEntreprise || "--"}
                                </Text>
                              </Flex>
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">
                                  Domaine d'activités
                                </Text>
                                <Text>
                                  {recordClientDetail.domaine || "--"}
                                </Text>
                              </Flex>
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">Adresse</Text>
                                <Text>
                                  {recordClientDetail.adresse || "--"}
                                </Text>
                              </Flex>
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">Email</Text>
                                <Text>{recordClientDetail.mail || "--"}</Text>
                              </Flex>
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">Mobile</Text>
                                <Text>{recordClientDetail.numTel || "--"}</Text>
                              </Flex>
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">Numéro Fiscale</Text>
                                <Text>
                                  {recordClientDetail.numFiscal || "--"}
                                </Text>
                              </Flex>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem>
                      )}
                      {showClients && (
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                <strong> Informations du contact</strong>{" "}
                                <Avatar
                                  src={require(`assets/img/avatars/user.png`)}
                                  boxSize={5}
                                  ml="4"
                                />
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            <Box
                              bg="#f2f2f2"
                              border="1px solid #ccc"
                              borderRadius="5px"
                              p="20px"
                              w="600px"
                            >
                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                              >
                                {statusContactInf == "succeeded" && (
                                  <>
                                    <Image
                                      src={require(`assets/img/avatars/${recordContactInf.image}`)}
                                      boxSize={10}
                                      borderRadius="md"
                                      mr={{ base: "2", md: "4" }}
                                    />
                                  </>
                                )}
                              </Flex>

                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">Nom du contact</Text>
                                <Text>
                                  {recordContactInf.prenom}{" "}
                                  {recordContactInf.nom}
                                </Text>
                              </Flex>

                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">Adresse</Text>
                                <Text>{recordContactInf.adresse || "--"}</Text>
                              </Flex>

                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold" mr="2">
                                  Email
                                </Text>
                                <Text>{recordContactInf.mail}</Text>
                              </Flex>

                              <Flex
                                justifyContent="space-between"
                                alignItems="baseline"
                                mt="20px"
                              >
                                <Text fontWeight="bold">Mobile</Text>
                                <Text>{recordContactInf.numTel}</Text>
                              </Flex>
                            </Box>
                          </AccordionPanel>
                        </AccordionItem>
                      )}
                    </Accordion>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card p="0px">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color={textColor} fontSize="xl" fontWeight="600">
                Activités
              </Text>
              <Button variant="action">See all</Button>
            </Flex>
            <Flex>
              <Link
                fontSize="sm"
                m="2"
                ml="5"
                color={textColorBrand}
                fontWeight="500"
                onClick={onOpen}
              >
                <TimeIcon mx="2px" /> planifier une activité
              </Link>
            </Flex>

            {/* <HistoryItem
              name="Mark Benjamin"
              author="Opportunité gagnée

              Étape:
              Potentiel
              confirmée"
              date="Maintenant"
              image={Nft5}
              price="0.91 ETH"
            /> */}
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
