import {
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useHistory } from "react-router-dom";
import { TiUserDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { DeleteRelationClientUser, MyContacts } from "state/user/RelationClientUser_Slice";
export default function ItemContact(props: {
  image: string;
  name: string;
  author: string;
  id: string;
  idClient: string;
}) {
  const { image, name, author, id, idClient } = props;
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  let history = useHistory();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const profileProp = async () => {
    history.push("/profile/profile-contact?id=" + id);
  };
  const toast = useToast()
  const DeleteContactOnClick = async () => {
    dispatch(
      DeleteRelationClientUser({ idClient: idClient, idUser: id }) as any
    )
      .unwrap()
      .then((res: any) => {
        dispatch(MyContacts(idClient) as any);
        toast({
          title: 'Contact retirer',
          status: 'info',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      })
      .catch((error: Error) => console.log(error));
  };

  return (
    <Card
      _hover={bgItem}
      bg="transparent"
      boxShadow="unset"
      px="24px"
      py="21px"
      transition="0.2s linear">
      <Flex direction={{ base: "column" }} justify="center">
        <Flex position="relative" align="center">
          <Image
            onClick={profileProp}
            src={require('assets/img/avatars/'+image)}
            w="66px"
            h="66px"
            borderRadius="20px"
            me="16px"
          />
          <Flex
            onClick={profileProp}
            direction="column"
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              mb="5px"
              fontWeight="bold"
              me="11px">
              {name}
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="11px">
              {author}
            </Text>
          </Flex>
          <Flex
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
            align="center">
            <Button
              onClick={onOpen}
              leftIcon={<TiUserDelete />}
              colorScheme="blue"
              variant="outline"></Button>
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation de retirer de contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Retour
            </Button>
            <Button variant='ghost' onClick={DeleteContactOnClick}>Retirer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
