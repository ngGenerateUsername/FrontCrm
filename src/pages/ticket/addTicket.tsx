import {
  Box,
  Button,
  Select,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddTicket, AllTickets } from "state/user/ticket_Slice";
import {
  ListClientsPerContact,
  ListEntreprisePerClient,
} from "state/user/RelationClientUser_Slice";
import {
  RespTicketPerEntreprise,
} from "state/user/Role_Slice";

export default function Overview() {
  const textColor = useColorModeValue("gray.700", "white");
  const aqw = useColorModeValue("white","gray.700");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const [activeBullets, setActiveBullets] = useState({
    about: true,
    account: false,
    address: false,
  });
  let history = useHistory();
  const dispatch = useDispatch();
  const addressTab = useRef(null);
  const accountTab = useRef(null);

  const [SelectClient, setSelectClient] = useState("");
  const [SelectEntreprise, setSelectEntreprise] = useState("");
  const [SelectRespTicket, setSelectRespTicket] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [typeTicket, setTypeTicket] = useState("CONTRAT");
  const [prioriteTicket, setPrioriteTicket] = useState("NORMAL");
  const toast = useToast()
  useEffect(() => {
    dispatch(AllTickets() as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status, record } = useSelector(
    (state: any) => state.AllTicketsExport
  );

  useEffect(() => {
    dispatch(ListClientsPerContact(localStorage.getItem("user")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const {
    status: statusListClientsPerContact,
    record: recordListClientsPerContact,
  } = useSelector((state: any) => state.ListClientsPerContactExport);



  const ListeEntreprisesF = async (id: String) => {
    console.log(id);
    dispatch(ListEntreprisePerClient(id) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        setSelectEntreprise(res[0].idUser);
        ListeRespticketsF(res[0].idUser);
      });
  };
  const {
    status: statusListEntreprisePerClient,
    record: recordListEntreprisePerClient,
  } = useSelector((state: any) => state.ListEntreprisePerClientExport);

  const ListeRespticketsF = async (id: String) => {
    console.log(id);
    dispatch(RespTicketPerEntreprise(id) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
      });
  };
  const {
    status: statuscontactsPerEntreprise,
    record: recordcontactsPerEntreprise,
  } = useSelector((state: any) => state.RespTicketPerEntrepriseExport);

  console.log("liste ticket", record, status);
  console.log(
    "liste clients",
    recordListClientsPerContact,
    statusListClientsPerContact
  );
  console.log(
    "liste entreprise",
    recordListEntreprisePerClient,
    statusListEntreprisePerClient
  );
  console.log(
    "liste respticket",
    recordcontactsPerEntreprise,
    statuscontactsPerEntreprise
  );

  const AddTicketF = async () => {
       console.log(SelectClient);
      if(SelectClient == null || SelectClient === "" || SelectClient === "0"){
        toast({
          title: '"veuillez selectionnez un client"',
          status: 'info',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      }
      else{
      await dispatch(
        AddTicket({
          titre: titre,
          description: description,
          typeTicket: typeTicket,
          prioriteTicket: prioriteTicket,
          idCreateur: localStorage.getItem("user"),
          idEntreprise: SelectEntreprise,
          idClient: SelectClient,
          idResponsable: SelectRespTicket,
        }) as any
      ).unwrap()
        .then((res: any) => {
          alert("creation ticket avec succes");
          console.log(res.idTicket)
          history.push("/ticket/details?id="+res.idTicket)
        })
        .catch((error: Error) => console.log(error));
  }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}  backgroundColor={aqw   }>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Flex
          gridArea="1 / 1 / 4 / 4"
          minH="365px"
          pe="20px"
          direction="column"
          align="center"
          >
          <Flex
            direction="column"
            textAlign="center"
            mb={{ sm: "25px", md: "45px" }}>
            <Text
              color={textColor}
              fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              mb="8px">
              Ajoutez une ticket
            </Text>
          </Flex>
          <Tabs
            variant="unstyled"
            mt="24px"
            display="flex"
            flexDirection="column">
            <TabList display="flex" alignSelf="center" justifySelf="center">
              <Tab
                ref={accountTab}
                w={{ sm: "120px", md: "250px", lg: "300px" }}
                onClick={() =>
                  setActiveBullets({
                    about: true,
                    account: true,
                    address: false,
                  })
                }>
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  position="relative"
                  _before={{
                    content: "''",
                    width: { sm: "120px", md: "250px", lg: "300px" },
                    height: "3px",
                    bg: activeBullets.address ? textColor : "gray.200",
                    left: { sm: "12px", md: "28px" },
                    top: {
                      sm: activeBullets.account ? "6px" : "4px",
                      md: null,
                    },
                    position: "absolute",
                    bottom: activeBullets.account ? "40px" : "38px",
                    zIndex: -1,
                    transition: "all .3s ease",
                  }}>
                  <Icon
                    as={BsCircleFill}
                    color={activeBullets.account ? textColor : "gray.300"}
                    w={activeBullets.account ? "16px" : "12px"}
                    h={activeBullets.account ? "16px" : "12px"}
                    mb="8px"
                  />
                  <Text
                    color={activeBullets.account ? { textColor } : "gray.300"}
                    fontWeight={activeBullets.account ? "bold" : "normal"}
                    fontSize="sm"
                    display={{ sm: "none", md: "block" }}>
                    Details
                  </Text>
                </Flex>
              </Tab>
              <Tab
                ref={addressTab}
                w={{ sm: "120px", md: "250px", lg: "300px" }}
                onClick={() =>
                  setActiveBullets({
                    about: true,
                    account: true,
                    address: true,
                  })
                }>
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  position="relative"
                  _before={{
                    content: "''",
                    width: { sm: "120px", md: "250px", lg: "300px" },
                    height: "3px",
                    left: { sm: "12px", md: "32px" },
                    top: {
                      sm: activeBullets.address ? "6px" : "4px",
                      md: null,
                    },
                    position: "absolute",
                    bottom: activeBullets.address ? "40px" : "38px",
                    zIndex: -1,
                    transition: "all .3s ease",
                  }}>
                  <Icon
                    as={BsCircleFill}
                    color={activeBullets.address ? textColor : "gray.300"}
                    w={activeBullets.address ? "16px" : "12px"}
                    h={activeBullets.address ? "16px" : "12px"}
                    mb="8px"
                  />
                  <Text
                    color={activeBullets.address ? { textColor } : "gray.300"}
                    fontWeight={activeBullets.address ? "bold" : "normal"}
                    transition="all .3s ease"
                    fontSize="sm"
                    _hover={{ color: textColor }}
                    display={{ sm: "none", md: "block" }}>
                    Etape final
                  </Text>
                </Flex>
              </Tab>
            </TabList>
            <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
              <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
                <Box>
                  <Flex mb="40px">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      textAlign="center"
                      w="80%"
                      mx="auto">
                      <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="bold"
                        mb="4px">
                        Commençons par les détails de ticket
                      </Text>
                    </Flex>
                  </Flex>
                  <Box>
                    <Flex direction="column" w="100%">
                      <Stack direction="column" spacing="20px">
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Titre de ticket
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="..."
                            fontSize="xs"
                            name="titre"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Description
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="..."
                            fontSize="xs"
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Type de Ticket
                          </FormLabel>
                          <Select
                            name="typeTicket"
                            value={typeTicket}
                            onChange={(e) => setTypeTicket(e.target.value)}
                            id="owner"
                            defaultValue="CONTRAT">
                            <option value="CONTRAT">CONTRAT</option>
                            <option value="SERVICE">SERVICE</option>
                            <option value="WEB">WEB</option>
                            <option value="BUG">BUG</option>
                            <option value="RECLAMATION">RECLAMATION</option>
                            <option value="AUTRES">AUTRES</option>
                          </Select>
                        </FormControl>
                        <FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Priorite de ticket
                          </FormLabel>
                          <Select
                            name="prioriteTicket"
                            value={prioriteTicket}
                            onChange={(e) => setPrioriteTicket(e.target.value)}
                            defaultValue="NORMAL">
                            <option value="FAIBLE">FAIBLE</option>
                            <option value="NORMAL">NORMAL</option>
                            <option value="URGENT">URGENT</option>
                          </Select>
                        </FormControl>
                      </Stack>

                      <Button
                        variant="no-hover"
                        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                        alignSelf="flex-end"
                        mt="24px"
                        w={{ sm: "75px", lg: "100px" }}
                        h="35px"
                        onClick={() => addressTab.current.click()}>
                        <Text fontSize="xs" color="#fff" fontWeight="bold">
                          Suivant
                        </Text>
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
                <Box>
                  <Flex mb="40px">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      textAlign="center"
                      w="80%"
                      mx="auto">
                      <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="bold"
                        mb="4px">
                        Etape final
                      </Text>
                    </Flex>
                  </Flex>
                  <Box>
                    <Flex direction="column" w="100%">
                      <Stack direction="column" spacing="20px">
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Client
                          </FormLabel>
                          <Select
                            name="SelectClient"
                            id="owner"
                            value={SelectClient}
                            onChange={(e) => {
                              setSelectClient(e.target.value);
                              ListeEntreprisesF(e.target.value);
                            }}>
                            <option value="0">.........</option>
                            {recordListClientsPerContact.map(
                              (e: any, key: any) => (
                                <option key={e.idClient} value={e.idClient}>
                                  {e.nomEntreprise}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Responsable ticket
                          </FormLabel>
                          <Select
                            name="ss"
                            id="ss"
                            value={SelectRespTicket}
                            onChange={(e) => {
                              setSelectRespTicket(e.target.value);
                            }}>
                            <option value="0">.........</option>
                            {recordcontactsPerEntreprise.map(
                              (e: any, key: any) => (
                                <option value={e.idUser} key={e.idUser}>
                                  {e.nom} {e.prenom}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Flex justify="space-between">
                        <Button
                          variant="no-hover"
                          bg={bgPrevButton}
                          alignSelf="flex-end"
                          mt="24px"
                          w={{ sm: "75px", lg: "100px" }}
                          h="35px"
                          onClick={() => accountTab.current.click()}>
                          <Text
                            fontSize="xs"
                            color="gray.700"
                            fontWeight="bold">
                            Précédent
                          </Text>
                        </Button>
                        <Button
                          variant="no-hover"
                          bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                          alignSelf="flex-end"
                          mt="24px"
                          w={{ sm: "75px", lg: "100px" }}
                          h="35px"
                          onClick={AddTicketF}>
                          <Text fontSize="xs" color="#fff" fontWeight="bold">
                            Ajouter
                          </Text>
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Grid>
    </Box>
  );
}
