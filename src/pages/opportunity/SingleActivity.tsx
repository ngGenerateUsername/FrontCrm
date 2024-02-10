import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Text,
  Avatar,
  Box,
  Flex,
  extendTheme,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  Textarea,
  Link,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import Cards from "components/card/Card";
import { FaUsers, FaPhone, FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { DetailsActivite,SetActivitetermine,SetActiviteencours } from "state/user/Activity_Slice";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";

import {
  fetchSingleUser,
  fetchSingleUser2,
  fetchSingleUser3,
} from "state/user/Users_Slice";
import { DetailsOpportunite } from "state/user/Oportunity_Slice";
import { fetchSingleClient } from "state/user/Client_Slice";
import {
  AddNotes,
  NotesForActivite,
  DetailsNote,
  deleteNote,
} from "state/user/Notes_Slice";
// import { Link } from "react-router-dom";
import { CheckIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FcPlus } from "react-icons/fc";
import Alert from "./alert";
import DeleteAlert from "./deletealert";

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

const BackdropExample = () => {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "blueGray.100", // Replace with your desired background color
        },
      },
    },
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    dispatch(DetailsActivite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(fetchSingleUser(res.idCommrcial) as any);
        dispatch(fetchSingleUser2(res.idContact) as any);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(DetailsOpportunite(res.idOpportunite) as any);
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusCommercial, record: recordCommercial } =
    useSelector((state: any) => state.fetchSingleUserExport) || {};
  console.log("Commercial", recordCommercial, statusCommercial);

  const { status: statusContact, record: recordContact } =
    useSelector((state: any) => state.fetchSingleUserExport2) || {};
  console.log("Contact", recordContact, statusContact);

  const { status: statusActivite, record: recordActivite } =
    useSelector((state: any) => state.DetailsActiviteExport) || {};
  console.log("Activite", recordActivite, statusActivite);

  const { status: statusOpportunite, record: recordOpportunite } =
    useSelector((state: any) => state.DetailsOpportuniteExport) || {};
  console.log("Opportunite", recordOpportunite, statusOpportunite);

  const { status: statusClient, record: recordClient } =
    useSelector((state: any) => state.fetchSingleClientExport) || {};
  console.log("Client", recordClient, statusClient);
  const handleGoBack = () => {
    history.goBack(); // Go back to the previous page
  };
  let statusText;
  let statusColor;
  if (recordActivite.statusActivite === "ENCOURS") {
    statusText = "En cours";
    statusColor = "green.600";
  } else if (recordActivite.statusActivite === "PLANIFIE") {
    statusText = "Planifié";
    statusColor = "orange.400";
  } else {
    statusText = "Terminé";
    statusColor = "red.600";
  }
  useEffect(() => {
    dispatch(fetchSingleUser3(localStorage.getItem("user")) as any)
      .unwrap()
      .then((res: any) => {})
      .catch((error: Error) => console.log(error));
  }, [dispatch]);
  const { status: statusUser, record: recordUser } =
    useSelector((state: any) => state.fetchSingleUserExport3) || {};
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
          idActivite: params.get("id"),
          idCreateur: localStorage.getItem("user"),
          imageCreateur: recordUser.image,
          typeNotes: "activite",
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
    dispatch(NotesForActivite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(DetailsNote(res.idNote) as any);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusNotesss, record: recordNotesss } =
    useSelector((state: any) => state.NotesForActiviteExport) || {};
  console.log("Notesss", recordNotesss, statusNotesss);

  const { status: statusNote, record: recordNote } =
    useSelector((state: any) => state.DetailsNoteExport) || {};
  console.log("Note", recordNote, statusNote);

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  const [showTextarea, setShowTextarea] = useState(false);

  const handleLinkClick = () => {
    setShowTextarea(true);
  };

  const handleCancelClick = () => {
    setShowTextarea(false);
  };

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleSupprimerClick = async (idNote: any) => {
    try {
      await dispatch(deleteNote(idNote) as any);

      // Suppression réussie, récupérez les nouvelles notes pour l'activité
      const res = await dispatch(NotesForActivite(params.get("id")) as any);

      // Mettez à jour les détails de la note
      dispatch(DetailsNote(res.idNote) as any);

      setShowDeleteAlert(true);
      setTimeout(() => {
        setShowDeleteAlert(false);
      }, 3000); // Durée d'affichage de l'alerte (3 secondes)

      // Close the delete confirmation modal
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleSubmitClick = async () => {
    await AddnoteF();
    setShowTextarea(false);
    dispatch(NotesForActivite(params.get("id")) as any)
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

  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const onClose = () => setIsOpen(false);

  const handleSetActiviteComplet = () => {
    dispatch(SetActivitetermine(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error: Error) => console.log(error));
  };
  const handleSetActiviteENCOURS = () => {
    dispatch(SetActiviteencours(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error: Error) => console.log(error));
  };
  const hoverColor = isHovered ? "red" : "initial";

  return (
    <Box mt="50" pt={{ base: "180px", md: "80px", xl: "80px" }}>
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
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          borderRadius="md"
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Box position="relative" bg="white" mb="10" boxShadow="md">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
            >
              {recordActivite.statusActivite === "PLANIFIE" ||
              recordActivite.statusActivite === "ENCOURS" ? (
                <Button borderRadius="md" m="5" variant="brand" bg="brand.900" onClick={handleSetActiviteComplet}>
                  <Icon as={CheckIcon} marginRight="2" />
                  Marquer comme complet
                </Button>
              ) : (
                <Button borderRadius="md" m="5" variant="outline" onClick={handleSetActiviteENCOURS}>
                  <Icon as={CloseIcon} boxSize={3} marginRight="2" />
                  Marquer comme incomplet
                </Button>
              )}
              <Menu>
                <MenuButton
                  as={Button}
                  borderRadius="md"
                  m="5"
                  variant="outline"
                >
                  <Icon as={HamburgerIcon} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Option 1</MenuItem>
                  <MenuItem>Option 2</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Divider m="2" />
            <Box mt="5" borderRadius="lg" boxShadow="md" bg="white" p={6}>
              <Flex justify="space-evenly" px="" w="100%">
                <Text color="gray" mr={2} width="15%">
                  Projet
                </Text>
                <Flex justify="space-evenly" px="" w="100%" mb={8} ml="-30%">
                  {/* <Link
                    to={`/opportunite/detailsopportunite/OpportuniteDetail?id=${recordOpportunite.idOpportunite}`}
                  > */}
                  <Text color="gray.700" fontWeight="400" mr={2}>
                    {recordOpportunite.titre}
                  </Text>
                  {/* </Link> */}
                </Flex>
              </Flex>

              <Flex justify="space-evenly" px="" w="100%">
                <Text color="gray" mr={2} width="15%">
                  Client
                </Text>
                <Flex justify="space-evenly" px="" w="100%" mb={8} ml="-30%">
                  <Text color="gray.700" fontWeight="400" mr={2} width="15%">
                    {recordClient.nomEntreprise}
                  </Text>
                </Flex>
              </Flex>

              <Flex justify="space-evenly" px="" w="100%">
                <Text color="gray" mr={2} width="15%">
                  Priorité
                </Text>
                <Flex justify="space-evenly" px="" w="100%" mb={8} ml="-30%">
                  <Text color="gray.700" fontWeight="400" mr={2} width="15%">
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor:
                          recordActivite.prioriteActivite === "Fort"
                            ? "green"
                            : recordActivite.prioriteActivite === "Moyen"
                            ? "orange"
                            : "red",
                      }}
                    />{" "}
                    {recordActivite.prioriteActivite}
                  </Text>
                </Flex>
              </Flex>

              <Flex justify="space-evenly" px="" w="100%">
                <Text color="gray" mr={2} width="15%">
                  Type
                </Text>
                <Flex justify="space-evenly" px="" w="100%" mb={8} ml="-30%">
                  <Text color="gray.700" fontWeight="400" mr={2} width="15%">
                    <Avatar
                      icon={
                        recordActivite.typeActivite === "Email" ? (
                          <MdEmail />
                        ) : recordActivite.typeActivite === "Tel" ? (
                          <FaPhone />
                        ) : recordActivite.typeActivite === "Reunion" ? (
                          <FaUsers />
                        ) : (
                          <FaUser />
                        )
                      }
                      size="lg"
                      bg="transparent"
                      color="brand.900"
                      mt="-5"
                      ml="-6"
                    />
                    {recordActivite.typeActivite === "Email"
                      ? "Email"
                      : recordActivite.typeActivite === "Tel"
                      ? "Téléphone"
                      : "Réunion"}
                  </Text>
                </Flex>
              </Flex>

              <Flex justify="space-evenly" px="" w="100%">
                <Text color="gray" mr={2} width="15%">
                  Assigné à
                </Text>
                <Flex justify="space-evenly" px="" w="100%" mb={8} ml="-30%">
                  <Text color="gray.700" fontWeight="400" mr={2} width="20%">
                    <Flex justifyContent="flex-start" alignItems="center">
                      {statusContact == "succeeded" && (
                        <>
                          <Avatar
                            src={require("assets/img/avatars/"+recordContact.image)}
                            size="sm"
                            mr={2}
                          />
                        </>
                      )}
                      <Box>
                        <Text color="gray.600" fontWeight="bold" width="200%">
                          {recordContact.prenom} {recordContact.nom}
                        </Text>
                        <Text color="gray.400">
                          {recordClient.nomEntreprise}
                        </Text>
                      </Box>
                    </Flex>
                  </Text>
                </Flex>
              </Flex>

              <Flex justify="space-evenly" px="" w="100%">
                <Text color="gray" mr={2} width="15%">
                  Assigné Par
                </Text>
                <Flex justify="space-evenly" px="" w="100%" mb={8} ml="-30%">
                  <Text color="gray.700" fontWeight="400" mr={2} width="20%">
                    <Flex justifyContent="flex-start" alignItems="center">
                      {statusCommercial == "succeeded" && (
                        <>
                          <Avatar
                            src={require("assets/img/avatars/" +
                              recordCommercial.image)}
                            size="sm"
                            mr={2}
                          />
                        </>
                      )}
                      <Box>
                        <Text color="gray.600" fontWeight="bold" width="200%">
                          {recordCommercial.prenom} {recordCommercial.nom}
                        </Text>
                        <Text color="gray.400">
                          {recordOpportunite.nomEntreprise}
                        </Text>
                      </Box>
                    </Flex>
                  </Text>
                </Flex>
              </Flex>

              <Flex justify="space-evenly" px="" w="100%">
                <Text color="gray" mr={2} width="15%">
                  Description
                </Text>
                <Flex justify="space-evenly" px="" w="100%" mb={8} ml="-30%">
                  <Text color="gray.700" fontWeight="400" mr={2} width="15%">
                    {recordActivite.Description || " --"}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            boxShadow="md"
            borderRadius="md"
            position="relative"
            bg="white"
            p="4"
            mb="10"
          >
            <Tabs  variant="soft-rounded" colorScheme='brand'>
              <TabList>
                <Tab>Fiche Contrat</Tab>
                <Tab>Contact/Adresses</Tab>
                <Tab>Notes</Tab>
                <Tab>Fichiers Joints</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>AA</TabPanel>
                <TabPanel>ZZ</TabPanel>
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
                          onChange={(e) => setDescription(e.target.value)}
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
                              <MenuItem onClick={() => setIsOpen(true)}>
                                Supprimer
                              </MenuItem>
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
                                      Êtes-vous sûr de vouloir supprimer ce
                                      fichier ?
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                      <Button ref={cancelRef} onClick={onClose}>
                                        Annuler
                                      </Button>
                                      <Button
                                        colorScheme="red"
                                        onClick={() =>
                                          handleSupprimerClick(c.idNote)
                                        }
                                        ml={3}
                                      >
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
                <TabPanel>DD</TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
        <Flex
          borderRadius="md"
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Cards p="0px" borderRadius="md" maxWidth={400} ml="5">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="normal"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text
                mt="10"
                position="absolute"
                width="100px"
                height="30px"
                bg={statusColor}
                color="white"
                fontSize="xs"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex="1"
                borderRadius="4px"
                boxShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
                // animation="blinking 3s infinite"
                // css={{
                //   "@keyframes blinking": {
                //     "0%": { opacity: 0 },
                //     "50%": { opacity: 1 },
                //     "100%": { opacity: 0 },
                //   },
                // }}
              >
                {recordActivite.statusActivite || "--"}
              </Text>
            </Flex>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-around"
              w="100%"
              py="18px"
              mt="10"
            >
              <Text color="grey">Date De Depart</Text>
              <Text>{recordActivite.dateDebut || "--"}</Text>
            </Flex>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-around"
              w="100%"
              py="18px"
              mb="10"
            >
              <Text color="grey">Date D'échéance</Text>
              <Text>{recordActivite.dateFin || "--"}</Text>
            </Flex>
          </Cards>
        </Flex>
      </Grid>
    </Box>
  );
};

export default BackdropExample;
