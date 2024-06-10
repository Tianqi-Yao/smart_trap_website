// "use client";
// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, get } from "firebase/database";
// import { app } from "../api/firebaseapi/firebaseconfig";
// import ApexChart from "react-apexcharts";

// const DataChart = () => {
//   const [data, setData] = useState([]);
//   const [currentDataset, setCurrentDataset] = useState("ms1");

//   useEffect(() => {
//     getData(currentDataset).then((fetchedData) => {
//       if (fetchedData) {
//         setData(formatDataForChart(fetchedData));
//       }
//     });
//   }, [currentDataset]);

//   async function getData(dataset) {
//     const db = getDatabase(app);
//     const dbRef = ref(db, `/${dataset}/data`);
//     const snapshot = await get(dbRef);
//     return snapshot.exists() ? snapshot.val() : null;
//   }

//   function formatDataForChart(rawData) {
//     const { cpu_temp, env_humidity, env_temperature, sys_time } = rawData;
//     // 上面数据(cpu_temp, env_humidity, env_temperature, sys_time)有-999则是缺失数据，需要处理为null

//     const formattedData = [];
//     const expectedInterval = 300 * 1000; // For example, 5 minutes in milliseconds

//     for (let i = 0; i < sys_time.length; i++) {
//       const time = new Date(sys_time[i]);
//       const nextTime =
//         i + 1 < sys_time.length ? new Date(sys_time[i + 1]) : null;

//       formattedData.push({
//         sys_time: time,
//         cpu_temp: cpu_temp[i],
//         env_humidity: env_humidity[i] === -999 ? 0 : env_humidity[i],
//         env_temperature: env_temperature[i] === -999 ? 0 : env_temperature[i],
//       });

//       if (nextTime && nextTime - time > expectedInterval) {
//         let missingCount = Math.floor((nextTime - time) / expectedInterval) - 1;
//         for (let j = 0; j < missingCount; j++) {
//           formattedData.push({
//             sys_time: new Date(time.getTime() + expectedInterval * (j + 1)),
//             cpu_temp: null,
//             env_humidity: null,
//             env_temperature: null,
//           });
//         }
//       }
//     }
//     return formattedData;
//   }

//   function getOptions(title) {
//     return {
//       chart: { type: "line", height: "100%", zoom: { enabled: true } },
//       stroke: { curve: "smooth" },
//       xaxis: { type: "datetime", title: { text: "System Time" } },
//       yaxis: {
//         title: { text: title },
//         labels: {
//           formatter: (value) => (value != null ? Math.round(value) : "No data"),
//         },
//       },
//       tooltip: { x: { format: "dd MMM yyyy HH:mm" } },
//     };
//   }

//   // function downloadData(data, dataset) {
//   //   if (typeof window !== "undefined") {
//   //     // 确保代码只在客户端执行
//   //     const filename = `${dataset}-data.csv`;
//   //     let csvContent = "data:text/csv;charset=utf-8,";
//   //     csvContent +=
//   //       "System Time,CPU Temperature,Environment Humidity,Environment Temperature\n";

//   //     data.forEach((item) => {
//   //       const row = [
//   //         item.sys_time.toISOString(),
//   //         item.cpu_temp ?? "", // Replace `null` with an empty string for CSV
//   //         item.env_humidity ?? "",
//   //         item.env_temperature ?? "",
//   //       ].join(",");
//   //       csvContent += row + "\n";
//   //     });
//   //     const encodedUri = encodeURI(csvContent);
//   //     const link = document.createElement("a");
//   //     link.setAttribute("href", encodedUri);
//   //     link.setAttribute("download", filename);
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);
//   //   }
//   // }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
//       <h1 className="text-4xl font-bold mb-4">Data Analysis</h1>
//       <select
//         className="mb-4 text-lg border-2 border-blue-500 rounded px-3 py-1"
//         value={currentDataset}
//         onChange={(e) => setCurrentDataset(e.target.value)}
//       >
//         <option value="ms1">MS1</option>
//         <option value="ms2">MS2</option>
//         <option value="south1">South1</option>
//         <option value="south2">South2</option>
//       </select>
//       {/* <button
//         className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         onClick={() => downloadData(data, currentDataset)}
//       >
//         Download Data
//       </button> */}
//       <div className="flex flex-col flex-1 w-full space-y-4">
//         {data.length > 0 ? (
//           <>
//             <ApexChart
//               options={getOptions("CPU Temperature")}
//               series={[
//                 {
//                   name: "CPU Temperature",
//                   data: data.map((item) => ({
//                     x: new Date(item.sys_time),
//                     y: item.cpu_temp,
//                   })),
//                 },
//               ]}
//               type="line"
//               height="300px"
//             />
//             <ApexChart
//               options={getOptions("Environment Humidity")}
//               series={[
//                 {
//                   name: "Environment Humidity",
//                   data: data.map((item) => ({
//                     x: new Date(item.sys_time),
//                     y: item.env_humidity,
//                   })),
//                 },
//               ]}
//               type="line"
//               height="300px"
//             />
//             <ApexChart
//               options={getOptions("Environment Temperature")}
//               series={[
//                 {
//                   name: "Environment Temperature",
//                   data: data.map((item) => ({
//                     x: new Date(item.sys_time),
//                     y: item.env_temperature,
//                   })),
//                 },
//               ]}
//               type="line"
//               height="300px"
//             />
//           </>
//         ) : (
//           <p className="text-center w-full">Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DataChart;
