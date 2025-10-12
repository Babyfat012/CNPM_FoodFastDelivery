import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";

function App() {
  const [originPosition, setOriginPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "70vw", // Increased width for map
          height: "80%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          marginTop: "80px",
          marginLeft: "250px", // Optional: shift map container to the right
        }}
      >
        <Maps
          originPosition={originPosition}
          destinationPosition={destinationPosition}
        />
      </div>
      <div
        style={{
          width: "30vw", // Decreased width for search box
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2>Origin</h2>
          <SearchBox
            label="Origin"
            setSelectPosition={setOriginPosition}
            style={{ width: "100%" }} // Optional: control search box width
          />
        </div>
        <div>
          <h2>Destination</h2>
          <SearchBox
            label="Destination"
            setSelectPosition={setDestinationPosition}
            style={{ width: "100%" }} // Optional: control search box width
          />
        </div>
      </div>
    </div>
  );
}

export default App;
