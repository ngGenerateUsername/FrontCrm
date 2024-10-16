    import { useEffect, useState } from "react";
    import {
    Box,
    Select,
    Button,
    Flex,
    Text,
    Spinner,
    Alert,
    AlertIcon,
    useToast,
    } from "@chakra-ui/react";
    import { useDispatch, useSelector } from "react-redux";
    import { ListClientsPerContact } from "state/user/RelationClientUser_Slice"; // Action from slice
    import { useHistory } from "react-router-dom";

    export default function ClientSelector3() {
    const [selectedClient, setSelectedClient] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const toast = useToast();

    // Redux selector
    const { status, record: clients = [], error } = useSelector((state: any) => state.ListClientsPerContactExport || {});

    const userId = localStorage.getItem("user");

    useEffect(() => {
        if (userId) {
        // Dispatch and log the result of ListClientsPerContact
        dispatch(ListClientsPerContact(userId) as any).then((result: any) => {
            console.log("ListClientsPerContact result:", result);
        });
        }
    }, [dispatch, userId]);

    // Debugging: Check redux state after dispatch
    console.log("Redux state:", clients, status, error);

    const handleClientSelect = () => {
        if (!selectedClient) {
        toast({
            title: "Veuillez sélectionner un client.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
        return;
        }
      

        localStorage.setItem('item',selectedClient);
        localStorage.setItem('item2',clients);
        console.log("cleint ",clients)
    console.log(selectedClient);
        history.push("/produit/commandes");

        
    };


    if (status === "loading") {
        return <Spinner size="xl" />;
    }

    if (status === "failed") {
        return (
        <Alert status="error">
            <AlertIcon />
            {error || "Erreur lors du chargement des clients"}
        </Alert>
        );
    }

    return (
        <Box p="4" boxShadow="md" borderWidth="1px" borderRadius="lg">
        <br /><br /><br />
        <Text fontSize="xl" fontWeight="bold" mb="4">
            Sélectionnez un client pour continuer
        </Text>
        <Flex align="center">
            <Select
            placeholder="Sélectionnez un client"
            onChange={(e) => setSelectedClient(e.target.value)}
            >
            {Array.isArray(clients) && clients.length > 0 ? (
                clients.map((client: any) => (
                <option key={client.idClient} value={client.idClient}>
                    {client.nomEntreprise}
                </option>
                ))
            ) : (
                <option disabled>Aucun client disponible</option>
            )}
            </Select>
            <Button colorScheme="blue" ml="4" onClick={handleClientSelect}>
            Continuer
            </Button>
        </Flex>
        </Box>
    );
    }
