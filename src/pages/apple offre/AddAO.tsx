import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  Flex,
  Text,
  Spinner,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import axios from "axios";
import { format } from 'date-fns';


export default function CallForTenderForm() {
  // Individual state for each form field
  const [num, setNum] = useState('');
  const [ref, setRef] = useState('');
  const [description, setDescription] = useState('');
  const [DateCloture, setDateCloture] = useState('');
  const [quantite, setQuantite] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const toast = useToast();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");


  const handleSubmit = async () => {
    setError(''); // Reset error before submission
  
    // Validate each field
    if (!num.trim()) {
      setError("Please fill in the Num.");
      return;
    }
    if (!ref.trim()) {
      setError("Please fill in the Reference.");
      return;
    }
    if (!description.trim()) {
      setError("Please fill in the Description.");
      return;
    }
    if (!DateCloture.trim()) {
      setError("Please select the Closing Date.");
      return;
    }
    if (!quantite.trim()) {
      setError("Please fill in the Quantity.");
      return;
    }
  
    setStatus('loading');
  
    try {
      // Create a Date object from the input date
  
      // Format the date to "dd-MM-yyyy HH:mm"
  
      const payload = {
        idproduit: Number(localStorage.getItem("idprod")), // Ensure the idproduit is a number
        description,
        dateCloture:DateCloture, // Use the correctly formatted date
        quantite,
        num,
        ref,
      };
  
      // Send data using axios
      const response = await axios.post(`http://localhost:9999/AO/ADDAO/${payload.idproduit}`, payload);
  
      // Check for a successful response
      if (response.status === 200) {
        setStatus('succeeded');
        toast({
          title: "Success",
          description: "Call for Tender created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        // Reset form data after successful submission
        setNum('');
        setRef('');
        setDescription('');
        setDateCloture('');
        setQuantite('');
      } else {
        setStatus('failed');
        toast({
          title: "Error",
          description: "Failed to create Call for Tender.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('failed');
      toast({
        title: "Error",
        description: "Failed to create Call for Tender.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex align="center" justify="center" w="100%" py={10}>
      <Card p={8} w="100%" maxW="600px" borderWidth="1px" borderColor={borderColor}>
        <Heading as="h3" size="lg" color={textColor} mb={4} textAlign="center">
          Create Call for Tender
        </Heading>
        <Box>
          <FormControl mb={4} isInvalid={!!error && !num.trim()}>
            <FormLabel>Num</FormLabel>
            <Input
              type="number"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              placeholder="Enter number"
              isRequired
            />
          </FormControl>

          <FormControl mb={4} isInvalid={!!error && !ref.trim()}>
            <FormLabel>Reference</FormLabel>
            <Input
              type="text"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="Enter reference"
              isRequired
            />
          </FormControl>

          <FormControl mb={4} isInvalid={!!error && !description.trim()}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              isRequired
            />
          </FormControl>

          <FormControl mb={4} isInvalid={!!error && !DateCloture.trim()}>
            <FormLabel>Closing Date</FormLabel>
            <Input
              type="date"
              value={DateCloture}
              onChange={(e) => setDateCloture(e.target.value)}
              isRequired
            />
          </FormControl>

          <FormControl mb={6} isInvalid={!!error && !quantite.trim()}>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              placeholder="Enter quantity"
              isRequired
            />
          </FormControl>

          {error && <Text color="red.500" mb={4}>{error}</Text>} {/* Display error message */}

          <Button
            colorScheme="blue"
            onClick={handleSubmit} // Use onClick instead of form submission
            isLoading={status === 'loading'}
            loadingText="Submitting"
            w="full"
          >
            Submit Call for Tender
          </Button>
          {status === 'loading' && (
            <Flex mt={4} justify="center">
              <Spinner />
              <Text ml={2}>Submitting...</Text>
            </Flex>
          )}
        </Box>
      </Card>
    </Flex>
  );
}
