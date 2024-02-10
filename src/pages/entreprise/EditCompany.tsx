// Chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Grid,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// Custom components
import Banner from "../../components/company/components/Banner";
import General from "../../components/company/components/General";
// Assets
import banner from "assets/img/auth/banner.png";
import HistoryItem from "../../components/company/components/HistoryItem2";
import Card from "components/card/Card";
import Nft5 from "assets/img/nfts/Nft5.png";
import React, { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUserEntreprise } from "state/user/Entreprise_Slice";
import { contactsPerEntreprise } from "state/user/Role_Slice";
import { SendMailInvite } from "state/user/Mailer_Slice";

export default function Overview() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [Role, setRole] = useState("COMMERCIAL");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const toast = useToast()
  useEffect(() => {
    dispatch(fetchSingleUserEntreprise(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res.idUser);
        dispatch(contactsPerEntreprise(params.get("id")) as any);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusEntreprise, record: recordEntreprise } = useSelector(
    (state: any) => state.fetchSingleUserEntrepriseExport
  );
  console.log(recordEntreprise, statusEntreprise);
  const { status: statusContacts, record: recordContacts } = useSelector(
    (state: any) => state.contactsPerEntrepriseExport
  );
  console.log(recordContacts, statusContacts);

  const AjoutContact = async () => {
    await dispatch(
      SendMailInvite({
        email,
        Role,
        entreprise: recordEntreprise.idUser,
      }) as any
    )
      .then((res: any) => {
        
        toast({
          title: 'invitation envoyee',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
    
      ;console.log(res);})
      .catch((error: Error) => console.log(error));
   };

  return (
    <Box pt={{ base: "130px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea="1 / 1 / 4 / 4"
          banner={banner}
          avatar={require("assets/img/avatars/company.png")}
          name={recordEntreprise.nomEntreprise}
          job={recordEntreprise.domaine}
        />
      </Grid>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Text
          gridArea="1 / 1 / 1/ 1"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700">
          Informations générales
        </Text>
        <General
          gridArea="2 / 1 / 3 / 3"
          minH="365px"
          pe="20px"
          entrepriseDetails={recordEntreprise}
        />
        <Text
          gridArea="1 / 3 / 4/ 4"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700">
          Contacts
        </Text>

        <Card p="0px" gridArea="2 / 3 / 4 / 4">
          <Flex
            align={{ sm: "flex-start", lg: "center" }}
            justify="space-between"
            w="100%"
            px="22px"
            py="18px">
            <Button
              variant="action"
              ref={btnRef}
              colorScheme="brand"
              onClick={onOpen}>
              Ajouter Contact
            </Button>
          </Flex>
          {recordContacts.map((c: any) => (
            <HistoryItem
              key={c.idUser}
              name={c.nom}
              author={c.roles[0].name.substring(5)}
              image={Nft5}
              id={c.idUser}
            />
          ))}
        </Card>
      </Grid>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Ajouter Contact</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">E-mail</FormLabel>
                <Input
                  id="email"
                  placeholder="E-mail"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Selectionner role</FormLabel>
                <Select
                  name="Role"
                  value={Role}
                  onChange={(e) => setRole(e.target.value)}
                  id="owner"
                  defaultValue="COMMERCIAL">
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="RESPONSABLETICKET">Responsable ticket</option>
                </Select>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Retour
            </Button>
            <Button colorScheme="brand" onClick={AjoutContact}>
              Enregistrer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
