import { Box, SimpleGrid } from "@chakra-ui/react";
import CheckTable from "components/opportunity/ContratsTable"; 
export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <CheckTable />
      </SimpleGrid>
    </Box>
  );
}
