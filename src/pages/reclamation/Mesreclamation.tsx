import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getreclamation } from 'state/Commande/Commande_slice';
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
} from "@chakra-ui/react";
import Card from "components/card/Card";
import axios from 'axios';

export default function Mesreclamation() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const dispatch = useDispatch();
  const [nomEntreprise, setNomEntreprise] = useState(""); // Track client name
  const userId = localStorage.getItem("user");

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const fetchNomEntreprise = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/RelationClientUser/ListClientsPerContact?id=${userId}`);
      if (response.data && response.data.length > 0) {
        setNomEntreprise(response.data[0].nomEntreprise);
      }
    } catch (error) {
      console.error("Error fetching client name: ", error);
    }
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { status, record } = useSelector((state: any) => state.getreclamationExport);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getreclamation({
          idclt: localStorage.getItem("item"),
        }) as any);
        fetchNomEntreprise(); // Fetch client name on component mount
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const renderData = () => {
    if (status === "loading")
      return (
        <Tr>
          <Td colSpan={6} textAlign="center">
            <Spinner size="md" />
          </Td>
        </Tr>
      );

    if (status === "failed")
      return (
        <Tr>
          <Td colSpan={6} textAlign="center">
            <Text color="red.500">Erreur lors du chargement des réclamations</Text>
          </Td>
        </Tr>
      );

    return record.map((e: any, index: number) => (
      
      <Tr key={index}>
        <Td borderColor={borderColor}>{index + 1}</Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.nomcleint}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.idcmd}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.description}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            { formatDate(e.dateCreation)}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.status}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {formatDate(e.dateTraitement)}
          </Text>
        </Td>
        
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.reponse || "-"}
          </Text>
        </Td>
      </Tr>
    ));
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
        <Text color={textColor} fontSize="lg" fontWeight="700">
        <br/><br/><br/>
          Réclamations pour le client : {nomEntreprise}
        </Text>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>Nom du Client</Th>
              <Th borderColor={borderColor}>Numero de commande</Th>

              <Th borderColor={borderColor}>Description</Th>
              <Th borderColor={borderColor}>Date Création</Th>
              <Th borderColor={borderColor}>État</Th>
              <Th borderColor={borderColor}>Date De Traitement</Th>

              <Th borderColor={borderColor}>Réponse</Th>
              
            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
    </Card>
  );
}
