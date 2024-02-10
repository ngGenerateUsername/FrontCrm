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
  Checkbox,
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
import { AddClient, fetchClients } from "state/user/Client_Slice";
import { AddRelationClientUser, CLientsOfMyEntreprise, MyCLientsUser } from "state/user/RelationClientUser_Slice";
import { entreprisePerContact } from "state/user/Role_Slice";
import { AddContact } from "state/user/SignUp_Slice";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { AllProduct } from "state/Offre/ProductSlices";
import { useSelector } from "react-redux";
import { MultiSelect } from "primereact/multiselect";
import { OverlayPanel } from "primereact/overlaypanel";
import { AddOffre, AllOffre } from "state/Offre/OffreSlices";
import { set } from "lodash";
import { DateDisplay } from "helpers/DateDisplay";
import { CloseIcon, DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Dropdown } from "primereact/dropdown";
import { AddFacture } from "state/Facture/FactureSlices";
import { AddDevis } from "state/devis/devis_Slice";



let nextId = 0;



export default function OverviewDevis(props: { onClose: any, listFacture: any, setListFacture: any }) {

  const [selectedOffre, setSelectedOffre] = useState(null);
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



  const [listOffre, setListOffre] = useState([]);
  const [MailAddContact, setMailAddContact] = useState("");

  const [title, setTitle] = useState("")
  const [valid, setValid] = useState(true);
  const addFacture = async () => {

    if (!title) {
      setValid(false);
      toast({
        title: "Ajouter le titre du devis",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
      return;
    }
    if (!selectedClient) {
      setValid(false);
      toast({
        title: "Selectionner le client",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
      return;
    }
    if (listOffre.length === 0) {
      toast({
        title: "Selectionner les offre",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
      return
    }

    const listToAdd = listOffre.map((o: any) => {

      return {
        idOffre: o.idOffre,
        prixHT: o.totaleHT.toFixed(3),
        prixHTTC: o.totaleHTTC.toFixed(3),
      }
    })
    const newFacture = {
      title: title,
      idCommercial: localStorage.getItem("user"),
      idClient: selectedClient.idClient,
      lignes: listToAdd

    }
    try {
      const addedFacture = await dispatch(AddDevis(newFacture) as any)
      console.log("new facture ", addedFacture)
      toast({
        title: "Devis ajouté avec succée",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      props.setListFacture([...props.listFacture, addedFacture.payload])
      setTitle("")
      setSelectedClient("")
      setListOffre([])
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

  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState(null)
  useEffect(() => {
    dispatch(fetchClients() as any);
  }, [dispatch]);
  const { status: clientStatus, record: clientRecord } = useSelector((state: any) => state.fetchClientsExport);

  useEffect(() => {
    dispatch(AllOffre() as any);
  }, [dispatch]);

  const { status, record, error } = useSelector((state: any) => state.AllOffreExport);
  const [Alloffre, setAllOffre] = useState([])

  useEffect(() => {
    setAllOffre(record)
    console.log("call api", Alloffre)
  }, [record])
  useEffect(() => {
    setClients(clientRecord)

  }, [clientRecord])



const [devisOffre,setDevisOffre]=useState("")
  const ajouterOffre = () => {
    

    if(listOffre.length === 0){
      if(selectedOffre.length > 1){
        let returning = false;
        selectedOffre.forEach((element:any) => {
     
          if(element.ligneOffres[0].produit.typeDevis !== selectedOffre[0].ligneOffres[0].produit.typeDevis ){
            toast({
              title: "ajouter offre de meme devise ",
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
            })
            returning = true;
            return;
          }
        
        });
    if(returning){
      return
    }
      }else{
        setDevisOffre(selectedOffre[0].ligneOffres[0].produit.typeDevis) 
      }
    }else{
      if(selectedOffre.length > 1){
        let returni = false;
        selectedOffre.forEach((element:any) => {
        
          if(element.ligneOffres[0].produit.typeDevis !== devisOffre ){
            toast({
              title: "ajouter offre de meme devise ",
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
            })
            returni = true;
            return;
          }
        
        });
        if(returni){
          return
        }
      }else{
        setDevisOffre(selectedOffre[0].ligneOffres[0].produit.typeDevis) 
    
        console.log("i am hereeeeeeeeeee tooooo",selectedOffre[0].ligneOffres[0].produit.typeDevis)
        if(devisOffre !== selectedOffre[0].ligneOffres[0].produit.typeDevis) {
          toast({
            title: "ajouter offre de meme devise ",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          })
          return
        }
      }
    }
    //*********** */
    if (!selectedOffre) {
      toast({
        title: "Selectionner les offre",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
      return
    }



    setListOffre([...listOffre, ...selectedOffre])
    if (Alloffre) {
      const newToSelect = Alloffre.filter((sp: any) =>
        !selectedOffre.some((s: any) => s.idOffre === sp.idOffre)
      );

      setAllOffre(newToSelect);
      setSelectedOffre(null)
    }


  }

  const calculateTotalHT = () => {
    let tot = listOffre.reduce(function (total, curr) {
      return total + curr.totaleHT;
    }, 0)

    return (tot)
  }

  // const calculateTotalRemise = () => {
  //   let tot = listProduit.reduce(function (total, curr) {
  //     return total + (curr.prix * curr.qte) - curr.prixHT;
  //   }, 0)

  //   return (tot)
  // }

  const calculateTotalTVA = () => {
    let tot = listOffre.reduce(function (total, curr) {


      return total + curr.tvaMontant;
    }, 0)

    return (tot)
  }
  const calculateTotal = () => {
    let tot = listOffre.reduce(function (total, curr) {


      return total + curr.totaleHTTC;
    }, 0)

    return (tot)
  }


  useEffect(() => {
    setTotalHT(calculateTotalHT())
    // setTotalRemise(calculateTotalRemise())
    setTotalTVA(calculateTotalTVA())
    setTotalTTC(calculateTotal())
  }, [listOffre])
  // const handleCellChange = (rowIndex: any, columnName: any, newValue: any) => {
  //   // Update the state with the new value
  //   const updatedData = [...listProduit];
  //   updatedData[rowIndex][columnName] = parseFloat(newValue);

  //   updatedData[rowIndex]["prixHT"] = parseFloat(newValue) * updatedData[rowIndex]["prix"];

  //   const prix = updatedData[rowIndex]["qte"] * updatedData[rowIndex]["prix"]

  //   updatedData[rowIndex]["prixHT"] = prix - (prix * updatedData[rowIndex]["remise"] / 100);
  //   updatedData[rowIndex]["prixTTC"] = updatedData[rowIndex]["prixHT"] + updatedData[rowIndex]["prixHT"] * updatedData[rowIndex]["tva"] / 100;


  //   setListProduit(updatedData);


  // };

  const removeOffre = (id: any) => {
    const newList = listOffre.filter((lo: any) => lo.idOffre !== id)
    setListOffre(newList);
    const offre = record.find((sp: any) =>
      sp.idOffre === id
    );
    setAllOffre([...Alloffre, offre]);

  }


// timbre fiscale function *******************
const [timbre,setTimbre]=useState(false);
const timbreFiscale=()=>{
  if(timbre){
    setTimbre(false);
    setTotalTTC(totalTTC-1)
  }else{
    setTimbre(true)
    setTotalTTC(totalTTC+1)
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
            <TabList display="flex" alignSelf="center" justifySelf="center">



            </TabList>
            <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">


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
                        Ajouter un Devis
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
                            Titre de Devis
                          </FormLabel>
                          <Input
                            isInvalid={valid ? false : true}
                            borderRadius="15px"
                            placeholder="titre de devis"
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
                            Selectionner le client
                          </FormLabel>
                          <Stack  >
                            <Dropdown appendTo="self" value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="nomEntreprise" placeholder="Selectionner le client"
                              filter className="w-full md:w-14rem" />

                          </Stack>
                        </FormControl>
                        <FormControl px={8}  >
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="m">
                            Selectionner les Offre
                          </FormLabel>
                          <Stack  >
                            <MultiSelect appendTo="self" value={selectedOffre} onChange={(e) => setSelectedOffre(e.value)} options={Alloffre} optionLabel="title"
                              filter placeholder="Selectionner les Offre" maxSelectedLabels={3} className="w-full md:w-20rem " />

                          </Stack>
                        </FormControl>


                        <Button
                            variant="no-hover"
                            bg={bgAdd}
                            alignSelf="flex-end"
                            mt="24px"
                            w={{ sm: "75px", lg: "170px" }}
                            h="35px"
                            onClick={() =>
                              ajouterOffre()
                            }>
                               <Text
                        color={textColor}
                        fontSize="md"
                        fontWeight="bold"
                      >
                        Ajouter l'offre :
                      </Text>
                            <Icon
                              as={PlusSquareIcon}
                              color={
                                activeBullets.about ? textColor : "gray.300"
                              }
                              w={activeBullets.about ? "16px" : "12px"}
                              h={activeBullets.about ? "16px" : "12px"}
                      
                            />
                          </Button>
                      </Stack>
                      <br></br>
                      <ChakraProvider>

                        {listOffre.length > 0 && listOffre.map((offre) => (
                          <div key={offre.idOffre}>
                            <Flex
                              direction="column"
                              align="center"
                              justify="center"
                              textAlign="center"
                              w="80%"
                              mx="auto"
                              mt={30}
                            >
                              <Text
                                color={textColor}
                                fontSize="3xl"
                                fontWeight="bold"
                              >
                                {offre.title}
                              </Text>
                              <Text
                                color={textColor}
                                fontSize="sm"

                              >
                                <DateDisplay dateTimeString={offre.createdAt} />
                              </Text>
                            </Flex>
                            <Flex align="end"
                              justify="end">
                              <Button
                              >
                                <Icon
                                  as={DeleteIcon}
                                  color={
                                    activeBullets.about
                                      ? "red.300"
                                      : "red.300"
                                  }
                                  w={activeBullets.about ? "16px" : "12px"}
                                  h={activeBullets.about ? "16px" : "12px"}

                                  onClick={() => {
                                    removeOffre(offre.idOffre)
                                  }}
                                />
                              </Button>
                            </Flex>

                            <TableContainer>


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

                                  {offre.ligneOffres.map((prod: any) => (
                                    <Tr key={prod.id} >
                                      <Td>{prod.produit.nom} (<small> <strong>TVA=</strong>{prod.produit.categorie.tva}%</small>)</Td>
                                      <Td><center>{prod.produit.prixInitial.toFixed(3)}</center></Td>
                                      <Td><center>{prod.qte}</center></Td>
                                      <Td><center>{prod.remise}%</center></Td>

                                      <Td><center>{prod.prixHT.toFixed(3)}</center></Td>
                                      <Td><center>{prod.prixTTC.toFixed(3)}</center></Td>

                                    </Tr>
                                  ))}
                                  <Tr  >
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td><center><strong>TOTAL</strong></center></Td>

                                    <Td><center><strong>{offre.totaleHT.toFixed(3)}</strong>  </center></Td>
                                    <Td><center><strong>{offre.totaleHTTC.toFixed(3)}</strong> </center></Td>

                                  </Tr>
                                </Tbody>
                              </Table>



                            </TableContainer></div>
                        ))}
                      </ChakraProvider>
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
                                <Th isNumeric>Total HT</Th>

                                <Td isNumeric>{totalHT.toFixed(3)}</Td>
                              </Tr>
                              <Tr>
                                <Th isNumeric>TVA</Th>

                                <Td isNumeric>{totalTVA.toFixed(3)}</Td>
                              </Tr>
                              <Tr>
      <Td isNumeric> <Checkbox  size='md' colorScheme='green'  onChange={()=>{timbreFiscale()}}>
    <Text fontWeight="bold" color="gray.800">Timbre fiscal</Text> 
  </Checkbox> </Td>
    
      <Td isNumeric>{timbre?1000:0}</Td>
    </Tr>
                              <Tr>
                                <Th isNumeric>Total TTC</Th>

                                <Td isNumeric>{totalTTC.toFixed(3)}</Td>
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
                          w={{ sm: "200px", lg: "130px" }}
                          h="40px"
                          onClick={addFacture}
                        >
                          <Text fontSize="xs" color="#fff" fontWeight="bold">
                            Creer Devis
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
