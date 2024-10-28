import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addreclamation, getcommanddetails, mycmd } from 'state/Commande/Commande_slice';
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
  Button,
  useToast,
  Input
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useTheme } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function Mescommandes() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [commandDetails, setCommandDetails] = useState([]);
  const [reclamationText, setReclamationText] = useState<string>("");  // Track reclamation text
  const [showReclamationInput, setShowReclamationInput] = useState<boolean>(false); // Track if the reclamation input is visible

  const [nomEntreprise, setNomEntreprise] = useState(0);  // State to store the client's name
  const userId = localStorage.getItem("user");

  const fetchNomEntreprise = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/RelationClientUser/ListClientsPerContact?id=${userId}`);
      if (response.data && response.data.length > 0) {
        setNomEntreprise(response.data[0].nomEntreprise); // Assuming the name is at index 0
      }
    } catch (error) {
      console.error("Error fetching nomEntreprise: ", error);
    }
  };

  const theme = useTheme();

  const handleCommandClick = async (idCmd: any) => {
    try {
      const response = await dispatch(getcommanddetails({ idCmd }) as any);
      setSelectedCommand(idCmd);
      setCommandDetails(response.payload);
      fetchNomEntreprise();
      setShowReclamationInput(false); // Hide the reclamation input when selecting a new command
    } catch (error) {
      console.error(error);
    }
  };

  const handleReclamerClick = (event: React.MouseEvent) => {
    event.stopPropagation();  // Prevent click event from bubbling up to row
    setShowReclamationInput(!showReclamationInput); // Toggle the visibility of the reclamation input
  };

  const handleSubmitReclamation = async (idcmd: any) => {
    try {
      await dispatch(addreclamation({
        idcmd: selectedCommand  ,
         description: reclamationText
      }) as any);
      console.log("Reclamation submitted for command:", selectedCommand, "with text:", reclamationText);
      setShowReclamationInput(false); // Hide input after submission
      setReclamationText(""); // Clear input field
    } catch (error) {
      console.error("Error submitting reclamation: ", error);
    }
  };

  const renderReclamationInput = () => {
    if (showReclamationInput) {
      return (
        <>
          <Text mt="8px" fontSize="md" fontWeight="bold">
            Entrez la réclamation pour la commande {selectedCommand}
          </Text>
          <Input
            placeholder="Description de la réclamation"
            value={reclamationText}
            onChange={(x) => setReclamationText(x.target.value)}
            mt="4px"
          />
          <Button
            mt="8px"
            size="sm"
            colorScheme="green"
            onClick={handleSubmitReclamation }
          >
            Soumettre
          </Button>
        </>
      );
    }
    return null;
  };

  const { status1 } = useSelector((state: any) => state.getcommanddetailsExport);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(mycmd({
          idcontact: localStorage.getItem("item"),
        }) as any);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { status, record } = useSelector((state: any) => state.MycmdExport);

  const renderData = () => {
    if (status === "loading")
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Spinner size="md" />
          </Td>
        </Tr>
      );
    if (status === "failed")
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Alert status="error">
              <AlertIcon />
              Erreur Serveur
            </Alert>
          </Td>
        </Tr>
      );

    if (status === "succeeded") {
      return record.map((e: any, index: number) => (
        <Tr key={index} onClick={() => handleCommandClick(e.idC)} style={{ cursor: 'pointer' }}>
          <Td borderColor={borderColor}>{index + 1}</Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.nomClient}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.prixtotale} Dt
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.dateLivraison}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.adressCommande}
            </Text>
          </Td>
          <Td>
            <Button colorScheme="blue" onClick={handleReclamerClick}>
              Reclamer
            </Button>
          </Td>
        </Tr>
      ));
    }
  };

  const renderCommandDetails = () => {
    if (commandDetails.length > 0) {
      return commandDetails.map((item: any, index: number) => (
        <Tr key={index}>
          <Td borderColor={borderColor}>{index + 1}</Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {item.nom}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {item.qte}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {item.prixTotale}
            </Text>
          </Td>
        </Tr>
      ));
    }
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
      </Flex>

      <Box>
        <br /><br />
        <br />
        <Text color={textColor} fontSize="sm" fontWeight="700">
          Commande de Client: {nomEntreprise}
        </Text>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>Nom du Client</Th>
              <Th borderColor={borderColor}>Prix</Th>
              <Th borderColor={borderColor}>Date Création</Th>
              <Th borderColor={borderColor}>Adresse</Th>
              <Th borderColor={borderColor}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>

        {renderReclamationInput()}

        {selectedCommand && (
          <>
            <Text fontSize="xl" fontWeight="bold" mt="24px" mb="8px">
              Détails de la Commande {selectedCommand}
            </Text>
            <Table flexDirection="column" variant="simple" color="gray.500" mb="24px">
              <Thead>
                <Tr>
                  <Th borderColor={borderColor}>#</Th>
                  <Th borderColor={borderColor}>Nom</Th>
                  <Th borderColor={borderColor}>Quantité</Th>
                  <Th borderColor={borderColor}>Prix Totale</Th>
                </Tr>
              </Thead>
              <Tbody>{renderCommandDetails()}</Tbody>
            </Table>
          </>
        )}
        <br /><br />
      </Box>
    </Card>
  );
}


