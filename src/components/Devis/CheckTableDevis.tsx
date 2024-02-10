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
    useDisclosure,
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
  import { useHistory } from "react-router-dom";

  import { useSelector, useDispatch } from "react-redux";
  import { fetchClients } from "state/user/Client_Slice";
  import { MyCLientsUser } from "state/user/RelationClientUser_Slice";
  import Overview from "pages/client/addClientWithContacts";
  import { Paginate } from "react-paginate-chakra-ui";
import { AllOffre } from "state/Offre/OffreSlices";
import OverviewOffre from "pages/offre/addOffre";


import { AllFactureByCom } from "state/Facture/FactureSlices";
import { DateDisplay } from "helpers/DateDisplay";
import OverviewDevis from "pages/devis/addDevis";
import { AllDevisByCom } from "state/devis/devis_Slice";
  type RowObj = {
    name: [string, boolean];
    Domaine: string;
    id: number;
  };

  const columnHelper = createColumnHelper<RowObj>();

  // const columns = columnsDataCheck;
  export default function CheckTableDevis(props: {id: any;}) {






    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    let history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(AllDevisByCom(props.id) as any);
    }, [dispatch]);
    const { status, record } = useSelector((state: any) => state.AllDevisByComsExport);
    console.log(record, status);



      const { isOpen, onOpen, onClose } = useDisclosure();
      const btnRef = React.useRef();

    function RedirectToDetailsOffre(id : any) {
      history.push("/devis/details-devis?id="+id);
    }

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Number of items to display per page
    const [listFacture,setListFacture]=useState([])
    useEffect(()=>{
      setListFacture(record);
    },[record])
    const offset = currentPage * itemsPerPage;
    const currentPageData = listFacture.slice(offset, offset + itemsPerPage);

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

        return currentPageData.map((facture: any) => {
          return (
            <Tr key={facture.id}>
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
                  {facture.title}
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
                  <DateDisplay dateTimeString={facture.created_at} /> 
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
                  {facture.montantTotalHT.toFixed(3)}
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
                  {facture.montantTotalHTTC.toFixed(3)}
                </Text>
              </Td>
              <Td>
                <Flex
                  justifyContent="space-evenly"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400">
                <Button
                  onClick={()=>RedirectToDetailsOffre(facture.id)}
                  marginLeft="20%"
                  color="white"
                  variant="brand"
                  fontSize="sm"
                  fontWeight="700">
                  Plus de Details
                </Button>
                {/* <Button
                  color="white"
                  variant="brand"
                  fontSize="sm"
                  fontWeight="700"
                  >
                  Editer Profil
                </Button> */}
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
            Ajouter Devis
          </Button>
          <Menu data={record} type="client"/>
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
                 Title
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
                  Date
                </Text>
              </Th>
              <Th pe="10px" borderColor={borderColor} cursor="pointer">
                <Text
                  justifyContent="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400">
                  Totale HT
                </Text>
              </Th>
              <Th pe="10px" borderColor={borderColor} cursor="pointer">
                <Text
                  justifyContent="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400">
                  Totale HTTC
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
          count={listFacture.length}
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
                finalFocusRef={btnRef}

              >
                <DrawerOverlay />
                <Box  >
                <DrawerContent  >
                  <DrawerCloseButton />
                  <DrawerHeader>Ajouter Devis</DrawerHeader>
                  <DrawerBody>

                  <OverviewDevis onClose={onClose} listFacture={listFacture} setListFacture={setListFacture}></OverviewDevis>
                  </DrawerBody>
                  {/* <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Retour
                    </Button>
                    <Button colorScheme="brand">Enregistrer</Button>
                  </DrawerFooter> */}
                </DrawerContent>
                </Box>
              </Drawer>

      </Card>
    );
  }
