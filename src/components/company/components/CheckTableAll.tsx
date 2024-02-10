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
import { fetchEntreprises } from "state/user/Entreprise_Slice";
import { Paginate } from "react-paginate-chakra-ui";

type RowObj = {
  name: [string, boolean];
  Domaine: string;
  id: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function CheckTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEntreprises() as any);
  }, [dispatch]);
  const { status, record } = useSelector((state: any) => state.All_Entreprises);
  console.log(record, status);

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
                  history.push("/profile/edit-company?id=" + e.idUser);
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
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          mb="4px"
          fontWeight="700"
          lineHeight="100%"></Text>
        <Menu data={record} type="company"/>
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
    </Card>
  );
}
