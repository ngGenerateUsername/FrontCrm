import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  GridItem,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";
import { ChevronRightIcon, EmailIcon } from "@chakra-ui/icons";
import {
  DetailsTicket,
  SetNotesTicket,
  SetStatusTicket,
  setPrioriteTicket,
  setTypeTicket,
} from "state/user/ticket_Slice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSingleClient } from "state/user/Client_Slice";
import {
  fetchSingleUser,
  fetchSingleUser2,
  fetchSingleUser3,
} from "state/user/Users_Slice";
import { fetchSingleUserEntreprise } from "state/user/Entreprise_Slice";
import Activite from "components/ticket/Activite";
export default function Marketplace() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [content, setContent] = useState("");
  const [SelectType, setSelectType] = useState("");
  const [SelectPriorite, setSelectPriorite] = useState("");
  const [InputNotes, setInputNotes] = useState("");
  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DetailsTicket(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCreateur) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser2(res.idResponsable) as any);
        dispatch(fetchSingleUser3(res.idModificateur) as any);
        setSelectPriorite(res.prioriteTicket);
        setSelectType(res.typeTicket);
        setInputNotes(res.notes);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusTicket, record: recordTicket } = useSelector(
    (state: any) => state.DetailsTicketExport
  );
  console.log("ticket", recordTicket, statusTicket);

  const { status: statusClient, record: recordClient } = useSelector(
    (state: any) => state.fetchSingleClientExport
  );
  console.log("client", recordClient, statusClient);

  const { status: statusContact, record: recordContact } = useSelector(
    (state: any) => state.fetchSingleUserExport
  );
  console.log("contact", recordContact, statusContact);

  const { status: statusEntreprise, record: recordEntreprise } = useSelector(
    (state: any) => state.fetchSingleUserEntrepriseExport
  );
  console.log("entreprise", recordEntreprise, statusEntreprise);

  const { status: statusResp, record: recordResp } = useSelector(
    (state: any) => state.fetchSingleUserExport2
  );
  console.log("resp", recordResp, statusResp);

  const { status: statusModif, record: recordModif } = useSelector(
    (state: any) => state.fetchSingleUserExport3
  );
  console.log("modif", recordModif, statusModif);

  const renderDataTicketDetails = () => {
    if (statusTicket === "loading")
      return (
        <Box padding="6" boxShadow="lg" bg="white" m="20px">
          <div>
            <Text mb="10px" color={textColor} fontSize="4xl" fontWeight="700">
              <Skeleton height="20px" />
            </Text>
          </div>
          <br></br>
        </Box>
      );
    if (statusTicket === "failed")
      return (
        <Box padding="6" boxShadow="lg" bg="white" m="20px">
          <div>
            <Text mb="10px" color={textColor} fontSize="4xl" fontWeight="700">
              <Skeleton height="20px" />
            </Text>
          </div>
          <br></br>
        </Box>
      );

    if (statusTicket === "succeeded") {
      return (
        <Box padding="6" boxShadow="lg" bg="white" m="20px">
          <div>
            <Text mb="10px" color={textColor} fontSize="4xl" fontWeight="700">
              {recordTicket.titre}
            </Text>
          </div>
          <br></br>
          <div>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" h="10">
                <Text fontWeight="600">Date de creation</Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text>{recordTicket.dateCreation}</Text>
              </GridItem>
              <GridItem w="100%" h="10" />
              <GridItem w="100%" h="10">
                <Text fontWeight="600">Client</Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text>{recordClient.nomEntreprise}</Text>
              </GridItem>
            </Grid>
          </div>
          <div>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" h="10">
                <Text fontWeight="600">Priorité</Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text>{recordTicket.prioriteTicket}</Text>
              </GridItem>
              <GridItem w="100%" h="10" />
              <GridItem w="100%" h="10" fontWeight="600">
                <Text>Contact</Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text>{recordContact.username}</Text>
              </GridItem>
            </Grid>
          </div>
          <div>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" h="10">
                <Text fontWeight="600">Type</Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text fontSize="13">{recordTicket.typeTicket}</Text>
              </GridItem>
              <GridItem w="100%" h="10" />
              <GridItem w="100%" h="10" fontWeight="600">
                <Text>Entreprise</Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text>{recordEntreprise.nomEntreprise}</Text>
              </GridItem>
            </Grid>
          </div>
          <div>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" h="20">
                <Text fontWeight="600"></Text>
              </GridItem>
              <GridItem w="100%" h="20">
                <Text fontSize="13"></Text>
              </GridItem>
              <GridItem w="100%" h="20" />
              <GridItem w="100%" h="20" fontWeight="600">
                <Text>Responsable ticket</Text>
              </GridItem>
              <GridItem w="100%" h="20">
                <Text>
                  {recordResp.nom} {recordResp.prenom}
                </Text>
              </GridItem>
            </Grid>
          </div>
          <div>
            <Grid templateColumns="repeat(1, 1fr)" gap={1}>
              <GridItem w="100%" h="10">
                <Text fontWeight="600">Description</Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text>{recordTicket.description}</Text>
              </GridItem>
            </Grid>
          </div>
          <br></br>
        </Box>
      );
    }
  };
  const renderDataTicketStatus = () => {
    if (statusTicket === "succeeded") {
      if (recordTicket.statusTicket === "ATTENTE")
        return (
          <Flex
            align="center"
            me="20px"
            ms={{ base: "24px", md: "0px" }}
            mt={{ base: "20px", md: "0px" }}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink color={textColorBrand} fontWeight="600">
                  ATTENTE
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>IDENTIFICATION</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>FERME_RESOLU</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>FERME_ECHEC</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
        );
      if (recordTicket.statusTicket === "IDENTIFICATION")
        return (
          <Flex
            align="center"
            me="20px"
            ms={{ base: "24px", md: "0px" }}
            mt={{ base: "20px", md: "0px" }}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink>ATTENTE</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink color={textColorBrand} fontWeight="600">
                  IDENTIFICATION
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>FERME_RESOLU</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>FERME_ECHEC</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
        );
      if (recordTicket.statusTicket === "FERME_ECHEC")
        return (
          <Flex
            align="center"
            me="20px"
            ms={{ base: "24px", md: "0px" }}
            mt={{ base: "20px", md: "0px" }}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink>ATTENTE</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>IDENTIFICATION</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>FERME_RESOLU</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink color={textColorBrand} fontWeight="600">
                  FERME_ECHEC
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
        );
      if (recordTicket.statusTicket === "FERME_RESOLU")
        return (
          <Flex
            align="center"
            me="20px"
            ms={{ base: "24px", md: "0px" }}
            mt={{ base: "20px", md: "0px" }}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink>ATTENTE</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>IDENTIFICATION</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink color={textColorBrand} fontWeight="600">
                  FERME_RESOLU
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>FERME_ECHEC</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
        );
    }
  };
  const renderInformationSuppDetails = () => {
    if (statusTicket === "loading")
      return (
        <Box padding="6" boxShadow="lg" bg="white" m="20px">
          <div>
            <Text mb="10px" color={textColor} fontSize="4xl" fontWeight="700">
              <Skeleton height="20px" />
            </Text>
          </div>
          <br></br>
        </Box>
      );
    if (statusTicket === "failed")
      return (
        <Box padding="6" boxShadow="lg" bg="white" m="20px">
          <div>
            <Text mb="10px" color={textColor} fontSize="4xl" fontWeight="700">
              <Skeleton height="20px" />
            </Text>
          </div>
          <br></br>
        </Box>
      );

    if (statusTicket === "succeeded") {
      return (
        <>
          <Box padding="6" boxShadow="lg" bg="white" m="20px">
            <div>
              <Text mb="10px" color={textColor} fontSize="3xl" fontWeight="700">
                Information de client
              </Text>
            </div>

            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Nom de la société</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordClient.nomEntreprise}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Adresse</Text>
                </GridItem>
                <GridItem w="100%" h="40" m="2">
                  <Text>{recordClient.adresse}</Text>
                </GridItem>
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Mail</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordClient.mail}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Tel</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordClient.numTel}</Text>
                </GridItem>
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Domaine</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text fontSize="13">{recordClient.domaine}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10" fontWeight="600">
                  <Text>numFiscal</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordClient.numFiscal}</Text>
                </GridItem>
              </Grid>
            </div>
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" m="20px">
            <div>
              <Text mb="10px" color={textColor} fontSize="3xl" fontWeight="700">
                Information de contact
              </Text>
            </div>

            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">Nom</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>
                    {recordContact.nom} {recordContact.prenom}
                  </Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10">
                  <Text fontWeight="600"></Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text></Text>
                </GridItem>
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Mail</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text fontSize="13">{recordContact.mail}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10" fontWeight="600">
                  <Text>Tel</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordContact.numTel}</Text>
                </GridItem>
              </Grid>
            </div>
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" m="20px">
            <div>
              <Text mb="10px" color={textColor} fontSize="3xl" fontWeight="700">
                Information de entreprise
              </Text>
            </div>

            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Nom de la société</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordEntreprise.nomEntreprise}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Adresse</Text>
                </GridItem>
                <GridItem w="100%" h="40" m="2">
                  <Text>{recordEntreprise.adresse}</Text>
                </GridItem>
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Mail</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordEntreprise.mail}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Tel</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordEntreprise.numTel}</Text>
                </GridItem>
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Domaine</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text fontSize="13">{recordEntreprise.domaine}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10" fontWeight="600">
                  <Text>numFiscal</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordEntreprise.numFiscal}</Text>
                </GridItem>
              </Grid>
            </div>
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" m="20px">
            <div>
              <Text mb="10px" color={textColor} fontSize="3xl" fontWeight="700">
                Information de Responsable ticket
              </Text>
            </div>

            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">Nom</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>
                    {recordResp.nom} {recordResp.prenom}
                  </Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10">
                  <Text fontWeight="600"></Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text></Text>
                </GridItem>
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text fontWeight="600">Mail</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text fontSize="13">{recordResp.mail}</Text>
                </GridItem>
                <GridItem w="100%" h="10" />
                <GridItem w="100%" h="10" fontWeight="600">
                  <Text>Tel</Text>
                </GridItem>
                <GridItem w="100%" h="10">
                  <Text>{recordResp.numTel}</Text>
                </GridItem>
              </Grid>
            </div>
          </Box>
        </>
      );
    }
  };
  const renderNotesInternesDetails = () => {
    if (statusTicket === "loading")
      return (
        <Box padding="6" boxShadow="lg" bg="white" m="20px">
          <div>
            <Text mb="10px" color={textColor} fontSize="4xl" fontWeight="700">
              <Skeleton height="20px" />
            </Text>
          </div>
          <br></br>
        </Box>
      );
    if (statusTicket === "failed")
      return (
        <Box padding="6" boxShadow="lg" bg="white" m="20px">
          <div>
            <Text mb="10px" color={textColor} fontSize="4xl" fontWeight="700">
              <Skeleton height="20px" />
            </Text>
          </div>
          <br></br>
        </Box>
      );

    if (statusTicket === "succeeded") {
      return (
        <>
          <Box padding="6" boxShadow="lg" bg="white" m="20px">
            <div>
              <Text mb="10px" color={textColor} fontSize="3xl" fontWeight="700">
                Plus de details ticket
              </Text>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">Date dernier modification</Text>
                </GridItem>
                <GridItem w="100%" h="20">
                  <Text>{recordTicket.dateModification}</Text>
                </GridItem>
                <GridItem w="100%" h="20" />
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">Par : </Text>
                </GridItem>
                <GridItem w="100%" h="20">
                  <Text>
                    {" "}
                    {recordModif.nom} {recordModif.prenom}
                  </Text>
                </GridItem>
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">Date de creation</Text>
                </GridItem>
                <GridItem w="100%" h="20">
                  <Text fontSize="13">{recordTicket.dateCreation}</Text>
                </GridItem>
                <GridItem w="100%" h="20" />
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">
                    Date de mis en état d'identification
                  </Text>
                </GridItem>
                <GridItem w="100%" h="20">
                  <Text fontSize="13">{recordTicket.dateAccepte}</Text>
                </GridItem>
                <GridItem w="100%" h="20" />
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">Date de mis en état resolu</Text>
                </GridItem>
                <GridItem w="100%" h="20">
                  <Text fontSize="13">{recordTicket.dateAccepte}</Text>
                </GridItem>
                <GridItem w="100%" h="20" />
              </Grid>
            </div>
            <div>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem w="100%" h="20">
                  <Text fontWeight="600">Date de mis en état echec</Text>
                </GridItem>
                <GridItem w="100%" h="20">
                  <Text fontSize="13">{recordTicket.dateRefus}</Text>
                </GridItem>
                <GridItem w="100%" h="20" />
              </Grid>
            </div>
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" m="20px">
            <div>
              <Text mb="10px" color={textColor} fontSize="3xl" fontWeight="700">
                Notes
              </Text>
            </div>
            <div>
              <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                <GridItem w="100%" h="10">
                  <Text>{recordTicket.notes}</Text>
                </GridItem>
              </Grid>
            </div>
            <br></br>
          </Box>
        </>
      );
    }
  };
  const SetStatusTicketIDENTIFICARION = async () => {
    dispatch(
      SetStatusTicket({
        idModificateur: localStorage.getItem("user"),
        idTicket: params.get("id"),
        statusTicket: "IDENTIFICATION",
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(DetailsTicket(params.get("id")) as any);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCreateur) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser2(res.idResponsable) as any);
        dispatch(fetchSingleUser3(res.idModificateur) as any);
      });
  };
  const SetStatusTicketFERME_ECHEC = async () => {
    dispatch(
      SetStatusTicket({
        idModificateur: localStorage.getItem("user"),
        idTicket: params.get("id"),
        statusTicket: "FERME_ECHEC",
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(DetailsTicket(params.get("id")) as any);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCreateur) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser2(res.idResponsable) as any);
        dispatch(fetchSingleUser3(res.idModificateur) as any);
      });
  };
  const SetStatusTicketFERME_RESOLU = async () => {
    dispatch(
      SetStatusTicket({
        idModificateur: localStorage.getItem("user"),
        idTicket: params.get("id"),
        statusTicket: "FERME_RESOLU",
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(DetailsTicket(params.get("id")) as any);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCreateur) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser2(res.idResponsable) as any);
        dispatch(fetchSingleUser3(res.idModificateur) as any);
      });
  };
  const ModifierTicket = async () => {
    dispatch(
      SetNotesTicket({
        idModificateur: localStorage.getItem("user"),
        idTicket: params.get("id"),
        notes: InputNotes,
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        console.log(InputNotes);
        dispatch(DetailsTicket(params.get("id")) as any);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCreateur) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser2(res.idResponsable) as any);
        dispatch(fetchSingleUser3(res.idModificateur) as any);
      });

    dispatch(
      setPrioriteTicket({
        idModificateur: localStorage.getItem("user"),
        idTicket: params.get("id"),
        prioriteTicket: SelectPriorite,
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(DetailsTicket(params.get("id")) as any);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCreateur) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser2(res.idResponsable) as any);
        dispatch(fetchSingleUser3(res.idModificateur) as any);
      });

    dispatch(
      setTypeTicket({
        idModificateur: localStorage.getItem("user"),
        idTicket: params.get("id"),
        typeTicket: SelectType,
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(DetailsTicket(params.get("id")) as any);
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCreateur) as any);
        dispatch(fetchSingleUserEntreprise(res.idEntreprise) as any);
        dispatch(fetchSingleUser2(res.idResponsable) as any);
        dispatch(fetchSingleUser3(res.idModificateur) as any);
      });
    onClose();
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid 
       mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          {/* <Banner /> */}
          <Flex direction="column">
            <Box pt={{ base: "180px", md: "50px", xl: "20px" }} bg="white">
              <Flex
                mt="10px"
                ml="10px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "left" }}>
                <Button
                  leftIcon={<EmailIcon />}
                  variant="darkBrand"
                  onClick={onOpen}>
                  MODIFIER
                </Button>
                {renderDataTicketStatus()}
              </Flex>
            </Box>
            <Box
              pt={{ base: "180px", md: "50px", xl: "20px" }}
              bg="white"
              mt="10px">
              {renderDataTicketDetails()}

              <Tabs isManual variant="enclosed">
                <TabList>
                  <Tab>Notes internes</Tab>
                  <Tab>Informations supplémentaires</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>{renderNotesInternesDetails()}</TabPanel>
                  <TabPanel>{renderInformationSuppDetails()}</TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Flex>
        <Activite></Activite>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size="5xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modifier informations de ticket</ModalHeader>
            <ModalCloseButton />
            <HSeparator />
            <ModalBody pb={40}>
              <FormControl>
                <Grid
                  h="200px"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={4}>
                  <GridItem colSpan={2}>
                    <FormLabel>Type de ticket</FormLabel>
                    <Select
                      placeholder="Type"
                      variant="flushed"
                      size="sm"
                      value={SelectType}
                      onChange={(e) => setSelectType(e.target.value)}>
                      <option value="RECLAMATION">RECLAMATION</option>
                      <option value="CONTRAT">CONTRAT</option>
                      <option value="SERVICE">SERVICE</option>
                      <option value="WEB">WEB</option>
                      <option value="BUG" selected>
                        BUG
                      </option>
                      <option value="AUTRES">AUTRES</option>
                    </Select>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl ml={50}>
                      <FormLabel>Priorite</FormLabel>
                      <Select
                        placeholder="Priorite"
                        variant="flushed"
                        size="sm"
                        value={SelectPriorite}
                        onChange={(e) => setSelectPriorite(e.target.value)}>
                        <option value="FAIBLE">FAIBLE</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="URGENT">URGENT</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
              </FormControl>
              <FormControl mt={-100}>
                <Grid
                  h="200px"
                  templateRows="repeat(3, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={4}>
                  <GridItem colSpan={2}>
                    <FormLabel>Notes</FormLabel>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <GridItem colSpan={5}>
                      <FormControl mt={50} ml={-300} w={700}>
                        <Input
                          placeholder="notes"
                          type="String"
                          variant="flushed"
                          defaultValue={InputNotes}
                          onChange={(e) => {
                            setInputNotes(e.target.value);
                          }}
                        />
                      </FormControl>
                    </GridItem>
                  </GridItem>
                </Grid>
              </FormControl>
            </ModalBody>
            <HSeparator />
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={ModifierTicket}>
                Enregistrer
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Grid>
      {/* Delete Product */}
    </Box>
  );

}
