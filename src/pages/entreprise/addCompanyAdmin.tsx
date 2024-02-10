// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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

// Custom components

// Assets
import { BsCircleFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AddEntreprise } from "state/user/Entreprise_Slice";

export default function Overview() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const [activeBullets, setActiveBullets] = useState({
    about: true,
    account: false,
    address: false,
  });
  const dispatch = useDispatch();
  const aboutTab = useRef(null);
  const accountTab = useRef(null);
  const addressTab = useRef(null);
  const [mail, setMail] = useState("");
  const [numTel, setnumTel] = useState("");
  const [nomEntreprise, setnomEntreprise] = useState("");
  const [numFiscal, setnumFiscal] = useState("");
  const [description, setdescription] = useState("");
  const [ca, setca] = useState("");
  const [domaine, setdomaine] = useState("");
  const [dateCreation, setdateCreation] = useState(new Date().toISOString().split('T')[0]);
  const [adresse, setAdresse] = useState("");
  const isErrormail = mail === "";
  const isErrornumTel = numTel === "";
  const isErrornomEntreprise = nomEntreprise === "";
  const isErrordomaine = domaine === "";
  const isErroradresse = adresse === "";
  let history = useHistory();
  const toast = useToast()
  const EntrepriseFetch = async () => {

    try {
      console.log("test 1");
      await dispatch(
        AddEntreprise({
          mail,
          numTel,
          nomEntreprise,
          numFiscal,
          description,
          ca,
          domaine,
          dateCreation,
          adresse,
        }) as any
      )
        .then((res: any) =>
          history.push("/profile/profile-company?id=" + res.payload.idUser)
        )
        .catch((error: Error) => console.log(error));
    } catch (error) {
      // console.log("test 2")
      console.log(error);
    }
  };

  async function testentreprise() {
    if (isErrormail === true || mail.includes("@") === false) {
      toast({
        title: "Erreur",
        description:"Mail invalid",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } else if (isErrornumTel === true) {
      toast({
        title: "Erreur",
        description:"numero tel invalid",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } else if (isErrornomEntreprise === true) {
      toast({
        title: "Erreur",
        description:"nomEntreprise invalid",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } else if (isErrordomaine === true) {
      toast({
        title: "Erreur",
        description:"domaine invalid",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } else {
      EntrepriseFetch();
    }
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
          backgroundColor="white"
          direction="column"
          align="center"
          pt={{ sm: "125px", lg: "75px" }}>
          <Flex
            direction="column"
            textAlign="center"
            mb={{ sm: "25px", md: "45px" }}>
            <Text
              color={textColor}
              fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              mb="8px">
              Ajoutez votre entreprise
            </Text>
          </Flex>
          <Tabs
            variant="unstyled"
            mt="24px"
            display="flex"
            flexDirection="column">
            <TabList display="flex" alignSelf="center" justifySelf="center">
              <Tab
                ref={aboutTab}
                w={{ sm: "120px", md: "250px", lg: "300px" }}
                onClick={() =>
                  setActiveBullets({
                    about: true,
                    account: false,
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
                    bg: activeBullets.account ? textColor : "gray.200",
                    left: { sm: "12px", md: "26px" },
                    top: { sm: activeBullets.about ? "6px" : "4px", md: null },
                    position: "absolute",
                    bottom: activeBullets.about ? "40px" : "38px",
                    zIndex: -1,
                    transition: "all .3s ease",
                  }}>
                  <Icon
                    as={BsCircleFill}
                    color={activeBullets.about ? textColor : "gray.300"}
                    w={activeBullets.about ? "16px" : "12px"}
                    h={activeBullets.about ? "16px" : "12px"}
                    mb="8px"
                  />
                  <Text
                    color={activeBullets.about ? { textColor } : "gray.300"}
                    fontWeight={activeBullets.about ? "bold" : "normal"}
                    display={{ sm: "none", md: "block" }}
                    fontSize="sm">
                    À propos
                  </Text>
                </Flex>
              </Tab>
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
                    transition="all .3s ease"
                    fontSize="sm"
                    _hover={{ color: textColor }}
                    display={{ sm: "none", md: "block" }}>
                    Domaine
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
                    // bg: activeBullets.profile ? textColor : "gray.200",
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
                        Commençons par les informations de base
                      </Text>
                      <Text color="gray.400" fontWeight="normal" fontSize="sm">
                        Faites-nous savoir le nom et l'adresse e-mail. Utilisez
                        une adresse que vous ne dérangez pas quand d'autres
                        utilisateurs vous contactent à
                      </Text>
                    </Flex>
                  </Flex>
                  <Box>
                    <Flex direction="column" w="100%">
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        w="100%"
                        mb="24px">
                        <Box
                          position="relative"
                          minW={{ sm: "110px", xl: "150px" }}
                          h={{ sm: "110px", xl: "150px" }}
                          mx={{ sm: "auto", md: "40px", xl: "85px" }}
                          mb={{ sm: "25px" }}>
                          <Avatar
                            src={require("assets/img/avatars/company.png")}
                            w="100%"
                            h="100%"
                          />
                        </Box>
                        <Stack direction="column" spacing="20px" w="100%">
                          <FormControl isInvalid={isErrornomEntreprise}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              Nom de Entreprise
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="eg. Michael"
                              fontSize="xs"
                              name="nomEntreprise"
                              value={nomEntreprise}
                              onChange={(e) => setnomEntreprise(e.target.value)}
                            />
                            {!isErrornomEntreprise ? (
                              <FormErrorMessage>
                                Un Nom de Entreprise est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Un Nom de Entreprise est requis.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <FormControl isInvalid={isErrornumTel}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              Numero de Tel
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="eg. Jackson"
                              fontSize="xs"
                              name="numTel"
                              value={numTel}
                              onChange={(e) => setnumTel(e.target.value)}
                            />
                            {!isErrornumTel ? (
                              <FormErrorMessage>
                                Un Numero de Tel est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Un Numero de Tel est requis.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <FormControl isInvalid={isErrormail}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              E-mail
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="eg. example@address.com"
                              fontSize="xs"
                              name="mail"
                              type="email"
                              value={mail}
                              onChange={(e) => setMail(e.target.value)}
                            />
                            {!isErrormail ? (
                              <FormErrorMessage>
                                Un e-mail est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Un e-mail est requis.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <FormControl isInvalid={isErroradresse}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              Adresse
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="eg. example@address.com"
                              fontSize="xs"
                              name="adresse"
                              value={adresse}
                              onChange={(e) => setAdresse(e.target.value)}
                            />
                            {!isErroradresse ? (
                              <FormErrorMessage>
                                Une Adresse est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Une Adresse est requis.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </Stack>
                      </Flex>
                      <Button
                        variant="no-hover"
                        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                        alignSelf="flex-end"
                        mt="24px"
                        w={{ sm: "75px", lg: "100px" }}
                        h="35px"
                        onClick={() => accountTab.current.click()}>
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
                        Vous pouvez choisir le domaine de votre entreprise
                      </Text>
                    </Flex>
                  </Flex>
                  <Box>
                    <Flex direction="column" w="100%">
                      <Stack direction="column" spacing="20px">
                        <FormControl isInvalid={isErrordomaine}>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Domaine
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="eg. Street 120"
                            fontSize="xs"
                            name="domaine"
                            value={domaine}
                            onChange={(e) => setdomaine(e.target.value)}
                          />
                          {!isErrordomaine ? (
                            <FormErrorMessage>
                              Un Domaine est requis.
                            </FormErrorMessage>
                          ) : (
                            <FormErrorMessage>
                              Un Domaine est requis.
                            </FormErrorMessage>
                          )}
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
                          onClick={() => aboutTab.current.click()}>
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
                          onClick={() => addressTab.current.click()}>
                          <Text fontSize="xs" color="#fff" fontWeight="bold">
                            Suivant
                          </Text>
                        </Button>
                      </Flex>
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
                            numéro d'identification fiscale
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="eg. Street 120"
                            fontSize="xs"
                            name="numFiscal"
                            type="number"
                            value={numFiscal}
                            onChange={(e) => setnumFiscal(e.target.value)}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Chiffre d'affaires
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="eg. Street 220"
                            fontSize="xs"
                            name="ca"
                            type="number"
                            value={ca}
                            onChange={(e) => setca(e.target.value)}
                          />
                        </FormControl>
                        <FormControl
                          gridColumn={{ sm: "1 / 3", lg: "auto" }}>
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="xs">
                            Date de Lancement
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="eg. Tokyo"
                            fontSize="xs"
                            type="date"
                            name="dateCreation"
                            value={dateCreation}
                            onChange={(e) => setdateCreation(e.target.value)}
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
                            name="description"
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                          />
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
                          onClick={testentreprise}>
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
