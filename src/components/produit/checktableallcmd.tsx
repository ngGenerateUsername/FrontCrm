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

import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AllProduit, CMDAllProduit } from "state/produit/produit_Slice";
import { AddLDC } from "state/Commande/Commande_slice";
import { useHistory } from "react-router-dom";
import{ListEntreprisePerClient} from "state/user/RelationClientUser_Slice";
interface TotalPrices {
  [productId: string]: number;
}

export default function CheckTable2() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [qte, setqte] = useState("");
  const isErrorQte = qte === "";
  const toast = useToast();
  const [totalPrices, setTotalPrices] = useState<TotalPrices>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, record } = useSelector((state: any) => state.CMDAllProduitExport);

  // State for modal and selected product
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [idEntreprise, setidEntreprise] = useState();

  // Handle modal open and close
  const openModal = (idProduit: number) => {
    setSelectedProductId(idProduit);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const { status:statusEntre, record:recordEntre} = useSelector((state: any) => state.ListEntreprisePerClientExport);

  // Handle navigation to panier
  const handlePasserAuPanierClick = () => {
    history.push('/contact/mon_Panier');
  };
  useEffect(() => {
    const idClient = localStorage.getItem("item");
    dispatch(ListEntreprisePerClient(idClient) as any)
    .unwrap()
      .then((res: any) => {
        console.log(res)

        console.log(res[0].idUser)
        dispatch(AllProduit(res[0].idUser) as any);
      })
      .catch((error: Error) => console.log(error));

  }, [dispatch]);
  console.log("89",recordEntre, statusEntre);
  console.log("record ",record,status);
  // Fetch products for the enterprise associated with the client
  useEffect(() => {
    const idClient = localStorage.getItem("item");
    if (idClient) {

       const response = ListEntreprisePerClient(idClient);       
       setidEntreprise (recordEntre);

       console.log("e7na win response ta zibi ",recordEntre);

      console.log("e7na win id etse ",idEntreprise);
      console.log("e7na win id clt ",idClient);


    }
  }, [dispatch]);

  // Update total price when quantity is changed
  const handleQteChange = (value: string, productId: string) => {
    setqte(value);
    const totalPrice = Number(value) * record.find((e: any) => e.idProduit === productId).prixAvecTva;
    setTotalPrices(prevTotalPrices => ({ ...prevTotalPrices, [productId]: totalPrice }));
  };

  // Add product to LDC (Commande)
  const commmandprod = async (idProduit: any) => {
    try {
      const response = await dispatch(
        AddLDC({
          idProduit: idProduit,
          idcontact: localStorage.getItem("user"),
          qte: qte
        }) as any
      );

      // Show success or error toast based on response
      if (response.payload === "Ligne de commande ajoutée") {
        toast({
          title: "Produit ajouté avec succès",
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
      } else if (response.payload === "Ligne de commande mise à jour") {
        toast({
          title: "Quantité ajoutée avec succès",
          status: "success",
          duration: 2000,
          isClosable: false,
          position: "top",
        });
        openModal(idProduit);
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

  const renderData = () => {
    if (status === "loading") {
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Flex justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400"></Flex>
            <Spinner size="md" />
          </Td>
        </Tr>
      );
    }
    if (status === "failed") {
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Flex justifyContent="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400"></Flex>
            <Alert status="error">
              <AlertIcon />
              Erreur Serveur
            </Alert>
          </Td>
          <Td></Td>
        </Tr>
      );
    }
    if (status === "succeeded") {
      return record.map((e: any) => (
        <Tr key={e.idProduit}>
          <Td>{e.reference}</Td>
          <Td>{e.nom}</Td>
          <Td>{e.description}</Td>
          <Td>{e.categorie?.nom}</Td>
          <Td>{e.categorie?.tva + " %"}</Td>
          <Td>{Number(e.prixAvecTva).toFixed(3) + " Dt"}</Td>
          <Td>
            <NumberInput min={0} max={30000} clampValueOnBlur={false} defaultValue={0} onChange={(value) => handleQteChange(value, e.idProduit)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FontAwesomeIcon icon={faCheck} size="lg" onClick={() => {
              if (isErrorQte || !/^[0-9]+$/.test(qte)) {
                toast({
                  title: "Quantité invalide ou contient des lettres",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                  position: 'top',
                });
              } else {
                commmandprod(e.idProduit);
              }
            }} />
            <Modal isOpen={isOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader> </ModalHeader>
                <ModalBody>
                  {selectedProductId && (
                    <Text fontSize={{ sm: "15px", lg: "17px" }} color={textColor} fontWeight="700">Produit ajouté au panier avec succès<br />Total price: {totalPrices[selectedProductId]}</Text>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" onClick={handlePasserAuPanierClick}>Passer au panier</Button>
                  <Button variant="ghost" mr={3} onClick={closeModal}>Ajouter plus de produit</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Text fontSize={{ sm: "12px", lg: "14px" }} color={textColor} fontWeight="700">Total price: {totalPrices[e.idProduit]}</Text>
          </Td>
        </Tr>
      ));
    }
  };

  return (
    <Card w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Th>Référence</Th>
            <Th>Nom de Produit</Th>
            <Th>Description</Th>
            <Th>Catégorie</Th>
            <Th>TVA de Catégorie</Th>
            <Th>Prix Avec TVA</Th>
            <Th>Ajouter au Panier</Th>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
    </Card>
  );
}
