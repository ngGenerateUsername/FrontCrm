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
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Card from "components/card/Card";
import React, { useState } from "react";
// Assets
import { MdEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  UpdateUser,
  findByUsername,
  findByMail,
  UpdatePasswordUser,
  fetchSingleUser,
  UpdateUserUsernameORMail,
} from "state/user/Users_Slice";

export default function Information(props: {
  title: string;
  value: number | string;
  [x: string]: any;
}) {
  const { title, value, link, id, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [inputt, setinputt] = useState(value);
  const [idUser, setidUser] = useState(localStorage.getItem("user"));
  const isError = inputt == null || inputt === "";
  const dispatch = useDispatch();
  const EditFetch = async () => {
    try {
      console.log("test 1");
      console.log(inputt);
      await dispatch(UpdateUser({ idUser, [id]: inputt }) as any)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          dispatch(fetchSingleUser(localStorage.getItem("user")) as any);
        });

      if (id === "username") {
        console.log(inputt);
        await dispatch(findByUsername(inputt) as any)
          .unwrap()
          .then(async (res: any) => {
            if (res === "") {
              await dispatch(UpdateUserUsernameORMail({ idUser, username: inputt }) as any)
                .unwrap()
                .then((res: any) => {
                  console.log(res);
                  dispatch(fetchSingleUser(localStorage.getItem("user")) as any);
                });
            } else {
              alert("deja utilise");
            }
          });
      }
      if (id === "mail") {
        console.log(inputt);
        await dispatch(findByMail(inputt) as any)
          .unwrap()
          .then(async (res: any) => {
            console.log(res);
            if (res === "") {
              await dispatch(UpdateUserUsernameORMail({ idUser, mail: inputt }) as any)
                .unwrap()
                .then((res: any) => {
                  console.log(res);
                  dispatch(fetchSingleUser(localStorage.getItem("user")) as any);
                });
            } else {
              alert("deja utilise");
            }
          });
      }
      if (id === "password") {
        await dispatch(UpdatePasswordUser({ idUser, password: inputt }) as any)
          .unwrap()
          .then((res: any) => {
            console.log(res);
            dispatch(fetchSingleUser(localStorage.getItem("user")) as any);
          });
      }
    } catch (error) {
      console.log("test 2");
      console.log(error);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
            <InputGroup>
              <Input
               type={showPassword ? 'text' : id}
                placeholder={title}
                name="inputt"
                onChange={(e) => setinputt(e.target.value)}
                defaultValue={value}
              />
    {id === "password" &&                     <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={handleTogglePassword}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </Button>
      </InputRightElement>}
      </InputGroup>  
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
            <Button colorScheme="brand" onClick={EditFetch}>
              Enregistrer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Card>
  );
}
