import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Flex,
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
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { contactsPerEntreprise, entreprisePerContact } from 'state/user/Role_Slice';
import { getalletseAO } from 'state/AO/AO_slice';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function AOetse() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const dispatch = useDispatch();
  const [idEntreprise, setidEntreprise] = useState(0);
  const userId = localStorage.getItem("user");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { status, record } = useSelector((state: any) => state.getalletseAOExport);
  const [record1, setRecord1] = useState([]); // Initialized as an empty array
  const [participationData, setParticipationData] = useState<{ [key: number]: any[] }>({});
  const history = useHistory();

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(entreprisePerContact(userId) as any).unwrap();
        const idUser = result.idUser;
        console.log("Enterprise User ID:", idUser);
        await dispatch(contactsPerEntreprise(idUser) as any).unwrap();
        setidEntreprise(Number(idUser));
      } catch (error) {
        console.error("Error fetching entreprise data:", error);
      }
    };
    fetchData();
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchAOData = async () => {
      if (idEntreprise) {
        try {
          const response = await dispatch(getalletseAO({ idetse: idEntreprise }) as any).unwrap();
          console.log("AO Data:", response);
          setRecord1(response.data || []); // Handle undefined or null data
        } catch (error) {
          console.error("Error fetching AO data:", error);
        }
      }
    };
    fetchAOData();
  }, [dispatch, idEntreprise]);

  const handleNotificationClick = async (idproduit: any) => {
    localStorage.setItem("idprod", idproduit);
    history.push("/produit/Detaileappelloffre");
  };

  const handleListParticipation = (idao: number) => {
    setParticipationData((prevState) => {
      if (prevState[idao]) {
        const newState = { ...prevState };
        delete newState[idao];
        return newState;
      } else {
        axios
          .get(`http://localhost:9989/AO/participationappeloffre/${idao}`)
          .then((response) => {
            setParticipationData((currentState) => ({
              ...currentState,
              [idao]: response.data,
            }));
          })
          .catch((error) => {
            console.error("Error fetching participation data:", error);
          });
        return prevState;
      }
    });
  };

  const handleDelete = async (idao: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form behavior
    try {
      await axios.delete(`http://localhost:9989/AO/deleteAO/${idao}`);
      setRecord1((prev) => (Array.isArray(prev) ? prev.filter((item: any) => item.idao !== idao) : []));
      alert("Tender deleted successfully!");
    } catch (error) {
      console.error("Error deleting tender:", error);
      alert("Error deleting tender. Please try again.");
    }
  };

  const renderData = () => {
    if (status === "loading") {
      return (
        <Tr>
          <Td colSpan={7} textAlign="center">
            <Spinner size="md" />
          </Td>
        </Tr>
      );
    }

    if (status === "failed") {
      return (
        <Tr>
          <Td colSpan={7} textAlign="center">
            <Text color="red.500">Erreur lors du chargement des appel offre</Text>
          </Td>
        </Tr>
      );
    }

    if (status === "succeeded" && Array.isArray(record)) {
      return record.map((e: any, index: number) => (
        <Tr key={index}>
          <Td borderColor={borderColor}>{index + 1}</Td>
          <Td borderColor={borderColor}>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.ref}
            </Text>
          </Td>
          <Td borderColor={borderColor}>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.nomprod}
            </Text>
          </Td>
          <Td borderColor={borderColor}>
            <Tooltip
              label={
                <Box>
                  <Text>
                    <strong>Date Publication:</strong> {formatDate(e.datePublication)}
                  </Text>
                  <Text>
                    <strong>Date Clôture:</strong> {formatDate(e.dateCloture)}
                  </Text>
                  <Text>
                    <strong>Date Livraison :</strong> {e.dateLivraisonAO }
                  </Text>
                  <Text>
                    <strong>Quantité:</strong> {e.quantite}
                  </Text>
                  <Text>
                    <strong>Description:</strong> {e.description}
                  </Text>
                  <Text>
                    <strong>Nom ETSE:</strong> {e.nometse}
                  </Text>
                  <Text>
                    <strong>Catégorie:</strong> {e.categorie}
                  </Text>
                  <Text>
                    <strong>TVA:</strong> {e.tva}%
                  </Text>
                </Box>
              }
              fontSize="md"
              placement="top"
              bg="gray.700"
              color="white"
            >
              <Box display="inline-block">
                <InfoOutlineIcon cursor="pointer" color="gray.500" />
              </Box>
            </Tooltip>
          </Td>
          <Td borderColor={borderColor}>
            <Button
              type="button" // Prevents default form submission behavior
              colorScheme="orange"
              size="sm"
              onClick={() => handleListParticipation(e.idao)}
            >
              List Participants
            </Button>
          </Td>
          <Td borderColor={borderColor}>
            <Button
              type="button"
              colorScheme="teal"
              size="sm"
              onClick={() => handleNotificationClick(e.idproduit)}
            >
              Details
            </Button>
          </Td>
          <Td borderColor={borderColor}>
            <Button
              type="button"
              colorScheme="red"
              size="sm"
              onClick={(event) => handleDelete(e.idao, event)}
            >
              Delete
            </Button>
          </Td>
        </Tr>
      ));
    }
  };

  const renderParticipationData = (tenderId: number) => {
    if (participationData[tenderId] && participationData[tenderId].length > 0) {
      return (
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>Prix</Th>
              <Th borderColor={borderColor}>Date Soumission</Th>
              <Th borderColor={borderColor}>Adresse</Th>
              <Th borderColor={borderColor}>Mail</Th>
              <Th borderColor={borderColor}>Username</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participationData[tenderId].map((item, index) => (
              <Tr key={index}>
                <Td borderColor={borderColor}>{index + 1}</Td>
                <Td borderColor={borderColor}>{item.prix}</Td>
                <Td borderColor={borderColor}>{item.datesoummision}</Td>
                <Td borderColor={borderColor}>{item.adresse}</Td>
                <Td borderColor={borderColor}>{item.mail}</Td>
                <Td borderColor={borderColor}>{item.username}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
    }
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
        <Text color={textColor} fontSize="lg" fontWeight="700">
          Gestion des Appel offre
        </Text>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>Référence</Th>
              <Th borderColor={borderColor}>Nom Produit</Th>
              <Th borderColor={borderColor}>Info</Th>
              <Th borderColor={borderColor}>Participants</Th>
              <Th borderColor={borderColor}>Details</Th>
              <Th borderColor={borderColor}>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
      <Box mt={8}>{Object.keys(participationData).map((idao) => renderParticipationData(Number(idao)))}</Box>
    </Card>
  );
}
