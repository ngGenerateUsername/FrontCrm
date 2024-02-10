import { Button,Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";



export default function AlertModal(props: { titre: any,desc:any,status:any }) {
	const { titre,desc,status } = props;
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: status })
    console.log("zzz")
    return (
        <>
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
  <ModalContent>
    <ModalHeader>{titre}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text>{desc}</Text>
    </ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
</>
    )
}
