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
  
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useToast,
  
    Button
  } from "@chakra-ui/react";
  import { Panier } from "state/Commande/Commande_slice";
  import Card from "components/card/Card";
  import Listepanier from "pages/Commande/Listepanier";
  export default function commande() {


    return (
<Listepanier/>
        );
}
