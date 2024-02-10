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
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  // Custom components
  
  // Assets
  import { BsCircleFill } from "react-icons/bs";
  import { GrFormAdd } from "react-icons/gr";
  import { MdPersonRemoveAlt1 } from "react-icons/md";
  import { useRef, useState } from "react";
  import { useHistory } from "react-router-dom";
  
  import { useDispatch } from "react-redux";
  import { AddCategorie } from "state/categorie/categorie_Slice";
  import { AddRelationClientUser } from "state/user/RelationClientUser_Slice";
  import { entreprisePerContact } from "state/user/Role_Slice";
  import { AddContact } from "state/user/SignUp_Slice";
  let nextId = 0;
  export default function Overview() {
    const textColor = useColorModeValue("gray.700", "white");

  
    const [nom, setnom] = useState("");
    const isErrornom = nom === "";

    const [tva, settva] = useState("");
    const isErrortva = tva === "";
    let history = useHistory();
    const dispatch = useDispatch();
  
   
  
    const CategorieFetch = async () => {
      try {
        console.log("test 1");
        await dispatch(
            AddCategorie({
           nom,
           tva
          }) as any
        )
        
          .catch((error: Error) => console.log(error));
      } catch (error) {
        // console.log("test 2")
        console.log(error);
      }
    };
  
    async function testcategorie() {
      if (isErrortva === true || !/^[0-9]+$/.test(tva)) {
        alert("TVA invalide ou contient des lettres");
      } else if (isErrornom === true) {
        alert("nom invalid");
      } else {
        await CategorieFetch(); 
        alert("Catégorie ajoutée avec succès!"); 
        window.location.reload();
      }
    }
    
  
    return (
      <Box>
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
            align="center">
          
            <Tabs
              variant="unstyled"
              mt="24px"
              display="flex"
              flexDirection="column">
          
              <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
                <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
                  <Box>
                   
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
                              src={require("assets/img/avatars/categ.png")}
                              w="100%"
                              h="100%"
                            />
                          </Box>
                          <Stack direction="column" spacing="20px" w="100%">
                            <FormControl isInvalid={isErrornom}>
                              <FormLabel
                                color={textColor}
                                fontSize="xs"
                                fontWeight="bold">
                                Nom de Catégorie
                              </FormLabel>
                              <Input
                                isRequired={true}
                                borderRadius="15px"
                                placeholder="nom"
                                fontSize="xs"
                                name="nom"
                                value={nom}
                                onChange={(e) => setnom(e.target.value)}
                              />
                              {!isErrornom ? (
                                <FormErrorMessage>
                                  Le nom est requis.
                                </FormErrorMessage>
                              ) : (
                                <FormErrorMessage>
                                  Le nom est requis.
                                </FormErrorMessage>
                              )}
                            </FormControl>

                            <FormControl isInvalid={isErrortva}>
                              <FormLabel
                                color={textColor}
                                fontSize="xs"
                                fontWeight="bold">
                                TVA
                              </FormLabel>
                              <Input
                                isRequired={true}
                                borderRadius="15px"
                                placeholder="tva"
                                fontSize="xs"
                                name="tva"
                                value={tva}
                                onChange={(e) => settva(e.target.value)}
                              />
                              {!isErrortva ? (
                                <FormErrorMessage>
                                  Le TVA est requis.
                                </FormErrorMessage>
                              ) : (
                                <FormErrorMessage>
                                  Le TVA est requis.
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
                        onClick={testcategorie}>
                        <Text fontSize="xs" color="#fff" fontWeight="bold">
                          Enregistrer
                        </Text>
                      </Button>
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
  