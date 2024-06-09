'use client'
import React, { useState, useEffect } from "react";
import { app } from "../api/firebaseapi/firebaseconfig";
import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import Button1 from "../components/button/button1";

function Gallery() {
  const [currentFolder, setCurrentFolder] = useState('ms1'); // Default folder
  const [imageData, setImageData] = useState([]); 
  const [error, setError] = useState(""); 
  const [showImages, setShowImages] = useState(true); // State to toggle between showing images or links
  const router = useRouter();

  useEffect(() => {
    const storage = getStorage(app, "gs://smarttrapproject-40340.appspot.com");
    const imagesFolderRef = storageRef(storage, currentFolder);
    
    setImageData([]); // Clear previous image data
    setError(""); // Clear previous errors

    listAll(imagesFolderRef)
      .then((res) => {
        const promises = res.items.map(itemRef => 
          getDownloadURL(itemRef)
            .then(url => ({ url, name: itemRef.name })) // Store both URL and name
            .catch(e => null)
        ); 
        return Promise.all(promises); 
      })
      .then(results => {
        const validData = results.filter(item => item !== null); 
        setImageData(validData);
      })
      .catch((error) => {
        console.error("Error listing images:", error);
        setError("Failed to load images from Firebase.");
      });
  }, [currentFolder]); // Effect runs when currentFolder changes

  const handleFolderChange = (folderName) => {
    setCurrentFolder(folderName);
  }

  const toggleDisplayMode = () => {
    setShowImages(!showImages);
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={toggleDisplayMode}><Button1 text={showImages ? "Show Links" : "Show Images"} /></button>
      <button onClick={() => handleFolderChange('ms1')}><Button1 text="ms1" /></button>
      <button onClick={() => handleFolderChange('ms2')}><Button1 text="ms2" /></button>
      <button onClick={() => handleFolderChange('south1')}><Button1 text="south1" /></button>
      <button onClick={() => handleFolderChange('south2')}><Button1 text="south2" /></button>
      {imageData.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold">Content from {currentFolder}:</h2>
          {imageData.map(({ url, name }, index) => (
            <div key={index} className="mb-4">
              <p>{name}</p> {/* Display image name */}
              {showImages ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img src={url} alt={name} className="w-3/5 max-w-xl object-contain cursor-pointer" />
                </a>
              ) : (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Click to view {name}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
