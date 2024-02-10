

import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useLocation } from "react-router-dom";
// Chakra imports
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";

import { useDispatch } from "react-redux";
import { verify } from "state/user/Users_Slice";

function VerifyInterface() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [reponseverify, setreponseverify] = useState('');
  const location = useLocation()
	const params = new URLSearchParams(location.search)
  console.log(params.get("verify"))
  const dispatch = useDispatch();
  const toast = useToast();
   dispatch(verify(params.get("verify")) as any)
   .unwrap()
   .then((res: any) => {console.log(res);
    if(res === "verify_success"){setreponseverify("Bienvenue A notre CRM");}
   else{setreponseverify("Bienvenue A notre CRM");}})
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

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
          {reponseverify}
          </Heading>
        </Box>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              <NavLink to='/auth/sign-in'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Se connecter
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
    </DefaultAuth>
  );
  }

export default VerifyInterface;

