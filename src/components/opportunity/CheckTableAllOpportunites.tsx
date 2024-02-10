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
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import RatingStars from "pages/opportunity/ratingStars";
import {
  FaEllipsisV,
  FaFilter,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  ActifOpportunites,
  DetailsOpportunite,
  AllPISTEOpportunites,
  AllPOTENTIELOpportunites,
  AllCONFIRMEEOpportunites,
  AllSIGNEEOpportunites,
  AllPERDUEOpportunites,
} from "state/user/Oportunity_Slice";
import Card from "components/card/Card";
import { Link } from "react-router-dom";
import { fetchSingleClient } from "state/user/Client_Slice";
import Banner from "./MenuExport";
import { useHistory, useLocation } from "react-router-dom";

const CheckTable = () => {
  let history = useHistory();

  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [opportunityCount, setOpportunityCount] = useState(0);
  const [PisteopportunityCount, setPisteOpportunityCount] = useState(0);
  const [PotentielopportunityCount, setPotentielOpportunityCount] = useState(0);
  const [ConfirmeeopportunityCount, setConfirmeeOpportunityCount] = useState(0);
  const [SigneeopportunityCount, setSigneeOpportunityCount] = useState(0);
  const [PerdueopportunityCount, setPerdueOpportunityCount] = useState(0);
  const [activeTab, setActiveTab] = useState("TOUT");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ActifOpportunites() as any)
      .unwrap()
      .then((res: any) => {
        setOpportunityCount(res.length);
      })
      .catch((error: Error) => {
        console.log(error);
        setOpportunityCount(0);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(AllPISTEOpportunites() as any)
      .unwrap()
      .then((res: any) => {
        setPisteOpportunityCount(res.length);
      })
      .catch((error: Error) => {
        console.log(error);
        setPisteOpportunityCount(0);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(AllPOTENTIELOpportunites() as any)
      .unwrap()
      .then((res: any) => {
        setPotentielOpportunityCount(res.length);
      })
      .catch((error: Error) => {
        console.log(error);
        setPotentielOpportunityCount(0);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(AllCONFIRMEEOpportunites() as any)
      .unwrap()
      .then((res: any) => {
        setConfirmeeOpportunityCount(res.length);
      })
      .catch((error: Error) => {
        console.log(error);
        setConfirmeeOpportunityCount(0);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(AllSIGNEEOpportunites() as any)
      .unwrap()
      .then((res: any) => {
        setSigneeOpportunityCount(res.length);
      })
      .catch((error: Error) => {
        console.log(error);
        setSigneeOpportunityCount(0);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(AllPERDUEOpportunites() as any)
      .unwrap()
      .then((res: any) => {
        setPerdueOpportunityCount(res.length);
      })
      .catch((error: Error) => {
        console.log(error);
        setPerdueOpportunityCount(0);
      });
  }, [dispatch]);

  const { status, record } = useSelector(
    (state: any) => state.ActifOpportunitesExport
  );
  const tabContents = {
    TOUT: record,
    PISTES: record.filter((e: any) => e.statusOpportunite === "PISTE"),
    POTENTIELS: record.filter((e: any) => e.statusOpportunite === "POTENTIEL"),
    CONFIRMEES: record.filter((e: any) => e.statusOpportunite === "CONFIRMEE"),
    SIGNEES: record.filter((e: any) => e.statusOpportunite === "SIGNEE"),
    PERDUES: record.filter((e: any) => e.statusOpportunite === "PERDUE"),
  };
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  const statusCounts = {
    TOUT: 0,
    PISTE: 0,
    POTENTIEL: 0,
    CONFIRMEE: 0,
    SIGNEE: 0,
    PERDUE: 0,
  };

  useEffect(() => {
    dispatch(DetailsOpportunite(record.idOpportunite) as any)
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
  const handlecreer = () => {
    history.push("/opportunite/add-opportunite");
  };

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

  const renderData = (data: any) => {
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
      let filteredData = data;

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
                  Rien à afficher
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
                to={`/opportunite/detailsopportunite/OpportuniteDetail?id=${
                  e.idOpportunite || ""
                }`}
              >
                <Text fontWeight="bold" color="black.600">
                  {e.titre}
                </Text>
              </Link>
            </Flex>
          </Td>

          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Avatar
                size="sm"
                src={require(`assets/img/avatars/` + e.imageComercial)}
                mr={2}
              />
              <Box>
                <Text color="gray.600" fontWeight="bold">
                  {e.nomCommercial}
                </Text>
                <Text color="gray.400">{e.nomEntreprise}</Text>
              </Box>
            </Flex>
          </Td>

          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Avatar
                size="sm"
                src={require(`assets/img/avatars/` + e.imagecontact)}
                mr={2}
              />
              <Box>
                <Text color="gray.600" fontWeight="bold">
                  {e.nomContact}
                </Text>
                <Text color="gray.400">{e.nomSocieteContact}</Text>
              </Box>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Icon as={FaEnvelope} mr="2" color="brand.900" />
              <Text color="gray.600">{e.email}</Text>
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Icon as={FaPhone} mr="2" color="brand.900" />
              <Text color="gray.600">{e.telephone}</Text>
            </Flex>
          </Td>
          <Td>
            <Flex width="150%" justifyContent="flex-start" alignItems="center">
              <RatingStars
                id={e.idOpportunite}
                prioriteOpporunite={e.prioriteOpportunite}
              />
            </Flex>
          </Td>
          <Td>
            <Flex justifyContent="flex-start" alignItems="center">
              <Text color="gray.600">
                <strong>{e.revenuespere.toLocaleString("fr-FR")} €</strong>
              </Text>
            </Flex>
          </Td>
          <Td>
            <Flex width="150%" justifyContent="flex-start" alignItems="center">
              <Text color="gray.600">
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      e.statusOpportunite === "PISTE"
                        ? "blue"
                        : e.statusOpportunite === "POTENTIEL"
                        ? "orange"
                        : e.statusOpportunite === "CONFIRMEE"
                        ? "purple"
                        : e.statusOpportunite === "SIGNEE"
                        ? "green"
                        : "red",
                  }}
                />
                <strong>
                  {" "}
                  {e.statusOpportunite === "PISTE"
                    ? "Piste"
                    : e.statusOpportunite === "POTENTIEL"
                    ? "Potentiel"
                    : e.statusOpportunite === "CONFIRMEE"
                    ? "Confirmée"
                    : e.statusOpportunite === "SIGNEE"
                    ? "Signée"
                    : "Perdue"}
                </strong>
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
      {/* <Text fontSize="lg" fontWeight="bold" mb="2">
        total Opportunities: {opportunityCount}
      </Text> */}
      <Tabs size="md" variant="soft-rounded" colorScheme="brand">
        <TabList mb="4">
          <Tab onClick={() => handleTabChange("TOUT")}>
            {" "}
            TOUT{" "}
            <Box
              bg="gray.500"
              borderRadius="full"
              w="20px"
              h="20px"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              ml="2"
            >
              <Text color="white" fontSize="xs">
                {opportunityCount}
              </Text>
            </Box>
          </Tab>
          <Tab onClick={() => handleTabChange("PISTES")}>
            Piste{" "}
            <Box
              bg="gray.500"
              borderRadius="full"
              w="20px"
              h="20px"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              ml="2"
            >
              <Text color="white" fontSize="xs">
                {PisteopportunityCount}
              </Text>
            </Box>
          </Tab>
          <Tab onClick={() => handleTabChange("POTENTIELS")}>
            Potentiel{" "}
            <Box
              bg="gray.500"
              borderRadius="full"
              w="20px"
              h="20px"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              ml="2"
            >
              <Text color="white" fontSize="xs">
                {PotentielopportunityCount}
              </Text>
            </Box>
          </Tab>
          <Tab onClick={() => handleTabChange("CONFIRMEES")}>
            Confirmée{" "}
            <Box
              bg="gray.500"
              borderRadius="full"
              w="20px"
              h="20px"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              ml="2"
            >
              <Text color="white" fontSize="xs">
                {ConfirmeeopportunityCount}
              </Text>
            </Box>
          </Tab>
          <Tab onClick={() => handleTabChange("SIGNEES")}>
            Signée{" "}
            <Box
              bg="gray.500"
              borderRadius="full"
              w="20px"
              h="20px"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              ml="2"
            >
              <Text color="white" fontSize="xs">
                {SigneeopportunityCount}
              </Text>
            </Box>
          </Tab>
          <Tab onClick={() => handleTabChange("PERDUES")}>
            Perdue{" "}
            <Box
              bg="gray.500"
              borderRadius="full"
              w="20px"
              h="20px"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              ml="2"
            >
              <Text color="white" fontSize="xs">
                {PerdueopportunityCount}
              </Text>
            </Box>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="md"
                  px="24px"
                  py="5px"
                  mr="100"
                  onClick={handlecreer}
                >
                  + Créer une opportunité
                </Button>
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
                      <Text>Titre de l'opportunité</Text>
                      {sortBy === "titre" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>

                  <Th onClick={() => handleSort("nomCommercial")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Vendeur</Text>
                      {sortBy === "nomCommercial" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("nomContact")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Contact</Text>
                      {sortBy === "nomContact" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("email")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Email</Text>
                      {sortBy === "email" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("telephone")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Téléphone</Text>
                      {sortBy === "telephone" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("prioriteOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Priorité</Text>
                      {sortBy === "prioriteOpportunite" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("revenuespere")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Revenu espéré</Text>
                      {sortBy === "revenuespere" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("statusOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Étape</Text>
                      {sortBy === "statusOpportunite" && (
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
              <Tbody>{renderData(tabContents["TOUT"])}</Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
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
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="md"
                  px="24px"
                  py="5px"
                  mr="100"
                  onClick={handlecreer}
                >
                  + Créer une opportunité
                </Button>
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
                      <Text>Titre de l'opportunité</Text>
                      {sortBy === "titre" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>

                  <Th onClick={() => handleSort("nomCommercial")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Vendeur</Text>
                      {sortBy === "nomCommercial" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("nomContact")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Contact</Text>
                      {sortBy === "nomContact" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("email")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Email</Text>
                      {sortBy === "email" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("telephone")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Téléphone</Text>
                      {sortBy === "telephone" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("prioriteOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Priorité</Text>
                      {sortBy === "prioriteOpportunite" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("revenuespere")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Revenu espéré</Text>
                      {sortBy === "revenuespere" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("statusOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Étape</Text>
                      {sortBy === "statusOpportunite" && (
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
              <Tbody>{renderData(tabContents["PISTES"])}</Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
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
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="md"
                  px="24px"
                  py="5px"
                  mr="100"
                  onClick={handlecreer}
                >
                  + Créer une opportunité
                </Button>
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
                      <Text>Titre de l'opportunité</Text>
                      {sortBy === "titre" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>

                  <Th onClick={() => handleSort("nomCommercial")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Vendeur</Text>
                      {sortBy === "nomCommercial" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("nomContact")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Contact</Text>
                      {sortBy === "nomContact" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("email")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Email</Text>
                      {sortBy === "email" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("telephone")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Téléphone</Text>
                      {sortBy === "telephone" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("prioriteOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Priorité</Text>
                      {sortBy === "prioriteOpportunite" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("revenuespere")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Revenu espéré</Text>
                      {sortBy === "revenuespere" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("statusOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Étape</Text>
                      {sortBy === "statusOpportunite" && (
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
              <Tbody>{renderData(tabContents["POTENTIELS"])}</Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
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
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="md"
                  px="24px"
                  py="5px"
                  mr="100"
                  onClick={handlecreer}
                >
                  + Créer une opportunité
                </Button>
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
                      <Text>Titre de l'opportunité</Text>
                      {sortBy === "titre" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>

                  <Th onClick={() => handleSort("nomCommercial")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Vendeur</Text>
                      {sortBy === "nomCommercial" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("nomContact")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Contact</Text>
                      {sortBy === "nomContact" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("email")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Email</Text>
                      {sortBy === "email" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("telephone")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Téléphone</Text>
                      {sortBy === "telephone" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("prioriteOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Priorité</Text>
                      {sortBy === "prioriteOpportunite" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("revenuespere")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Revenu espéré</Text>
                      {sortBy === "revenuespere" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("statusOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Étape</Text>
                      {sortBy === "statusOpportunite" && (
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
              <Tbody>{renderData(tabContents["CONFIRMEES"])}</Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
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
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="md"
                  px="24px"
                  py="5px"
                  mr="100"
                  onClick={handlecreer}
                >
                  + Créer une opportunité
                </Button>
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
                      <Text>Titre de l'opportunité</Text>
                      {sortBy === "titre" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>

                  <Th onClick={() => handleSort("nomCommercial")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Vendeur</Text>
                      {sortBy === "nomCommercial" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("nomContact")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Contact</Text>
                      {sortBy === "nomContact" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("email")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Email</Text>
                      {sortBy === "email" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("telephone")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Téléphone</Text>
                      {sortBy === "telephone" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("prioriteOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Priorité</Text>
                      {sortBy === "prioriteOpportunite" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("revenuespere")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Revenu espéré</Text>
                      {sortBy === "revenuespere" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("statusOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Étape</Text>
                      {sortBy === "statusOpportunite" && (
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
              <Tbody>{renderData(tabContents["SIGNEES"])}</Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
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
                <Button
                  variant="darkBrand"
                  color="white"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="md"
                  px="24px"
                  py="5px"
                  mr="100"
                  onClick={handlecreer}
                >
                  + Créer une opportunité
                </Button>
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
                      <Text>Titre de l'opportunité</Text>
                      {sortBy === "titre" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>

                  <Th onClick={() => handleSort("nomCommercial")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Vendeur</Text>
                      {sortBy === "nomCommercial" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("nomContact")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Contact</Text>
                      {sortBy === "nomContact" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("email")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Email</Text>
                      {sortBy === "email" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("telephone")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Téléphone</Text>
                      {sortBy === "telephone" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("prioriteOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Priorité</Text>
                      {sortBy === "prioriteOpportunite" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("revenuespere")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Revenu espéré</Text>
                      {sortBy === "revenuespere" && (
                        <Icon
                          as={sortOrder === "asc" ? FiChevronUp : FiChevronDown}
                          ml="1"
                          color="gray.400"
                        />
                      )}
                    </Flex>
                  </Th>
                  <Th onClick={() => handleSort("statusOpportunite")}>
                    <Flex alignItems="center" cursor="pointer">
                      <Text>Étape</Text>
                      {sortBy === "statusOpportunite" && (
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
              <Tbody>{renderData(tabContents["PERDUES"])}</Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default CheckTable;
