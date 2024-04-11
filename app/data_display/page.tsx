"use client";
import React, { useState, useEffect } from "react";
import { app } from "../api/firebaseapi/firebaseconfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRouter } from 'next/navigation'

function DataDisplay() {
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const db = getDatabase(app);
    const starCountRef = ref(db, "data");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return (
    <div>
      <h2>Data from Firebase:</h2>
      <button type="button" onClick={() => router.back()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go back
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplay;
