// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { SiMicrosoftoutlook } from "react-icons/si";
import { FaMailBulk, FaUserAlt } from "react-icons/fa";

import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { AddMsg } from "state/user/Msg_Slice";
import { useDispatch } from "react-redux";
function LandingPage() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  let history = useHistory();
  const dispatch = useDispatch();
  const signin = async () => {
    history.push("/auth/sign-in");
  };
  const signup = async () => {
    history.push("/auth/sign-up");
  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [mail, setMail] = useState('');
  const [objet, setObjet] = useState('');
  const [text, setText] = useState('');
  
  const addMsg = async () => {
    try {
      await dispatch(
        AddMsg({
          description:text,
          mail,
          titre:objet,
        }) as any
      )
        .then((res: any) =>
        {toast({
          title: 'Msg envoyee',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
        onClose();
      }
        )
        .catch((error: Error) => console.log(error));
    } catch (error) {
      // console.log("test 2")
      console.log(error);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        h="100%"
        alignItems="start"
        justifyContent="center"
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
        zIndex="2"
        direction="column"
        w={{ base: "100%", md: "45%" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: "auto", lg: "unset" }}
        me="auto"
        mb={{ base: "20px", md: "auto" }}>
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Bienvenue a notre CRM
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md">
            Notre CRM assurera de bonnes relations entre une entreprise et ses
            clients. Aussi il permet de mettre en commun et de maximiser la
            connaissance d'un client donné et, ainsi de mieux comprendre,
            anticiper et gérer ses besoins
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
          <Flex align="center" mb="25px">
          </Flex>
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
            onClick={signin}>
            <Icon as={FaUserAlt} w="20px" h="20px" me="10px" />
            Connectez-vous avec Compte CRM
          </Button>
          <HSeparator></HSeparator>
          <br></br>
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
            onClick={onOpen}>
            <Icon as={FaMailBulk} w="20px" h="20px" me="10px" />
            Contacter Administrateur
          </Button>
        </Flex>
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contacter admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Mail</FormLabel>
              <Input ref={initialRef} placeholder='Mail' value={mail}
              onChange={e => setMail(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Objet</FormLabel>
              <Input placeholder='Objet' value={objet}
              onChange={e => setObjet(e.target.value)}/>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Text</FormLabel>
              <Textarea placeholder='Text' value={text}
              onChange={e => setText(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={addMsg} colorScheme='blue' mr={3}>
              Envoyer
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Flex>
 
    </DefaultAuth>
    
  );
}

export default LandingPage;
