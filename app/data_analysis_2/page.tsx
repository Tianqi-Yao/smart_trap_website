"use client";
import React from 'react';
import Line from '../components/line/page';
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../api/firebaseapi/firebaseconfig";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

const DataAnalysis = () => {
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // get data from firebase
    getData().then((data) => {
      let show_data = [];
      for (let key in data) {
        let point = data[key];
        for (let key2 in point) {
          let row = point[key2];
          show_data.push(row);
        }
      }
      // console.log(show_data);
      setData(show_data);
    });
  }, []);

  async function getData() {
    const db = getDatabase(app);
    const dbRef = ref(db, "data");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Data Analysis</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
      {Object.keys(data).length > 0
        ? <>
            <Line data={data} x='Time' y='Temp' />
            <Line data={data} x='Time' y='Humid' />
            <Line data={data} x='Time' y='Temp' />
            <Line data={data} x='Time' y='Humid' />
          </>
        : <p style={{ gridColumn: '1 / -1' }}>Loading...</p>}
    </div>
    <button type="button" onClick={() => router.back()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go back
    </button>
    
    </main>
  );
};

export default DataAnalysis;
