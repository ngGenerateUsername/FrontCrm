import React, { useEffect, useState } from "react";
import {
  Input,
  Flex,
  VStack,
  Button,
  useToast,
  useColorModeValue,
  Box,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Participation(): JSX.Element {
  const [prix, setPrix] = useState(0);
  const [dateLivraisonF, setdateLivraisonF] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [record, setRecord] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");

  const idao = Number(localStorage.getItem("idao"));
  const history = useHistory();

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    setFile(uploadedFile || null);

    if (uploadedFile && uploadedFile.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.post("http://localhost:5000/extract-text", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const extractedText = response.data.text || "";
        setDescription(extractedText);

        toast({
          title: "Description Extracted",
          description: "Description has been successfully extracted from the file.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error extracting description:", error);
        toast({
          title: "Error",
          description: "Failed to extract description from the uploaded file.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Invalid File",
        description: "Only PDF files are supported.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    const idcf = Number(localStorage.getItem("user"));

    if (record) {
      const datePublication = new Date(record.datePublication);
      const dateLivraisonAO = new Date(record.dateLivraisonAO);
      const selectedDate = new Date(dateLivraisonF);

      if (selectedDate <= datePublication) {
        setError("La date de livraison doit être après la date de publication.");
        return;
      }

      if (selectedDate > dateLivraisonAO) {
        setError("La date de livraison doit être avant ou égale à la date limite de livraison.");
        return;
      }
    }

    const participation = {
      prix,
      dateLivraisonF,
      description,
    };

    const formData = new FormData();
    formData.append("p", new Blob([JSON.stringify(participation)], { type: "application/json" }));
    if (file) formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:9989/participate/participate/${idao}/${idcf}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data === "You have already participated in this tender.") {
        toast({
          position: "top",
          title: "Error",
          description: "You have already participated.",
          status: "error",
          duration: 3000,
          isClosable: true,
          
        });
        window.location.href = 'http://localhost:3000/CRM#/fournisseur/allao';

      } else if (response.status === 200) {
        toast({
          position: "top",
          title: "Success",
          description: "Participation submitted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // After showing the success message, navigate back to the tenders list:
        //history.push("http://localhost:3000/CRM#/fournisseur/allao");
        // If using a HashRouter, ensure this path corresponds correctly to your route setup.
        // If not using react-router, you can do:
         window.location.href = 'http://localhost:3000/CRM#/fournisseur/allao';
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
                Date Publication: {formatDate(record.datePublication)}
              </Text>
              <Text fontWeight="bold" color={textColor}>
                Date Clôture: {formatDate(record.dateCloture)}
              </Text>
              <Text fontWeight="bold" color={textColor}>
                Date Livraison AO: {formatDate(record.dateLivraisonAO)}
              </Text>
            </>
          )}

          <FormControl>
            <FormLabel fontWeight={500} color={textColor}>
              Prix
            </FormLabel>
            <Input
              type="number"
              value={prix}
              onChange={(e) => setPrix(parseInt(e.target.value, 10))}
              placeholder="Enter price"
              isRequired
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={500} color={textColor}>
              Date de Livraison Prévue
            </FormLabel>
            <Input
              type="date"
              value={dateLivraisonF}
              onChange={(e) => setdateLivraisonF(e.target.value)}
              isRequired
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={500} color={textColor}>
              Description
            </FormLabel>
            <Input
              type="text"
              value={description}
              placeholder="Extracted description"
              isReadOnly
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={500} color={textColor}>
              Upload PDF
            </FormLabel>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
            />
          </FormControl>

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
