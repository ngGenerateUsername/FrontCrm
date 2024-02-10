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
    VStack,
    extendTheme,
    ChakraProvider,
    Tfoot,
    HStack,
    NumberInputStepper,
    NumberInput,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputField,
  } from "@chakra-ui/react";

  import { Select } from '@chakra-ui/react';
  // Custom components

  // Assets
  import { BsCircleFill } from "react-icons/bs";
  import { GrFormAdd } from "react-icons/gr";
  import { MdPersonRemoveAlt1 } from "react-icons/md";
  import { useEffect, useRef, useState } from "react";
  import { useHistory } from "react-router-dom";

  import { useDispatch } from "react-redux";
  import { AddClient } from "state/user/Client_Slice";
  import { AddRelationClientUser, CLientsOfMyEntreprise, MyCLientsUser } from "state/user/RelationClientUser_Slice";
  import { entreprisePerContact } from "state/user/Role_Slice";
  import { AddContact } from "state/user/SignUp_Slice";
  import { CUIAutoComplete } from 'chakra-ui-autocomplete'
  import { AllProduct } from "state/Offre/ProductSlices";
  import { useSelector } from "react-redux";
  import { MultiSelect } from "primereact/multiselect";
  import { OverlayPanel } from "primereact/overlaypanel";
  import { AddOffre, UpdateOffre } from "state/Offre/OffreSlices";
  import { set } from "lodash";
