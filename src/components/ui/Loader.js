import React from "react";
import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex items-center justify-center p-4">
      <FadeLoader color="#000000" height={20} />
    </div>
  );
}

export default Loader;
