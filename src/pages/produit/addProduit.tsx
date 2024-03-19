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

import { useDispatch } from "react-redux";
import { AddProduit } from "state/produit/produit_Slice";
import { FindCategorieById } from "state/categorie/categorie_Slice";


export default function Overview({clickEvent}:any) {
  const textColor = useColorModeValue("gray.700", "white");

  
  const [nom, setnom] = useState("");
  const isErrornom = nom === "";

  const [reference, setreference] = useState("");
  const isErrorreference = reference === "";

  const [description, setdescription] = useState("");
  const isErrordescription = description === "";

  const [prixInitial, setprixInitial] = useState("");
  const isErrorprixInitial = prixInitial === "";

  const  [qte, setQte] = useState("");
  const isErrorQte = qte === "";

  const  [minQte, setMinQte] = useState("");
  const isErrorMinQte = minQte === "";


  const  [idEntreprise, setidEntreprise] = useState("");
  const isidEntreprise = idEntreprise === "";

const [categories, setCategories] = useState([]);
const [selectedCategoryId, setSelectedCategoryId] = useState("");
const isErrorcategorie = selectedCategoryId === '';


//find devise
  let history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();
 

  const ProduitFetch = async () => {
    try {
      console.log(selectedCategoryId);
     const s= await dispatch(
          AddProduit({
          reference,
          nom,
          description,
          prixInitial:parseFloat(prixInitial),
          qte,
          minQte,
          idEntreprise,
          idCategorie: selectedCategoryId,
        }) as any
      )

        .catch((error: Error) => console.log(error));
        // console.log(s.payload.idProduit);
        return s.payload.idProduit;
    } catch (error) {
      // console.log("test 2")
      console.log(error);
    }
  };

  async function testproduit() {
    if (isErrorreference === true) {
      toast({
        title: "reference invalid",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } else if (isErrornom === true) {
      toast({
        title: "nom invalid",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } else if (isErrordescription === true) {
      toast({
        title: "description invalid",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }else if (isErrorprixInitial === true || !/^[0-9]+$/.test(prixInitial)) {
      toast({
        title: "prix invalid ou contient des lettres",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } else if (isErrorQte === true) {
      toast({
        title: "Qte invalid",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } else if (isErrorMinQte === true) {
      toast({
        title: "min Qte invalid",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }else if (isErrorcategorie === true) {
      toast({
        title: "categorie invalid",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      
    
      }else
    {
      const idProd=await ProduitFetch(); 
      toast({
        title: "Produit ajouté avec succès!",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      // window.location.reload();
      const found=categories.find((cat)=>cat.idCategorie == selectedCategoryId);
    
    
      const produitData={
        idProduit:idProd,
        reference:reference,
        nom:nom,
        description:description,
        prixInitial:Number(prixInitial),
        qte:qte,
        minQte:minQte,
        categorie:{
          idCategorie:found.idCategorie,
          nom:found.nom,
          tva:Number(found.tva)
        }
      }
     
      
    
      clickEvent(produitData);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
 try {
   const response = await fetch('http://localhost:9999/api/categorie/ALLCategories');
   const data = await response.json();
   setCategories(data); 
         } catch (error) {
   console.error('Erreur lors de la récupération des catégories:', error);
 }
};

fetchCategories();
}, []);
  

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
                            src={require("assets/img/avatars/prod.png")}
                            w="100%"
                            h="100%"
                          />
                        </Box>
                        <Stack direction="column" spacing="20px" w="100%">
                        <FormControl isInvalid={isErrorreference}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              Référence 
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="reference"
                              fontSize="xs"
                              name="reference"
                              value={reference}
                              onChange={(e) => setreference(e.target.value)}
                            />
                            {!isErrorreference ? (
                              <FormErrorMessage>
                                La référence est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Le référence est requis.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <FormControl isInvalid={isErrornom}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              Nom 
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

                          <FormControl isInvalid={isErrordescription}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                             Description
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="description"
                              fontSize="xs"
                              name="description"
                              value={description}
                              onChange={(e) => setdescription(e.target.value)}
                            />


                            {!isErrordescription ? (
                              <FormErrorMessage>
                                Le description est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Le description est requis.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          
                      

                          <FormControl isInvalid={isErrorprixInitial}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                             Prix
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="prix"
                              fontSize="xs"
                              name="prixInitial"
                              value={prixInitial}
                              onChange={(e) => setprixInitial(e.target.value)}
                            />
                            {!isErrorprixInitial ? (
                              <FormErrorMessage>
                                Le prix est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Le prix est requis.
                              </FormErrorMessage>
                            )}
                          </FormControl>

                          <FormControl isInvalid={isErrorQte}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                             Quantité
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="prix"
                              fontSize="xs"
                              name="qte"
                              value={qte}
                              onChange={(e) => setQte(e.target.value)}
                            />
                            {!isErrorQte ? (
                              <FormErrorMessage>
                                La quantité est requise.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Le quantité est requise.
                              </FormErrorMessage>
                            )}
                          </FormControl>
                          <FormControl isInvalid={isErrorMinQte}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                             Quantité Min
                            </FormLabel>
                            <Input
                              isRequired={true}
                              borderRadius="15px"
                              placeholder="prix"
                              fontSize="xs"
                              name="minQte"
                              value={minQte}
                              onChange={(e) => setMinQte(e.target.value)}
                            />
                            {!isErrorMinQte ? (
                              <FormErrorMessage>
                                La quantité est requise.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                Le quantité est requise.
                              </FormErrorMessage>
                            )}
                          </FormControl>

                          <FormControl isInvalid={isErrorcategorie}>
                            <FormLabel
                              color={textColor}
                              fontSize="xs"
                              fontWeight="bold">
                              Catégorie
                            </FormLabel>
                            <Select
isRequired={true}
borderRadius="15px"
fontSize="xs"
name="selectedCategoryId"
value={selectedCategoryId} // Utilisez l'ID de la catégorie sélectionnée
onChange={(e) => setSelectedCategoryId(e.target.value)} // Met à jour l'ID de la catégorie sélectionnée
>
<option value="">Sélectionnez une catégorie</option>
{categories.map((cat) => (
  <option key={cat.idCategorie} value={cat.idCategorie}>
    {cat.nom}
  </option>
))}
</Select>

{!isErrorcategorie ? (
                              <FormErrorMessage>
                                La categorie est requis.
                              </FormErrorMessage>
                            ) : (
                              <FormErrorMessage>
                                La categorie est requis.
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
                      onClick={testproduit}>
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
