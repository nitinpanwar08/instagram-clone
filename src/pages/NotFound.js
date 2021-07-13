import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found - Instagram";
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-wscreen-lg">
        <p className="text-center text-2xl">Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
