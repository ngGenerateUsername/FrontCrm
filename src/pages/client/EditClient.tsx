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
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Banner from "../../components/company/components/Banner";
import General from "../../components/client/components/General";
import banner from "assets/img/auth/banner.png";
import HistoryItem from "../../components/contact/components/HistoryItem2";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import { HSeparator } from "components/separator/Separator";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleClient } from "state/user/Client_Slice";
import { AddContact } from "state/user/SignUp_Slice";
import {
  AddRelationClientUser,
  MyContacts,
  UpdateRelationClientUser,
} from "state/user/RelationClientUser_Slice";
import { fetchAllContacts } from "state/user/Users_Slice";
export default function Overview() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const toast = useToast()
  const [idContactToAffect, setidContactToAffect] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [typeRelationClientUser, settypeRelationClientUser] = useState("CONTACT");

  useEffect(() => {
    dispatch(fetchSingleClient(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res.idUser);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusClient, record: recordClient } = useSelector(
    (state: any) => state.fetchSingleClientExport
  );
  console.log(recordClient, statusClient);

  useEffect(() => {
    dispatch(MyContacts(params.get("id")) as any).catch((error: Error) =>
      console.log(error)
    );
  }, [dispatch]);

  const { status: statusContacts, record: recordContacts } = useSelector(
    (state: any) => state.MyContactsExport
  );

  useEffect(() => {
    dispatch(fetchAllContacts() as any).catch((error: Error) =>
      console.log(error)
    );
  }, [dispatch]);

  const { status: statusAllContacts, record: recordAllContacts } = useSelector(
    (state: any) => state.fetchAllContactsExport
  );

  console.log(statusAllContacts, recordAllContacts);
  console.log(statusContacts, recordContacts);

  const AddContactOnclick = async () => {
    if (
      idContactToAffect !== "" &&
      (email !== "" || username !== "" || password !== "")
    ) {
      toast({
        title: "Information",
        description:"choisir une seule methode d'ajout",
        status: 'info',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    } else {
      if (idContactToAffect === "") {
        if (email === "" || username === "" || password === "") {
          toast({
            title: "Erreur",
            description:"champ manquant",
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          })
        } else {
          await dispatch(
            AddContact({ email, username, password, role: ["CONTACT"] }) as any
          )
            .unwrap()
            .then((res: any) =>
              dispatch(
                AddRelationClientUser({
                  idUser: res,
                  idClient: params.get("id"),
                  typeRelationClientUser,
                }) as any
              )
                .unwrap()
                .then((res: any) => {
                  console.log(res);
                  dispatch(MyContacts(params.get("id")) as any);


                  onClose();
                  
                  
                  toast({
                    title: "Contact ajoute",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                  });
                })
            )
            .catch((error: Error) => console.log(error));
        }
      }
      else if(recordContacts.filter((a: any) => a.idUser === parseInt(idContactToAffect)).length !== 0){
        toast({
          title: "Contact deja affecte",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      } else {

        dispatch(
          AddRelationClientUser({
            idUser: idContactToAffect,
            idClient: params.get("id"),
            typeRelationClientUser,
          }) as any
        )
          .unwrap()
          .then((res: any) => {
            console.log(res);
            dispatch(MyContacts(params.get("id")) as any);
            onClose();
            
            toast({
              title: "Contact ajoute",
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'top',
            })
          })
          .catch((error: Error) => console.log(error));
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
          name={recordClient.nomEntreprise}
          job={recordClient.domaine}
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
          gridArea="1 / 1 / 4/ 4"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700">
          Informations générales
        </Text>
        <Text
          gridArea="1 / 3 / 4/ 4"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700">
          Contacts
        </Text>
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
        <General
          gridArea="1 / 1 / 3 / 3"
          minH="365px"
          pe="20px"
          entrepriseDetails={recordClient}
        />
        <Card p="0px" gridArea="1 / 3 / 4 / 4">
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
              name={c.username}
              author={c.roles[0].name.substring(5)}
              image={c.image}
              id={c.idUser}
              idClient={params.get("id")}
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
                <FormLabel htmlFor="owner">Selectionner un contact </FormLabel>
                <Select
                  name="contact"
                  value={idContactToAffect}
                  onChange={(e) => setidContactToAffect(e.target.value)}
                  id="owner"
                  defaultValue="...">
                  <option key="..." value="">
                    ...
                  </option>
                  {recordAllContacts.map((e: any, key: any) => (
                    <option key={e.idUser} value={e.idUser}>
                      {e.username}
                    </option>
                  ))}
                </Select>
              </Box>
              <Flex align="center" mb="25px">
                <HSeparator />
                <Text color="gray.400" mx="14px">
                  ou
                </Text>
                <HSeparator />
              </Flex>
              <Box>
                <FormLabel htmlFor="mail">E-mail</FormLabel>
                <Input
                  id="email"
                  placeholder="E-mail"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel htmlFor="username">Nom d'utilisatuer</FormLabel>
                <Input
                  id="username"
                  placeholder="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FormLabel htmlFor="username">Mot de passe</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    placeholder="Mot de passe"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleTogglePassword}
                      aria-label="Toggle password visibility">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Retour
            </Button>
            <Button colorScheme="brand" onClick={AddContactOnclick}>
              Ajouter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
