/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { HSeparator } from "components/separator/Separator";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateVerifCodeForgetPasswordPerMail,
  CreateVerifCodeForgetPasswordPerUsername,
} from "state/user/Users_Slice";
import { SendMailForgetPassword } from "state/user/Mailer_Slice";

function forgotPassword() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { status, record } = useSelector((state: any) => state.uploads);
  const dispatch = useDispatch();
  const toast = useToast()
  const forgetPasswordFetch = async () => {
    try {
      if (email === "" && username === "") {
       toast({
      title: "Erreur",
      description:"Nom d'utilisateur ou email incorrect",
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top',
    }) }
      if (email != "") {
        await dispatch(CreateVerifCodeForgetPasswordPerMail(email) as any)
          .unwrap()
          .then((res: any) => {
            if (res === "") {
              toast({
                title: "Erreur",
                description:"Nom d'utilisateur ou email incorrect",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top',
              })
            } else {
              dispatch(SendMailForgetPassword(res) as any);
              toast({
                title:"le mail pour réinitialiser de mot de passe a été envoyé",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
              })
              history.push("/auth/sign-in");
            }
          })
          .catch((error: Error) => console.log(error));
      }
      if (username != "") {
        await dispatch(
          CreateVerifCodeForgetPasswordPerUsername(username) as any
        )
          .unwrap()
          .then((res: any) => {
            if (res === "") {
              toast({
                title: "Erreur",
                description:"Nom d'utilisateur ou email incorrect",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top',
              })
            } else {
              dispatch(SendMailForgetPassword(res) as any);
              toast({
                title:"le mail pour réinitialiser de mot de passe a été envoyé",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top',
              })
              history.push("/auth/sign-in");
            }
          })
          .catch((error: Error) => console.log(error));
      }
    } catch (error) {
      console.log("test 2");
      console.log(error);
    }
  };
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column">
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Mot de passe oublié
          </Heading>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px">
            E-mail<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="email"
            placeholder="mail@simmmple.com"
            mb="24px"
            fontWeight="500"
            size="lg"
            name="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              Ou
            </Text>
            <HSeparator />
          </Flex>

          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px">
            Nom d'utilisateur<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="String"
            placeholder="username"
            fontWeight="500"
            size="lg"
            mb="24px"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={forgetPasswordFetch}>
            Envoyer
          </Button>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px">
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Retourner à
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500">
                  S'identifier
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default forgotPassword;
