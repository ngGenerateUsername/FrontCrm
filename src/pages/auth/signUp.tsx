import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { SignUp } from "state/user/SignUp_Slice";

function SignUpC() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const isError = email === "";
  const isErrorUsername = username === "";
  const isErrorPassword = password === "";
  const dispatch = useDispatch();
  const logupFetch = async () => {
    await dispatch(SignUp({ username, password, email }) as any)
      .catch((error: Error) => {
        toast({
          title: "Erreur",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
        console.log(error);
      });
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
            Bienvenue au CRM
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md">
            S'inscrire
          </Text>
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
          <FormControl isInvalid={isError}>
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
              fontWeight="500"
              size="lg"
              name="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isError ? (
              <FormErrorMessage>Un e-mail est requis.</FormErrorMessage>
            ) : (
              <FormErrorMessage>Un e-mail est requis.</FormErrorMessage>
            )}
          </FormControl>
          <br></br>
          <FormControl isInvalid={isErrorUsername}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px">
              nom d'utilisateur<Text color={brandStars}>*</Text>
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
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!isErrorUsername ? (
              <FormErrorMessage>
                Nom d'utilisateur est nécessaire.
              </FormErrorMessage>
            ) : (
              <FormErrorMessage>
                Nom d'utilisateur est nécessaire.
              </FormErrorMessage>
            )}
          </FormControl>
          <br></br>
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex">
            Mot de passe<Text color={brandStars}>*</Text>
          </FormLabel>
          <FormControl isInvalid={isErrorPassword}>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {!isErrorPassword ? (
              <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
            ) : (
              <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
            )}
          </FormControl>
          <br></br>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={logupFetch}>
            S'inscrire
          </Button>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px">
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Si vous avez un compte
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

export default SignUpC;
