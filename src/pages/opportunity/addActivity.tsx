import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  Select,
  Textarea,
  Flex,
  Box,
} from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

import { AddActivite, AllActivites } from "state/user/Activity_Slice";
import {
  CommerciauxPerEntreprise,
  entreprisePerContact,
} from "state/user/Role_Slice";
import { useHistory,useLocation } from "react-router-dom";
import { MyContacts } from "state/user/RelationClientUser_Slice";
import { DetailsOpportunite } from "state/user/Oportunity_Slice";

const ActiviteModal: React.FC = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { status, record } = useSelector(
    (state: any) => state.AllActivitesExport
  );
  console.log(record, status);

  const [SelectCommercial, setSelectCommercial] = useState("");
  const [SelectContact, setSelectContact] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatch(entreprisePerContact(localStorage.getItem("user")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        dispatch(CommerciauxPerEntreprise(res.idUser) as any)
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
  console.log(record, statusentreprisePerContact);

  const {
    status: statuscontactsPerEntreprise,
    record: recordcontactsPerEntreprise,
  } = useSelector((state: any) => state.CommerciauxPerEntrepriseExport);

  console.log(
    "liste commerciaux",
    recordcontactsPerEntreprise,
    statuscontactsPerEntreprise
  );

  const { status: statusOpportunite, record: recordOpportunite } = useSelector(
    (state: any) => state.DetailsOpportuniteExport
  );
  console.log("Opportunite", recordOpportunite, statusOpportunite);
  useEffect(() => {
    dispatch(DetailsOpportunite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(MyContacts(res.idClient) as any);
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusContacts, record: recordContacts } = useSelector(
    (state: any) => state.MyContactsExport
  );

  const [titre, setTitre] = useState("");
  const [notes, setNotes] = useState("");
  const [datefin, setDatefin] = useState("");
  const [typeActivite, setTypeActivite] = useState("");
  const [statusActivite, setStatusActivite] = useState("");
  const [description , setDescription ] = useState("");
  const [datedebut , setDatedebut ] = useState("");
  const [prioriteActivite , setPrioriteActivite ] = useState("");
  

  const AddActiviteF = async () => {
    try {
      console.log("test 1");
      await dispatch(
        AddActivite({
          titre: titre,
          typeActivite: typeActivite,
          dateDebut: datedebut,
          dateFin:datefin,
          notes: notes,
          Description:description,
          idCommrcial: SelectCommercial,
          idContact:SelectContact,
          idCreateur: localStorage.getItem("user"),
          idOpportunite: recordOpportunite.idOpportunite,
          idClient: recordOpportunite.idClient,
          relationActivite: "Opportunite",
          statusActivite: statusActivite,
          prioriteActivite:prioriteActivite,
        }) as any
      )
        .then((res: any) => {
          alert("creation activité avec succes");
          window.location.reload();
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
      <ModalContent>
        <ModalHeader>Planifier une activité</ModalHeader>
        <ModalCloseButton />
        <HSeparator />
        <ModalBody pb={40}>
          <Box>
            <Flex>
              <FormControl mr={4}>
                <FormLabel>Titre</FormLabel>
                <Input
                  placeholder="Titre"
                  variant="outline"
                  onChange={(e) => setTitre(e.target.value)}
                  name="titre"
                />
              </FormControl>
              <FormControl mr={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  type="text"
                  variant="outline"
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                />
              </FormControl>
            </Flex>
          </Box>
          <Box mt={10}>
            <Flex>
              <FormControl mr={4}>
                <FormLabel>Type</FormLabel>
                <Select
                  name="typeActivite"
                  placeholder="Selectioner un type"
                  variant="outline"
                  onChange={(e) => setTypeActivite(e.target.value)}
                >
                  <option value="Email">Email</option>
                  <option value="Tel">Appeler</option>
                  <option value="Reunion">Rendez-vous</option>
                </Select>
              </FormControl>
              <FormControl mr={4}>
                <FormLabel>Assigné à</FormLabel>
                <Select
                  name="ss"
                  id="ss"
                  variant="outline"
                  onChange={(e) => {
                    setSelectContact(e.target.value);
                  }}
                >
                  {recordContacts.map((e: any) => (
                    <option value={e.idUser} key={e.idUser}>
                      {e.prenom} {e.nom}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
          </Box>
          <Box mt={10}>
            <Flex>
              <FormControl mr={4}>
                <FormLabel>Priorité</FormLabel>
                <Select
                  name="typeActivite"
                  placeholder="Selectioner la priorité"
                  variant="outline"
                  onChange={(e) => setPrioriteActivite(e.target.value)}
                >
                  <option value="Faible">Faible</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Fort">Fort</option>
                </Select>
              </FormControl>
              <FormControl mr={4}>
                <FormLabel>Assigné Par</FormLabel>
                <Select
                  name="ss"
                  id="ss"
                   variant="outline"
                  onChange={(e) => {
                    setSelectCommercial(e.target.value);
                  }}
                >
                  {recordcontactsPerEntreprise.map((e: any) => (
                    <option
                      value={e.idUser}
                      key={e.idUser}
                    >
                      {e.prenom} {e.nom}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="typeActivite"
                  placeholder="Selectioner la priorité"
                  variant="outline"
                  onChange={(e) => setStatusActivite(e.target.value)}
                >
                  <option value="PLANIFIE">Planifiée</option>
                  <option value="ENCOURS">En cours</option>
                  <option value="TERMINE">Terminée</option>
                </Select>
              </FormControl>
            </Flex>
          </Box>
          <Box mt={10}>
            <Flex>
              <FormControl mr={4}>
                <FormLabel>Date de début</FormLabel>
                <Input
                  placeholder="Date de début"
                  type="date"
                  variant="outline"
                  onChange={(e) => setDatedebut(e.target.value)}
                  defaultValue={new Date().toISOString().substr(0, 10)}
                  name="date"
                />
              </FormControl>
              <FormControl mr={4}>
                <FormLabel>Date d'échéance</FormLabel>
                <Input
                  placeholder="Date d'échéance"
                  type="date"
                  variant="outline"
                  onChange={(e) => setDatefin(e.target.value)}
                  name="date"
                  defaultValue={new Date().toISOString().substr(0, 10)}
                />
              </FormControl>
            </Flex>
          </Box>
         
        </ModalBody>
        <HSeparator />
        <ModalFooter>
          <Button bg="brand.900" variant="brand" mr={3} onClick={AddActiviteF}>
            Planifier
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ActiviteModal;
