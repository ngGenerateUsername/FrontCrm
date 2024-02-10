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
  Avatar,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { ImTicket } from "react-icons/im";
import { FcPlanner, FcOvertime, FcStatistics } from "react-icons/fc";
import {
  FaEllipsisV,
  FaFilter,
  FaUsers,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AllActivites, DetailsActivite } from "state/user/Activity_Slice";
import Card from "components/card/Card";
import { Link } from "react-router-dom";
import { fetchSingleClient } from "state/user/Client_Slice";
import Banner from "./MenuExport";
import RatingStars from "pages/opportunity/RatingActivite";

const CheckTable = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortDirection, setSortDirection] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllActivites() as any);
  }, [dispatch]);

  const { status, record } = useSelector(
    (state: any) => state.AllActivitesExport
  );

  useEffect(() => {
    dispatch(DetailsActivite(record.idActivite) as any)
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

  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      // Clicked on the same column again
      if (sortDirection === "asc") {
        setSortOrder("desc");
        setSortDirection("desc");
      } else {
        setSortOrder("asc");
        setSortDirection("asc");
      }
    } else {
      // Clicked on a new column
      setSortBy(columnName);
      setSortOrder("asc");
      setSortColumn(columnName);
      setSortDirection("asc");
    }
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
      const sortedData = [...filteredData];

      if (sortColumn === null) {
        // No column selected for sorting
        sortedData.sort((a: any, b: any) => {
          return a.idUser - b.idUser;
        });
      } else {
        sortedData.sort((a: any, b: any) => {
          const valueA = a[sortBy];
          const valueB = b[sortBy];
          if (valueA < valueB) {
            return sortDirection === "asc" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortDirection === "asc" ? 1 : -1;
          }
          return 0;
        });
      }

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

      return currentItems.map((e: any) => (
        <Tr key={e.idUser}>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Link
                to={`/opportunite/activite/Activite/ActiviteDetail?id=${
                  e.idActivite || ""
                }`}
              >
                <Text fontWeight="700" color="black.600">
                  {e.titre}
                </Text>
              </Link>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Text
                color="gray.700"
                fontSize="15"
                fontWeight="500"
                mr={2}
                width="100%"
              >
                <Icon
                  as={
                    e.typeActivite === "Email"
                      ? MdEmail
                      : e.typeActivite === "Tel"
                      ? FaPhone
                      : e.typeActivite === "Reunion"
                      ? FaUsers
                      : FaUser
                  }
                  size="md"
                  bg="transparent"
                  color="brand.900"
                  mt="-5"
                  mr="2"
                />{" "}
                {e.typeActivite === "Email"
                  ? "Email"
                  : e.typeActivite === "Tel"
                  ? "Téléphone"
                  : "Réunion"}
              </Text>
            </Flex>
          </Td>

          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Text color="gray.600" fontSize="15">
                <Icon boxSize="4" as={FcPlanner} /> {e.dateDebut ||"--"}
              </Text>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Text color="gray.600" fontSize="15">
                <Icon boxSize="4" as={FcOvertime} /> {e.dateFin || "--"}
              </Text>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <RatingStars
                id={e.idActivite}
                prioriteActivite={e.prioriteActivite}
              />
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Link
                to={`/opportunite/detailsopportunite/OpportuniteDetail?id=${
                  e.idOpportunite || ""
                }`}
              >
                <Text
                  color="gray.700"
                  fontSize="15"
                  fontWeight="500"
                  mr={2}
                  width="100%"
                >
                  <Icon
                    as={
                      e.relationActivite === "Opportunite"
                        ? FcStatistics
                        : ImTicket
                    }
                    size="md"
                    bg="transparent"
                    color="brand.900"
                    mt="-5"
                    mr="2"
                  />{" "}
                  {e.relationActivite === "Opportunite"
                    ? "Opportunité"
                    : "Ticket"}
                </Text>
              </Link>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Text
                position="absolute"
                width="70px"
                height="20px"
                bg={
                  e.statusActivite === "PLANIFIE"
                    ? "orange.400"
                    : e.statusActivite === "ENCOURS"
                    ? "green.600"
                    : "red.600"
                }
                color="white"
                fontSize="xs"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex="1"
                borderRadius="4px"
                boxShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
              >
                {e.statusActivite === "PLANIFIE"
                  ? "planifié"
                  : e.statusActivite === "ENCOURS"
                  ? "En cours"
                  : "Terminé"}
              </Text>
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
        rightIcon={<Icon as={FaFilter} />}
        ml="20"
        mr="5"
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
                  variant="filled"
                />
              )}
              {selectedFilter === "telephone" && (
                <Input
                  size="sm"
                  placeholder="Filter by Telephone"
                  value={filterPhone}
                  onChange={handleFilterPhoneChange}
                  variant="filled"
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
            variant="filled"
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
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort("titre")}>
              <Flex alignItems="center" cursor="pointer">
                <Text>Titre de l'activité</Text>
                {sortBy === "titre" && (
                  <Icon
                    as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                    ml="1"
                    color="gray.400"
                  />
                )}
              </Flex>
            </Th>
            <Th onClick={() => handleSort("typeActivite")}>
              <Flex alignItems="center" cursor="pointer">
                <Text>Activité</Text>
                {sortBy === "typeActivite" && (
                  <Icon
                    as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                    ml="1"
                    color="gray.400"
                  />
                )}
              </Flex>
            </Th>
            <Th onClick={() => handleSort("dateDebut")}>
              <Flex alignItems="center" cursor="pointer">
                <Text>date de début</Text>
                {sortBy === "dateDebut" && (
                  <Icon
                    as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                    ml="1"
                    color="gray.400"
                  />
                )}
              </Flex>
            </Th>
            <Th onClick={() => handleSort("dateFin")}>
              <Flex alignItems="center" cursor="pointer">
                <Text>date de fin</Text>
                {sortBy === "dateFin" && (
                  <Icon
                    as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                    ml="1"
                    color="gray.400"
                  />
                )}
              </Flex>
            </Th>
            <Th onClick={() => handleSort("prioriteActivite")}>
              <Flex alignItems="center" cursor="pointer">
                <Text>Priorité</Text>
                {sortBy === "prioriteActivite" && (
                  <Icon
                    as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                    ml="1"
                    color="gray.400"
                  />
                )}
              </Flex>
            </Th>

            <Th onClick={() => handleSort("relationActivite")}>
              <Flex alignItems="center" cursor="pointer">
                <Text>type</Text>
                {sortBy === "relationActivite" && (
                  <Icon
                    as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                    ml="1"
                    color="gray.400"
                  />
                )}
              </Flex>
            </Th>
            <Th onClick={() => handleSort("statusActivite")}>
              <Flex alignItems="center" cursor="pointer">
                <Text>Status</Text>
                {sortBy === "statusActivite" && (
                  <Icon
                    as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                    ml="1"
                    color="gray.400"
                  />
                )}
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>{renderData()}</Tbody>
      </Table>
      {renderPagination()}
    </Card>
  );
};

export default CheckTable;
