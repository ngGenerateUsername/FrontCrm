import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panier } from 'state/Commande/Commande_slice';
import {
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { FaTrash } from 'react-icons/fa';

export default function Listepanier() {
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [recordState, setRecordState] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // const Deletecmditeùm = async (id: string) => {
  //   const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  
  //   if (confirmation) {
  //     console.log(id);
  //     dispatch(Delete(id) as any)
  //       .unwrap()
  //       .then((res: any) => {
  //         console.log(res);
  //         window.location.reload();
  //       });
  //   }
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(Panier({
          idcontact: localStorage.getItem("user"),

        }) as any);
        // Handle response here
      } catch (error) {
        // Handle error here
      }
    };

    fetchData();

    return () => {
      // Cleanup function (if needed)
    };
  }, [dispatch]);

  const { status, record } = useSelector((state: any) => state.PanierExport);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    setRecordState(record);
    const totalPrice = record.reduce((acc: number, curr: any) => acc + curr.prixTotale, 0);
    setTotalPrice(totalPrice);

  }, [record]);

  const renderData = () => {
    if (status === "loading")
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Spinner size="md" />
          </Td>
        </Tr>
      );
    if (status === "failed")
      return (
        <Tr>
          <Td></Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Alert status="error">
              <AlertIcon />
              Erreur Serveur
            </Alert>
          </Td>
          <Td></Td>
        </Tr>
      );

    if (status === "succeeded") {
      return recordState.map((e: any, index: number) => (
        <Tr key={index}>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Text
              justifyContent="space-between"
              align="center"
              color={textColor}
              fontSize="sm"
              fontWeight="700">
              {e.nomproduit}
            </Text>
          </Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Text
              justifyContent="space-between"
              align="center"
              color={textColor}
              fontSize="sm"
              fontWeight="700">
              {e.nom}
            </Text>
          </Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Text
              justifyContent="space-between"
              align="center"
              color={textColor}
              fontSize="sm"
              fontWeight="700">
              {e.tva}
            </Text>
          </Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Text
              justifyContent="space-between"
              align="center"
              color={textColor}
              fontSize="sm"
              fontWeight="700">
              {e.qte}
            </Text>
          </Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"></Flex>
            <Text
              justifyContent="space-between"
              align="center"
              color={textColor}
              fontSize="sm"
              fontWeight="700">
              {e.prixTotale}
            </Text>
          </Td>
          <Td>
            <Flex
              justifyContent="space-between"
              align="center"
              fontSize={{ sm: "10px", lg: "12px" }}
              color="gray.400"
            ></Flex>
            <Flex
              // onClick={() => DeleteProduitF(e.idProduit)}
              marginLeft="40%"
              color="limegreen" // Couleur verte
              cursor="pointer"
              alignItems="center"
            >
              <FaTrash size={20} /> {/* Taille de l'icône */}
            </Flex>
          </Td>


        </Tr>
      ));
    }
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
        {/* Other components or elements */}
      </Flex>
      <Box>
        <br /><br />
        <br />
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                nom produit
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                nom categorie
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                tva
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                Quantité
              </Text>

            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Flex
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"></Flex>
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                Prix
              </Text>

            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                suprimer
              </Text>
            </Th>
          </Thead>
          <Tbody>
            {renderData()}
          </Tbody>
        </Table>
        <Flex justifyContent="flex-end" pr="25px">
          <Text fontWeight="bold" fontSize="lg">
            Prix Totale: {totalPrice}
          </Text>
        </Flex>
      </Box>
    </Card>
  );
}
