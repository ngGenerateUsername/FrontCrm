import {
  Box,
  Flex,
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

import Nft5 from "assets/img/nfts/Nft5.png";

import { fetchSingleClientExport,fetchSingleClient } from "state/user/Client_Slice";
import { MyContacts } from "state/user/RelationClientUser_Slice";
function Overview() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleClient(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        console.log(res.idUser);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusClient, record: recordClient } = useSelector(
    (state: any) => state.fetchSingleClientExport
  );
  console.log(recordClient, statusClient);

  useEffect(() => {
    dispatch(MyContacts(params.get("id")) as any)
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusContacts, record: recordContacts } = useSelector(
    (state: any) => state.MyContactsExport
  );

  return (
    <Box pt={{ base: "130px", xl: "80px" }}>
      {/* Main Fields */}
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
          name={recordClient.nomEntreprise}
          job={recordClient.domaine}
        />
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
          entreprise={recordClient}        />
          
        <Card p="0px" gridArea="1 / 3 / 4 / 4">
          <Flex
            align={{ sm: "flex-start", lg: "center" }}
            justify="space-between"
            w="100%"
            px="22px"
            py="18px">
          </Flex>
          {recordContacts.map((c: any) => (
            <HistoryItem
              key={c.idUser}
              name={c.username}
              author={c.roles[0].name.substring(5)}
              image={Nft5}
              id={c.idUser}
            />
          ))}
        </Card>
        </Grid>
    </Box>
  );
}
export default Overview;
