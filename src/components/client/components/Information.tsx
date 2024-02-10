// Chakra imports
import {
  Box,
  Text,
  useColorModeValue,
  Link,
  Icon,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  Button,
  DrawerContent,
  Drawer,
  Input,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import React, { useState } from "react";
// Assets
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { UpdateClient, fetchSingleClient } from "state/user/Client_Slice";
export default function Information(props: {
  title: string;
  value: number | string;
  [x: string]: any;
}) {
  const { title, value, link, id, idClient, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [inputt, setinputt] = useState(value);
  const dispatch = useDispatch();
  const isError = inputt === "";
  const toast = useToast()
  
  const ModifierEntreprise = async () => {
    try {
      console.log("test 1");
      if(inputt == null || inputt === ""){
        toast({
          title: 'Champ vide',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      }
      else{
        await dispatch(UpdateClient({ idClient, [id]: inputt }) as any)
          .unwrap()
          .then((res: any) => {
            console.log(res);
            dispatch(fetchSingleClient(idClient) as any)
            onClose()
          });
        }
    } catch (error) {
      console.log("test 2");
      console.log(error);
    }
  };
  return (
    <Card bg={bg} {...rest}>
      <Box>
        <Text fontWeight="500" color={textColorSecondary} fontSize="sm">
          {title}
        </Text>
        <Text color={textColorPrimary} fontWeight="500" fontSize="md">
          {value}
        </Text>
      </Box>
      <Link
        ref={btnRef}
        colorScheme="brand"
        onClick={onOpen}
        variant="no-hover"
        me="16px"
        ms="auto"
        p="0px !important">
        <Icon as={MdEdit} color="secondaryGray.500" h="18px" w="18px" />
      </Link>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Ajouter ou modifier {title}</DrawerHeader>
          <DrawerBody>
            <FormControl isInvalid={isError}>
              <Input
                placeholder={title}
                defaultValue={value}
                type={title =="Date de Lancement" && "Date"}
                name="inputt"
                onChange={(e) => setinputt(e.target.value)}
              />
              {!isError ? (
                <FormErrorMessage>
                  veuillez remplir le formulaire
                </FormErrorMessage>
              ) : (
                <FormErrorMessage>
                  veuillez remplir le formulaire
                </FormErrorMessage>
              )}
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Retour
            </Button>
            <Button colorScheme="brand" onClick={ModifierEntreprise}>
              Enregistrer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
}
