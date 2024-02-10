import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
  Image,
  FormLabel,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useRef, useState } from "react";
import { MdUpload } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { ImportCSVClients, ImportExelClients,ImportExelContacts,ImportCSVContacts } from "state/user/Import_Slice";
import { entreprisePerContact } from "state/user/Role_Slice";
import { CLientsOfMyEntreprise } from "state/user/RelationClientUser_Slice";
import { fetchAllContacts } from "state/user/Users_Slice";
export default function Import(props: { type: any }) {
  const { type } = props;
  const brandColor = useColorModeValue("brand.500", "white");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(entreprisePerContact(localStorage.getItem("user")) as any)
      .unwrap()
      .then((res: any) => {});
  }, [dispatch]);
  const { status: statusEntreprise, record: recordEntreprise } = useSelector(
    (state: any) => state.entreprisePerContactExport
  );
  const [id, setid] = useState(recordEntreprise.idUser);

  const importFile = async () => {
    setid(recordEntreprise.idUser);
    if (selectedFile == null) {
      alert("Veuillez sélectionner une fichier d'abord !");
    } else {
      if (type === "clientEntreprise" && selectedFile.type === "text/csv") {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await dispatch(
          ImportCSVClients({ form: formData, id: recordEntreprise.idUser }) as any
        )
          .unwrap()
          .then((res: any) => {
            dispatch(
              CLientsOfMyEntreprise(localStorage.getItem("user")) as any
            );
            alert("Ajout des clients avec succes");
          })

          .catch((error: Error) => console.log(error));
      }
      else if (type === "clientEntreprise" && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        const formData = new FormData();
        formData.append("file", selectedFile);

        await dispatch(
          ImportExelClients({ form: formData, id: recordEntreprise.idUser }) as any
        )
          .unwrap()
          .then((res: any) => {
            dispatch(
              CLientsOfMyEntreprise(localStorage.getItem("user")) as any
            );
            alert("Ajout des clients avec succes");
          })

          .catch((error: Error) => console.log(error));
      }
      if (type === "contactAdmin" && selectedFile.type === "text/csv") {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await dispatch(
          ImportCSVContacts({ form: formData}) as any
        )
          .unwrap()
          .then((res: any) => {
            dispatch(
              fetchAllContacts() as any
            );
            alert("Ajout des contacts avec succes");
          })

          .catch((error: Error) => console.log(error));
      }
      else if (type === "contactAdmin" && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        const formData = new FormData();
        formData.append("file", selectedFile);

        await dispatch(
          ImportExelContacts({ form: formData}) as any
        )
          .unwrap()
          .then((res: any) => {
            dispatch(
              fetchAllContacts() as any
            );
            alert("Ajout des contacts avec succes");
          })

          .catch((error: Error) => console.log(error));
      }
       else {
        alert("not yet");
      }
    }
  };
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  return (
    <Card alignItems="right">
{type ==="clientEntreprise" && <>
<Box>
        <FormLabel htmlFor="url">
          Exemple de CSV{" "}
          <a href={process.env.PUBLIC_URL + '/Exemple_Import_CSV_Clients.csv'} download>
            <Button variant="outline" mr={3}>
              Telecharger exemple de CSV
            </Button>
          </a>
        </FormLabel>
      </Box>
      <Box>
        <FormLabel htmlFor="url">
          Exemple de exel{" "}
          <a href={process.env.PUBLIC_URL + '/Exemple_Import_EXEL_Clients.xlsx'} download>
            <Button variant="outline" mr={3}>
              Telecharger exemple de exel
            </Button>
          </a>
        </FormLabel>
        <br></br>
      </Box>
</>}
{type ==="contactAdmin" && <>
<Box>
        <FormLabel htmlFor="url">
          Exemple de CSV{" "}
          <a href={process.env.PUBLIC_URL + '/Exemple_Import_CSV_Clients.csv'} download>
            <Button variant="outline" mr={3}>
              Telecharger exemple de CSV
            </Button>
          </a>
        </FormLabel>
      </Box>
      <Box>
        <FormLabel htmlFor="url">
          Exemple de exel{" "}
          <a href={process.env.PUBLIC_URL + '/Exemple_Import_EXEL_Clients.xlsx'} download>
            <Button variant="outline" mr={3}>
              Telecharger exemple de exel
            </Button>
          </a>
        </FormLabel>
        <br></br>
      </Box>
</>}
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Flex
          align="center"
          justify="center"
          bg={bg}
          border="1px dashed"
          borderColor={borderColor}
          borderRadius="16px"
          w="100%"
          h="max-content"
          minH="100%"
          cursor="pointer"
          maxH={{ base: "100%", lg: "100%", "2xl": "100%" }}
          onClick={handleClick}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {selectedFile && (
            <Image
              boxSize="150px"
              objectFit="cover"
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name}
            />
          )}
          <Input
            hidden={true}
            type="file"
            ref={inputRef}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileSelect}></Input>

          <Button variant="no-effects">
            <Box>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload CSV Ou EXEL
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                CSV et EXEL sont autorisés
              </Text>
            </Box>
          </Button>
        </Flex>
      </Flex>
      <br></br>
      <Button variant="brand" fontWeight="500" onClick={importFile}>
        Import de donnees
      </Button>
    </Card>
  );
}
