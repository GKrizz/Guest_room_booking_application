import React, { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

function Loader() {
  const [loading, setLoading] = useState(true); // State to control loading

  // Inline styles for centering the loader
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh", // Full viewport height
  };

  return (
    <div style={containerStyle}>
      <CircleLoader
        color={'#25dfab'} // Loader color
        loading={loading} // Loader visibility
        size={80} // Loader size
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
