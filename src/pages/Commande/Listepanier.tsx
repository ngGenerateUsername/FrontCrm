import React, { useEffect, useState,ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Deletefromcmd ,Panier } from 'state/Commande/Commande_slice';
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
  FormLabel,useToast
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import Editqte from "pages/Commande/editqte";
import Card from "components/card/Card";
import { FaTrash } from 'react-icons/fa';
import { useTheme } from "@chakra-ui/react";
import { addcommande } from 'state/Commande/Commande_slice'; // Import your Redux action
import { Link, useHistory } from "react-router-dom";

import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MyMap from './OpenLayersMap';

import MyMapnew from './leafmaptiler';
import MapComponent from './MapComponent';
import CheckTable2 from 'components/produit/checktableallcmd';
import { ListEntreprisePerClient } from 'state/user/RelationClientUser_Slice';

export default function Listepanier() {
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [recordState, setRecordState] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  type CoordinatesChangeEvent = ChangeEvent<HTMLInputElement>;


  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const [resp, setResp] = useState("");
const[adressCommande,setadressCommande]=useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editItemqte, setEditItemqte] = useState(null);
  const { status, record } = useSelector((state: any) => state.PanierExport );
  const [msg, setMsg] = useState('');
  const [canProceed, setCanProceed] = useState(true)
  const btnRef = React.useRef();
  const toast = useToast();
  const theme = useTheme();
  const blueColor = theme.colors.blue[500]; 
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');
  const [mapOpened, setMapOpened] = useState(false);
  const [idUser, setIdUser] = useState<number>(0)

  const toggleMapVisibility = () => {
    setMapOpened(!mapOpened);
  };
  const fetchData2 = async () => {
    const idClient = localStorage.getItem("item");
    try {
      // Fetching idUser separately via axios call
      const axiosRes = await axios.get(`http://localhost:8080/api/RelationClientUser/ListEntreprisePerClient?id=` + idClient);
      console.log("res1 ", axiosRes.data);
      
      setIdUser(axiosRes.data[0].idUser); // This will set idUser in state
      console.log("id user", idUser);
  
      return axiosRes; // Return the axiosRes object
  
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error; // Rethrow the error if you want to handle it later
    }
  };
  

  const Deletefcmd = async (id: string) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  
    if (confirmation) {
     
      console.log("deleted cmd ");
      console.log(id);
      dispatch(Deletefromcmd(id) as any)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          window.location.reload();
        });
    }
  };
    const [selectedLocation, setSelectedLocation] = useState(null);
  function whenClick(datacmd: any): void {
    console.log(`Data command: ${JSON.stringify(datacmd)}`);
    console.log("Edit button pressed!");
  
    const recordUpdate = record.map((elemRecord: any) => {
      const updatedPrixTotale = datacmd.qte * elemRecord.prixUnitaire;

      if (elemRecord.idldc === datacmd.idldc) {
        // Update the quantity for the matching command
        const totalPrice = record.reduce((acc: number, curr: any) => acc + curr.prixTotale, 0);
        setTotalPrice(totalPrice);
    
        return { ...elemRecord, qte: datacmd.qte , prixTotale: updatedPrixTotale};
      } else {
        return elemRecord;
      }
    });
  
    console.log(`Updated record: ${JSON.stringify(recordUpdate)}`);
    setRecordState(recordUpdate);
    onClose();
   // window.location.reload();
  }
  
 //const idetse=localStorage.getItem("user");
 const idcontact =localStorage.getItem("item");
 console.log(idcontact);
 //console.log(idetse);

  const history = useHistory();  

    const handleOrder = async (idClient: any) => {
      const axiosResponse = await fetchData2(); // Get the axios response
      const response = await dispatch(
          addcommande({
            idClient: Number(localStorage.getItem("item")),  
            idetse:axiosResponse.data[0].idUser,
            adressCommande: adressCommande
          }) as any
        );
        console.log(response);
       


        if (response.payload === "All products are unavailable.") {
          toast({
            title: "pas de prodiut dispobible veuiller modifer la quantité  ",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
        onCloseComplete: () => history.push('/contact/mon_Panier')
          });
        } 
        else if (response.payload === "Order success. All products are available.") {
          toast({
            title: "  Commande passée avec succès. ",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
            onCloseComplete: () => { setRecordState([]) ; setTotalPrice(null)}
              //window.location.reload()


          });}
          else if (response.payload === "Order success . some  products are available and some not.") {
            toast({
              title: "certains prodiuts  sont dispobible   ",
              status: "info",
              duration: 3000,
              isClosable: true,
              position: "top",
              onCloseComplete: () => window.location.reload()

            });}
  

  };
  

  useEffect(() => {
    const fetchData
     = async () => {
      try {
        const response = await dispatch(Panier({
          idcontact: localStorage.getItem("item"),

        }) as any);
        // Handle response here
      } catch (error) {
        // Handle error here
      }
    };

    fetchData
    ();

    return () => {
      // Cleanup function (if needed)
    };
  }, [dispatch]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
 // const { status, record } = useSelector((state: any) => state.PanierExport);

  useEffect(() => {
    setRecordState(record);
    const totalPrice = record.reduce((acc: number, curr: any) => acc + curr.prixTotale, 0);
    setTotalPrice(totalPrice);

  }, [record]);

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
      return recordState.map((e: any, index: number) => (
        <Tr key={index}>
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
              {e.nomproduit}
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
              {e.tva} %
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
              {e.qte}
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
              {e.prixTotale}
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
               onClick={() => Deletefcmd(e.idldc)}
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
                onClick={() => {
          setEditItemId(e.idldc);
             setEditItemqte(e.qte); 
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
      ));
    }
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">

        {/* Other components or elements */}
      </Flex>
      <Box>
        <br /><br />
        <br />
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
                nom produit
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
                nom categorie
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
                tva
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
                Prix
              </Text>

            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                suprimer
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                modifier
              </Text>
            </Th>
          </Thead>
          <Tbody>
            {renderData()}
          </Tbody>
        </Table>
        <Flex justifyContent="flex-end" pr="25px">
          <Text fontWeight="bold" fontSize="lg">
            Prix Totale: {totalPrice}

          </Text>

        </Flex>
        <br></br>
        
        <br />
  { <Flex px="30px" mb="10px" align="right" justifyContent="flex-end">
    <input
      placeholder=""
      value={adressCommande}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setadressCommande(e.target.value)}
      
    />
   <div> 

    </div>
    <Button variant="outline" colorScheme="blue" onClick={handleOrder}>Passer Commande</Button>
  </Flex> }
      </Box>
{ <MapComponent setAdressCommande={setadressCommande}/> }
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
          <DrawerHeader>{ "Modifier  commande" }</DrawerHeader>
          <DrawerBody>
              <Editqte  cmddata={{ idldc: editItemId, qte: editItemqte }} eventClick={whenClick} />
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
