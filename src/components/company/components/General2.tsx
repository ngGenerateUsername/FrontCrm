import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Information from "./Information2";

export default function GeneralInformation(props: {
  entreprise: any;
  [x: string]: any;
}) {
  const { ...rest } = props;
  const { entreprise } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px"></Text>
      <SimpleGrid columns={2} gap="20px">
        <Information
          boxShadow={cardShadow}
          title="Numero de Tel"
          value={entreprise.numTel}
        />
        <Information
          boxShadow={cardShadow}
          title="E-mail"
          value={entreprise.mail}
        />
        <Information
          boxShadow={cardShadow}
          title="Adresse"
          value={entreprise.adresse}
        />
        <Information
          boxShadow={cardShadow}
          title="numéro d'identification fiscale"
          value={entreprise.numFiscal}
        />
        <Information
          boxShadow={cardShadow}
          title="Chiffre d'affaires"
          value={entreprise.ca}
        />
        <Information
          boxShadow={cardShadow}
          title="Date de Lancement"
          value={entreprise.dateCreation}
        />
        <Information
          boxShadow={cardShadow}
          title="Description"
          value={entreprise.description}
        />
      </SimpleGrid>
    </Card>
  );
}
