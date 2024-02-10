import {
  Flex,
  Box,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  Input,
  DrawerFooter,
  useDisclosure,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { useEffect, useState } from "react";
import { Console } from "console";
import { useHistory } from "react-router-dom";

import Overview from "pages/client/addClientWithContacts";
import axios from "axios";
import { isEmpty } from "lodash";
import { isEmptyArray } from "@chakra-ui/utils";

type RowObj = {
  name: [string, boolean];
  Domaine: string;
  id: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function CheckTable(props: {}) {
  const [wait, setWait] = useState(false);
  const [wait2, setWait2] = useState(false);
  const [addClient, setaddClient] = useState(false);
  const [statuss, setstatuss] = useState(false);

  const [listEntrepriseClient, setlistEntrepriseClient] = useState(null);
  const [Entreprise, setEntreprise] = useState(null);

  const [Client, setClient] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [inputt, setinputt] = useState("");
  useEffect(() => {
    fetch(
      "http://localhost:8080/api/role_entreprise/entreprisePerProp?id=" +
        localStorage.getItem("user")
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEntreprise(data);
        console.log(data);
        //console.log(data);
        axios
          .get(
            "http://localhost:8080/api/ContactEntreprise/ListeClients?id=" +
              data.idUser
          )
          .then(function (response) {
            console.log(response.data);
            setlistEntrepriseClient(response.data);
            setWait(true);
          });
      });
  }, []);
  const [listEntreprise, setlistEntreprise] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/api/entreprise/entreprises")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setlistEntreprise(data);
        console.log(data);
        setWait2(true);
      });
  }, []);

  const AjoutClient = async () => {
    console.log(Client);
    if (Client == Entreprise.idUser) {
      setaddClient(true);
      alert("Votre Entreprise");
    } else if (Client == "" || Client == null) {
      setaddClient(true);
      alert("Veuillez choisir une entreprise");
    } else if (
      listEntrepriseClient.filter((element: { idUser: any }) => {
        return element.idUser == Client;
      }).length > 0
    ) {
      alert("deja client");
    } else {
      const result = await axios.post(
        "http://localhost:8080/api/ContactEntreprise/ajout",
        { idEntreprise: Entreprise.idUser, idEntrepriseClient: Client }
      );
      console.log(result);
      window.location.reload();
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  let history = useHistory();

  return (
    <>
      {wait && wait2 && (
        <Card
          flexDirection="column"
          w="100%"
          px="0px"
          overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Flex
            px="25px"
            mb="8px"
            justifyContent="space-between"
            align="center">
            <Text
              color={textColor}
              fontSize="22px"
              mb="4px"
              fontWeight="700"
              lineHeight="100%">
            </Text>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="15%"
              h="50"
              mb="24px"
              type="submit"
              onClick={onOpen}>
              Ajouter client
            </Button>
          </Flex>
          <Box>
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
                    Nom de L'entreprise
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
                    Domaine
                  </Text>
                </Th>
                <Th pe="10px" borderColor={borderColor} cursor="pointer">
                  <Text
                    justifyContent="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400">
                    Details
                  </Text>
                </Th>
              </Thead>
              <Tbody>
                {listEntrepriseClient.map((e: any, key: any) => (
                  <Tr>
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
                        {e.nomEntreprise}
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
                        {e.domaine}
                      </Text>
                    </Td>
                    <Td>
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"></Flex>
                      <Button
                        onClick={async () => {
                          history.push(
                            "/profile/profile-company?id=" + e.idUser
                          );
                        }}
                        marginLeft="40%"
                        color="white"
                        variant="brand"
                        fontSize="sm"
                        fontWeight="700">
                        Plus de Details
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Drawer
            size="xl"
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Ajouter Client</DrawerHeader>

              <DrawerBody>
                <Box>
                  <FormLabel htmlFor="owner">
                    Selectionner une entreprise
                  </FormLabel>
                  <Select
                    name="client"
                    value={Client}
                    onChange={(e) => setClient(e.target.value)}
                    id="owner"
                    defaultValue="">
                    <option value="">...</option>
                    {listEntreprise.map((e: any, key: any) => (
                      <option value={e.idUser}>{e.nomEntreprise}</option>
                    ))}
                  </Select>
                </Box>
                <Overview></Overview>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Retour
                </Button>
                <Button colorScheme="brand" onClick={AjoutClient}>
                  Enregistrer
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Card>
      )}
    </>
  );
}
