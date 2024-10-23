import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Box, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Button, Spinner } from "@chakra-ui/react";
import Card from "components/card/Card";
import { contactsPerEntreprise, entreprisePerContact } from 'state/user/Role_Slice';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import from react-pdf
import Bdc from 'pages/bdc/bdc'; // Invoice component

export default function Allbdc() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const dispatch = useDispatch();
  const [record, setRecord] = useState([]); // Store command records here
  const [idetse, setidetse] = useState(0);  // Store enterprise ID
  const [bdcdata, setbdcdata] = useState(null); // State for storing the fetched invoice data
  const [isFetching, setIsFetching] = useState(false); // Loading state for PDF generation
  const [generatedPdf, setGeneratedPdf] = useState<{ [id: number]: boolean }>({}); // Track generated PDFs per BDC ID


  // Fetch entreprise data and set enterprise ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(entreprisePerContact(localStorage.getItem("user")) as any).unwrap();
        const idUser = result.idUser;

        // Fetch contacts for the enterprise
        await dispatch(contactsPerEntreprise(idUser) as any);

        // Set the enterprise ID
        setidetse(Number(idUser));
      } catch (error) {
        console.error("Error fetching entreprise data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Fetch all BDC for the enterprise once idEntreprise is set
  useEffect(() => {
    if (idetse !== 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:9999/bdc/getallbdc/${idetse}`);
          console.log('BDC Data:', response.data); // Log the data structure
          setRecord(response.data);
        } catch (error) {
          console.error("Error fetching BDC data:", error);
        }
      };
      

      fetchData();
    }
  }, [idetse]);

  const handleDownload = async (idbdc: number) => {
    setIsFetching(true);  // Set loading state to true
    try {
      const response = await axios.get(`http://localhost:9999/bdc/getbdc/${idbdc}`);
      setbdcdata(response.data);  // Set the fetched invoice data to state
      setGeneratedPdf((prevState) => ({ ...prevState, [idbdc]: true }));  // Mark the PDF as generated for this BDC

    } catch (error) {
      console.error('Error fetching invoice data:', error);
    } finally {
      setIsFetching(false);  // Set loading state to false
    }
  };
  
  // Render the table data
  const renderData = () => {
    return record.map((e: any, index: number) => {
      console.log('BDC ID:', e.idBdc);  // Check if it's a number
      return (
        <Tr key={index} style={{ cursor: 'pointer' }}>
          <Td borderColor={borderColor}>{index + 1}</Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.nomentreprise}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.nomClient}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.DateLivraison}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.adressLivraison}
            </Text>
          </Td>
          <Td>
            <Text color={textColor} fontSize="sm" fontWeight="700">
              {e.price}
            </Text>
          </Td>
          <Td>
            {generatedPdf[e.idbdc] ? (
              // If PDF is generated, show download link
              <PDFDownloadLink
                document={<Bdc bdc={bdcdata} />}
                fileName={`bdc.pdf`}
              >
                   {({ loading }) => (
        loading ? (
          <Button colorScheme="teal" size="sm" disabled>
            <Spinner size="sm" /> Loading PDF...
          </Button>
        ) : (
          <Button colorScheme="teal" size="sm" variant="outline">
            Download PDF
          </Button>
        )
      )}
    </PDFDownloadLink>
            ) : (
              // If PDF not generated, show the generate button
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => handleDownload(Number(e.idbdc))}
                  // Disable button while fetching
              >
                {'Generate PDF'}
              </Button>
            )}
          </Td>
        </Tr>
      );
    });
  };
  
  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between"></Flex>

      <Box>
        <br /><br />
        <Text color={textColor} fontSize="sm" fontWeight="700"></Text>

        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>#</Th>
              <Th borderColor={borderColor}>nomentreprise</Th>
              <Th borderColor={borderColor}>nomClient</Th>
              <Th borderColor={borderColor}>dateLivraison</Th>
              <Th borderColor={borderColor}>Adresse</Th>
              <Th borderColor={borderColor}>prix</Th>
              <Th borderColor={borderColor}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
      </Box>
    </Card>
  );
}
