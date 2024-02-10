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
   Select
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
  
  type Overview1Props = {
    produitData?: any;
  };
  
  export default function Overview1({ produitData }: Overview1Props) {
   
  
  
    const textColor = useColorModeValue("gray.700", "white");
  
    const [reference, setreference] = useState(produitData.reference);
    const [nom, setnom] = useState(produitData.nom);
    const [description, setdescription] = useState(produitData.description);
    const [prixInitial, setprixInitial] = useState(produitData.prixInitial);
   
  
    const isErrorreference = reference === "";
    const isErrornom = nom === "";
    const isErrordescription = description === "";
    const isErrorprixInitial = prixInitial === "";
  
    const [categorie, setcategorie] = useState(''); 
    const [isErrorcategorie, setIsErrorcategorie] = useState(false); 
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
  
    let history = useHistory();
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (produitData) {
        setreference(produitData.reference); 
        setnom(produitData.nom); 
        setdescription(produitData.description);
        setprixInitial(produitData.prixInitial); 
       
      }
    }, [produitData]);
  
   
    const ProduitFetch = async () => {
      try {
        console.log(selectedCategoryId);
        const response = await dispatch(
          ModifierProduit({
            idProduit: produitData.id,
            reference,
            nom,
            description,
            prixInitial,
            idCategorie: selectedCategoryId,
          }) as any
        );
    
        console.log("API Response:", response);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    async function testproduit() {
      if (isErrorreference === true) {
        alert("reference invalid");
      } else if (isErrornom === true) {
        alert("nom invalid");
      } else if (isErrordescription === true) {
        alert("description invalid");
      }else if (isErrorprixInitial === true || !/^[0-9]+$/.test(prixInitial)) {
        alert("prix invalid ou contient des lettres");
      }else if (isErrorcategorie === true) {
        alert("categorie invalid");
      }else {
        await ProduitFetch(); 
        alert("Produit modifié avec succès!"); 
        window.location.reload();
      }
    }
    useEffect(() => {
      const fetchCategories = async () => {
   try {
     const response = await fetch('http://localhost:9998/BackendCRM/categorie');
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
                              src={require("assets/img/avatars/categ.png")}
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
      <option key={cat.id} value={cat.id}>
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
  