import React, { useEffect, useState, useRef } from "react";
// Chakra imports
import {Box,Button,Flex,Grid,Link,Text,useColorModeValue,Spacer, Stack, BreadcrumbItem, Breadcrumb,Tab, TabList, TabPanel, TabPanels, Tabs,useDisclosure,
  Modal,GridItem,Avatar,Menu,MenuButton,MenuList,MenuItem,Accordion, AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Image,AlertDialog,
  AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,Textarea} from "@chakra-ui/react";

// Custom components
import HistoryItem from "./HistoryItem";
import Card from "components/card/Card";
import { HSeparator } from "components/separator/Separator";
import ActiviteModal from "./addActivity";
import ContratModal from "./Contrat";
import RatingStars from "./ratingStars";
import Alert from "./alert";
import DeleteAlert from "./deletealert";

//Icons Import
import { FiMoreVertical } from "react-icons/fi";
import {
  ArrowForwardIcon,
  TimeIcon,
  EditIcon,
  HamburgerIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import { FcPlus } from "react-icons/fc";

//Slices Import
import {
  DetailsOpportunite,
  SetOpportuniteConfirmee,
  SetOpportunitePerdue,
  SetOpportunitePiste,
  SetOpportunitePotentiel,
  SetOpportuniteSignee,
} from "state/user/Oportunity_Slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { fetchSingleClient } from "state/user/Client_Slice";
import {
  fetchSingleUser,
  fetchSingleUser2,
  fetchSingleUser3,
  fetchSingleUser4,
} from "state/user/Users_Slice";
import {
  AddNotes,
  NotesForOpportunite,
  DetailsNote,
  deleteNote,
} from "state/user/Notes_Slice";
import {
  DetailsActivite,
  ActivitesForOpportunite,
} from "state/user/Activity_Slice";


//Functions
function formatDuration(duration: any) {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} jour${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} heure${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} seconde${seconds > 1 ? "s" : ""}`;
  }
}

export default function Opportunite() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const { onClose } = useDisclosure();
  const cancelRef = useRef();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  let history = useHistory();




  useEffect(() => {
    dispatch(DetailsOpportunite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCommercial) as any);
        dispatch(fetchSingleUser3(res.idContact) as any);
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const [userDetails, setUserDetails] = useState<{ id: string; nom: string; image: string }[]>([]);

  useEffect(() => {
    dispatch(ActivitesForOpportunite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(DetailsActivite(res.idActivite) as any);
        const idCommrcials: string[] = res.idCommrcials;
        const fetchPromises = idCommrcials.map((idCommrcial: string) =>
          dispatch(fetchSingleUser2(idCommrcial) as any).then(
            (result: any) => ({
              id: result.id,
              nom: result.nom,
              image: result.image,
            })
          )
        );
        Promise.all(fetchPromises)
          .then((results: { id: string; nom: string; image: string }[]) => {
            setUserDetails(results);
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusActivities, record: recordActivities } =
    useSelector((state: any) => state.ActivitesForOpportuniteExport) || {};

  console.log("Activities", recordActivities, statusActivities);

  const { status: statusSingleActivite, record: recordSingleActivite } =
    useSelector((state: any) => state.DetailsActiviteExport) || {};
  console.log("singleActivities", recordSingleActivite, statusSingleActivite);

  const { status: statusOpportunite, record: recordOpportunite } = useSelector(
    (state: any) => state.DetailsOpportuniteExport
  );
  console.log("Opportunite", recordOpportunite, statusOpportunite);

  const { status: statusClient, record: recordClient } = useSelector(
    (state: any) => state.fetchSingleClientExport
  );
  console.log("client", recordClient, statusClient);

  const { status: statusCommercial, record: recordCommercial } = useSelector(
    (state: any) => state.fetchSingleUserExport
  );
  console.log("Commercial", recordCommercial, statusCommercial);

  const { status: statusCommercialAct, record: recordCommercialAct } =
    useSelector((state: any) => state.fetchSingleUser2Export) || {};
  console.log("Commercial", recordCommercialAct, statusCommercialAct);

  const { status: statuscontact, record: recordcontact } =
    useSelector((state: any) => state.fetchSingleUserExport3) || {};

  console.log("contact", recordcontact, statuscontact);
/////////////////////////////////////////OpportunityStatus////////////////////////////////////////////////
  const handleSetOpportuniteConfirmee = () => {
    dispatch(SetOpportuniteConfirmee(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error: Error) => console.log(error));
  };

  const handleSetOpportunitePiste = () => {
    dispatch(SetOpportunitePiste(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error: Error) => console.log(error));
  };

  const handleSetOpportunitePerdue = () => {
    dispatch(SetOpportunitePerdue(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error: Error) => console.log(error));
  };

  const handleSetOpportuniteSignee = () => {
    dispatch(SetOpportuniteSignee(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error: Error) => console.log(error));
  };

  const handleSetOpportunitePotentiel = () => {
    dispatch(SetOpportunitePotentiel(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error: Error) => console.log(error));
  };

  const [activeItem, setActiveItem] = useState("");

  const breadcrumbItems = [
    { label: "PISTE", status: "PISTE" },
    { label: "POTENTIEL", status: "POTENTIEL" },
    { label: "CONFIRMEE", status: "CONFIRMEE" },
    { label: "SIGNEE", status: "SIGNEE" },
    { label: "PERDUE", status: "PERDUE" },
  ];

  useEffect(() => {
    const databaseStatus = recordOpportunite.statusOpportunite;
    console.log(databaseStatus);

    const mappedStatus = mapDatabaseStatusToBreadcrumbStatus(databaseStatus);

    setActiveItem(mappedStatus);
  }, [recordOpportunite.statusOpportunite]);

  const mapDatabaseStatusToBreadcrumbStatus = (databaseStatus: any) => {
    switch (databaseStatus) {
      case "PISTE":
        return "PISTE";
      case "POTENTIEL":
        return "POTENTIEL";
      case "CONFIRMEE":
        return "CONFIRMEE";
      case "SIGNEE":
        return "SIGNEE";
      case "PERDUE":
        return "PERDUE";
      default:
        return "";
    }
  };

  const handleConfirmation = () => {
    const idOpportunite = recordOpportunite.idOpportunite;
    SetOpportuniteConfirmee(idOpportunite);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContratModalOpen, setIsContratModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenContratModal = () => {
    setIsContratModalOpen(true);
  };

  const handleCloseContratModal = () => {
    setIsContratModalOpen(false);
  };
  const handlecreer = () => {
    history.push("/opportunite/add-opportunite");
  };

  

//////////////////////////////////////////////////////Add Note /////////////////////////////////////
useEffect(() => {
  dispatch(fetchSingleUser4(localStorage.getItem("user")) as any)
    .unwrap()
    .then((res: any) => {})
    .catch((error: Error) => console.log(error));
}, [dispatch]);
const { status: statusUser, record: recordUser } =
  useSelector((state: any) => state.fetchSingleUserExport4) || {};
console.log("User", recordUser, statusUser);


const avatarImage = recordCommercial.image;
const [description, setDescription] = useState("");
console.log(avatarImage);
const AddnoteF = async () => {
  try {
    console.log("test 1");
    await dispatch(
      AddNotes({
        description: description,
        dateCreation: new Date(),
        idOpportunite: params.get("id"),
        idCreateur: localStorage.getItem("user"),
        imageCreateur: recordUser.image,
        typeNotes: "opportunite",
        nomCreateur: recordUser.prenom + " " + recordUser.nom,
      }) as any
    )
      .then((res: any) => {})
      .catch((error: Error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
    dispatch(NotesForOpportunite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(DetailsNote(res.idNote) as any);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusNotesss, record: recordNotesss } =
    useSelector((state: any) => state.NotesForOpportuniteExport) || {};
  console.log("Notesss", recordNotesss, statusNotesss);

  const { status: statusNote, record: recordNote } =
    useSelector((state: any) => state.DetailsNoteExport) || {};
  console.log("Note", recordNote, statusNote);


  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleSupprimerClick = async (idNote: any) => {
    try {
      await dispatch(deleteNote(idNote) as any);

      // Suppression réussie, récupérez les nouvelles notes pour l'activité
      const res = await dispatch(NotesForOpportunite(params.get("id")) as any);

      // Mettez à jour les détails de la note
      dispatch(DetailsNote(res.idNote) as any);

      setShowDeleteAlert(true);
      setTimeout(() => {
        setShowDeleteAlert(false);
      }, 3000); // Durée d'affichage de l'alerte (3 secondes)

      // Close the delete confirmation modal
      setIsNoteOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleSubmitClick = async () => {
    await AddnoteF();
    setShowTextarea(false);
    dispatch(NotesForOpportunite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(DetailsNote(res.idNote) as any);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); // Adjust the duration here (e.g., 3000 for 3 seconds)
      })
      .catch((error: Error) => console.log(error));
  };

  const sortedNotes = recordNotesss.slice().sort((a: any, b: any) => {
    const dateA = new Date(a.dateCreation);
    const dateB = new Date(b.dateCreation);
    return dateB.getTime() - dateA.getTime();
  });
  const [showTextarea, setShowTextarea] = useState(false);

  const handleLinkClick = () => {
    setShowTextarea(true);
  };

  const handleCancelClick = () => {
    setShowTextarea(false);
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {showAlert && (
        <Alert
          onComplete={() => {
            setShowAlert(false);
          }}
        />
      )}
      {showDeleteAlert && (
        <DeleteAlert
          onComplete={() => {
            setShowDeleteAlert(false);
          }}
        />
      )}
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
            <Box
              pt={{ base: "180px", md: "50px", xl: "20px" }}
              bg="white"
              px={{ base: "10px", md: "20px", xl: "30px" }}
            >
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
                      alignContent="center"
                    >
                      Pipeline /
                    </Text>

                    <Text
                      mt="15px"
                      mb="26px"
                      color="grey"
                      fontSize="2xl"
                      ms="14px"
                      fontWeight="700"
                      alignContent="center"
                    >
                      {recordOpportunite.titre}
                    </Text>
                  </Flex>
                  <Stack direction="row" spacing={4} ml="10px" mb="2">
                    {recordOpportunite.statusOpportunite === "CONFIRMEE" ? (
                      <>
                        <Button
                          rightIcon={<CheckIcon />}
                          onClick={handleOpenContratModal}
                          variant="outline"
                        >
                          SIGNER
                        </Button>
                        <Modal
                          initialFocusRef={initialRef}
                          finalFocusRef={finalRef}
                          isOpen={isContratModalOpen}
                          onClose={handleCloseContratModal}
                          size="5xl"
                        >
                          <ContratModal />
                        </Modal>

                        <Button leftIcon={<EditIcon />} variant="darkBrand">
                          MODIFIER
                        </Button>
                        <Button
                          rightIcon={<ArrowForwardIcon />}
                          variant="outline"
                          onClick={() => handlecreer()}
                        >
                          Créer
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button leftIcon={<EditIcon />} variant="darkBrand">
                          MODIFIER
                        </Button>
                        <Button
                          rightIcon={<ArrowForwardIcon />}
                          variant="outline"
                          onClick={() => handlecreer()}
                        >
                          Créer
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
                <Spacer />
              </Flex>
              <HSeparator />
              <Flex
                mt="10px"
                ml={{ base: "10px", md: "20px", xl: "30px" }}
                mb="20px"
                justifyContent={{
                  base: "flex-start",
                  md: "flex-start",
                  xl: "flex-end",
                }}
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
                wrap="wrap"
              >
                <Flex
                  order={{ base: 1, md: 2 }}
                  flex={{ base: "0 0 100%", md: "1 1 auto" }}
                >
                  <Breadcrumb spacing="8px">
                    {breadcrumbItems.map((item, index) => (
                      <BreadcrumbItem key={index}>
                        <Text
                          color={
                            activeItem === item.status ? "brand.700" : "grey"
                          }
                          fontWeight={
                            activeItem === item.status ? "700" : "200"
                          }
                        >
                          {item.label}
                        </Text>
                      </BreadcrumbItem>
                    ))}
                  </Breadcrumb>
                </Flex>

                <Flex
                  flex={{ base: "0 0 100%", md: "auto" }}
                  ml={{ base: "0px", md: "auto" }}
                >
                  <Menu>
                    <MenuButton
                      as={Button}
                      aria-label="Options"
                      leftIcon={<HamburgerIcon />}
                      variant="outline"
                    >
                      <Text>Changer l'état de l'opportunité</Text>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={handleSetOpportunitePiste}>
                        Marquer comme Piste
                      </MenuItem>
                      <MenuItem onClick={handleSetOpportunitePotentiel}>
                        Marquer comme Potentiel
                      </MenuItem>
                      <MenuItem onClick={handleSetOpportuniteConfirmee}>
                        Marquer comme Confirmée
                      </MenuItem>
                      <MenuItem onClick={handleSetOpportunitePerdue}>
                        Marquer comme Perdue
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
            </Box>
            <Box
              pt={{ base: "180px", md: "50px", xl: "20px" }}
              bg="white"
              mt="10px"
            >
              <Box padding="6" boxShadow="sm" bg="white" m="20px">
                <div>
                  <Flex position="relative" align="center">
                    <Text
                      mt="15px"
                      mb="26px"
                      color={textColor}
                      fontSize="4xl"
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
                      fontSize="4xl"
                      ms="14px"
                      fontWeight="700"
                      alignContent={"center"}
                    >
                      {recordOpportunite.titre}
                    </Text>
                  </Flex>
                </div>
                <div>
                  <Flex position="relative" align="center">
                    <Text
                      mb="26px"
                      color={textColor}
                      fontSize="l"
                      ms="24px"
                      fontWeight="600"
                    >
                      {recordOpportunite.revenuespere
                        ? recordOpportunite.revenuespere.toLocaleString("fr-FR")
                        : ""}{" "}
                      €
                    </Text>
                    <Text
                      mb="26px"
                      color={textColor}
                      fontSize="l"
                      ms="24px"
                      fontWeight="600"
                    >
                      à
                    </Text>
                    <Text
                      mb="26px"
                      color={textColor}
                      fontSize="l"
                      ms="24px"
                      fontWeight="600"
                    >
                      {recordOpportunite.pourcentage} %
                    </Text>
                  </Flex>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Client:</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text> {recordClient.nomEntreprise}</Text>
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Date de fermeture prévue:</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text> {recordOpportunite.dateDeFermeturePrevue}</Text>
                    </GridItem>
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Contact du client:</Text>
                    </GridItem>
                    <GridItem w="120%" h="20">
                      <Text>
                        {" "}
                        {statuscontact == "succeeded" && (
                          <>
                            <Avatar
                              src={require(`assets/img/avatars/${recordcontact.image}`)}
                              boxSize={{ base: "4", md: "8" }}
                              mr={{ base: "2", md: "4" }}
                            />
                          </>
                        )}
                        <strong>
                          {" "}
                          {recordcontact.prenom} {recordcontact.nom}
                        </strong>
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Email:</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text> {recordOpportunite.email}</Text>
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" fontWeight="600">
                      <Text>Priorité:</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <RatingStars
                        id={recordOpportunite.idOpportunite}
                        prioriteOpporunite={
                          recordOpportunite.prioriteOpportunite
                        }
                      />
                    </GridItem>
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Téléphone:</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text fontSize="13" color="blue">
                        {recordOpportunite.telephone}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" fontWeight="600">
                      <Text>Société:</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text>{recordOpportunite.nomEntreprise}</Text>
                    </GridItem>
                  </Grid>
                </div>
                <div>
                  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text fontWeight="600">Vendeur:</Text>
                    </GridItem>
                    <GridItem w="100%" h="10" colSpan={{ base: 5, md: 2 }}>
                      <Flex align="center">
                        {statusCommercial == "succeeded" && (
                          <>
                            <Avatar
                              src={require(`assets/img/avatars/${recordCommercial.image}`)}
                              boxSize={{ base: "4", md: "8" }}
                              mr={{ base: "2", md: "4" }}
                            />
                          </>
                        )}
                        <Text>
                          <strong>
                            {recordCommercial.nom} {recordCommercial.prenom}
                          </strong>
                        </Text>
                      </Flex>
                    </GridItem>
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                    <GridItem w="100%" h="10" />
                  </Grid>
                </div>
              </Box>

              <Tabs isManual variant="soft-rounded" colorScheme="brand" ml="4">
                <TabList>
                  <Tab>Informations supplémentaires</Tab>
                  <Tab>Notes</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Accordion allowMultiple>
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
                              <Image
                                src={require(`assets/img/avatars/aramex.png`)}
                                boxSize={20}
                                ml="4"
                              />
                            </Flex>
                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold" mb="10px">
                                Nom de l'Entreprise
                              </Text>
                              <Text>{recordClient.nomEntreprise || "--"}</Text>
                            </Flex>
                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold">Domaine d'activités</Text>
                              <Text>{recordClient.domaine || "--"}</Text>
                            </Flex>
                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold">Adresse</Text>
                              <Text>{recordClient.adresse || "--"}</Text>
                            </Flex>
                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold">Email</Text>
                              <Text>{recordClient.mail || "--"}</Text>
                            </Flex>
                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold">Mobile</Text>
                              <Text>{recordClient.numTel || "--"}</Text>
                            </Flex>
                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold">Numéro Fiscale</Text>
                              <Text>{recordClient.numFiscal || "--"}</Text>
                            </Flex>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>

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
                              {statuscontact == "succeeded" && (
                                <>
                                  <Image
                                    src={require(`assets/img/avatars/${recordcontact.image}`)}
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
                                {recordcontact.prenom} {recordcontact.nom}
                              </Text>
                            </Flex>

                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold">Adresse</Text>
                              <Text>{recordcontact.adresse || "--"}</Text>
                            </Flex>

                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold" mr="2">
                                Email
                              </Text>
                              <Text>{recordcontact.mail}</Text>
                            </Flex>

                            <Flex
                              justifyContent="space-between"
                              alignItems="baseline"
                              mt="20px"
                            >
                              <Text fontWeight="bold">Mobile</Text>
                              <Text>{recordcontact.numTel}</Text>
                            </Flex>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </TabPanel>
                  <TabPanel>
                  <>
                    <Link
                      display="flex"
                      alignItems="center"
                      color="teal.500"
                      onClick={handleLinkClick}
                    >
                      <Flex align="center" mr={2}>
                        <FcPlus size={20} />
                      </Flex>
                      <Text fontWeight="bold">Ajouter Note</Text>
                    </Link>

                    {showTextarea && (
                      <Box mt={4}>
                        <Textarea
                          placeholder="Saisissez votre note..."
                          onChange={(e: any) => setDescription(e.target.value)}
                        />

                        <Flex justify="flex-end" mt={2}>
                          <Button
                            colorScheme="teal"
                            mr={2}
                            onClick={handleSubmitClick}
                          >
                            Soumettre
                          </Button>
                          <Button variant="outline" onClick={handleCancelClick}>
                            Annuler
                          </Button>
                        </Flex>
                      </Box>
                    )}
                    {sortedNotes.map((c: any) => {
                      const dateCreation = new Date(c.dateCreation);
                      const now = new Date();
                      const duration = Math.abs(
                        now.getTime() - dateCreation.getTime()
                      );
                      const durationString = formatDuration(duration);
                      return (
                        <Box
                          borderWidth="1px"
                          borderRadius="md"
                          mt="5"
                          p={4}
                          boxShadow="md"
                          display="flex"
                          alignItems="center"
                          key={c.id} // N'oubliez pas d'ajouter une clé unique pour chaque élément dans le tableau
                        >
                          <Image
                            src={require(`assets/img/avatars/` +
                              c.imageCreateur)}
                            boxSize="70px"
                            rounded="full"
                            mr={4}
                          />
                          <Flex flex={1} flexDirection="column">
                            <Flex alignItems="center">
                              <Text
                                fontSize="md"
                                ml="6"
                                fontWeight="bold"
                                mb={1}
                              >
                                {c.nomCreateur}
                              </Text>
                              <Text color="gray.500" fontSize="13" ml={10}>
                                {`il y a ${durationString}`}
                              </Text>
                            </Flex>
                            <Text mt={4} ml="10" flex={1}>
                              {c.description}
                            </Text>
                          </Flex>

                          <Menu>
                            <MenuButton
                              as={Box}
                              ml="auto"
                              p={2}
                              rounded="full"
                              _hover={{ bg: "gray.100" }}
                            >
                              <FiMoreVertical />
                            </MenuButton>
                            <MenuList>
                              <MenuItem>Modifier</MenuItem>
                              <MenuItem onClick={() => setIsNoteOpen(true)}>
                                Supprimer
                              </MenuItem>
                              <AlertDialog
                                isOpen={isNoteOpen}
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
                                      Êtes-vous sûr de vouloir supprimer ce
                                      fichier ?
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                      <Button ref={cancelRef} onClick={onClose}>
                                        Annuler
                                      </Button>
                                      <Button colorScheme="red" onClick={() =>handleSupprimerClick(c.idNote)} ml={3}>
                                        Supprimer
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialogOverlay>
                              </AlertDialog>
                            </MenuList>
                          </Menu>
                        </Box>
                      );
                    })}
                  </>
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

              <Button
                onClick={async () => {
                  history.push("/commercial/Activities");
                }}
                variant="action"
              >
                See all
              </Button>
            </Flex>
            <Flex>
              <Link
                fontSize="sm"
                m="2"
                ml="5"
                color={textColorBrand}
                fontWeight="500"
                onClick={handleOpenModal}
              >
                <TimeIcon mx="2px" /> planifier une activité
              </Link>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                size="5xl"
              >
                <ActiviteModal />
              </Modal>
            </Flex>
            <Card p="0px" gridArea="1 / 2 / 4 / 4">
              {/* {renderDataOpp()} */}
            </Card>
            {recordActivities.map((c: any) => {
              return (
                <HistoryItem
                  key={c.idActivite}
                  name={c.typeActivite}
                  author={c.statusActivite}
                  image={""}
                  Titre={c.titre}
                  id={c.idActivite}
                  date={new Date(c.dateFin)}
                />
              );
            })}
          </Card>
        </Flex>
      </Grid>
    </Box>
  );
}
