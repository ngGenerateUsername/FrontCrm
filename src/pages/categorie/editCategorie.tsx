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
  useToast,
} from "@chakra-ui/react";

// Custom components

// Assets
import { BsCircleFill } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ModifierCategorie } from "state/categorie/categorie_Slice";


type Overview1Props = {
  categoryData?: any,
  eventClick:any
};

export default function Overview1({ categoryData,eventClick }: Overview1Props) {
 


  const textColor = useColorModeValue("gray.700", "white");


  const [nom, setnom] = useState(categoryData.nom);
  const [tva, settva] = useState(categoryData.tva);
  const toast = useToast();

  const isErrornom = nom === "";
  const isErrortva = tva === "";
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryData) {
      console.log("categoryData.nom:", categoryData.nom);
      console.log("categoryData.tva:", categoryData.tva);
      setnom(categoryData.nom); 
      settva(categoryData.tva);
    }
  }, [categoryData]);

 
  const CategorieFetch = async () => {
    try {
      console.log("Editing category with ID:", categoryData.id);
      console.log("nom:", nom);
      console.log("tva:", tva);
  
      const response = await dispatch(
        ModifierCategorie({
          idCategorie: categoryData.id,
          nom,
          tva,
        }) as any
      );
  
      console.log("API Response:", response);
      return response.payload;
    } catch (error) {
      console.log("Error:", error);
    }
  };
  async function testcategorie() {
    if (isErrornom === true) {
      toast({
        title: "Nom invalid!",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }else if (isErrortva === true || !/^[0-9]+$/.test(tva)) {
      toast({
        title: "TVA invalide ou contient des lettres!",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } else {
     
     try {
      const catOuput= await CategorieFetch(); 
      toast({
        title: "Catégorie edité avec succès!",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      // window.location.reload();
      const stateChild={
        idCategorie:catOuput.idCategorie,
        nom:catOuput.nom,
        tva:catOuput.tva
      };
      console.log(`stateCHild li fel child: ${JSON.stringify(stateChild)}`)
      eventClick(stateChild);

     } catch (error) {
      toast({
        title: "problème lors de l'edit categorie",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
        description:error.toString()
      })
     }

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
                        Modifier
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
