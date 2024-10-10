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
    Select,
    useToast
  } from "@chakra-ui/react";
  
  // Custom components
  
  // Assets
  import { BsCircleFill } from "react-icons/bs";
  import { GrFormAdd } from "react-icons/gr";
  import { MdPersonRemoveAlt1 } from "react-icons/md";
  import { useRef, useState, useEffect } from "react";
  import { useHistory } from "react-router-dom";
  
  import { useDispatch, useSelector } from "react-redux";
  import { ModifierProduit } from "state/produit/produit_Slice";
  import { FindCategorieById } from "state/categorie/categorie_Slice";
import { updateCmdQuantity } from "state/Commande/Commande_slice";
  type editqteProps = {
    cmddata?: any,
    eventClick: any
  };
  
  export default function Editqte({ cmddata, eventClick }: editqteProps) {
    
  const textColor = useColorModeValue("gray.700", "white");


  const [qte, setqte] = useState(cmddata.qte);
  const toast = useToast();

  const isErrorqte = qte === "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (cmddata) {
      console.log("cmddata.id:", cmddata.idldc);
      setqte(cmddata.qte); 
    }
  }, [cmddata]);
  

 
  const cmdFetch = async () => {
    try {
      console.log("Editing cmd with ID:", cmddata.idldc);
      console.log("qte:", qte);
      const response = await dispatch(
        updateCmdQuantity({
          idldc: cmddata.idldc,
          qte,
        }) as any
      );
      // if (response.payload === "Quantité insuffisante") {
      //   toast({
      //     title: "Quantité insuffisante",
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //     position: "top",
      //   });
      
      // } 
 
      
     return response.payload;




      
    } catch (error) {
      console.log("Error:", error);
    }
  };




      async function testcmd() {
        const response = await dispatch(
          updateCmdQuantity({
            idldc: cmddata.idldc,
            qte,
          }) as any
        );
  if (isErrorqte === true || !/^[0-9]+$/.test(qte)) {
      toast({
        title: "Qte invalide ou contient des lettres!",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }  
    else      if (response.payload === "Quantité insuffisante") {
      toast({
        title: "Quantité insuffisante",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    
    } else{ toast({
      title: "Quantité modifier avec succès!",
      status: 'success',
      duration: 1250,
      isClosable: false,
      position: 'top',
      onCloseComplete: () => window.location.reload()
    })}
     
     try{
      const catOuput= await cmdFetch(); 
     
      const stateChild={
        idldc:catOuput.idldc,
        qte:catOuput.qte
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
                       

                          <FormControl >
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              qte
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="qte"
                              fontSize="xs"
                              name="qte"
                              value={qte}
                              onChange={(e) => setqte(e.target.value)}
                            />
                         
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
                      onClick={testcmd}
                      >
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
