import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useTheme } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { contactsPerEntreprise, entreprisePerContact } from 'state/user/Role_Slice';
import { createbdc, createinvoice } from 'state/Commande/Commande_slice';

export default function MyEnterpriseCommand() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [commandDetails, setCommandDetails] = useState([]);
  const [record, setRecord] = useState([]); // Store command records here
  const [status, setStatus] = useState('idle'); // Track loading status
  const [nomEntreprise, setNomEntreprise] = useState("");  // Store enterprise name
  const [idEntreprise, setidEntreprise] = useState(0);  // Store enterprise ID
  const userId = localStorage.getItem("user");
  const [idcmd, setidcmd] = useState(0);  // Store command ID
  const [downloadLinks, setDownloadLinks] = useState<{ [key: number]: boolean }>({});
  const [deliveryNoteCreated, setDeliveryNoteCreated] = useState<{ [key: number]: boolean }>({});
  const [isCommandValidated, setIsCommandValidated] = useState<{ [key: number]: boolean }>({});

  const [invoiceCreated, setinvoiceCreated] = useState<{ [key: number]: boolean }>({});
  const [isfactureValidated, setisfactureValidated] = useState<{ [key: number]: boolean }>({});

  const theme = useTheme();

  const handleCommandClick = async (idCmd: any) => {
    try {
      const response = await axios.get(`http://localhost:9999/commande/getcommanddetails/${idCmd}`);
      setSelectedCommand(idCmd);
      setCommandDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to check if the command is validated
  const checkIfCommandIsValidated = async (idCmd: number): Promise<boolean> => {
    try {
      const response = await axios.get(`http://localhost:9999/commande/validate/${idCmd}`);
      console.log('Response from validate command:', response.data);
  
      // If the response is directly a boolean (true/false)
      if (typeof response.data === 'boolean') {
        console.log('isValid (boolean):', response.data);
        return response.data;
      } else {
        console.log('Response data is not a boolean or is undefined.');
        return false;  // Default fallback if the response structure is not as expected
      }
    } catch (error) {
      console.error("Error checking command validation:", error);
      return false;
    }
  };
  
  const checkIffactureIsValidated = async (idCmd: number): Promise<boolean> => {
    try {
      const response = await axios.get(`http://localhost:9999/commande/validatef/${idCmd}`);
      console.log('Response from validate command:', response.data);
  
      // If the response is directly a boolean (true/false)
      if (typeof response.data === 'boolean') {
        console.log('isValid (boolean):', response.data);
        return response.data;
      } else {
        console.log('Response data is not a boolean or is undefined.');
        return false;  // Default fallback if the response structure is not as expected
      }
    } catch (error) {
      console.error("Error checking command validation:", error);
      return false;
    }
  };

  // Fetch enterprise ID and contacts when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(entreprisePerContact(localStorage.getItem("user")) as any).unwrap();
        const idUser = result.idUser;
        console.log(idUser);
        
        // Fetch contacts for the enterprise
        await dispatch(contactsPerEntreprise(idUser) as any);
        
        // Set the enterprise ID
        setidEntreprise(Number(idUser));
      } catch (error) {
        console.error("Error fetching entreprise data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Fetch all commands for the enterprise ID when it changes
  useEffect(() => {
    const fetchCommands = async () => {
      if (idEntreprise !== 0) {
        setStatus('loading');
        try {
          const response = await axios.get(`http://localhost:9999/commande/getalletsecommande/${idEntreprise}`);
          setRecord(response.data);
          
          const validationResults: { [key: number]: boolean } = {};
          for (const cmd of response.data) {
            const isValidated = await checkIfCommandIsValidated(cmd.idC);
            validationResults[cmd.idC] = isValidated;
          }
          setIsCommandValidated(validationResults);  

          const validationResultsf: { [key: number]: boolean } = {};
          for (const cmd of response.data) {
            const isValidatedf = await checkIffactureIsValidated(cmd.idC);
            validationResultsf[cmd.idC] = isValidatedf;
          }
          setisfactureValidated(validationResultsf); 


          setStatus('succeeded');
        } catch (error) {
          console.error("Error fetching commands:", error);
          setStatus('failed');
        }
      }
    };
  
    fetchCommands();
  }, [idEntreprise]);
  
  const handleCreateDeliveryNote = async (idcmd: number) => {
    if (idcmd) {
      const data = {
        idcmd,  // Pass the command ID
        dateLivraison: new Date().toISOString(),  // Delivery date
      };
  
      try {
        await dispatch(createbdc(data) as any);  // Dispatch the async thunk
        console.log('Delivery Note Created');
  
        // Update the local state to immediately reflect the creation
        setDeliveryNoteCreated(prevState => ({
          ...prevState, 
          [idcmd]: true,  // Mark the command as having the delivery note created
        }));
  
        // Optionally update the state to prevent further changes to this command
        setIsCommandValidated(prevState => ({
          ...prevState,
          [idcmd]: true,  // Mark as validated
        }));
  
      } catch (error) {
        console.error("Failed to create delivery note", error);
      }
    } else {
      console.error("No command ID provided");
    }
  };

  const handlecreateinovice = async (idcmd: number) => {
    if (idcmd) {
      const data = {
        idcmd,  // Pass the command ID
      };
      setinvoiceCreated(prevState => ({
        ...prevState, 
        [idcmd]: true,  // Mark the command as having the delivery note created
      }));

      // Optionally update the state to prevent further changes to this command
      setisfactureValidated(prevState => ({
        ...prevState,
        [idcmd]: true,  // Mark as validated
      }));
      try {
        await dispatch(createinvoice(data) as any);  // Dispatch the async thunk
        console.log('invoice created');
  
     
  
      } catch (error) {
        console.error("Failed to create invoice", error);
      }
    } else {
      console.error("No command ID provided");
    }
  };




  
  const textColor = useColorModeValue("secondaryGray.900", "white");

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
          {/* Conditionally render the buttons */}
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {isCommandValidated[e.idC] ? (
                // If the command is validated, show "Download Delivery Note" button
                <text >
                  Delivery Note already Created
                </text>
              ) : (
                // If the command is not validated, show "Create Delivery Note" button
                <Button colorScheme="green" onClick={() => handleCreateDeliveryNote(e.idC)}>
                  Create Delivery Note
                </Button>
              )}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {isfactureValidated[e.idC] ? (
                // If the command is validated, show "Download Delivery Note" button
                <text >
                  facture  already Created
                </text>
              ) : (
                // If the command is not validated, show "Create Delivery Note" button
                <Button colorScheme="green"   onClick={() => handlecreateinovice(e.idC)}
                >Create Invoice</Button>
              )}
            </Text>
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
              <Th borderColor={borderColor}>nom Client</Th>

              <Th borderColor={borderColor}>Prix</Th>
              <Th borderColor={borderColor}>Date Création</Th>
              <Th borderColor={borderColor}>Adresse</Th>
              
              <Th borderColor={borderColor}>Action</Th>
                 <Th borderColor={borderColor}>Action</Th>
              <Th borderColor={borderColor}></Th>
            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>

      <Box>
        {selectedCommand && (
          <Box>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              Détails de la commande #{selectedCommand}
            </Text>
            <Table variant="simple" color="gray.500" mb="24px" mt="12px">
              <Thead>
                <Tr>
                  <Th borderColor={borderColor}>#</Th>
                  <Th borderColor={borderColor}>Nom Produit</Th>
                  <Th borderColor={borderColor}>Quantité</Th>
                  <Th borderColor={borderColor}>Prix Total</Th>
                </Tr>
              </Thead>
              <Tbody>{renderCommandDetails()}</Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Card>
  );
}
