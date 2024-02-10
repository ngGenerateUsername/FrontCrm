import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import checkicon from "../../pdf.png"

const Alert = ({ onComplete }: any) => {
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
    backgroundColor: "#8DD5B3",
    transition: "width 0.05s linear",
    borderRadius: "8px",
  };

  return (
    <Box
      bg="white"
      color="green.500"
      p={4}
      borderRadius="md"
      boxShadow="md"
      position="fixed"
      top={4}
      right={4}
      zIndex={9999}
    >
      <Flex align="center">
      <img src={require("assets/img/avatars/checkk.gif")} alt="Check GIF" style={{ width: "60px", marginRight: "2px", marginBottom: "5px" }} />
        <Text color="#696E67 " fontSize="lg" mb={4} >
       ajouté avec succès
      </Text>
      </Flex>
     
      <Box flex={1}>
        <Box style={progressBarStyle} />
      </Box>
    </Box>
  );
};

export default Alert;
