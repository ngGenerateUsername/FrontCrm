/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { newPasswordFromForgetPassword } from "state/user/Users_Slice";

function forgotPassword() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  let history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  console.log(params.get("code"));
  const [password, setPassword] = useState("");
  const isErrorPassword = password === "";
  const toast = useToast();
  const dispatch = useDispatch();

  const resetPassword = async () => {
    await dispatch(
      newPasswordFromForgetPassword({
        code: params.get("code"),
        password: password,
      }) as any
    )
      .unwrap()
      .then((res: any) => {
        if (res === true) {
          toast({
            title:"reset password pass with sec",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top',
          })
          history.push("/auth/sign-in");
        }
        if (res === false) {
          toast({
            title:"Erreur",
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          })
        }
      })
      .catch((error: Error) => console.log(error));
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
            Réinitialiser le mot de passe
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
          <FormControl isInvalid={isErrorPassword}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px">
              Nouveau mot de passe
              <Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="Min. 8 characters"
              size="lg"
              type={show ? "text" : "password"}
              variant="auth"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isErrorPassword ? (
              <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
            ) : (
              <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
            )}
          </FormControl>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={resetPassword}>
            Définir le mot de passe
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
