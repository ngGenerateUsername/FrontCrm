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
  type RowObj = {
    name: [string, boolean];
    Domaine: string;
    id: number;
  };

  const columnHelper = createColumnHelper<RowObj>();

  // const columns = columnsDataCheck;
  export default function CheckTableOffre(props: {id: any;}) {





    const { id } = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    let history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(AllOffre() as any);
    }, [dispatch]);
    const { status, record } = useSelector((state: any) => state.AllOffreExport);
    console.log(record, status);

      const { isOpen, onOpen, onClose } = useDisclosure();
      const btnRef = React.useRef();

    function RedirectToDetailsOffre(id : any) {
      history.push("/offre/details-Offre?id="+id);
    }

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Number of items to display per page
    const [listOffre,setListOffre]=useState(record)
    useEffect(()=>{
      setListOffre(record);
    },[record])
    const offset = currentPage * itemsPerPage;
    const currentPageData = listOffre.slice(offset, offset + itemsPerPage);

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

        return currentPageData.map((offre: any) => {
          return (
            <Tr key={offre.idOffre}>
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
                  {offre.title}
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
                  {offre.tvaMontant.toFixed(3)}
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
                  {offre.totaleHT.toFixed(3)}
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
                  {offre.totaleHTTC.toFixed(3)}
                </Text>
              </Td>
              <Td>
                <Flex
                  justifyContent="space-evenly"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400">
                <Button
                  onClick={()=>RedirectToDetailsOffre(offre.idOffre)}
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
            Ajouter Offre
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
                  Tva Montant
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
          count={listOffre.length}
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
              size="xxl"
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}

              >
                <DrawerOverlay />
                <Box  >
                <DrawerContent  >
                  <DrawerCloseButton />
                  <DrawerHeader>Ajouter Offre</DrawerHeader>
                  <DrawerBody>

                  <OverviewOffre onClose={onClose} listOffre={listOffre} setListOffre={setListOffre}></OverviewOffre>
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
