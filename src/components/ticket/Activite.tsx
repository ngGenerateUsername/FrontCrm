import React, { useEffect, useState } from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  Spacer,
  Stack,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  Modal,
  GridItem,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Icon,
} from "@chakra-ui/react";

// Custom components
import HistoryItem from "./HistoryItem";
import Card from "components/card/Card";
import { HSeparator } from "components/separator/Separator";
import ActiviteModal from "./addActivity";
import ContratModal from "./Contrat";
import RatingStars from "./ratingStars";

import {
  ArrowForwardIcon,
  ChevronRightIcon,
  EmailIcon,
  TimeIcon,
  EditIcon,
  RepeatIcon,
  AddIcon,
  HamburgerIcon,
  CheckIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  DetailsOpportunite,
  SetOpportuniteConfirmee,
  SetOpportunitePerdue,
  SetOpportunitePiste,
  SetOpportunitePotentiel,
  SetOpportuniteSignee,
} from "state/user/Oportunity_Slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { fetchSingleClient } from "state/user/Client_Slice";
import {
  fetchSingleUser,
  fetchSingleUser2,
  fetchSingleUser3,
} from "state/user/Users_Slice";
import {
  DetailsActivite,
  ActivitesForOpportunite,
  ActivitesForTicket,
} from "state/user/Activity_Slice";
import { DetailsTicket } from "state/user/ticket_Slice";

export default function Opportunite() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    dispatch(DetailsTicket(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(fetchSingleClient(res.idClient) as any);
        dispatch(fetchSingleUser(res.idResponsable) as any);
        console.log(res);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const [userDetails, setUserDetails] = useState<
    { id: string; nom: string; image: string }[]
  >([]);

  useEffect(() => {
    dispatch(ActivitesForTicket(params.get("id")) as any)
      .unwrap()
      .then((res: any) => {
        dispatch(DetailsActivite(res.idActivite) as any);
        
          dispatch(fetchSingleUser2(res.idRespTicket) as any);
      })
      .catch((error: Error) => console.log(error));
  }, [dispatch]);

  const { status: statusActivities, record: recordActivities } =
    useSelector((state: any) => state.ActivitesForTicketExport) || {};

  console.log("Activities", recordActivities, statusActivities);

  const { status: statusSingleActivite, record: recordSingleActivite } =
    useSelector((state: any) => state.DetailsActiviteExport) || {};
  console.log("singleActivities", recordSingleActivite, statusSingleActivite);

  const { status: statusOpportunite, record: recordOpportunite } = useSelector(
    (state: any) => state.DetailsTicketExport
  );
  console.log("Opportunite", recordOpportunite, statusOpportunite);

  const { status: statusClient, record: recordClient } = useSelector(
    (state: any) => state.fetchSingleClientExport
  );
  console.log("client", recordClient, statusClient);

  const { status: statusCommercial, record: recordCommercial } = useSelector(
    (state: any) => state.fetchSingleUserExport
  );
  console.log("Resp", recordCommercial, statusCommercial);

  const { status: statusCommercialAct, record: recordCommercialAct } =
    useSelector((state: any) => state.fetchSingleUser2Export) || {};
  console.log("Resp", recordCommercialAct, statusCommercialAct);





  const [activeItem, setActiveItem] = useState("");

  const breadcrumbItems = [
    { label: "PISTE", status: "PISTE" },
    { label: "POTENTIEL", status: "POTENTIEL" },
    { label: "CONFIRMEE", status: "CONFIRMEE" },
    { label: "SIGNEE", status: "SIGNEE" },
    { label: "PERDUE", status: "PERDUE" },
  ];

  useEffect(() => {
    const databaseStatus = recordOpportunite.statusOpportunite;
    console.log(databaseStatus);

    const mappedStatus = mapDatabaseStatusToBreadcrumbStatus(databaseStatus);

    setActiveItem(mappedStatus);
  }, [recordOpportunite.statusOpportunite]);

  const mapDatabaseStatusToBreadcrumbStatus = (databaseStatus: any) => {
    switch (databaseStatus) {
      case "PISTE":
        return "PISTE";
      case "POTENTIEL":
        return "POTENTIEL";
      case "CONFIRMEE":
        return "CONFIRMEE";
      case "SIGNEE":
        return "SIGNEE";
      case "PERDUE":
        return "PERDUE";
      default:
        return "";
    }
  };

  const handleConfirmation = () => {
    const idOpportunite = recordOpportunite.idOpportunite;
    SetOpportuniteConfirmee(idOpportunite);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContratModalOpen, setIsContratModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenContratModal = () => {
    setIsContratModalOpen(true);
  };

  const handleCloseContratModal = () => {
    setIsContratModalOpen(false);
  };

  return (
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card p="0px">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color={textColor} fontSize="xl" fontWeight="600">
                Activités
              </Text>

              <Button
                onClick={async () => {
                  history.push("/commercial/Activities");
                }}
                variant="action"
              >
                See all
              </Button>
            </Flex>
            <Flex>
              <Link
                fontSize="sm"
                m="2"
                ml="5"
                color={textColorBrand}
                fontWeight="500"
                onClick={handleOpenModal}
              >
                <TimeIcon mx="2px" /> planifier une activité
              </Link>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                size="5xl"
              >
                <ActiviteModal />
              </Modal>
            </Flex>
            <Card p="0px" gridArea="1 / 2 / 4 / 4">
              {/* {renderDataOpp()} */}
            </Card>
            {recordActivities.map((c: any) => {
              return (
                <HistoryItem
                  key={c.idActivite}
                  name={c.typeActivite}
                  author={c.statusActivite}
                  image={""}
                  Titre={c.titre}
                  id={c.idActivite}
                  date={new Date(c.dateActivite)}
                />
              );
            })}
          </Card>
        </Flex>
  );
}
