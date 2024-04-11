"use client";
import React, { useState, useEffect } from "react";
import { app } from "../api/firebaseapi/firebaseconfig";
import { getDatabase, ref, onValue } from "firebase/database";

function DataDisplay() {
  const [data, setData] = useState({});

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplay;
