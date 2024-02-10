import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { Avatar } from "@chakra-ui/react";
import { FaUser, FaPhone, FaUsers } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useHistory } from "react-router-dom";

export default function NFT(props: {
	image: string;
	name: string;
	author: string;
	Titre: string;
  id:number;
	date: Date;
  }) {
	const { image, author, name, id, Titre } = props;
  let history = useHistory();
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    {
      bg: "white",
      boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)",
      borderColor: "green.400",
      borderWidth: "2px",
    },
    {
      bg: "navy.700",
      boxShadow: "unset",
      borderColor: "green.400",
      borderWidth: "2px",
    }
  );

  const textColorDate = useColorModeValue("secondaryGray.600", "white");

  let statusText;
  let statusColor;
  if (author === "ENCOURS") {
    statusText = "En cours";
    statusColor = "green.600";
  } else if (author === "PLANIFIE") {
    statusText = "Planifié";
    statusColor = "orange.400";
  } else {
    statusText = "Terminé";
    statusColor = "red.600";
  }

  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
	const today = new Date();
	if (props.date instanceof Date) { // Check if props.date is an instance of Date
	  const timeDifference = props.date.getTime() - today.getTime();
	  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
	  setRemainingDays(daysDifference);
	}
  }, [props.date]);
  
  
  return (
    <Card
      _hover={{
        bg: bgItem.bg,
        boxShadow: bgItem.boxShadow,
        borderColor: bgItem.borderColor,
        borderWidth: bgItem.borderWidth,
        transform: "translateY(-5px)",
        transition: "transform 0.3s ease",
        cursor: "pointer",
      }}
      onClick={() => {
        // Handle card click
        history.push(`/commercial/Single-activite/Activite/ActiviteDetail?id=${id}`);
      }}
      bg="transparent"
      boxShadow="unset"
      px="24px"
      py="21px"
      transition="0.2s linear"
      position="relative"
    >
      <Flex direction={{ base: "column" }} justify="center">
        <Flex position="relative" align="center">
          <Flex
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
            align="center"
          >
            <Box position="relative" display="inline-block">
              {name === "Email" ? (
                <Avatar
                  icon={<MdEmail />}
                  size="lg"
                  bg="transparent"
                  color="brand.900"
                  _hover={{
                    transform: "scale(2.1)",
                    transition: "transform 0.3s ease",
                  }}
                />
              ) : name === "Tel" ? (
                <Avatar
                  icon={<FaPhone />}
                  size="md"
                  bg="transparent"
                  color="brand.900"
                  _hover={{
                    transform: "scale(2.1)",
                    transition: "transform 0.3s ease",
                  }}
                />
              ) : name === "Reunion" ? (
                <Avatar
                  icon={<FaUsers />}
                  size="md"
                  bg="transparent"
                  color="brand.900"
                  _hover={{
                    transform: "scale(2.1)",
                    transition: "transform 0.3s ease",
                  }}
                />
              ) : (
                <Avatar
                  src={image}
                  size="md"
                  icon={<FaUser />}
                  _hover={{
                    transform: "scale(1.1)",
                    transition: "transform 0.3s ease",
                  }}
                />
              )}
            </Box>
          </Flex>

          <Flex
            direction="column"
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
          >
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              mb="5px"
              fontWeight="bold"
              me="14px"
            >
              {name}
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={{
                base: "sm",
              }}
              fontWeight="400"
              me="14px"
            >
              {Titre}
            </Text>
          </Flex>

          <Text
            position="absolute"
            top="-5px"
            right="4px"
            bg="white"
            color="red.700"
            fontSize="sm"
            fontWeight="bold"
            borderRadius="md"
            px="2"
            py="1"
            zIndex="1"
            animation="blinking 4s infinite"
            css={{
              "@keyframes blinking": {
                "0%": { opacity: 0 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0 },
              },
            }}
          >
          {remainingDays} {remainingDays === 1 ? "Jour" : "Jours"} Restants
          </Text>

          <Text
            position="absolute"
            bottom="4px"
            right="4px"
            width="50px"
            height="20px"
            bg={statusColor}
            color="white"
            fontSize="xs"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="1"
            // animation="blinking 2.5s infinite"
            borderRadius="4px"
            boxShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
            // css={{
            //   "@keyframes blinking": {
            //     "0%": { opacity: 0 },
            //     "50%": { opacity: 1 },
            //     "100%": { opacity: 0 },
            //   },
            // }}
          >
            {statusText}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
