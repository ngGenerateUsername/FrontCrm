import React from "react";
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
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Button,
  Heading,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AllProduit } from "state/produit/produit_Slice";
import { AddLDC } from "state/Commande/Commande_slice";
import { useHistory } from "react-router-dom";
import { ListEntreprisePerClient } from "state/user/RelationClientUser_Slice";

interface TotalPrices {
  [productId: string]: number;
}

export default function CheckTable2() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [qte, setqte] = useState<{ [key: string]: string }>({});
  const toast = useToast();
  const [totalPrices, setTotalPrices] = useState<TotalPrices>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, record } = useSelector((state: any) => state.CMDAllProduitExport);
  const [listRecords, setListRecords] = useState([]);
  const [idUser, setIdUser] = useState<number>(0);

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
    setqte((prevQte) => {
      const updatedQte = { ...prevQte };
      Object.keys(updatedQte).forEach((key) => {
        updatedQte[key] = "0";
      });
      return updatedQte;
    });
    setTotalPrices({});
    setTotalPrices({});
  };

  // Handle navigation to panier
  const handlePasserAuPanierClick = () => {
    history.push("/produit/commande");
  };

  // Fetch data function
  useEffect(() => {
    if (localStorage.getItem("item") !== undefined) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const idClient = localStorage.getItem("item");
    dispatch(ListEntreprisePerClient(idClient) as any)
      .unwrap()
      .then((res: any) => {
        let idUser: number = res[0].idUser;
        if (typeof idUser === "number") {
          dispatch(AllProduit({ idEntreprise: idUser }) as any)
            .unwrap()
            .then((res: any) => {
              console.log("Produits:", res.data);
            });
        }
      })
      .catch((error: Error) => console.log(error));

    await axios
      .get(
        `http://localhost:8080/api/RelationClientUser/ListEntreprisePerClient?id=` +
          idClient
      )
      .then((res: any) => {
        setIdUser(res.data[0].idUser);
      });
  };

  useEffect(() => {
    if (idUser !== undefined && typeof idUser === "number" && idUser !== 0) {
      axios
        .get(`http://localhost:9999/api/Produit/AllProduits/${idUser}`)
        .then((res2: any) => {
          setListRecords(res2.data);
        });
    }
  }, [idUser]);

  // Update total price when quantity is changed
  const handleQteChange = (value: string, productId: string) => {
    setqte((prevQte) => ({
      ...prevQte,
      [productId]: value,
    }));

    const quantity = Number(value);
    if (isNaN(quantity) || quantity <= 0) {
      setTotalPrices((prevTotalPrices) => ({
        ...prevTotalPrices,
        [productId]: 0,
      }));
      return;
    }

    const product = listRecords.find((e: any) => e?.idProduit === productId);
    if (product && product.prixAvecTva && !isNaN(Number(product.prixAvecTva))) {
      const totalPrice = quantity * Number(product.prixAvecTva);
      setTotalPrices((prevTotalPrices) => ({
        ...prevTotalPrices,
        [productId]: totalPrice,
      }));
    } else {
      setTotalPrices((prevTotalPrices) => ({
        ...prevTotalPrices,
        [productId]: 0,
      }));
    }
  };

  const commmandprod = async (idProduit: any) => {
    const idcontact = Number(localStorage.getItem("item"));
    const idetse = Number(localStorage.getItem("user"));

    try {
      const response = await dispatch(
        AddLDC({
          idProduit: idProduit,
          idcontact: localStorage.getItem("item"),
          idetse: idUser,
          qte: qte[idProduit],
        }) as any
      );

      if (response.payload === "Ligne de commande ajoutée") {
        toast({
          title: "Produit ajouté avec succès",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        openModal(idProduit);
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
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            ></Flex>
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
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            ></Flex>
            <Alert status="error">
              <AlertIcon /> Erreur Serveur
            </Alert>
          </Td>
          <Td></Td>
        </Tr>
      );
    }
    if (listRecords.length !== 0) {
      return listRecords.map((e: any) => (
        <Tr key={e.idProduit}>
          <Td>{e.reference}</Td>
          <Td>{e.nom}</Td>
          <Td>{e.description}</Td>
          <Td>{e.categorie?.nom}</Td>
          <Td>{e.categorie?.tva + " %"}</Td>
          <Td>{Number(e.prixAvecTva).toFixed(3) + " Dt"}</Td>
          <Td>
            <NumberInput min={0} max={30000} clampValueOnBlur={false} value={qte[e.idProduit] || ""}
              onChange={(value) => handleQteChange(value, e.idProduit)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FontAwesomeIcon
              icon={faCheck}
              size="lg"
              onClick={() => {
                if (!qte[e.idProduit] || !/^[0-9]+$/.test(qte[e.idProduit])) {
                  toast({
                    title: "Quantité invalide ou contient des lettres",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                } else {
                  commmandprod(e.idProduit);
                }
              }}
            />
            <Modal isOpen={isOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalBody>
                  {selectedProductId && (
                    <Text
                      fontSize={{ sm: "15px", lg: "17px" }}
                      color={textColor}
                      fontWeight="700"
                    >
                      Produit ajouté au panier avec succès
                      <br />
                      Total price: {totalPrices[selectedProductId]}
                    </Text>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" onClick={handlePasserAuPanierClick}>
                    Passer au panier
                  </Button>
                  <Button variant="ghost" mr={3} onClick={closeModal}>
                    Ajouter plus de produit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Text
              fontSize={{ sm: "12px", lg: "14px" }}
              color={textColor}
              fontWeight="700"
            >
              Total price: {totalPrices[e?.idProduit] || 0} Dt
            </Text>
          </Td>
        </Tr>
      ));
    }
  };

  return (
    <Box w="100%" px="5%" pt="2%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Heading size="lg"></Heading>
      </Stack>
      <Box my={6}>
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
      </Box>
    </Box>
  );
}
