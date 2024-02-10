import {
  Box,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Banner from "../../components/company/components/Banner";
import General from "../../components/company/components/General2";
import banner from "assets/img/auth/banner.png";
import HistoryItem from "../../components/company/components/HistoryItem2";
import Card from "components/card/Card";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchSingleUserEntreprise } from "state/user/Entreprise_Slice";
import { Prop, contactsPerEntreprise } from "state/user/Role_Slice";
function Overview() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUserEntreprise(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res.idUser);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusEntreprise, record: recordEntreprise } = useSelector(
    (state: any) => state.fetchSingleUserEntrepriseExport
  );
  console.log(recordEntreprise, statusEntreprise);

  useEffect(() => {
    dispatch(contactsPerEntreprise(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res.idUser);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusContacts, record: recordContacts } = useSelector(
    (state: any) => state.contactsPerEntrepriseExport
  );
  console.log(recordContacts, statusContacts);

  useEffect(() => {
    dispatch(Prop(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusProp, record: recordProp } = useSelector(
    (state: any) => state.PropExport
  );
  console.log(recordProp, statusProp);

  const renderDataProp = () => {
    if (statusProp === "loading")
      return <HistoryItem name="loading" author="loading" image="" id="" />;
    if (statusProp === "failed")
      return <HistoryItem name="failed" author="failed" image="" id="" />;
    if (statusProp === "succeeded") {
      if(recordProp.idUser == null){
        return (
          <HistoryItem
            name="Aucun"
            author=""
            image={require("assets/img/avatars/user.png")}
            id="null"
          />
          );
      }
      else{
        return (
          <HistoryItem
            name={recordProp.nom}
            author={recordProp.roles[0].name}
            image={require("assets/img/avatars/" + recordProp.image)}
            id={recordProp.idUser}
          />
          );
      }

		}
    }

  return (
    <Box pt={{ base: "130px", xl: "80px", md: "20px" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea="1 / 1 / 4 / 4"
          banner={banner}
          avatar={require("assets/img/avatars/company.png")}
          name={recordEntreprise.nomEntreprise}
          job={recordEntreprise.domaine}
        />
      </Grid>
      {/* <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Text
          gridArea="1 / 1 / 2/ 2"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700">
          Proprietaire
        </Text>
        <Card p="0px" gridArea="1 / 2 / 4 / 4">
          {renderDataProp()}
        </Card>
      </Grid> */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Text
          gridArea="1 / 1 / 4/ 4"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700">
          Informations générales
        </Text>

        <Text
          gridArea="1 / 3 / 4/ 4"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700">
          Contacts
        </Text>
        </Grid>
        <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <General
          gridArea="1 / 1 / 3 / 3"
          minH="365px"
          pe="20px"
          entreprise={recordEntreprise}
        />
        <Card p="0px" gridArea="1 / 3 / 4 / 4">
          {recordContacts.map((c: any) => (
            <HistoryItem
              key={c.idUser}
              name={c.nom}
              author={c.roles[0].name.substring(5)}
              image={require("assets/img/avatars/user.png")}
              id={c.idUser}
            />
          ))}
        </Card>
        </Grid>

    </Box>
  );
}
export default Overview;
