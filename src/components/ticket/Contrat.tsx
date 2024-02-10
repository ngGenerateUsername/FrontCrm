import React from "react";
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Divider,
  Button,
  Textarea,
  Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaFileContract } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CLientsOfMyEntreprise,
  MyContacts,
} from "state/user/RelationClientUser_Slice";
import {
  CommerciauxPerEntreprise,
  entreprisePerContact,
} from "state/user/Role_Slice";
import { DetailsOpportunite } from "state/user/Oportunity_Slice";
import { fetchSingleClient } from "state/user/Client_Slice";
import { fetchSingleUser } from "state/user/Users_Slice";
import { AddContrat } from "state/user/Contrat_Slice";

const ContratPage: React.FC = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [showContacts, setShowContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");
  const [SelectCommercial, setSelectCommercial] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(DetailsOpportunite(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(MyContacts(res.idClient) as any);
        dispatch(fetchSingleUser(res.idCommercial) as any);
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

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
    status: statuscontactsPerEntreprise,
    record: recordcontactsPerEntreprise,
  } = useSelector((state: any) => state.CommerciauxPerEntrepriseExport);

  console.log(
    "liste commerciaux",
    recordcontactsPerEntreprise,
    statuscontactsPerEntreprise
  );
  const { status: statusContacts, record: recordContacts } = useSelector(
    (state: any) => state.MyContactsExport
  );

  console.log("liste commerciaux", recordContacts, statusContacts);

  const {
    status: statusentreprisePerContact,
    record: recordentreprisePerContact,
  } = useSelector((state: any) => state.entreprisePerContactExport);
  console.log(recordentreprisePerContact, statusentreprisePerContact);
  const { status: statusOpportunite, record: recordOpportunite } = useSelector(
    (state: any) => state.DetailsOpportuniteExport
  );
  console.log("Opportunite", recordOpportunite, statusOpportunite);

  const { status: statusClient, record: recordClient } = useSelector(
    (state: any) => state.fetchSingleClientExport
  );
  console.log("client", recordClient, statusClient);

  const { status: statusCommercial, record: recordCommercial } = useSelector(
    (state: any) => state.fetchSingleUserExport
  );
  console.log("Commercial", recordCommercial, statusCommercial);

  const AddContratF = async () => {
    try {
      console.log("test 1");
      await dispatch(
        AddContrat({
          notes: notes,
          idCommercial: SelectCommercial,
          idCreateur: localStorage.getItem("user"),
          idClient: recordOpportunite.idClient,
          opportunite: recordOpportunite,
          dateSignature: date,
          statusContrat:"NON_SIGNE",
          idEntreprise: recordOpportunite.idEntreprise,
          idSignataire: selectedContact
        }) as any
      )
        .then((res: any) => {
          alert("creation Contrat avec succes");
          window.location.reload();
          // history.push("/commercial/AllOpportunites");
        })
        .catch((error: Error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          <ModalOverlay />
          <ModalContent>
            <Box margin="20px">
              <ModalHeader>
                <Box
                  display="flex"
                  alignItems="center"
                  marginBottom="20px"
                  bg="brand.900"
                  color="white"
                  padding="10px"
                >
                  <FaFileContract size={20} style={{ marginRight: "10px" }} />
                  <Heading as="h2" fontSize="1.5rem">
                    Créer un contrat
                  </Heading>
                </Box>
              </ModalHeader>
              <ModalCloseButton onClick={handleCloseModal} />
              <Divider marginBottom="20px" />
              <form>
                <FormControl marginBottom="10px">
                  <FormLabel htmlFor="nomClient" fontSize="0.9rem">
                    Nom Client:
                  </FormLabel>
                  <Select name="ss" id="ss" variant="flushed" size="sm">
                    <option value={recordClient.nomEntreprise}>
                      {recordClient.nomEntreprise}
                    </option>
                  </Select>
                </FormControl>
                <FormControl marginBottom="10px">
                  <FormLabel htmlFor="nomFournisseur" fontSize="0.9rem">
                    Nom Fournisseur:
                  </FormLabel>
                  <Select name="ss" id="ss" variant="flushed" size="sm">
                    <option value={recordentreprisePerContact.idEntreprise}>
                      {recordentreprisePerContact.nomEntreprise}
                    </option>
                  </Select>
                </FormControl>
                <FormControl marginBottom="10px">
                  <FormLabel htmlFor="commercialSuiviContrat" fontSize="0.9rem">
                    Commercial suivi du Contrat:
                  </FormLabel>
                  <Select
                    variant="flushed"
                    size="sm"
                    name="ss"
                    id="ss"
                    value={SelectCommercial}
                    onChange={(e) => {
                      setSelectCommercial(e.target.value);
                    }}
                  >
                    <option value="0">.........</option>
                    {recordcontactsPerEntreprise.map((e: any) => (
                      <option value={e.idUser} key={e.idUser}>
                        {e.nom} {e.prenom}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl marginBottom="10px">
                  <FormLabel htmlFor="commercialSignataire" fontSize="0.9rem">
                    Commercial Signataire:
                  </FormLabel>
                  <Select variant="flushed" size="sm" value={selectedContact}  onChange={(e) => {
                      setSelectedContact(e.target.value);
                    }}>
                    <option value="0">.........</option>
                    {recordContacts.map((contact: any) => (
                      <option value={contact.idUser} key={contact.idUser}>
                        {contact.username}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl marginBottom="10px">
                  <FormLabel htmlFor="dateContrat" fontSize="0.9rem">
                    Date du Contrat:
                  </FormLabel>
                  <Input
                    type="date"
                    variant="flushed"
                    id="dateContrat"
                    size="sm"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormControl>
                <FormControl marginBottom="10px">
                  <FormLabel htmlFor="opportunite" fontSize="0.9rem">
                    Opportunité:
                  </FormLabel>
                  <Select name="ss" id="ss" variant="flushed" size="sm">
                    <option value={recordOpportunite.titre}>
                      {recordOpportunite.titre}
                    </option>
                  </Select>
                </FormControl>
                <FormControl marginBottom="10px">
                  <FormLabel htmlFor="notes" fontSize="0.9rem">
                    Notes:
                  </FormLabel>
                  <Textarea variant="flushed" id="notes" size="sm"   onChange={(e) => setNotes(e.target.value)}/>
                </FormControl>
              </form>
              <Divider marginBottom="20px" />
              <Box display="flex" justifyContent="flex-end">
                <Button colorScheme="brand" mr={2} onClick={AddContratF}>
                  Créer
                </Button>
                <Button colorScheme="gray" onClick={handleCloseModal}>
                  Annuler
                </Button>
              </Box>
            </Box>
          </ModalContent>
        </>
      )}
    </>
  );
};

export default ContratPage;
