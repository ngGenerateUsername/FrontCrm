import CalendarExample from "./Pipeline/components/calendar";
import CalendarExampleTailwind from "./Pipeline/components/calendartailwind";
import QuillEditorExample from "./Pipeline/components/quill";
import DataTableExample from "./Pipeline/components/dataTables";
import DataTableExampleV8 from "./Pipeline/components/dataTablesV8";
import KanbanExample from "./Pipeline/components/kanban";
import WizardExample from "./Pipeline/components/wizard";
import MiniProile from "./Pipeline/components/card/MiniProfile";
import General from "./Pipeline/components/card/GeneralInformation";
import NFT from "./Pipeline/components/card/NFT";
import SignIn from "./Pipeline/components/card/LoginForm";
import Notifications from "./Pipeline/components/card/Notifications";
import MiniStatistics from "./Pipeline/components/card/MiniStatistics";
import BarChart from "./Pipeline/components/charts/barChart";
import BubbleChart from "./Pipeline/components/charts/bubbleChart";
import DonutChart from "./Pipeline/components/charts/donutChart";
import LineBarChart from "./Pipeline/components/charts/lineBarChart";
import LineChart from "./Pipeline/components/charts/lineChart";
import LineAreaChart from "./Pipeline/components/charts/lineAreaChart";
import PieChart from "./Pipeline/components/charts/pieChart";
import PolarChart from "./Pipeline/components/charts/polarChart";
import RadarChart from "./Pipeline/components/charts/radarChart";
import Dropzone from "./Pipeline/components/Dropzone";
import MapComponent from "./Pipeline/components/map";
import MiniCalendar from "./Pipeline/components/MiniCalendar";
import avatar2 from "./Pipeline/assets/avatar2.png";
import avatar3 from "./Pipeline/assets/avatar3.png";
import avatar4 from "./Pipeline/assets/avatar4.png";
import Nft1 from "./Pipeline/assets/img/Nft1.png";

import Card from "./Pipeline/components/card/Card.js";
import {
  lineChartDataOverallRevenue,
  lineChartOptionsOverallRevenue,
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
  barChartOptionsCharts2,
  pieChartOptions,
  pieChartData,
  barChartDataCharts2,
  bubbleChartData,
  bubbleChartOptions,
  donutChartDataCharts1,
  donutChartOptionsCharts1,
  lineBarChartData,
  lineBarChartOptions,
  lineChartDataAreaEventsCalendar,
  lineChartOptionsAreaEventsCalendar,
  polarChartDataCharts,
  polarChartOptionsCharts,
  radarChartDataCharts,
  radarChartOptionsCharts
} from "./Pipeline/components/charts/chartData.js";
import TotalSpent from "./Pipeline/components/card/TotalSpent";
import tableData1 from "./Pipeline/components/tableData.json";
import tableDataV81 from "./Pipeline/variables/tableDataTopCreators";
import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  FormLabel,
  Avatar,
  Select
} from "@chakra-ui/react";
import Showcase from "./Pipeline/components/Showcase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // ES6
import "./Pipeline/styles.css";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {  
  MdBarChart,
  // MdAttachMoney,
  MdOutlineCloudUpload
  // MdAddTask,
  // MdFileCopy
} from "react-icons/md";
import Usa from "./Pipeline/assets/img/usa.png";

export default function Pipeline() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brand = useColorModeValue("brand.500", "brand.400");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const columnsData1 = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Artworks",
      accessor: "artworks"
    },
    {
      Header: "Rating",
      accessor: "rating"
    }
  ];
  return (
    <div className="App">
     
      
        <KanbanExample />
    
    </div>
  );
}
