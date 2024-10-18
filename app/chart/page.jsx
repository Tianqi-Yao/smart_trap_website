'use client';
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../api/firebaseapi/firebaseconfig";

const farms = ['ms2', 'ms1', 'south1', 'south2', 'lloyd', 'jeff', 'southfarm1', 'airport1', 'airport3'];

const DataChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDataset, setCurrentDataset] = useState("ms2");

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching data for ${currentDataset}...`);
      setLoading(true);
      const fetchedData = await getData(currentDataset);
      if (fetchedData) {
        setData(formatDataForChart(fetchedData));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentDataset]);

  async function getData(dataset) {
    const db = getDatabase(app);
    const dbRef = ref(db, `/${dataset}/data`);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? snapshot.val() : null;
  }

  function formatDataForChart(rawData) {
    const { cpu_temp, env_humidity, env_temperature, sys_time } = rawData;
    const formattedData = [];
    const expectedInterval = 300 * 1000; // 5 minutes in milliseconds
    let lastTime = null;

    sys_time.forEach((time, index) => {
      const currentTime = new Date(time);
      formattedData.push({
        sys_time: currentTime,
        cpu_temp: cpu_temp[index],
        env_humidity: env_humidity[index] === -999 ? null : env_humidity[index],
        env_temperature: env_temperature[index] === -999 ? null : env_temperature[index],
      });

      if (lastTime && currentTime - lastTime > expectedInterval) {
        let missingCount = Math.floor((currentTime - lastTime) / expectedInterval) - 1;
        for (let j = 0; j < missingCount; j++) {
          formattedData.push({
            sys_time: new Date(lastTime.getTime() + expectedInterval * (j + 1)),
            cpu_temp: null,
            env_humidity: null,
            env_temperature: null,
          });
        }
      }
      lastTime = currentTime;
    });

    return formattedData;
  }

  const handleDatasetChange = (e) => {
    const newDataset = e.target.value;
    console.log(`Switching from ${currentDataset} to ${newDataset}...`);
    setLoading(true);
    setCurrentDataset(newDataset);
  };

  const renderChart = (dataKey, stroke, name) => (
    <div className="w-full max-w-6xl mt-8 bg-white p-6 rounded-md shadow-lg">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sys_time" tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
          <YAxis />
          <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} dot={false} name={name} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-white bg-opacity-80 p-6 rounded-md shadow-lg mb-8">
      {loading && <div className="text-lg text-blue-500 font-semibold mt-4">Loading data, please wait...</div>}
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-gray-800">Sensor Data Monitoring for SWD</h1>
      </div>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mt-4">Currently Displaying: {currentDataset.toUpperCase()}</h2>
      <select
        className="mb-4 text-lg border-2 border-blue-500 rounded px-3 py-1"
        disabled={loading}
        value={currentDataset}
        onChange={handleDatasetChange}
      >
        {farms.map((farm) => (
          <option key={farm} value={farm}>{farm.toUpperCase()}</option>
        ))}
      </select>
      {renderChart("env_temperature", "#ffc658", "Environmental Temperature")}
      {renderChart("env_humidity", "#82ca9d", "Environmental Humidity")}
      {renderChart("cpu_temp", "#8884d8", "CPU Temperature")}
    </div>
  );
};

export default DataChart;
