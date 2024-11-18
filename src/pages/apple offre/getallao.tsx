import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { useHistory } from 'react-router-dom';

export default function AOetse() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [record, setRecord] = useState([]);
  const [status, setStatus] = useState("idle");
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
    const fetchAOData = async () => {
      setStatus("loading");
      try {
        const response = await axios.get("http://localhost:9989/AO/getallAO");
        console.log("AO Data:", response.data);
        setRecord(response.data);
        setStatus("succeeded");
      } catch (error) {
        console.error("Error fetching AO data:", error);
        setStatus("failed");
      }
    };
    fetchAOData();
  }, []);

  const handleNotificationClick = (idproduit :any) => {
    localStorage.setItem("idprod", idproduit);
    history.push("/produit/Detaileappelloffre");
  };

  const renderData = () => {
    if (status === "loading") {
      return (
        <Tr>
          <Td colSpan={6} textAlign="center">
            <Spinner size="md" />
          </Td>
        </Tr>
      );
    }
    
    if (status === "failed") {
      return (
        <Tr>
          <Td colSpan={6} textAlign="center">
            <Text color="red.500">Erreur lors du chargement des réclamations</Text>
          </Td>
        </Tr>
      );
    }

    if (status === "succeeded") {
      return record.map((e, index) => (
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
                  <Text><strong>Date Publication:</strong> {formatDate(e.DatePublication)}</Text>
                  <Text><strong>Date Clôture:</strong> {formatDate(e.dateCloture)}</Text>
                  <Text><strong>Quantité:</strong> {e.quantite}</Text>
                  <Text><strong>Description:</strong> {e.description}</Text>
                  <Text><strong>Nom ETSE:</strong> {e.nometse}</Text>
                  <Text><strong>Catégorie:</strong> {e.categorie}</Text>
                  <Text><strong>TVA:</strong> {e.tva}%</Text>
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
            <Button colorScheme="teal" size="sm" onClick={() => handleNotificationClick(e.idproduit)}>
              Details
            </Button>
          
          </Td>
          <Td borderColor={borderColor}>
            <Button colorScheme="teal" size="sm" onClick={() => handleNotificationClick(e.idproduit)}>
              Participer
            </Button>
          
          </Td>
        </Tr>
      ));
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
              <Th borderColor={borderColor}>Details</Th>
              <Th borderColor={borderColor}>Action</Th>

            </Tr>
            
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
    </Card>
  );
}
