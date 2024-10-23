import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallfacture } from 'state/Commande/Commande_slice';
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
  useColorModeValue,Button
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { contactsPerEntreprise, entreprisePerContact } from 'state/user/Role_Slice';

export default function MyFacture() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const dispatch = useDispatch();
  const [idEntreprise, setIdEntreprise] = useState<number | null>(null); // Store enterprise ID
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Fetch the user ID from localStorage
  const idUserFromStorage = localStorage.getItem("user");

  // First useEffect: Fetch entreprise and contacts data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the enterprise associated with the user
        const result = await dispatch(entreprisePerContact(idUserFromStorage) as any).unwrap();
        const idUser = result.idUser;  // Assuming this is how you get the enterprise ID
        console.log("Fetched idUser:", idUser);
        
        // Fetch contacts for the enterprise (optional if needed)
        await dispatch(contactsPerEntreprise(idUser) as any);
        
        // Set the enterprise ID after fetching
        setIdEntreprise(Number(idUser));
      } catch (error) {
        console.error("Error fetching entreprise data:", error);
      }
    };

    fetchData();
  }, [dispatch, idUserFromStorage]);

  // Second useEffect: Fetch factures after enterprise ID is set
  useEffect(() => {
    const fetchFactures = async () => {
      if (idEntreprise !== null) {
        try {
          // Dispatch the action to get all invoices using the enterprise ID
          await dispatch(getallfacture({
            idetse: idEntreprise,
          }) as any);
        } catch (error) {
          console.error("Error fetching invoices:", error);
        }
      }
    };
    console.log(idEntreprise);

    // Fetch factures only after idEntreprise is set
    fetchFactures();
  }, [dispatch, idEntreprise]);

  // Get status and record from Redux state
  const { status, record } = useSelector((state: any) => state.getallfactureExport);

  // Render the data based on the status
  const renderData = () => {
    if (status === "loading") {
      return (
        <Tr>
          <Td colSpan={4}>
            <Spinner size="md" />
          </Td>
        </Tr>
      );
    }

    if (status === "failed") {
      return (
        <Tr>
          <Td colSpan={4}>
            <Alert status="error">
              <AlertIcon />
              Erreur Serveur
            </Alert>
          </Td>
        </Tr>
      );
    }

    if (status === "succeeded" && record.length > 0) {
      return record.map((e: any, index: number) => (
        <Tr key={index}>
          <Td borderColor={borderColor}>{index + 1}</Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.nomClient } {/* Total amount without tax */}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.montantTotalHTTC} {/* Client name */}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.montantTotalHT} {/* Enterprise name */}
            </Text>
          </Td>
      
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.nomentreprise} {/* Enterprise name */}
            </Text>
          </Td>
          
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
            <Button   colorScheme="teal"
                size="sm" >Generate PDF </Button> 
            </Text>
          </Td>

        </Tr>
      ));
    }

 
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Box>
      <br /><br />

        <Text color={textColor} fontSize="lg" fontWeight="700" mb="4">
        </Text>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>Nom du Client</Th>
              <Th borderColor={borderColor}>Montant Total HT</Th>
              <Th borderColor={borderColor}>Montant Total TTC</Th>

              <Th borderColor={borderColor}>Nom Entreprise</Th>
              <Th borderColor={borderColor}>Action</Th>

            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
    </Card>
  );
}
