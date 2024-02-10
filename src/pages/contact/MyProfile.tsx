// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "../../components/profile/components/BannerEdit";
import General from "../../components/profile/components/General";
import Upload from "../../components/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import { useEffect, useState } from "react";
import { logoutHelper } from "helpers/logoutHeler";

import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUser } from "state/user/Users_Slice";

const BannerComponent = (props: any) => {
  return (
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
        avatar={props.avatar}
        name={props.name}
        job={props.job}
      />
    </Grid>
  );
};

export default function Overview() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUser(localStorage.getItem("user")) as any);
  }, [dispatch]);
  const { status, record } = useSelector((state: any) => state.fetchSingleUserExport);
  console.log(record, status);
  const renderData = () => {
    if (status === "loading")
      return (
        <BannerComponent
          avatar={require("assets/img/avatars/user.png")}
          name={"Chargement"}
          job={"Chargement"}
        />
      );
    if (status === "failed")
      return (
        <BannerComponent
          avatar={require("assets/img/avatars/user.png")}
          name={"Probleme serveur"}
          job={"Probleme serveur"}
        />
      );

    if (status === "succeeded") {
      return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
              avatar={require("assets/img/avatars/" + record.image)}
              name={record.nom}
              job={record.roles[0].name.substring(5)}
            />
          </Grid>
          <Grid
            mb="20px"
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
              gridArea="1 / 1 / 4 / 4"
              minH="365px"
              pe="20px"
              user={record}
            />
          </Grid>
        </Box>
      );
    }
  };

  return <>{renderData()}</>;
}
