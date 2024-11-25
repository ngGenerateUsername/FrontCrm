import React, { useEffect, useState } from 'react';
import {
  Input,
  Flex,
  VStack,
  Button,
  useToast,
  useColorModeValue,
  Box,
  Grid,
  FormControl,
  FormLabel,
  Text,
  Divider,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import axios from "axios";

export default function Participation(): JSX.Element {
  const [prix, setPrix] = useState(0);
  const [dateLivraisonF, setdateLivraisonF] = useState<string>('');
  const [record, setRecord] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");

  const idao = Number(localStorage.getItem("idao"));
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  useEffect(() => {
    const fetchCallForTender = async () => {
      try {
        const response = await axios.get(`http://localhost:9989/AO/appeloffre/${idao}`);
        setRecord(response.data);
      } catch (error) {
        console.error("Error fetching call for tender:", error);
        setError("Failed to load call for tender details.");
      }
    };

    fetchCallForTender();
  }, [idao]);

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    const idcf = Number(localStorage.getItem("user"));

    if (record) {
      const datePublication = new Date(record.datePublication);
      const dateLivraisonAO = new Date(record.dateLivraisonAO);
      const selectedDate = new Date(dateLivraisonF);

      if (selectedDate <= datePublication) {
        setError("The delivery date must be after the publication date.");
        return;
      }

      if (selectedDate > dateLivraisonAO) {
        setError("The delivery date must be on or before the delivery deadline.");
        return;
      }
    }

    try {
      const payload = { prix, dateLivraisonF };

      const response = await axios.post(
        `http://localhost:9989/participate/participate/${idao}/${idcf}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data === "you have alreadu partipated") {
        toast({
          position: "top",
          title: "Error",
          description: "You have already participated.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (response.status === 200) {
        toast({
          position: "top",
          title: "Success",
          description: "Participation submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit participation.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit participation.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" w="100%" py={10} bg={useColorModeValue("gray.50", "gray.900")}>
      <Box
        p={8}
        w="100%"
        maxW="800px"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="lg"
        rounded="md"
      >
        <VStack align="start" spacing={5}>
          {record && (
            <>
              <Text fontWeight="bold" color={textColor}>
                Date Publication: {new Date(record.datePublication).toLocaleDateString()}
              </Text>
              <Text fontWeight="bold" color={textColor}>
              <Text>
  Date Livraison AO: {formatDate(record.dateLivraisonAO)}
</Text>
              </Text>
            </>
          )}

          <label style={{ fontWeight: 500, color: textColor }}>Prix</label>
          <Input
            type="number"
            value={prix}
            onChange={(e) => setPrix(parseInt(e.target.value, 10))}
            placeholder="Enter price"
            isRequired
            _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
          />

          <label style={{ fontWeight: 500, color: textColor }}>Date de Livraison Prévue</label>
          <Input
            type="date"
            value={dateLivraisonF}
            onChange={(e) => setdateLivraisonF(e.target.value)}
            isRequired
            _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
          />

          {error && <Text color="red.500">{error}</Text>}

          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            size="lg"
            boxShadow="md"
            _hover={{ bg: "teal.600" }}
          >
            Submit Participation
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
