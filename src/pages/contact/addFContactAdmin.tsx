// Chakra imports
import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEntreprises } from "state/user/Entreprise_Slice";
import { SendMailInviteProp, SendMailInvite } from "state/user/Mailer_Slice";
import { findByMail } from "state/user/Users_Slice";
import { PropEntreprise } from "state/user/Role_Slice";
import { AllFournissur } from "state/Fou_slice/Fou_slice";

export default function SettingsF() {
  const textColorSecondary = "gray.400";
  const [Role, setRole] = useState("CONTACTFOURISSEUR");
  const [email, setEmail] = useState("");
  const [entreprise, setentreprise] = useState("...");
  const toast = useToast()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllFournissur() as any);
  }, [dispatch]);
  const { status, record } = useSelector((state: any) => state.AllFournissurExport);
  console.log(record, status);

  async function SendMaill(email: any, Role: string, entreprise: string) {
    await dispatch(SendMailInvite({ email, Role, entreprise }) as any)
      .then((res: any) => console.log(res))
      .catch((error: Error) => console.log(error));
    toast({
      title: 'invitation envoyee',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    })
    window.location.reload();
  }
  async function Invite(email: any) {
    await dispatch(SendMailInviteProp({ email, entreprise }) as any)
      .then((res: any) => console.log(res))
      .catch((error: Error) => console.log(error));
      toast({
        title: 'invitation envoyee',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    window.location.reload();
  }

  const AjoutContact = async () => {
      console.log(entreprise);
      dispatch(findByMail(email) as any)
        .unwrap()
        .then(async (res: any) => {
          console.log(res);
          if (email === "") {
            toast({
              title: 'Erreur',
              description: "veuillez saisire un mail",
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top',
            })
          } else if (res !== "") {
            toast({
              title: 'Erreur',
              description: "Ce mail est deja un membre de CRM",
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top',
            })
          } else if (entreprise === "...") {
            Invite(email);
          } else if (Role === "PROP") {
            dispatch(PropEntreprise(entreprise) as any)
            .unwrap()
            .then((res : any)=>{
              if (res.idUser != null) {
                toast({
                  title: 'Erreur',
                  description: "cette entreprise a deja un proprietaire",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                  position: 'top',
                })
              } else {
                SendMaill(email, Role, entreprise);
              }
            })
          } else {
            SendMaill(email, Role, entreprise);
          }
        })
        .catch((error: Error) => {
          toast({
            title: 'Erreur',
            description: "Erreur",
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          })
          console.log(error);
        });
  };
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card mb={{ base: "0px", "2xl": "20px" }}>
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          Invite User
        </Text>
        <SimpleGrid columns={1} gap="20px">
          <Box>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              mb="8px">
              E-mail<Text>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              id="email"
              placeholder="E-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fontWeight="500"
              size="lg"
            />
          </Box>

         
          <Box>
            <FormLabel htmlFor="owner">Selectionner une fournisseur</FormLabel>
            <Select
              name="entreprise"
              value={entreprise}
              onChange={(e) => setentreprise(e.target.value)}
              id="owner"
              defaultValue="...">
              <option key="..." value="...">
                ...
              </option>
              {record.map((e: any, key: any) => (
                <option key={e.idUser} value={e.idUser}>
                  {e.nomFournisseur}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="30%"
              h="50"
              mb="24px"
              onClick={AjoutContact}>
              Ajouter
            </Button>
          </Box>
        </SimpleGrid>
      </Card>
    </Box>
  );
}
