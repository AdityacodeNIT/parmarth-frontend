import React, { useEffect, useState } from "react";

const UserPresenceTracker = () => {
  const [isUserActive, setIsUserActive] = useState(true);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  const handleUserActivity = () => {
    setIsUserActive(true);
    setLastActiveTime(Date.now());
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    const checkInactivity = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastActiveTime > 180000) {
        // 3 minutes
        setIsUserActive(false);
      }
    }, 10000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(checkInactivity);
    };
  }, [lastActiveTime]);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center p-4 ">
      {isUserActive ? (
        ""
      ) : (
        <p className="text-red-600 font-bold">
          You haven't interacted in a while. Please log in or register.
        </p>
      )}
    </div>
  );
};

export default UserPresenceTracker;
