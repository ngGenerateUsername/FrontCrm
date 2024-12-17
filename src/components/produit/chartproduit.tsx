import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { addreclamation, getcommanddetails, mycmd } from 'state/Commande/Commande_slice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function CommandeCharts() {
  const dispatch = useDispatch();
  const [commandes, setCommandes] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          mycmd({ idcontact: localStorage.getItem("item") }) as any
        ).unwrap();
        setCommandes(result); // Save commandes data to state
        console.log("Commandes Data:", result); // Debugging
      } catch (error) {
        console.error("Error fetching commandes data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Debugging: Log commandes data
  console.log("Commandes:", commandes);

  // Filter commandes (optional)
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCommandes = commandes.filter((cmd: any) =>
    cmd.nomClient?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Prepare data for Bar Chart
  const labels = filteredCommandes.map((cmd) => cmd.nomClient);
  const prices = filteredCommandes.map((cmd) => cmd.prix);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Prix by Client",
        data: prices,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Prepare data for Line Chart
  const dates = filteredCommandes.map((cmd) => cmd.dateCreation);
  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: "Prix Over Time",
        data: prices,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // Prepare data for Pie Chart
  const addresses = filteredCommandes.map((cmd) => cmd.adresse);
  const addressCount = addresses.reduce((acc: any, address: string) => {
    acc[address] = (acc[address] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(addressCount),
    datasets: [
      {
        label: "Commandes by Address",
        data: Object.values(addressCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Debugging: Log chart data
  console.log("Bar Chart Data:", barChartData);
  console.log("Line Chart Data:", lineChartData);
  console.log("Pie Chart Data:", pieChartData);

  return (
    <div>
      <h1>Commande Charts</h1>

      {/* Search bar for filtering */}
      <input
        type="text"
        placeholder="Search by Client Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      {/* Bar Chart */}
      <div>
        <h2>Prix by Client</h2>
        <Bar data={barChartData} options={{ responsive: true }} />
      </div>

      {/* Line Chart */}
      <div>
        <h2>Prix Over Time</h2>
        <Line
          data={lineChartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Prix Over Time" },
            },
          }}
        />
      </div>

      {/* Pie Chart */}
      <div>
        <h2>Commandes by Address</h2>
        <Pie
          data={pieChartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "right" },
              title: { display: true, text: "Commandes Distribution by Address" },
            },
          }}
        />
      </div>
    </div>
  );
}
