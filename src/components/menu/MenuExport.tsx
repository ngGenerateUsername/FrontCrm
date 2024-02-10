import React, { useState } from "react";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  Image,
} from "@chakra-ui/react";
// Assets
import {
  MdOutlineMoreHoriz,
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings,
} from "react-icons/md";
import { JsonToExel,JsonToCsv } from "state/user/Converter_Slice";
import { useDispatch } from "react-redux";
import Upload from "./Import";

export default function Banner(props: { [x: string]: any ,data :any,type:any }) {
  const { ...rest } = props;
  const { data,type } = props;
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const [filename, setfilename] = useState(null);

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const ExportExel = async () => {
    try {
      await dispatch(JsonToExel(data) as any)
        .then((res: any) => {
          setfilename(res);
          onOpenModal();
        })
        .catch((error: Error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  const ExportCsv = async () => {
    try {
      await dispatch(JsonToCsv(data) as any)
        .then((res: any) => {
          setfilename(res);
          onOpenModal();
        })
        .catch((error: Error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton
        alignItems="center"
        justifyContent="center"
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w="37px"
        h="37px"
        lineHeight="100%"
        onClick={onOpen1}
        borderRadius="10px"
        {...rest}>
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
      </MenuButton>
      <MenuList
        w="150px"
        minW="unset"
        maxW="150px !important"
        border="transparent"
        backdropFilter="blur(63px)"
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius="20px"
        p="15px">
        <MenuItem
          transition="0.2s linear"
          p="0px"
          borderRadius="8px"
          color={textColor}
          _hover={textHover}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          mb="10px">
          <a onClick={ExportExel}>
            <Flex align="center">
              <Icon as={MdOutlineCardTravel} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Export Exel
              </Text>
            </Flex>
          </a>
        </MenuItem>
        <MenuItem
          transition="0.2s linear"
          color={textColor}
          _hover={textHover}
          p="0px"
          borderRadius="8px"
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}>
          <Flex align="center">
          <a onClick={ExportCsv}>
            <Flex align="center">
              <Icon as={MdOutlineCardTravel} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Export Csv
              </Text>
            </Flex>
          </a>
          </Flex>
        </MenuItem>
        {type == "clientEntreprise" && <>
        <MenuItem
          transition="0.2s linear"
          color={textColor}
          _hover={textHover}
          p="0px"
          borderRadius="8px"
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}>
          <Flex align="center">
          <a onClick={onOpen}>
            <Flex align="center">
              <Icon as={MdOutlineCardTravel} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Import liste de clients
              </Text>
            </Flex>
          </a>
          </Flex>
        </MenuItem>
        </>}
        {type == "contactAdmin" && <>
        <MenuItem
          transition="0.2s linear"
          color={textColor}
          _hover={textHover}
          p="0px"
          borderRadius="8px"
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}>
          <Flex align="center">
          <a onClick={onOpen}>
            <Flex align="center">
              <Icon as={MdOutlineCardTravel} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Import liste de contacts
              </Text>
            </Flex>
          </a>
          </Flex>
        </MenuItem>
        </>}
      </MenuList>
    </Menu>

<Modal isCentered  size="xl" isOpen={isOpen} onClose={onClose}>
<ModalContent>
<ModalHeader>Import de fichier</ModalHeader>
<ModalCloseButton />
<ModalBody>
<Upload type={type}
      />
</ModalBody>
<ModalFooter>
  <Button onClick={onClose}>Fermer</Button>
</ModalFooter>
</ModalContent>
</Modal>
</>
  );
}
