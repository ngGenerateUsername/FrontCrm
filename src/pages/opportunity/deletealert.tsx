import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import checkicon from "../../pdf.png"

const DeleteAlert = ({ onComplete }: any) => {
  const [progress, setProgress] = useState(100);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, 30);

    if (progress === 0) {
      clearInterval(interval);
      onComplete();
      setShowMessage(true);
    }

    return () => clearInterval(interval);
  }, [onComplete, progress]);

  const progressBarStyle = {
    height: "4px",
    width: `${progress}%`,
    backgroundColor: "#c72691",
    transition: "width 0.05s linear",
    borderRadius: "8px",
  };

  return (
    <Box
      bg="white"
      color="red.500"
      p={4}
      borderRadius="md"
      boxShadow="md"
      position="fixed"
      top={4}
      right={4}
      zIndex={9999}
    >
      <Flex align="center">
      <img src={require("assets/img/avatars/dlt.gif")} alt="Check GIF" style={{ width: "50px", marginRight: "4px", marginBottom: "15px" }} />
        <Text color="#696E67 " fontSize="lg" mb={4} >
       Supprimé avec succès
      </Text>
      </Flex>
     
      <Box flex={1}>
        <Box style={progressBarStyle} />
      </Box>
    </Box>
  );
};

export default DeleteAlert;
