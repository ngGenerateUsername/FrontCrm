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

export default function Reclamationetse() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const dispatch = useDispatch();
  const [idEntreprise, setidEntreprise] = useState();
  const userId = localStorage.getItem("user");
  const [isEntrepriseLoaded, setIsEntrepriseLoaded] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [responseText, setresponseText] = useState<string>("");  
  const [showReclamationInput, setShowReclamationInput] = useState<boolean>(false);

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
  const { status, record } = useSelector((state: any) => state.getreclamationetseExport);

  const handleReplyClick = (id: any) => {
    setEditingId(id); // Set the current reclamation ID for editing
    setShowReclamationInput(true); // Show the response input
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(entreprisePerContact(userId) as any).unwrap();
        const idUser = result.idUser;
        await dispatch(contactsPerEntreprise(idUser) as any);
        setidEntreprise(idUser);
        setIsEntrepriseLoaded(true);
      } catch (error) {
        console.error("Error fetching entreprise data:", error);
      }
    };

    fetchData();
  }, [dispatch, userId]);

  const handleSubmitresponse = async () => {
    try {
      if (editingId) {
        await dispatch(updatereclamation({
          idrec: editingId,
          reponse: responseText,
        }) as any);
        setShowReclamationInput(false); // Hide input after submission
        setresponseText(""); // Clear input field
      }
    } catch (error) {
      console.error("Error submitting reclamation: ", error);
    }
  };

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        if (isEntrepriseLoaded && idEntreprise !== null) {
          await dispatch(getreclamationetse({ idetse: idEntreprise }) as any);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReclamations();
  }, [dispatch, isEntrepriseLoaded, idEntreprise]);

  const renderReclamationInput = () => {
    if (!showReclamationInput || editingId === null) return null;
    return (
      <Box mt="8px">
        <Input
          placeholder="Réponse à la réclamation"
          value={responseText}
          onChange={(e) => setresponseText(e.target.value)}
          mt="4px"
        />
        <Button
          mt="8px"
          size="sm"
          colorScheme="green"
          onClick={handleSubmitresponse}
        >
          Soumettre
        </Button>
      </Box>
    );
  };

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
            {formatDate(e.dateCreation)}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.status}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {e.reponse || "-"}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Button variant="outline" colorScheme="blue" onClick={() => handleReplyClick(e.idrec)}isDisabled={e.status === "traité"}  >
            Répondre
          </Button>
        </Td>
      </Tr>
    ));
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
        <Text color={textColor} fontSize="lg" fontWeight="700">
          Gestion des Réclamations
        </Text>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>Nom du Client</Th>
              <Th borderColor={borderColor}>Numéro de Commande</Th>
              <Th borderColor={borderColor}>Description</Th>
              <Th borderColor={borderColor}>Date Création</Th>
              <Th borderColor={borderColor}>État</Th>
              <Th borderColor={borderColor}>Réponse</Th>
              <Th borderColor={borderColor}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
        {renderReclamationInput()} {/* Display the input conditionally */}
      </Box>
    </Card>
  );
}