import OffreDetails from "./OffreDetails";



  let nextId = 0;



  export default function OverviewOffreEdit(props:{onClose:any,offreDetails:any,setOffreDetails:any}) {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [totalRemise, setTotalRemise] = useState(0)
    const [totalHT, setTotalHT] = useState(0)
    const [totalTVA, setTotalTVA] = useState(0)
    const [totalTTC, setTotalTTC] = useState(0)

    const textColor = useColorModeValue("gray.700", "white");
    const bgPrevButton = useColorModeValue("gray.100", "gray.100");
    const bgAdd = useColorModeValue("blue.100", "blue.100");

    const [activeBullets, setActiveBullets] = useState({
      about: true,
      account: false,
      address: false,
    });

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
    const [dateCreation, setdateCreation] = useState("");
    const [adresse, setAdresse] = useState("");
    const isErrormail = mail === "";
    const isErrornumTel = numTel === "";
    const isErrornomEntreprise = nomEntreprise === "";
    const isErrordomaine = domaine === "";
    const isErroradresse = adresse === "";
    let history = useHistory();
    const dispatch = useDispatch();
    const toast = useToast();

    //******************************************************* */





    //******************************************************* */



    const [listProduit, setListProduit] = useState([]);
    const [listToEdit,setListToEdit]=useState([])

    useEffect(() => {

        setListToEdit(props.offreDetails.ligneOffres);
    }, [props.offreDetails.ligneOffres]);
    
    useEffect(() => {

        const newList = listToEdit && listToEdit.map((p: any) => {
            return {
                idProduit: p.produit.idProduit,
                tva: p.produit.categorie.tva,
                nom: p.produit.nom,
                prix: p.produit.prixInitial,
                qte: p.qte,
                remise: p.remise,
                prixHT: p.prixHT,
                prixTTC: p.prixTTC,
            };
        });
       
        setListProduit(newList);
   
    }, [listToEdit]);




    const [title, setTitle] = useState(props.offreDetails.title)
    const [valid,setValid] =useState(true);
    const EditOffre = async () => {

      if (!title) {
        setValid(false);
        toast({
          title: "Ajouter le titre du l'offre",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        })
        return;
      }
      if (listProduit.length===0) {
        toast({
          title: "Selectionner les produit",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        })
        return
      }
      console.log("111111111111111111")
      const listOffre = listProduit.map((p: any) => {

        return {
          idProduit: p.idProduit,
          remise: p.remise.toFixed(3),
          prixHT: p.prixHT.toFixed(3),
          prixTTC: p.prixTTC.toFixed(3),
          qte: p.qte
        }
      })
      const newOffre = {
        title: title,
        idOffre:props.offreDetails.idOffre,
        // idCommerciale:localStorage.getItem("user"),
        tvaMontant: totalTVA,
        totalePrixHT: totalHT,
        totalePrixHTTC: totalTTC,
        listOffre: listOffre

      }
      try {
        const UpdatedOffre = await dispatch(UpdateOffre(newOffre) as any)
        console.log("new offre ", UpdatedOffre)
        toast({
          title: "Offre modifié avec succée",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        
         props.setOffreDetails(UpdatedOffre.payload);
    
  
         props.onClose();
      } catch (err) {
        toast({
          title: "Erreur",
          description: `server error ${err}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        console.log(error.message);
      }
    }




    useEffect(() => {
      dispatch(AllProduct() as any);
    }, [dispatch])

    const { status, record, error } = useSelector((state: any) => state.AllProductExport);
    const [AllProds, setAllProduct] = useState([])

    useEffect(() => {
      const newProds = record.filter((np:any)=>
        !listProduit.some((s: any) => s.idProduit === np.idProduit)
      )
      setAllProduct(newProds)
      console.log("call api")
    }, [record])





    const ajouterProduit = () => {
      if (!selectedProduct) {
        toast({
          title: "Selectionner les produit",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        })
        return
      }
      const newList = selectedProduct.map((p: any) => {
        return {
          idProduit: p.idProduit,
          tva: p.categorie.tva,
          nom: p.nom,
          prix: p.prixInitial,
          qte: 1,
          remise: 0,
          prixHT: p.prixInitial,
          prixTTC: p.prixInitial + (p.prixInitial * (p.categorie.tva) / 100),
        }
      })


      setListProduit([...listProduit, ...newList])
      if (AllProds) {
        const newToSelect = AllProds.filter((sp: any) =>
          !selectedProduct.some((s: any) => s.idProduit === sp.idProduit)
        );

        setAllProduct(newToSelect);
        setSelectedProduct(null)
      }


    }

    const calculateTotalHT = () => {
      let tot =listProduit && listProduit.reduce(function (total, curr) {
        return total + curr.prixHT;
      }, 0)

      return (tot)
    }

    const calculateTotalRemise = () => {
      let tot =listProduit && listProduit.reduce(function (total, curr) {
        return total + (curr.prix * curr.qte) - curr.prixHT;
      }, 0)

      return (tot)
    }

    const calculateTotalTVA = () => {
      let tot =listProduit && listProduit.reduce(function (total, curr) {


        return total + (curr.prixTTC - curr.prixHT);
      }, 0)

      return (tot)
    }
    const calculateTotal = () => {
      let tot =listProduit && listProduit.reduce(function (total, curr) {


        return total + curr.prixTTC;
      }, 0)

      return (tot)
    }

    useEffect(() => {
      setTotalHT(calculateTotalHT())
      setTotalRemise(calculateTotalRemise())
      setTotalTVA(calculateTotalTVA())
      setTotalTTC(calculateTotal())
    }, [listProduit])
    const handleCellChange = (rowIndex: any, columnName: any, newValue: any) => {
      // Update the state with the new value
      const updatedData = [...listProduit];
      updatedData[rowIndex][columnName] = parseFloat(newValue);

      updatedData[rowIndex]["prixHT"] = parseFloat(newValue) * updatedData[rowIndex]["prix"];

      const prix = updatedData[rowIndex]["qte"] * updatedData[rowIndex]["prix"]

      updatedData[rowIndex]["prixHT"] = prix - (prix * updatedData[rowIndex]["remise"] / 100);
      updatedData[rowIndex]["prixTTC"] = updatedData[rowIndex]["prixHT"] + updatedData[rowIndex]["prixHT"] * updatedData[rowIndex]["tva"] / 100;


      setListProduit(updatedData);


    };


    const removeProduct=(id:any)=>{
      const newList = listProduit.filter((lp:any)=>lp.idProduit !== id)
      setListProduit(newList);
      const product =record.find((sp: any) =>
      sp.idProduit === id
    );
    setAllProduct([...AllProds,product]);
    
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
              <TabList display="flex" alignSelf="center" justifySelf="center">



              </TabList>
              <TabPanels mt="24px" maxW={{ md: "90%", lg: "120%" }} mx="auto">


                <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
                  <Box>
                    <Flex mb="20px">
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
                        >
                          Modifier un Offre
                        </Text>
                      </Flex>
                    </Flex>
                    <Box>
                      <Flex direction="column" w="100%">
                        <Stack direction="column" spacing="20px" >
                          <FormControl px={8} >
                            <FormLabel
                              color={textColor}
                              fontWeight="bold"
                              fontSize="m">
                              Titre de l'offre
                            </FormLabel>
                            <Input
                              isInvalid={valid?false:true}
                              borderRadius="15px"
                              placeholder="titre de l'offre"
                              fontSize="m"
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormControl>
                          <FormControl px={8}  >
                            <FormLabel
                              color={textColor}
                              fontWeight="bold"
                              fontSize="m">
                              Selectionner les produits
                            </FormLabel>
                            <Stack  >
                              <MultiSelect appendTo="self" value={selectedProduct} onChange={(e) => setSelectedProduct(e.value)} options={AllProds} optionLabel="nom"
                                filter placeholder="Selectionner les produits" maxSelectedLabels={3} className="w-full md:w-20rem " />

                            </Stack>
                          </FormControl>


                          <Box>
                            <Button
                              variant="no-hover"
                              bg={bgAdd}
                              alignSelf="flex-end"
                              mt="24px"
                              w={{ sm: "75px", lg: "100px" }}
                              h="35px"
                              onClick={() =>
                                ajouterProduit()
                              }>
                              <Icon
                                as={GrFormAdd}
                                color={
                                  activeBullets.about ? textColor : "gray.300"
                                }
                                w={activeBullets.about ? "16px" : "12px"}
                                h={activeBullets.about ? "16px" : "12px"}
                                mb="8px"
                              />
                            </Button>
                          </Box>
                        </Stack>
                        <br></br>
                        <TableContainer>
                          <ChakraProvider>
                            {listProduit?.length > 0 &&
                              <Table size="sm" variant="simple" colorScheme="brand" >

                                <Thead>
                                  <Tr>
                                    <Th ><center>Produit</center></Th>
                                    <Th><center>Prix unitaire(TND)</center></Th>
                                    <Th > <center>Quantité</center> </Th>
                                    <Th><center>Remise %</center></Th>
                                    <Th><center>Prix HT</center></Th>
                                    <Th><center>Prix TTC</center></Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {listProduit.map((prod, index) => (
                                    <Tr key={prod.idProduit} >
                                      <Td>{prod.nom} (<small> <strong>TVA=</strong>{prod.tva}%</small>)</Td>
                                      <Td><center>{prod.prix.toFixed(3)}</center></Td>
                                      <Td >

                                        <NumberInput
                                          minW={200}
                                          defaultValue={prod.qte}
                                          max={30000}
                                          min={1}
                                          clampValueOnBlur={false}
                                          onChange={(e) => handleCellChange(index, 'qte', e)}>
                                          <NumberInputField />
                                          <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                          </NumberInputStepper>
                                        </NumberInput>
                                      </Td>
                                      <Td >
                                        <NumberInput
                                          minW={200}
                                          defaultValue={prod.remise}
                                          max={30000}
                                          min={0}
                                          clampValueOnBlur={false}
                                          onChange={(e) => handleCellChange(index, 'remise', e)}>
                                          <NumberInputField />
                                          <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                          </NumberInputStepper>
                                        </NumberInput>
                                      </Td>
                                      <Td><center>{prod.prixHT.toFixed(3)}</center></Td>
                                      <Td><center>{prod.prixTTC.toFixed(3)}</center></Td>
                                      <Td>
                                        <Button
                                         onClick={() => {
                                          removeProduct(prod.idProduit)
                                          }}>
                                          <Icon
                                            as={MdPersonRemoveAlt1}
                                            color={
                                              activeBullets.about
                                                ? textColor
                                                : "gray.300"
                                            }
                                            w={activeBullets.about ? "16px" : "12px"}
                                            h={activeBullets.about ? "16px" : "12px"}
                                            mb="8px"
                                          />
                                        </Button>
                                      </Td>
                                    </Tr>
                                  ))}
                                </Tbody>
                              </Table>
                            }
                          </ChakraProvider>
                        </TableContainer>
                        <ChakraProvider>
                          <Flex justify="flex-end">


                            {/* <HStack > */}
                            {/* <Table size="sm" colorScheme="brand" >
                              <Thead>
                                <Tr>
                                  <Th isNumeric>TVA</Th>

                                  <Th isNumeric>Base</Th>
                                  <Th isNumeric>Montant TVA</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                <Tr>
                                  <Td isNumeric>25.7</Td>
                                  <Td isNumeric>95.4</Td>
                                  <Td isNumeric>85.4</Td>
                                </Tr>
                                <Tr>
                                  <Td isNumeric>39.48</Td>
                                  <Td isNumeric>80.48</Td>
                                  <Td isNumeric>10.48</Td>
                                </Tr>

                              </Tbody>

                            </Table> */}
                            <Table style={{ width: '30%', marginTop: '30px' }} size="sm" colorScheme="brand" >

                              <Tbody>
                                <Tr>
                                  <Th isNumeric>Remise</Th>

                                  <Td isNumeric>{totalRemise?.toFixed(3)}</Td>
                                </Tr>
                                <Tr>
                                  <Th isNumeric>Total HT</Th>

                                  <Td isNumeric>{totalHT?.toFixed(3)}</Td>
                                </Tr>
                                <Tr>
                                  <Th isNumeric>TVA</Th>

                                  <Td isNumeric>{totalTVA?.toFixed(3)}</Td>
                                </Tr>
                                <Tr>
                                  <Th isNumeric>Total TTC</Th>

                                  <Td isNumeric>{totalTTC?.toFixed(3)}</Td>
                                </Tr>
                              </Tbody>

                            </Table>
                            {/* </HStack> */}
                          </Flex>
                        </ChakraProvider>
                        <Flex justify="flex-end">

                          <Button
                            variant="no-hover"
                            bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                            alignSelf="flex-end"
                            mt="24px"
                            w={{ sm: "140px", lg: "200" }}
                            h="35px"
                            onClick={EditOffre}
                          >
                            <Text fontSize="xs" color="#fff" fontWeight="bold">
                            Sauvegarder Offre
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
