import {
  Flex,
  Alert,
  AlertIcon,
  Box,
  Table,
  Spinner,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Heading,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Select,
  useDisclosure,
  FormLabel
} from "@chakra-ui/react";
import * as React from "react";
import { FaAd, FaAddressBook, FaAddressCard, FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { createColumnHelper, SortingState } from "@tanstack/react-table";


// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { useEffect, useState } from "react";
import { Console } from "console";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { AllProduit, DeleteProduit, ModifierProduit } from "state/produit/produit_Slice";
import Overview from "pages/produit/addProduit";
import Overview1 from "pages/produit/editProduit";

type RowObj = {
  name: [string, boolean];
  Domaine: string;
  id: number;
};


//const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function CheckTable() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const [editItemId, setEditItemId] = useState(null);
  const [editItemReference, setEditItemReference] = useState(null);
  const [editItemNom, setEditItemNom] = useState(null);
  const [editItemDescription, setEditItemDescription] = useState(null);
  const [editItemPrixInitial, setEditItemPrixInitial] = useState(null);
  const [editItemCategorieId,setEditItemCategorieId] = useState(null);
  const [editItemCategorieName,setEditItemCategorieName] = useState(null);
  const [editQte,setEditQte] = useState(null);
  const [editMinQte,seteditMinQte] = useState(null);
    const [editProduitData, setEditProduitData] = useState(null);
 
  const btnRef = React.useRef();
  
  let history = useHistory();

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(AllProduit() as any);
    //all product came from prod slice
  }, [dispatch]);
  const { status, record } = useSelector((state: any) => state.AllProduitExport);
  console.log(record, status);


  //add new state
  const [recordState,setRecordState]=useState(record);

  useEffect(()=>{ setRecordState(record) },[record]);

  //manage state child to parent
// Inside the `refreshRecord` function, update the recordState with the modified data
const refreshRecord = (dataFromChild: any) => {
  if (editItemId) {
    const recordUpdate = recordState.map((elemRecord: any) => {
      if (elemRecord.idProduit === dataFromChild.idProduit) {
        return { ...dataFromChild, prixAvecTva: dataFromChild.prixInitial * (1 + dataFromChild.categorie.tva / 100) };
      } else {
        return elemRecord;
      }
    });
    setRecordState(recordUpdate);
  } else {
    dataFromChild.prixAvecTva = dataFromChild.prixInitial * (1 + dataFromChild.categorie.tva / 100);
    setRecordState([...recordState, dataFromChild]);
  }

  onClose();
};

