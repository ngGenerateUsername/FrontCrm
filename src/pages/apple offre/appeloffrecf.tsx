import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Grid,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Divider,
  Spinner,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import axios from 'axios';
import CallForTenderPDF from './CallForTenderPDF'; 
import { PDFDownloadLink } from '@react-pdf/renderer';

export default function Detaileappelloffre() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [generatedPdf, setGeneratedPdf] = useState<{ [id: number]: boolean }>({}); // Track generated PDFs per BDC ID

  const [status, setStatus] = useState("idle");
  const [record, setRecord] = useState(null); // Change to null to handle loading state
  const [tenderData, settenderData] = useState(null); // State for storing the fetched invoice data

  const idP = Number(localStorage.getItem("idprod"));

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(`http://localhost:9999/AO/getAOproduit/${idP}`);
        console.log("API Response:", response.data);
        setRecord(response.data);
        setStatus("succeeded");
        settenderData(response.data);
        setGeneratedPdf((prevState) => ({ ...prevState, [idP]: true }));  // Mark the PDF as generated for this BDC

      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus("failed");
      }
    };
    fetchData();
  }, [idP]);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <HStack justifyContent="center" w="full">
          <Spinner size="md" />
        </HStack>
      );
    }

    if (status === "failed") {
      return (
        <Text color="red.500" textAlign="center">Erreur lors du chargement des données</Text>
      );
    }

    if (status === "succeeded" && record) {
      return (
        
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
          {/* Left column - Read-only fields */}
          <VStack align="start" spacing={5}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={textColor} textTransform="uppercase">Détails Produit</Text>
              <Divider borderColor={borderColor} mt={2} mb={4} />
            </Box>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Nom produit </FormLabel>
              <Input type="text" value={record.nomprod} isReadOnly bg="gray.100" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Categorie</FormLabel>
              <Input type="text" value={record.categorie} isReadOnly bg="gray.100" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>TVA</FormLabel>
              <Input value={record.tva} isReadOnly bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Quantité</FormLabel>
              <Input type="text" value={record.quantite} isReadOnly bg="gray.100" />
            </FormControl>
          </VStack>

          {/* Right column - Editable fields */}
          <VStack align="start" spacing={5}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={textColor} textTransform="uppercase">Détails Appel d'Offre</Text>
              <Divider borderColor={borderColor} mt={2} mb={4} />
            </Box>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Référence</FormLabel>
              <Input type="text" value={record.ref} isReadOnly bg="gray.100" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Nom  entreprise</FormLabel>
              <Input type="text" value={record.nometse} isReadOnly bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Description</FormLabel>
              <Textarea  value={record.description} isReadOnly bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Date de Publication</FormLabel>
              <Input type="text" value={formatDate(record.DatePublication)} isReadOnly bg="gray.100" />
            </FormControl>
            
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Date de Cloture</FormLabel>
              <Input type="text" value={formatDate(record.dateCloture)} isReadOnly bg="gray.100" />
            </FormControl>
            
          </VStack>
        </Grid>
      );
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
          <br /><br /><br />

      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
      </Flex>
      <Box>
        {renderContent()}
        {status === "succeeded" && tenderData && (
          <PDFDownloadLink
            document={<CallForTenderPDF tender={tenderData} />}
            fileName="Appel_d'Offre.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button isLoading>Generating PDF...</Button>
              ) : (
                <Button colorScheme="blue" mt={5}>Download PDF</Button>
              )
            }
          </PDFDownloadLink>
        )}
      </Box>
    </Card>
  );
}
