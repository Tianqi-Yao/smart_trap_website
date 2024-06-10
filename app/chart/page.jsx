'use client';
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../api/firebaseapi/firebaseconfig";

const DataChart = () => {
  const [data, setData] = useState([]);
  const [currentDataset, setCurrentDataset] = useState("ms1");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData(currentDataset);
      if (fetchedData) {
        setData(formatDataForChart(fetchedData));
      }
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <h1 className="text-4xl font-bold mb-4">Data Analysis</h1>
      <select
        className="mb-4 text-lg border-2 border-blue-500 rounded px-3 py-1"
        value={currentDataset}
        onChange={(e) => setCurrentDataset(e.target.value)}
      >
        <option value="ms1">MS1</option>
        <option value="ms2">MS2</option>
        <option value="south1">South1</option>
        <option value="south2">South2</option>
      </select>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sys_time" tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="cpu_temp" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sys_time" tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="env_humidity" stroke="#82ca9d" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sys_time" tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="env_temperature" stroke="#ffc658" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;
