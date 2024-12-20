import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader border-t-4 border-blue-600 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
