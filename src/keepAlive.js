import React, { useEffect } from "react";
import axios from "axios";

const KeepAlive = () => {
  useEffect(() => {
    const keepAlive = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}`)
        .then((response) => {
          console.log(
            `Reloaded at ${new Date().toISOString()}: Status Code ${
              response.status
            }`
          );
        })
        .catch((error) => {
          console.error(
            `Error reloading at ${new Date().toISOString()}:`,
            error.message
          );
        });
    };

    const timerId = setInterval(keepAlive, "30000");

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [url, interval]);

  return null; // This component doesn't render anything
};

export default KeepAlive;
