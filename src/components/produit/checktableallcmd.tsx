import {
  Flex,
  Alert,
  AlertIcon,
  Box,
  Table,
  Spinner,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,

  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useToast,

  Button
} from "@chakra-ui/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';


// Custom components
import Card from "components/card/Card";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { CMDAllProduit } from "state/produit/produit_Slice";
import { AddLDC } from "state/Commande/Commande_slice";
import Listepanier from "pages/Commande/Listepanier";
import { Link, useHistory } from "react-router-dom";

interface TotalPrices {
  [productId: string]: number;
}


export default function CheckTable2() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [qte, setqte] = useState("");
  const isErrorQte = qte === "";
  const toast = useToast();


  const [totalPrices, setTotalPrices] = useState<TotalPrices>({}); // Use the defined interface

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CMDAllProduit() as any);
    //all product came from prod slice
  }, [dispatch]);
  const { status, record } = useSelector((state: any) => state.CMDAllProduitExport);

  console.log(record, status);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const history = useHistory();  
    const handlePasserAuPanierClick = () => {
    // Navigate to Listepanier component
    history.push('/contact/mon_Panier');  };


  const handleSelectProduct = (idProduit: string) => {
    setSelectedProductId(idProduit);
  }
  //add new state
  const [recordState, setRecordState] = useState(record);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (idProduit: number) => {
    setSelectedProductId(idProduit);
    setIsOpen(true);
  };
  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };


  const commmandprod = async (idProduit: any) => {
    try {
      const response = await dispatch(
        AddLDC({
          idProduit: idProduit,
          idcontact: localStorage.getItem("user"),
          qte: qte
        }) as any
      );
  
      // Check the response message
      if (response.payload === "Ligne de commande ajoutée") {
        toast({
          title: "prodiut  ajouté avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        openModal(idProduit); // Show modal only if LDC is added successfully
      } else if (response.payload === "Quantité insuffisante") {
        toast({
          title: "Quantité insuffisante",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      else if (response.payload === "Ligne de commande mise à jour") {
        toast({
          title: "Quantité ajouté avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });openModal(idProduit);
      }
    } catch (error) {
      console.error("Error adding LDC:", error);
      toast({
        title: "Une erreur s'est produite lors de l'ajout de LDC",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  

  const handleQteChange = (value: string, productId: string) => {
    setqte(value); // Update quantity
    const totalPrice = Number(value) * recordState.find((e: any) => e.idProduit === productId).prixAvecTva;
    setTotalPrices(prevTotalPrices => ({ ...prevTotalPrices, [productId]: totalPrice })); // Update total price for the selected product


  };
  useEffect(() => { setRecordState(record) }, [record]);

  //end state added



  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        if (selectedCategoryId) {
          const response = await fetch(`http://localhost:9999/api/Produit/produits/categorie/${selectedCategoryId}`);
          const data = await response.json();
          setRecordState(data);
        } else {
          // If no category is selected, set recordState to an empty array
          const response = await fetch('http://localhost:9999/api/Produit/AllProduitscmd');
          const data = await response.json();
          setRecordState(data);
        }
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategoryId]);


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
                {Number(e.prixAvecTva).toFixed(3) + " Dt"}
              </Text>
            </Td>


            <Td>
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="black"
              >
                {/* Render faListCheck icon */}
                <NumberInput
                  fontSize={{ sm: "10px", lg: "12px" }}

                  min={0}
                  max={30000}
                  clampValueOnBlur={false}
                  defaultValue={0}
                  onChange={(value) => handleQteChange(value, e.idProduit)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FontAwesomeIcon icon={faCheck} size="lg" fontWeight="700" onClick={
                  () => {

                    
                    if (isErrorQte === true || !/^[0-9]+$/.test(qte)) {
                      toast({
                        title: "qte invalid ou contient des lettres",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                      })} else{
                        
                    commmandprod(e.idProduit);
                    // openModal(e.idProduit);
                  }}
                } />
                <Modal isOpen={isOpen} onClose={closeModal}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {selectedProductId && (

                        <Text fontSize={{ sm: "15px", lg: "17px" }} color={textColor} fontWeight="700">Produit ajouté au panier
                          avec succès  <br></br>
                          total price: {totalPrices[selectedProductId]}
                        </Text>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" onClick={handlePasserAuPanierClick} >
                        passer au panier
                      </Button>
                      <Button variant="ghost"  mr={3} onClick={closeModal} >Ajouter plus de produit</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
              <Text fontSize={{ sm: "12px", lg: "14px" }} color={textColor}
                fontWeight="700">total price :
                {totalPrices[e.idProduit]}
              </Text>

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

      </Flex>

      <Box>
        <br /><br />
        <br />
        <Flex align="center">

          <FontAwesomeIcon icon={faSearch} />

          <Select

            isRequired={true}
            borderRadius="15px"
            fontSize="xs"
            name="selectedCategoryId"
            width="250px"
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
        </Flex>

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
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                Ajouter au Panier
              </Text>
            </Th>


          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>


    </Card>
  );
}
