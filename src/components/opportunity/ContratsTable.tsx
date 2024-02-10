import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  FaEllipsisV,
  FaFilter,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AllContrats, DetailsContrat } from "state/user/Contrat_Slice";
import Card from "components/card/Card";
import { Link } from "react-router-dom";
import { fetchSingleClient } from "state/user/Client_Slice";
import Banner from "./MenuExport";

const CheckTable = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllContrats() as any);
  }, [dispatch]);

  const { status, record } = useSelector(
    (state: any) => state.AllContratsExport
  );

  useEffect(() => {
    dispatch(DetailsContrat(record.idContrat) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(fetchSingleClient(res.idClient) as any);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusClient, record: recordClient } = useSelector(
    (state: any) => state.fetchSingleClientExport
  );
  console.log("client", recordClient, statusClient);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
    setSelectedFilter("");
    setFilterValue("");
    setFilterPhone("");
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleFilterPhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterPhone(event.target.value);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterOptionChange = (selectedValue: string) => {
    setSelectedFilter(selectedValue);
  };

  const renderData = () => {
    if (status === "loading") {
      return (
        <Tr>
          <Td colSpan={3}>
            <Flex justifyContent="center" align="center">
              <Text fontSize="sm" color="gray.400">
                Loading...
              </Text>
            </Flex>
          </Td>
        </Tr>
      );
    }

    if (status === "failed") {
      return (
        <Tr>
          <Td colSpan={3}>
            <Flex justifyContent="center" align="center">
              <Text fontSize="sm" color="gray.400">
                Server Error
              </Text>
            </Flex>
          </Td>
        </Tr>
      );
    }

    if (status === "succeeded") {
      let filteredData = record;

      if (filterValue !== "") {
        filteredData = record.filter((e: any) =>
          e.titre.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (filterPhone !== "") {
        filteredData = filteredData.filter((e: any) =>
          e.telephone?.toString().includes(filterPhone)
        );
      }

      if (filteredData.length === 0) {
        return (
          <Tr>
            <Td colSpan={9}>
              <Flex justifyContent="center" align="center">
                <Text fontSize="sm" color="gray.400">
                  No Data Found
                </Text>
              </Flex>
            </Td>
          </Tr>
        );
      }

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredData.slice(
        indexOfFirstItem,
        indexOfLastItem
      );

      return currentItems.map((e: any) => (
        <Tr key={e.idUser}>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Link
                to={`/opportunite/details/DetailsContrat?id=${
                  e.idContrat || ""
                }`}
              >
                <Text fontWeight="500" color="black.600">
                 Contrat n° {e.idContrat}
                </Text>
              </Link>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Text color="gray.600"> {e.opportunite && e.opportunite.titre}</Text>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Text color="gray.600">{e.dateSignature}</Text>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
            <Text
            position="absolute"
            width="100px"
            height="20px"
            bg={e.statusContrat === "NON_SIGNE" ? "red.400" : "green.400"}
            color="white"
            fontSize="xs"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="1"
            borderRadius="4px"
            boxShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
          >{e.statusContrat === "NON_SIGNE" ? "Non signé" : "signé"}</Text>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Link
                to={`/opportunite/Opportunite/OpportuniteDetail?id=${
                  e.idOpportunite || ""
                }`}
              >
                <Text color="gray.600">{e.relationActivite}</Text>
              </Link>
            </Flex>
          </Td>
        </Tr>
      ));
    }
  };

  const renderPagination = () => {
    if (status !== "succeeded") return null;

    const pageNumbers = Math.ceil(record.length / itemsPerPage);
    if (pageNumbers === 1) return null;

    const paginationItems = [];
    for (let i = 1; i <= pageNumbers; i++) {
      paginationItems.push(
        <Button
          key={i}
          size="sm"
          variant={currentPage === i ? "solid" : "outline"}
          onClick={() => setCurrentPage(i)}
          mx="1"
        >
          {i}
        </Button>
      );
    }

    return (
      <Flex justifyContent="center" alignItems="center" mt={2}>
        {paginationItems}
      </Flex>
    );
  };

  const filterMenu = (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={FaEllipsisV} />}
        variant="outline"
        size="sm"
        onClick={handleFilterClick}
      >
        Filter
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleFilterOptionChange("name")}>
          Filtrer par Titre
        </MenuItem>
        <MenuItem onClick={() => handleFilterOptionChange("telephone")}>
          Filtrer par Téléphone
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Card>
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Flex>
          {showFilter && (
            <Box ml="2">
              {selectedFilter === "name" && (
                <Input
                  size="sm"
                  placeholder="Filter by Name"
                  value={filterValue}
                  onChange={handleFilterChange}
                  variant="flushed"
                />
              )}
              {selectedFilter === "telephone" && (
                <Input
                  size="sm"
                  placeholder="Filter by Telephone"
                  value={filterPhone}
                  onChange={handleFilterPhoneChange}
                  variant="flushed"
                />
              )}
            </Box>
          )}
        </Flex>
        <Flex alignItems="center">
          <Text fontSize="sm" fontWeight="600" mr="2">
            Items per page:
          </Text>
          <Select
            size="sm"
            value={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
            w="auto"
            fontWeight="600"
            variant="flushed"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </Select>
          {filterMenu}
          <Banner data={record} type={"Tous les opportunités"} />
        </Flex>
      </Flex>
      <Table size="M">
        <Thead>
          <Tr>
            <Th>N° Contrat</Th>
            <Th>Titre de l'opportunité</Th>
            <Th>date du contrat</Th>
            <Th>Status du contrat</Th>
          </Tr>
        </Thead>
        <Tbody>{renderData()}</Tbody>
      </Table>
      {renderPagination()}
    </Card>
  );
};

export default CheckTable;
