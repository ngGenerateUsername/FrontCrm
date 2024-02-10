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
  AlertIcon,
  Alert,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Select,
  useDisclosure,
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
import Menu from "components/menu/MenuExport";
import { useEffect, useState } from "react";
import { Console } from "console";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchClients } from "state/user/Client_Slice";
import {
  MyCLientsUser,
  CLientsOfMyEntreprise,
  UpdateRelationClientUser,
  CLientsOfMyEntrepriseJustClients
} from "state/user/RelationClientUser_Slice";
import { CommerciauxPerEntreprise,entreprisePerContact } from "state/user/Role_Slice";
import Overview from "pages/client/addClientWithContacts";
import { Paginate } from "react-paginate-chakra-ui";
type RowObj = {
  name: [string, boolean];
  Domaine: string;
  id: number;
};


const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function CheckTable(props: { id: any }) {
  const { id } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [resp, setResp] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const btnRef = React.useRef();
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CLientsOfMyEntreprise(id) as any);
  }, [dispatch]);
  const { status, record } = useSelector(
    (state: any) => state.CLientsOfMyEntrepriseExport
  );
  console.log(record, status);

  useEffect(() => {
    dispatch(CLientsOfMyEntrepriseJustClients(id) as any);
  }, [dispatch]);
  const { status:statusCLientsOfMyEntrepriseJustClients, record:recordCLientsOfMyEntrepriseJustClients } = useSelector(
    (state: any) => state.CLientsOfMyEntrepriseJustClientsExport
  );
  console.log(recordCLientsOfMyEntrepriseJustClients, statusCLientsOfMyEntrepriseJustClients);


  useEffect(() => {
    dispatch(entreprisePerContact(id) as any)
    .unwrap()
    .then((res: any) => {

      dispatch(CommerciauxPerEntreprise(res.idUser) as any);
      console.log(res)
    })
  }, [dispatch]);
  const { status: statusCommerciaux, record: recordCommerciaux } = useSelector(
    (state: any) => state.CommerciauxPerEntrepriseExport
  );
  console.log(recordCommerciaux, statusCommerciaux);
  
  const [idRelation, setidRelation] = useState("");
  function OpenAffect(id : any) {
    setidRelation(id);
   console.log(idRelation)
   onOpenn();
  }

  function RedirectToProfilClient(id : any) {
    history.push("/profile/profile-client?id="+id);
  }
  function RedirectToEditClient(id : any) {
    history.push("/profile/edit-client?id="+id);
  }

  const Affect = async () => {
    console.log(resp);
    console.log(idRelation)
    dispatch(UpdateRelationClientUser({idRelationClientUser:idRelation,idUser:resp}) as any).unwrap().then((res: any) => {

      dispatch(CLientsOfMyEntreprise(id) as any)
      onClosee();
    })
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page

  const offset = currentPage * itemsPerPage;
  const currentPageData = record.slice(offset, offset + itemsPerPage);

  const handlePageClick = (p: number) => setCurrentPage(p);

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
      return currentPageData.map((e: any) => {
        return (
          <Tr key={e.client.idClient}>
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
                {e.client.nomEntreprise}
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
                {e.client.domaine}
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
                {e.user.username}
              </Text>
            </Td>
            <Td>
              <Flex
                justifyContent="space-evenly"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">             
                 <Button
                color="white"
                variant="brand"
                fontSize="sm"
                fontWeight="700"
                onClick={() => OpenAffect(e.idRelationClientUser)}>
                Affecter
              </Button>
              <Button
                color="white"
                variant="brand"
                fontSize="sm"
                fontWeight="700"
                onClick={() => RedirectToProfilClient(e.client.idClient)}>
                Visiter Profil
              </Button>
              <Button
                color="white"
                variant="brand"
                fontSize="sm"
                fontWeight="700"
                onClick={() => RedirectToEditClient(e.client.idClient)}>
                Editer Profil
              </Button>
              </Flex>

            </Td>
          </Tr>
        );
      });
    }
  };



  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" align="left" justifyContent="space-between">
        <Button
          fontSize="sm"
          variant="brand"
          fontWeight="500"
          w="50"
          h="50"
          mb="24px"
          type="submit"
          onClick={onOpen}>
          Ajouter client
        </Button>
        <Menu data={recordCLientsOfMyEntrepriseJustClients} type="clientEntreprise"/>
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
                Responsable
              </Text>
            </Th>
            <Th pe="10px" borderColor={borderColor} cursor="pointer">
              <Text
                justifyContent="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
                Actions
              </Text>
            </Th>
          </Thead>
          <Tbody>{renderData()}</Tbody>
        </Table>
        <Box display="flex" justifyContent="center" marginTop="1rem">
              <Paginate
        // required props 👇
        page={currentPage}
        count={record.length}
        pageSize={itemsPerPage}
        onPageChange={handlePageClick}
        // optional props 👇
        margin={1}
        shadow="lg"
        fontWeight="blue"
        variant="outline"
        // ...border and other props also work 💪
        border="2px solid"
        // you can use w to adjust to parent
        // container
        // w="full"
      />
      </Box>
        
      </Box>
      <Drawer
        size="xl"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        id="LeftDrawer"
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Ajouter Client</DrawerHeader>
          <DrawerBody>
            <Overview></Overview>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isOpenn}
        placement="bottom"
        onClose={onClosee}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Affecter</DrawerHeader>
          <DrawerBody>
            <Box>
              <FormLabel htmlFor="owner">Selectionner un Commercial</FormLabel>
              <Select
                name="resp"
                value={resp}
                onChange={(e) => setResp(e.target.value)}
                id="owner"
                defaultValue="...">
                <option key="..." value="null">
                  ...
                </option>
                {recordCommerciaux.map((e: any, key: any) => (
                  <option key={e.idUser} value={e.idUser}>
                    {e.username}
                  </option>
                ))}
              </Select>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClosee}>
              Retour
            </Button>
            <Button colorScheme="brand" onClick={Affect}>
              Affecter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
}
