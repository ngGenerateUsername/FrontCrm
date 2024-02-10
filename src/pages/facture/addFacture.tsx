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
import { AllCategories, AllProduct } from "state/Offre/ProductSlices";
import { useSelector } from "react-redux";
import { MultiSelect } from "primereact/multiselect";
import { OverlayPanel } from "primereact/overlaypanel";
import { AddOffre, AllOffre } from "state/Offre/OffreSlices";
import { set } from "lodash";
import { CloseIcon, DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Dropdown } from "primereact/dropdown";
import { DateDisplay } from "helpers/DateDisplay";
import { AddFacture } from "state/Facture/FactureSlices";



let nextId = 0;



export default function OverviewFacture(props:{onClose:any,listOffre:any,setListOffre:any}) {



  const tableRef   = useRef(null);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalRemise, setTotalRemise] = useState(0)
  const [totalHT, setTotalHT] = useState(0)
  const [totalTVA, setTotalTVA] = useState(0)
  const [totalTTC, setTotalTTC] = useState(0)
  const [offretotalTTC, setOffreTotalTTC] = useState(0)
  const [offretotalHT, setOffreTotalHT] = useState(0)

  const textColor = useColorModeValue("gray.700", "white");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const bgAdd = useColorModeValue("blue.100", "blue.100");
  const [devisOffre,setDevisOffre] = useState("")
  const [devisProd,setDevisProd] = useState("")
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

  const [listoffre, setListOffre] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState(null);
  useEffect(() => {
    dispatch(AllOffre() as any);
  }, [dispatch]);

  const { status:offerStatus, record:offers, error } = useSelector((state: any) => state.AllOffreExport);
  const [Alloffre, setAllOffre] = useState([])

      useEffect(() => {
      setAllOffre(offers)
      console.log("call api",Alloffre)
    }, [offers])

    const ajouterOffre = () => {
      if(listoffre.length === 0){
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

  
  
      setListOffre([...listoffre, ...selectedOffre])
      if (Alloffre) {
        const newToSelect = Alloffre.filter((sp: any) =>
          !selectedOffre.some((s: any) => s.idOffre === sp.idOffre)
        );
  
        setAllOffre(newToSelect);
        setSelectedOffre(null)
      }
      
      setTimeout(() => {
        if (tableRef.current) {
          tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
  
  
    }
    const removeOffre=(id:any)=>{
      const newList = listoffre.filter((lo:any)=>lo.idOffre !== id)
      setListOffre(newList);  
      console.log("new lissstt",newList);
      const offre =offers.find((sp: any) =>
      sp.idOffre === id
    );
    console.log("the offre a jouter",offre)
    console.log("inside")
    setAllOffre([...Alloffre,offre]);
    
    }
  //******************************************************* */



  const [listProduit, setListProduit] = useState([]);
  const [MailAddContact, setMailAddContact] = useState("");

  const [title, setTitle] = useState("")
  const [titleOffre, setTitleOffre] = useState("")
  const [valid,setValid] =useState(true);
  
  const addFacture = async () => {
    
    if (!title) {
      setValid(false);
      toast({
        title: "Ajouter le titre de facture",
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
    if (listoffre.length === 0) {
      setValid(false);
      toast({
        title: "Selectionner ou ajouter un offre",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
      return;
    }
 
    if (listProduit.length>0) {
      toast({
        title: "il faut créer l'offre ",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
      return
    }

  

    const listToAdd = listoffre.map((o: any) => {
   
      return {
        idOffre: o.idOffre,
        prixHT: o.totaleHT.toFixed(3),
        prixHTTC: o.totaleHTTC.toFixed(3),
      }
    })
    const newFacture = {
      title: title,
      idCommercial:localStorage.getItem("user"),
      idClient:selectedClient.idClient,
      lignes: listToAdd

    }
    try {
      const addedFacture = await dispatch(AddFacture(newFacture) as any)
      console.log("new facture ", addedFacture)
      toast({
        title: "Devis ajouté avec succée",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
       props.setListOffre([...props.listOffre,addedFacture.payload])
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



  const addOffre = async () => {

    if(!titleOffre){
      toast({
        title: "Ajouter le titre d'offre",
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
    console.log("rrrrrrrrrrrrrrrrrrr",listProduit[0].typeDevis)
    
    if(listProduit[0]?.typeDevis !== devisOffre){
      toast({
        title: "ajouter offre de meme devise",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
      return;
     }
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
      title:titleOffre,
      idCommerciale:localStorage.getItem("user"),
      tvaMontant: totalTVA.toFixed(3),
      totalePrixHT: totalHT.toFixed(3),
      totalePrixHTTC: totalTTC.toFixed(3),
      listOffre: listOffre,
      typeOffre:"Offre"

    }
    try {
      const addedOffre = await dispatch(AddOffre(newOffre) as any)

      console.log("new offre ",  addedOffre.payload)
      toast({
        title: "Offre ajouté avec succée",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })


       setListProduit([])
       setTitleOffre("")
      console.log("list offre",listoffre)
       setListOffre([...listoffre, addedOffre.payload])
       setTimeout(() => {
        if (tableRef.current) {
          tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);

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

  const [selectedClient,setSelectedClient]=useState(null)
  const [clients,setClients]=useState(null)
   useEffect(() => {
     dispatch(fetchClients() as any);
   }, [dispatch]);
   const { status:clientStatus, record:clientRecord } = useSelector((state: any) => state.fetchClientsExport);


  const [selectedCat,setSelectedCat]= useState<any>();
  useEffect(() => {
    dispatch(AllCategories() as any);
  }, [dispatch])

  const { status:CategoriesStatus, record:Categories } = useSelector((state: any) => state.AllCategoriesExport);


  useEffect(() => {
    dispatch(AllProduct() as any);
  }, [dispatch])

  const { status, record } = useSelector((state: any) => state.AllProductExport);
  const [AllProds, setAllProduct] = useState([])

  const [prodInterm,setProdInterm]=useState([])
  useEffect(() => {
    setAllProduct(record)
    setProdInterm(record)
    console.log("call api")
  }, [record])

  useEffect(() => {
    if(selectedCat){
      const newProds = AllProds.filter((p:any)=>p.categorie.idCategorie === selectedCat.idCategorie)
      setProdInterm(newProds)
    }

   console.log("in here")
  }, [selectedCat])

  useEffect(() => {
    setClients(clientRecord)

  }, [clientRecord])

  const ajouterProduit = () => {
    if(listProduit.length === 0){
      if(selectedProduct.length > 1){
        let returning = false;
        selectedProduct.forEach((element:any) => {
     
          if(element.typeDevis !== selectedProduct[0].typeDevis ){
            toast({
              title: "ajouter produit de meme devise ",
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
        setDevisProd(selectedProduct[0].typeDevis) 
      }
    }else{
      if(selectedProduct.length > 1){
        let returni = false;
        selectedProduct.forEach((element:any) => {
        
          if(element.typeDevis !== devisProd ){
            toast({
              title: "ajouter produit de meme devise ",
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
        setDevisProd(listProduit[0].typeDevis) 
        console.log("i am hereeeeeeeeeee",devisProd)
        console.log("i am hereeeeeeeeeee tooooo",selectedProduct[0].typeDevis)
        if(devisProd !== selectedProduct[0].typeDevis) {
          toast({
            title: "ajouter produit de meme devise ",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          })
          return
        }
      }
    }
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
        typeDevis:p.typeDevis
      }
    })


    setListProduit([...listProduit, ...newList])
    if (AllProds) {
      const newToSelect = AllProds.filter((sp: any) =>
        !selectedProduct.some((s: any) => s.idProduit === sp.idProduit)
      );
      setAllProduct(newToSelect)
      setProdInterm(newToSelect);
      setSelectedProduct(null)
      setSelectedCat(null)
     
    }


  }

  const calculateTotalHT = () => {
    let tot = listoffre.reduce(function (total, curr) {
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
    let tot = listoffre.reduce(function (total, curr) {


      return total + curr.tvaMontant;
    }, 0)

    return (tot)
  }
  const calculateTotal = () => {
    let tot = listoffre.reduce(function (total, curr) {


      return total + curr.totaleHTTC;
    }, 0)

    return (tot)
  }
  const calculateOffreTotal = () => {
    let tot = listProduit.reduce(function (total, curr) {


      return total + curr.prixTTC;
    }, 0)

    return (tot)
  }
  const calculateOffreTotalHT = () => {
    let tot = listProduit.reduce(function (total, curr) {
      return total + curr.prixHT;
    }, 0)

    return (tot)
  }
  useEffect(() => {
    setTotalHT(calculateTotalHT())
    setTotalTVA(calculateTotalTVA())
    setTotalTTC(calculateTotal())
 
  }, [listoffre])

  useEffect(() => {
    setOffreTotalHT(calculateOffreTotalHT())
    setOffreTotalTTC(calculateOffreTotal())
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
setSelectedCat(null)
 setAllProduct([...AllProds,product]);
setProdInterm([...AllProds,product]);

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


              <TabPanel w={{ sm: "330px", md: "700px", lg: "1080px" }} mx="auto">
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
                        Ajouter un facture
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
                            Titre de l'facture
                          </FormLabel>
                          <Input
                            isInvalid={valid?false:true}
                            borderRadius="15px"
                            placeholder="titre de facture"
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
                            <Dropdown  appendTo="self" value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="nomEntreprise" placeholder="Selectionner le client" 
    filter  className="w-full md:w-14rem"  />
  
                            </Stack>
                          </FormControl>
                          <FormControl px={8}  >
                            <FormLabel
                              color={textColor}
                              fontWeight="bold"
                              fontSize="m">
                              Sélectionnez une offre existante
                            </FormLabel>
                            <Stack  >
                              <MultiSelect appendTo="self" value={selectedOffre} onChange={(e) => setSelectedOffre(e.value)} options={Alloffre} optionLabel="title"
                                filter placeholder="Selectionner les Offres" maxSelectedLabels={3} className="w-full md:w-20rem " />
  
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
                          <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="bold"
                      >
                        Créer une offre:
                      </Text>
                      <FormControl px={8} >
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="m">
                            Titre de l'offre
                          </FormLabel>
                          <Input
                            borderRadius="15px"
                            placeholder="titre de l'offre"
                            fontSize="m"
                            type="text"
                            value={titleOffre}
                            onChange={(e) => setTitleOffre(e.target.value)}
                          />
                        </FormControl>
                        <FormControl px={8}  >
                            <FormLabel
                              color={textColor}
                              fontWeight="bold"
                              fontSize="m">
                              Selectionner la Categorie
                            </FormLabel>
                            <Stack  >
                            <Dropdown  appendTo="self" value={selectedCat} onChange={(e) => setSelectedCat(e.value)} options={Categories} optionLabel="nom" placeholder="Selectionner la Categorie" 
    filter  className="w-full md:w-14rem" />
  
                            </Stack>
                          </FormControl>
                  
                        <FormControl px={8}  >
                          <FormLabel
                            color={textColor}
                            fontWeight="bold"
                            fontSize="m">
                            Selectionner les produits
                          </FormLabel>
                          <Stack  >
                            <MultiSelect appendTo="self" value={selectedProduct} onChange={(e) => setSelectedProduct(e.value)} options={prodInterm} optionLabel="nom"
                              filter placeholder="Selectionner les produits" maxSelectedLabels={3} className="w-full md:w-20rem " />

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
                              ajouterProduit()
                            }>
                                 <Text
                        color={textColor}
                        fontSize="md"
                        fontWeight="bold"
                      >
                        Ajouter produit :
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
                      <TableContainer>
                        <ChakraProvider>
                          {listProduit.length > 0 &&
                            <Table size="sm" variant="simple" colorScheme="brand" >

                              <Thead>
                                <Tr>
                                  <Th ><center>Produit</center></Th>
                                  <Th><center>Prix unitaire</center></Th>
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
                                          as={CloseIcon}
                                          color={
                                            activeBullets.about
                                              ?  "red.300"
                                              : "red.300"
                                          }
                                          w={activeBullets.about ? "16px" : "12px"}
                                          h={activeBullets.about ? "16px" : "12px"}
                  
                                          
                                        />
                                      </Button>
                                    </Td>
                                  </Tr>
                                  
                                ))}
                                     <Tr  >
                                       <Td></Td>
                                      <Td></Td>
                                      <Td></Td>
                                      <Td><center><strong>TOTAL</strong></center></Td>
                               
                                      <Td><center><strong>{offretotalHT.toFixed(3)}</strong>  </center></Td>
                                      <Td><center><strong>{offretotalTTC.toFixed(3)}</strong> </center></Td>
                                  
                                    </Tr>
                              </Tbody>
                              
                            </Table>
                          }
                        </ChakraProvider>
                      </TableContainer>
                      <ChakraProvider>
                      <Button
                          variant="no-hover"
                          bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                          alignSelf="flex-end"
                          mt="24px"
                          w={{ sm: "75px", lg: "100px" }}
                          h="35px"
                          onClick={addOffre}
                        >
                          <Text fontSize="xs" color="#fff" fontWeight="bold">
                            Ajouter Offre
                          </Text>
                        </Button>
                    
                      </ChakraProvider>
                    
                      <ChakraProvider>
                          
                          {listoffre.length > 0 &&  listoffre.map((offre) => (
                            <div  key={offre.idOffre}>
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
                          <DateDisplay dateTimeString={offre.createdAt}/>   
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
                                                ?  "red.300"
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
                        
                          <TableContainer ref={tableRef}>
                         
                            
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
                                
                                  {offre.ligneOffres.map((prod:any) => (
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
                    </Flex>
                    <Flex justify="flex-end" >


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
<Flex justify="flex-end">

<Button
  variant="no-hover"
  bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
  alignSelf="flex-end"
  mt="24px"
  w={{ sm: "75px", lg: "100px" }}
  h="35px"
  onClick={addFacture}
>
  <Text fontSize="xs" color="#fff" fontWeight="bold">
    Creer Facture
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
