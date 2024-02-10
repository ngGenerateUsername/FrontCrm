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
import axios from "axios";

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const isError = email === '';
  const isErrorUsername = username === '';
  const isErrorPassword = password === '';
  let history = useHistory();
  const toast = useToast()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  console.log(params.get("role"))
  console.log(params.get("email"))
  console.log(params.get("entreprise"))
  const logupFetch = async () => {

    try {
      if (params.get("role") === "COMMERCIAL") {
        const result = await axios.post("http://localhost:8080/api/auth/signup", { username, password, email: params.get("email"), role: ["COMMERCIAL"] });
        console.log("test 1")
        console.log(result);
        console.log(result.data);
        const result2 = await axios.put("http://localhost:8080/api/auth/ajoutRole_entreprise",
          { idEntreprise: params.get("entreprise"), roleUser: "ROLE_COMMERCIAL", idContact: result.data });
        console.log(result2);
        const result3 = await axios.get("http://localhost:8080/api/contact/CodeVerification?id=" + result.data);
        console.log(result3.data);
        console.log("test 1")
        const result4 = await axios.post("http://localhost:9090/sendMail",
          {
            to: params.get("email"), subject: "Welcome To CRM",
            html: "<div><p><strong style='color:red'>Welcome" + params.get("email") + "To CRM</strong></p><br><p>Votre Lien de verification de compte<span style='font-weight:500'> <strong><a href='http://localhost:3000/horizon-ui-chakra-ts#/auth/verify?verify=" + result3.data + "'>Lien</a></strong></span></p></div>"
          });
        console.log(result);
      }
      if (params.get("role") === "RESPONSABLETICKET") {
        const result = await axios.post("http://localhost:8080/api/auth/signup", { username, password, email: params.get("email"), role: ["RESPONSABLETICKET"] });
        console.log("test 1")
        console.log(result);
        console.log(result.data);
        const result2 = await axios.put("http://localhost:8080/api/auth/ajoutRole_entreprise",
          { idEntreprise: params.get("entreprise"), roleUser: "ROLE_RESPONSABLETICKET", idContact: result.data });
        console.log(result2);
        const result3 = await axios.get("http://localhost:8080/api/contact/CodeVerification?id=" + result.data);
        console.log(result3.data);
        console.log("test 1")
        const result4 = await axios.post("http://localhost:9090/sendMail",
          {
            to: params.get("email"), subject: "Welcome To CRM",
            html: "<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour " + email + " , </h2><br><h3>Vous êtes presque prêt à bénéficier du Notre CRM<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour vérifier votre adresse e-mail.</h4><br><br><a href='http://localhost:3000/horizon-ui-chakra-ts#/auth/verify?verify=" + result3.data + "'><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Verifier votre compte'></a></div>"
          });

        console.log(result);
      }
      if (params.get("role") === "PROP") {
        const result = await axios.post("http://localhost:8080/api/auth/signup", { username, password, email: params.get("email") });
        console.log("test 1")
        console.log(result);
        console.log(result.data);
        const result2 = await axios.put("http://localhost:8080/api/auth/ajoutRole_entreprise",
          { idEntreprise: params.get("entreprise"), roleUser: "ROLE_PROPRIETAIRE", idContact: result.data });
        console.log(result2);
        const result3 = await axios.get("http://localhost:8080/api/contact/CodeVerification?id=" + result.data);
        console.log(result3.data);
        console.log("test 1")
        const result4 = await axios.post("http://localhost:9090/sendMail",
          {
            to: params.get("email"), subject: "Welcome To CRM",
            html: "<div style='text-align: center;color: #7C7C7C;'><h2 class='h2' style='color:#968ADB'>Bonjour " + email + " , </h2><br><h3>Vous êtes presque prêt à bénéficier du Notre CRM<span style='font-weight:500'></h3><h4>Cliquez simplement sur le Lien ci-dessous pour vérifier votre adresse e-mail.</h4><br><br><a href='http://localhost:3000/horizon-ui-chakra-ts#/auth/verify?verify="+result2.data+ "'><input style='background-color:#968ADB;border:none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size:16px;cursor: pointer;border-radius: 12px;display: block;margin-right: auto;margin-left: auto;' type='button' value='Verifier votre compte'></a></div>"
          });

        console.log(result);
      }
      toast({
        title:"Compte ajouté avec succés !",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
      history.push("/auth/sign-in");
    } catch (error) {
      console.log("test 2")
      console.log(error);
    }
  }
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
            Bienvenue au CRM
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            S'inscrire
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <FormControl isInvalid={isError}>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              E-mail<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'

              fontWeight='500'
              size='lg'
              name="mail"
              value={params.get("email")}
              onChange={e => setEmail(e.target.value)}
            />
            {!isError ? (
              <FormErrorMessage>Un e-mail est requis.</FormErrorMessage>
            ) : (<FormErrorMessage>Un e-mail est requis.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorUsername}>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              nom d'utilisateur<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='String'
              placeholder='username'
              fontWeight='500'
              size='lg'
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            {!isErrorUsername ? (
              <FormErrorMessage>Nom d'utilisateur est nécessaire.</FormErrorMessage>
            ) : (<FormErrorMessage>Nom d'utilisateur est nécessaire.</FormErrorMessage>
            )}
          </FormControl>
          <InputGroup>
            <FormControl isInvalid={isErrorPassword}>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Mot de Passe<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {!isErrorPassword ? (
                <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
              ) : (
                <FormErrorMessage>Mot de passe requis.</FormErrorMessage>
              )}
            </FormControl>
            <InputRightElement display='flex' alignItems='center' mt='4px'>
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: "pointer" }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
          <Button
            fontSize='sm'
            variant='brand'
            fontWeight='500'
            w='100%'
            h='50'
            mb='24px'
            onClick={logupFetch}
          >
            S'inscrire
          </Button>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Si vous avez un compte
              <NavLink to='/auth/sign-in'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
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

export default SignUp;
