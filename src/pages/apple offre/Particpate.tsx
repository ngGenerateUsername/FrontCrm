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

interface Payload {
  prix: number;
  datesoummision: string;
}

export default function Participation(): JSX.Element {
  const [prix, setPrix] = useState(0);
  const [datesoummision, setDatesoummision] = useState<string>('');
  const [record, setRecord] = useState<any>(null);
  const [status, setStatus] = useState("idle");

  const toast = useToast();
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.300");

  const idao = Number(localStorage.getItem("idao"));



  const handleSubmit = async (): Promise<void> => {
    const idcf = Number(localStorage.getItem("user"));

    try {
      const payload: Payload = {
        prix,
        datesoummision,
      };

      const response = await axios.post(`http://localhost:9989/participate/participate/${idao}/${idcf}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data === "you have alreadu partipated") {
        toast({
          position:"top",
          title: "Error",
          description: "You have already participated.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (response.status === 200) {
        toast({
          position:"top",

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
      <Card p={8} w="100%" maxW="800px" borderWidth="1px" borderColor={borderColor} boxShadow="lg" rounded="md">
        <VStack align="start" spacing={5}>
          <label style={{ fontWeight: 500, color: textColor }}>Prix</label>
          <Input
            type="number"
            value={prix}
            onChange={(e) => setPrix(parseInt(e.target.value, 10))}
            placeholder="Enter price"
            isRequired
            _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
          />

          <label style={{ fontWeight: 500, color: textColor }}>Date de Soumission</label>
          <Input
            type="date"
            value={datesoummision}
            onChange={(e) => setDatesoummision(e.target.value)}
            isRequired
            _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
          />

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
      </Card>
    </Flex>
  );
}
