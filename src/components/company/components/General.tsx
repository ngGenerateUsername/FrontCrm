import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import Information from "./Information";
export default function GeneralInformation(props: {
	entrepriseDetails: any;
	[x: string]: any;
}) {
	const { ...rest } = props;
	const { entrepriseDetails } = props;
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
					value={entrepriseDetails.numTel}
					id="numTel"
					idUser={entrepriseDetails.idUser}
				/>
				<Information
					boxShadow={cardShadow}
					title="E-mail"
					value={entrepriseDetails.mail}
					id="mail"
					idUser={entrepriseDetails.idUser}
				/>
				<Information
					boxShadow={cardShadow}
					title="Adresse"
					value={entrepriseDetails.adresse}
					id="adresse"
					idUser={entrepriseDetails.idUser}
				/>
				<Information
					boxShadow={cardShadow}
					title="numéro d'identification fiscale"
					value={entrepriseDetails.numFiscal}
					id="numFiscal"
					idUser={entrepriseDetails.idUser}
				/>
				<Information
					boxShadow={cardShadow}
					title="Chiffre d'affaires"
					value={entrepriseDetails.ca}
					id="ca"
					idUser={entrepriseDetails.idUser}
				/>
				<Information
					boxShadow={cardShadow}
					title="Date de Lancement"
					value={entrepriseDetails.dateCreation}
					id="dateCreation"
					idUser={entrepriseDetails.idUser}
				/>
				<Information
					boxShadow={cardShadow}
					title="Description"
					value={entrepriseDetails.description}
					id="description"
					idUser={entrepriseDetails.idUser}
				/>
			</SimpleGrid>
		</Card>
	);
}
