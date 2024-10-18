'use client'
import React, { useState, useEffect } from "react";
import { app } from "../api/firebaseapi/firebaseconfig";
import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
import Button1 from "../components/button/button1";

function Gallery() {
  const [currentFolder, setCurrentFolder] = useState('ms2'); // Default folder
  const [imageData, setImageData] = useState([]); 
  const [logFileUrl, setLogFileUrl] = useState(null);
  const [error, setError] = useState(""); 
  const [showImages, setShowImages] = useState(true); // State to toggle between showing images or links
  const [showLogs, setShowLogs] = useState(false); // State to toggle between showing images or log file

  useEffect(() => {
    const storage = getStorage(app, "gs://smarttrapproject-40340.appspot.com");
    const imagesFolderRef = storageRef(storage, currentFolder);
    
    setImageData([]); // Clear previous image data
    setLogFileUrl(null); // Clear previous log file data
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
        setImageData(validData.reverse()); // Reverse the order to display latest images first
        const logFile = validData.find(item => item.name === "logging.log");
        if (logFile) {
          setLogFileUrl(logFile.url);
        }
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

  const toggleLogDisplay = () => {
    setShowLogs(!showLogs);
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-90 p-8 rounded-md shadow-xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Image Gallery</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <button onClick={toggleDisplayMode} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-300">
            {showImages ? "Show Image Links" : "Show Images"}
          </button>
          <button onClick={toggleLogDisplay} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-300">
            {showLogs ? "Show Images" : "Show Log File"}
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['ms2', 'ms1', 'south1', 'south2', 'lloyd', 'jeff', 'southfarm1', 'airport1', 'airport3'].map(folder => (
            <button
              key={folder}
              onClick={() => handleFolderChange(folder)}
              className={`px-4 py-2 rounded-md font-medium shadow-md transition-all duration-300 ${currentFolder === folder ? 'bg-purple-700 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {folder}
            </button>
          ))}
        </div>
        {showLogs && (
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Log File from {currentFolder}:</h2>
            {logFileUrl ? (
              <a href={logFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Click to view logging.log
              </a>
            ) : (
              <p className="text-gray-700">No log file available.</p>
            )}
          </div>
        )}
        {!showLogs && imageData.length > 0 && (
          <div className="bg-gray-100 p-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Content from {currentFolder}:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imageData.map(({ url, name }, index) => (
                name !== "logging.log" && (
                  <div key={index} className="p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow duration-300 bg-white">
                    <p className="font-semibold mb-2 text-gray-700 text-center">{name}</p>
                    {showImages ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={url} alt={name} className="w-full h-48 object-cover cursor-pointer rounded-md" />
                      </a>
                    ) : (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block text-center">
                        Click to view {name}
                      </a>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
