import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  useDisclosure,
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
  GridItem,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

import {
  AddActivite,
  AllActivites,
} from "state/user/Activity_Slice";
import {
  CommerciauxPerEntreprise,
  RespTicketPerEntreprise,
  entreprisePerContact,
} from "state/user/Role_Slice";
import { useHistory } from "react-router-dom";


const ActiviteModal: React.FC = () => {

  const dispatch = useDispatch();
  let history = useHistory();

  const [SelectCommercial, setSelectCommercial] = useState("");

  useEffect(() => {
    dispatch(entreprisePerContact(localStorage.getItem("user")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(RespTicketPerEntreprise(res.idUser) as any)
          .unwrap()
          .then((res: any) => {
            console.log(res);
          });
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const {
    status: statusentreprisePerContact,
    record: recordentreprisePerContact,
  } = useSelector((state: any) => state.entreprisePerContactExport);
  console.log(recordentreprisePerContact, statusentreprisePerContact);

  const {
    status: statuscontactsPerEntreprise,
    record: recordcontactsPerEntreprise,
  } = useSelector((state: any) => state.RespTicketPerEntrepriseExport);

  console.log(
    "liste resps",
    recordcontactsPerEntreprise,
    statuscontactsPerEntreprise
  );

  const {
    status: statusDetailsTicket,
    record: recordDetailsTicket,
  } = useSelector((state: any) => state.DetailsTicketExport);
  console.log("DetailsTicket", recordDetailsTicket, statusDetailsTicket);

  const [titre, setTitre] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [typeActivite, setTypeActivite] = useState("");

  const AddActiviteF = async () => {
    try {
      console.log("test 1");
      await dispatch(
        AddActivite({
          titre: titre,
          typeActivite: typeActivite,
          dateActivite: date,
          notes: notes,
          idCommrcial: SelectCommercial,
          idCreateur: localStorage.getItem("user"),
          idTicket: recordDetailsTicket.idTicket,
          idClient: recordDetailsTicket.idClient,
          relationActivite: "Ticket" ,
        }) as any
      )
        .then((res: any) => {
          alert("creation ticket avec succes");
          window.location.reload();
          // history.push("/commercial/AllOpportunites");
        })
        .catch((error: Error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };


  
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Planifier une activité</ModalHeader>
        <ModalCloseButton />
        <HSeparator />
        <ModalBody pb={40}>
          <FormControl>
            <Grid
              h="200px"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={4}
            >
              <GridItem colSpan={2}>
                <FormLabel>Type d'activité</FormLabel>
                <Select
                  name="typeActivite"
                  placeholder="Selectioner un type"
                  onChange={(e) => setTypeActivite(e.target.value)}
                >
                  <option value="Email">Email</option>
                  <option value="Tel">Appeler</option>
                  <option value="Reunion">Rendez-vous</option>
                </Select>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl ml={50}>
                  <FormLabel>Date d'échéance</FormLabel>
                  <Input
                    placeholder="Last name"
                    type="date"
                    variant="flushed"
                    onChange={(e) => setDate(e.target.value)}
                    name="date"
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl mt={-100}>
            <Grid
              h="200px"
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={4}
            >
              <GridItem colSpan={2}>
                <FormLabel>Titre</FormLabel>
                <Input
                  placeholder="First name"
                  variant="flushed"
                  onChange={(e) => setTitre(e.target.value)}
                  name="titre"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl ml={50}>
                  <FormLabel>Assigné à</FormLabel>
                  <Select
                    name="ss"
                    id="ss"
                    value={SelectCommercial}
                    onChange={(e) => {
                      setSelectCommercial(e.target.value);
                    }}
                  >
                    <option value="0">.........</option>
                    {recordcontactsPerEntreprise.map((e: any, key: any)  => (
                      <option value={e.idUser} key={e.idUser}>
                        {e.nom} {e.prenom}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <GridItem colSpan={5}>
                  <FormControl mt={50} ml={-300} w={700}>
                    <FormLabel>Notes:</FormLabel>
                    <Textarea
                      variant="flushed"
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="ajouter une note"
                    ></Textarea>
                    {/* <Editor /> */}
                  </FormControl>
                </GridItem>
              </GridItem>
            </Grid>
          </FormControl>
        </ModalBody>
        <HSeparator />
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={AddActiviteF}>
            Planifier
          </Button>
          <Button>Marqué comme fait</Button>
          <Button>Terminer et planifier le prochain</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ActiviteModal;
