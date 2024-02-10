import {
  Flex,
  Alert,
  AlertIcon,
  Box,
  Table,
  Spinner,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Heading,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import * as React from "react";

import { createColumnHelper, SortingState } from "@tanstack/react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MenuExport";
import { useEffect, useState } from "react";
import { Console } from "console";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, StatusChangeUser } from "state/user/Users_Slice";
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
    dispatch(fetchUsers() as any);
  }, [dispatch]);
  const { status, record } = useSelector((state: any) => state.allUsers);
  console.log(record, status);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page

  const offset = currentPage * itemsPerPage;
  const currentPageData = record.slice(offset, offset + itemsPerPage);

  const handlePageClick = (p: number) => setCurrentPage(p);

  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const [idUser, setidUser] = useState("");
  const [statusUser, sestatusUser] = useState("");
  const btnRef = React.useRef();
  function OpenStatusChange(id : any,status:any) {
    setidUser(id);
    sestatusUser(status);
   console.log(idUser)
   onOpenn();
  }
  const ChangeStatus = async () => {
    dispatch(StatusChangeUser({idUser,statusUser}) as any).unwrap().then((res: any) => {

      dispatch(fetchUsers() as any)
      onClosee();
    })
  };


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
          <Tr key={e.idUser}>
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
                {e.mail}
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
                {e.statusUser}
              </Text>
            </Td>
            <Td>
              <Flex
                justifyContent="space-evenly"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400">
              <Button
                onClick={async () => {
                  history.push("/profile/edit-user?id=" + e.idUser);
                }}
                color="white"
                variant="brand"
                fontSize="sm"
                fontWeight="700">
                Plus de Details
              </Button>
              <Button
               onClick={() => OpenStatusChange(e.idUser,e.statusUser)}
                color="white"
                variant="brand"
                fontSize="sm"
                fontWeight="700">
                Changer Status
              </Button>
              </Flex>
            </Td>
          </Tr>
        );
      });
    }
  };

  return (
    <>
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
          lineHeight="100%">
        </Text>
        <Menu data={record} type="user"/>
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
                Nom de User
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
                E-mail
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
                Status de User
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
        page={currentPage}
        count={record.length}
        pageSize={itemsPerPage}
        onPageChange={handlePageClick}
        margin={1}
        shadow="lg"
        fontWeight="blue"
        variant="outline"
        border="2px solid"
      />
      </Box>
      </Box>
    </Card>
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
             <FormLabel htmlFor="owner">Selectionner status</FormLabel>
             <Select
               name="resp"
               value={statusUser}
               onChange={(e) => sestatusUser(e.target.value)}
               id="owner"
               defaultValue="3">
                 <option key="1" value="INVITED">
                 INVITED
                 </option>
                 <option key="2" value="ACTIF">
                 ACTIF
                 </option>
                 <option key="3" value="DEACTIVATED">
                 DEACTIVATED
                 </option>
             </Select>
           </Box>
         </DrawerBody>
         <DrawerFooter>
           <Button variant="outline" mr={3} onClick={onClosee}>
             Retour
           </Button>
           <Button colorScheme="brand" onClick={ChangeStatus}>
             Affecter
           </Button>
         </DrawerFooter>
       </DrawerContent>
     </Drawer>
     </>
  );
}
