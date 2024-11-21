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
import { useHistory } from 'react-router-dom';

export default function Detaileappelloffre() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [generatedPdf, setGeneratedPdf] = useState<{ [id: number]: boolean }>({});
  const [status, setStatus] = useState("idle");
  const [record, setRecord] = useState<any>(null);
  const [tenderData, settenderData] = useState<any>(null);
  const history = useHistory();

  const idP = Number(localStorage.getItem("idprod"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(`http://localhost:9989/AO/getAOproduit/${idP}`);
        setRecord(Array.isArray(response.data) ? response.data[0] : response.data);
        setStatus("succeeded");
        settenderData(response.data);
        setGeneratedPdf((prevState) => ({ ...prevState, [idP]: true }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus("failed");
      }
    };
    fetchData();
  }, [idP]);

  const handleparticpate = (idao: any) => {
    localStorage.setItem("idao", idao);
    history.push("/produit/particpation");
  };

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
          <VStack align="start" spacing={5}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={textColor} textTransform="uppercase">Détails Produit</Text>
              <Divider borderColor={borderColor} mt={2} mb={4} />
            </Box>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Nom produit </FormLabel>
              <Input type="text" value={record.nomprod || ''} isReadOnly bg="gray.100" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Categorie</FormLabel>
              <Input type="text" value={record.categorie || ''} isReadOnly bg="gray.100" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>TVA</FormLabel>
              <Input value={record.tva || ''} isReadOnly bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Quantité</FormLabel>
              <Input type="text" value={record.quantite || ''} isReadOnly bg="gray.100" />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={5}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={textColor} textTransform="uppercase">Détails Appel d'Offre</Text>
              <Divider borderColor={borderColor} mt={2} mb={4} />
            </Box>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Référence</FormLabel>
              <Input type="text" value={record.ref || ''} isReadOnly bg="gray.100" />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Nom entreprise</FormLabel>
              <Input type="text" value={record.nometse || ''} isReadOnly bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Description</FormLabel>
              <Textarea value={record.description || ''} isReadOnly bg="gray.100" />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Date de Publication</FormLabel>
              <Input type="text" value={record.datePublication || ''} isReadOnly bg="gray.100" />
            </FormControl>
            
            <FormControl>
              <FormLabel fontWeight="medium" color={textColor}>Date de Cloture</FormLabel>
              <Input type="text" value={record.dateCloture || ''} isReadOnly bg="gray.100" />
            </FormControl>
          </VStack>
        </Grid>
      );
    }
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <br /><br /><br />
      <Box>
        {renderContent()}
      </Box>
      <Flex px="25px" mt="8px" align="left" justifyContent="space-between">
        {status === "succeeded" && tenderData && (
          <PDFDownloadLink
            document={<CallForTenderPDF tender={tenderData} />}
            fileName="Appel_d'Offre.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button isLoading>Generating PDF...</Button>
              ) : (
                <Button colorScheme="blue">Download PDF</Button>
              )
            }
          </PDFDownloadLink>
        )}
        {status === "succeeded" && record && role === "ROLE_CONTACTFOURISSEUR" && (
          <Button colorScheme="teal" onClick={() => handleparticpate(record.idao)}>Participer</Button>
        )}
      </Flex>
    </Card>
  );
}
