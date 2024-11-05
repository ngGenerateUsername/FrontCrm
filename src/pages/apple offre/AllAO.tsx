import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getreclamationetse, updatereclamation } from 'state/Commande/Commande_slice';
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
  Input,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { contactsPerEntreprise, entreprisePerContact } from 'state/user/Role_Slice';
import { getalletseAO } from 'state/AO/AO_slice';

export default function AOetse() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const dispatch = useDispatch();
  const [idEntreprise, setidEntreprise] = useState(0);  // Store enterprise ID
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

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { status, record } = useSelector((state: any) => state.getalletseAOExport);
  const [record1, setRecord1] = useState([]); // Store command records here



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the enterprise contact data and unwrap the result
        const result = await dispatch(entreprisePerContact(localStorage.getItem("user")) as any).unwrap();
        const idUser = result.idUser;
        console.log("Enterprise User ID:", idUser);
  
        // Fetch contacts for the enterprise
        await dispatch(contactsPerEntreprise(idUser) as any).unwrap();
  
        // Set the enterprise ID
        setidEntreprise(Number(idUser));
      } catch (error) {
        console.error("Error fetching entreprise data:", error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  
  useEffect(() => {
    const fetchAOData = async () => {
      if (idEntreprise) {
        try {
          // Use unwrap to directly get the data from the response or catch the error
          const response = await dispatch(getalletseAO({ idetse: idEntreprise }) as any).unwrap();
          console.log("AO Data:", response);
          setRecord1(response.data);  // Ensure `response.data` structure matches your API response
        } catch (error) {
          console.error("Error fetching AO data:", error);
        }
      }
    };
  
    fetchAOData();
  }, [dispatch, idEntreprise]);
  


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
      )
      if (status === "succeeded") {
    return record.map((e: any, index: number) => (
      <Tr key={index}>
        <Td borderColor={borderColor}>{index + 1}</Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.nomprod}
          </Text>
        </Td>
    
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.description}
          </Text>
        </Td>
  
    
        <Td borderColor={borderColor}>
       
        </Td>
      </Tr>
    ));}
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
        <br /><br /><br />
        <Text color={textColor} fontSize="lg" fontWeight="700">
          Gestion des Appel offre
        </Text>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>Nom du produit</Th>

            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
    </Card>
  );
}