// Inside the component, use `dispatch` to call the `ModifierProduit` action
const ModifProduit = async (updatedData: any) => {
  try {
    const { id, ...restData } = updatedData;

    // Dispatch the action to update the product
    dispatch(ModifierProduit({ id, ...restData }) as any);
    
  } catch (error) {
    // Handle errors, log or show an alert
    console.error("Failed to update product:", error);
  }
};

  //end state added

  const { status: statusCommerciaux, record: recordCommerciaux } = useSelector(
    (state: any) => state.CommerciauxPerEntrepriseExport
  );
  const { status:statusCLientsOfMyEntrepriseJustClients, record:recordCLientsOfMyEntrepriseJustClients } = useSelector(
    (state: any) => state.CLientsOfMyEntrepriseJustClientsExport
  );

  const DeleteProduitF = async (id: string) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  
    if (confirmation) {
      console.log(id);
      dispatch(DeleteProduit(id) as any)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          window.location.reload();
        });
    }
  };
  const [idRelation, setidRelation] = useState("");
  function OpenAffect(id : any, reference: any, nom : any, description : any, prixInitial : any,qte:any,minQte:any , idCategorie:any) {
    console.log("ID sélectionné :", id); 
    const produitToEdit = record.find((e: any) => e.idProduit === id);
    if (produitToEdit) {
      setEditProduitData(produitToEdit);
      setEditItemId(id); 
      setEditItemReference(reference);
      setEditItemNom(nom);
      setEditItemDescription(description);
      setEditItemPrixInitial(prixInitial);
      setEditQte(qte);
      seteditMinQte(minQte);
      setEditItemCategorieId(idCategorie);
      onOpen();
    } else {
      console.log("Produit introuvable");
    }
  }
 

  const renderData = () => {
    if (status === "loading")
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Spinner size="md" />
          </Td>
        </Tr>
      );
    if (status === "failed")
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Alert status="error">
              <AlertIcon />
              Erreur Serveur
            </Alert>
          </Td>
          <Td></Td>
        </Tr>
      );

    if (status === "succeeded") {
      return recordState.map((e: any) => {
        return (
          <Tr>
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {e.reference}
              </Text>
            </Td>
         
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {e.nom}
              </Text>
            </Td>
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {e.description}
              </Text>
            </Td>
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
              {e?.categorie?.nom}
              </Text>
            </Td>
            
         
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {e.prixInitial+ " Dt"}
              </Text>
              </Td>


              <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {e?.categorie?.tva + " %"} 
              </Text>
            </Td>
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {Number(e.prixAvecTva).toFixed(3)+ " Dt"}
              </Text>
            </Td>
            
        
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {Number(e.qte)}
              </Text>
            </Td>
            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                color={textColor}
                fontSize="sm"
                fontWeight="700">
                {Number(e.minQte)}
              </Text>
            </Td>
            <Td>
<Flex
  justifyContent="space-between"
  align="center"
  fontSize={{ sm: "10px", lg: "12px" }}
  color="gray.400"
></Flex>
<Flex
onClick={() => DeleteProduitF(e.idProduit)}
  marginLeft="40%"
  color="limegreen" // Couleur verte
  cursor="pointer"
  alignItems="center"
>
  <FaTrash size={20} /> {/* Taille de l'icône */}
</Flex>
</Td>

<Td>
<Flex
  justifyContent="space-between"
  align="center"
  fontSize={{ sm: "10px", lg: "12px" }}
  color="gray.400"
></Flex>
<Flex
 onClick={()  =>  {
  setEditItemId(e.idProduit);
  setEditItemReference(e.reference); 
  setEditItemNom(e.nom); 
  setEditItemDescription(e.description); 
  setEditItemPrixInitial(e.prixInitial); 
  setEditItemCategorieId(e.categorie.idCategorie);
  setEditItemCategorieName(e.categorie.nom);
  setEditQte(e.qte);
  seteditMinQte(e.minQte);
  
  onOpen();
}}
marginLeft="40%"
color="yellow" // Couleur jaune
cursor="pointer"
alignItems="center"
>
  <FaEdit size={20} /> {/* Taille de l'icône */}
</Flex>
</Td>
        
        </Tr>
      );
    });
  }
};


  return (
    <Card
    flexDirection="column"
    w="100%"
    px="0px"
    overflowX={{ sm: "scroll", lg: "hidden" }}>
    <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
      <Button
        fontSize="sm"
        variant="brand"
        fontWeight="500"
        w="50"
        h="50"
        mb="24px"
        type="submit"
        onClick={onOpen}>
        Ajouter Produit
      </Button>
      <Menu data={recordCLientsOfMyEntrepriseJustClients} />
    </Flex>
         
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
               Référence
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
               Nom de Produit
              </Text>
            </Th>
            
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
            Description           
                 </Text>
            </Th>


            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
              Catégorie
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                              Prix Initial

              </Text>
            </Th>
           
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                                TVA de Categorie

              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
              Prix Avec TVA
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
              Quantité
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
              Quantié Minimum
              </Text>
            </Th>
            
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
               Action
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
               Action
              </Text>
            </Th>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
      <Drawer
        size="xl"
        isOpen={isOpen}
        placement="left"
        onClose={ () => {
           setEditItemId(null); 
        onClose();}}
        id="LeftDrawer"
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{editItemId ? "Modifier  Produit" : "Ajouter Produit"}</DrawerHeader>
          <DrawerBody>
    {editItemId ? (
      <Overview1
      produitData={{ id: editItemId,
         reference: editItemReference,
          nom: editItemNom,
         description: editItemDescription, 
         prixInitial: editItemPrixInitial,
         categorieId:editItemCategorieId,
         categorieName:editItemCategorieName,
         qte:editQte,
         minQte:editMinQte
         
        }} clickEvent={refreshRecord} />
     
    ) : (
      <Overview 
      
       clickEvent={refreshRecord}/> 
    )}
  </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Annuler
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isOpenn}
        placement="bottom"
        onClose={onClosee}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
        
          
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClosee}>
              Retour
            </Button>
           
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
}
