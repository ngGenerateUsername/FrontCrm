  import React, { useState, useEffect } from 'react';
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
    Grid,
    Divider,
    VStack,
    HStack,
    IconButton,
  } from "@chakra-ui/react";
  import { AddIcon } from '@chakra-ui/icons'; // Optional icon for button enhancement
  import Card from "components/card/Card"; // Ensure this Card component has a well-defined style
  import axios from "axios";

  export default function CallForTenderForm() {

    const [ref, setRef] = useState('');
    const [description, setDescription] = useState('');
    const [DateCloture, setDateCloture] = useState('');
    const [quantite, setQuantite] = useState('');
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const [categorie, setCategorie] = useState('');
    const [nometse, setNometse] = useState('');
    const [tva, setTVA] = useState('');
    const [nomprod, setNomprod] = useState('');

    const toast = useToast();
    const textColor = useColorModeValue("gray.800", "white");
    const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");

    useEffect(() => {
      const fetchDetails = async () => {
        try {
            const idProduit = Number(localStorage.getItem("idprod"));
          const productResponse = await axios.get(`http://localhost:9999/api/Produit/produitdetaille/${idProduit}`);
          setCategorie(productResponse.data.categorie.nom);
          setNomprod(productResponse.data.nom);
          setTVA(productResponse.data.categorie.tva);
          const entrepriseResponse = await axios.get(`http://localhost:9999/api/Produit/nometntreprise/${idProduit}`);
          setNometse(entrepriseResponse.data);
        } catch (err) {
          console.error("Error fetching details:", err);
        }
      };
      fetchDetails();
    }, []);

    const handleSubmit = async () => {
      setError('');
      
      if (!ref.trim() || !description.trim() || !DateCloture.trim() || !quantite.trim()) {
        setError("All fields are required.");
        return;
      }
    
      // Validate that dateCloture is at least 15 days after datePublication
      const datePublication = new Date(); // Assuming DatePublication is set to the current date
      const dateCloture = new Date(DateCloture);
      const minDateCloture = new Date(datePublication);
      minDateCloture.setDate(minDateCloture.getDate() + 15);
    
      if (dateCloture < minDateCloture) {
        setError("Date de clôture doit être au moins 15 jours après la date de publication.");
        return;
      }
    
      setStatus('loading');
      try {
        const payload = {
          idproduit: Number(localStorage.getItem("idprod")),
          description,
          dateCloture: DateCloture,
          quantite,
          ref,
        };
    
        const response = await axios.post(`http://localhost:9989/AO/ADDAO/${payload.idproduit}`, payload);
    
        if (response.status === 200) {
          setStatus('succeeded');
          toast({
            title: "Succès",
            description: "Appel d'offre ajouté avec succès.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setRef('');
          setDescription('');
          setDateCloture('');
          setQuantite('');
        } else {
          setStatus('failed');
          toast({
            title: "Erreur",
            description: "Échec de la création de l'appel d'offre.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Submission error:", error);
        setStatus('failed');
        toast({
          title: "Erreur",
          description: "Échec de la création de l'appel d'offre.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    

    return (
      <Flex align="center" justify="center" w="100%" py={10} bg={useColorModeValue("gray.50", "gray.900")}>
        <Card p={8} w="100%" maxW="900px" borderWidth="1px" borderColor={borderColor} boxShadow="lg" rounded="md">
          <Heading as="h1" size="xl" color={textColor} mb={6} textAlign="center" textTransform="uppercase" fontWeight="extrabold">
Appel d'Offre
          </Heading>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10}>
            {/* Left column - Read-only fields */}
            <VStack align="start" spacing={5}>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color={textColor} textTransform="uppercase">
                détail produit
                </Text>
                <Divider borderColor={borderColor} mt={2} mb={4} />
              </Box>

              <FormControl>
                <FormLabel fontWeight="medium" color={textColor}> Nom </FormLabel>
                <Input type="text" value={nomprod} isReadOnly bg="gray.100" />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="medium" color={textColor}>Categorie</FormLabel>
                <Input type="text" value={categorie} isReadOnly bg="gray.100" />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="medium" color={textColor}>TVA</FormLabel>
                <Input type="text" value={tva} isReadOnly bg="gray.100" />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="medium" color={textColor}> Nom Entreprise</FormLabel>
                <Input type="text" value={nometse} isReadOnly bg="gray.100" />
              </FormControl>
            </VStack>

            {/* Right column - Editable fields */}
            <VStack align="start" spacing={5}>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color={textColor} textTransform="uppercase">
                détail appel d'offre                </Text>
                <Divider borderColor={borderColor} mt={2} mb={4} />
              </Box>


              <FormControl isInvalid={!!error && !ref.trim()}>
                <FormLabel fontWeight="medium" color={textColor}>Reference</FormLabel>
                <Input
                  type="text"
                  value={ref}
                  onChange={(e) => setRef(e.target.value)}
                  placeholder="Enter reference"
                  isRequired
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                />
              </FormControl>

              <FormControl isInvalid={!!error && !description.trim()}>
                <FormLabel fontWeight="medium" color={textColor}>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  isRequired
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                />
              </FormControl>

              <FormControl isInvalid={!!error && !DateCloture.trim()}>
                <FormLabel fontWeight="medium" color={textColor}> Date de cloture</FormLabel>
                <Input
                  type="date"
                  value={DateCloture}
                  onChange={(e) => setDateCloture(e.target.value)}
                  isRequired
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                />
              </FormControl>

              <FormControl isInvalid={!!error && !quantite.trim()}>
                <FormLabel fontWeight="medium" color={textColor}>Quantité</FormLabel>
                <Input
                  type="number"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                  placeholder="Enter quantity"
                  isRequired
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                />
              </FormControl>

              {error && <Text color="red.500" mt={2}>{error}</Text>}

              <HStack spacing={4} width="full">
                <Button
                  colorScheme="teal"
                  onClick={handleSubmit}
                  isLoading={status === 'loading'}
                  loadingText="Submitting..."
                  w="full"
                  size="lg"
                  boxShadow="md"
                  _hover={{ bg: "teal.600" }}
                >
                  Confirmation
                </Button>
             
              </HStack>
            </VStack>
          </Grid>

          {status === 'loading' && (
            <Flex mt={6} justify="center">
              <Spinner size="xl" color="teal.500" />
              <Text ml={3} fontSize="lg" color={textColor}>Processing your submission...</Text>
            </Flex>
          )}
        </Card>
      </Flex>
    );
  }
