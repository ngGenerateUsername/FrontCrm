import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Icon, Text, VStack } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {BsFillGeoFill} from 'react-icons/bs';
import Card from 'components/card/Card';

export default function MiniCalendar(props: {
  selectRange: boolean;
  eventDates: { date: string; type: string }[];
  [x: string]: any;
}) {
  const { selectRange, eventDates, ...rest } = props;
  const [value, onChange] = useState<Date>(new Date('2023-07-12'));

  const tileContent = ({ date }: { date: Date }) => {
    const dateISOString = date.toISOString().split('T')[0];
    const event = eventDates.find((event) => event.date === dateISOString);
    if (event) {
      let pinColor = '';
      if (event.type === 'activity') {
        pinColor = 'red';
      } else if (event.type === 'contract') {
        pinColor = 'blue';
      }
      return (
        <Icon as={BsFillGeoFill} boxSize={4} color={pinColor} />
      );
    }
    return null;
  };

  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={'month'}
        tileContent={tileContent}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
   <VStack mt={2} spacing={2}>
        <Text color="red" fontSize="xs" fontWeight="bold">
          <Icon as={BsFillGeoFill} boxSize={3} color="red" mr={1} />
          Activité
        </Text>
        <Text color="blue" fontSize="xs" fontWeight="bold">
          <Icon as={BsFillGeoFill} boxSize={3} color="blue" mr={1} />
          Contrat
        </Text>
      </VStack>
    </Card>
  );
}
