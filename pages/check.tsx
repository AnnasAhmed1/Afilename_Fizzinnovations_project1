import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  function handleCopyClick(_fileId: any) {
    navigator.clipboard.writeText(_fileId);

    toast.success("Code copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
    });

    // setTimeout(() => {
    //   setCopied(false);
    // }, 3000);
  }
  return (
    <div>
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
      <div className="relative">
        <pre>
          <code>Annas</code>
        </pre>
        <button
          className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-900"
          onClick={() => handleCopyClick("annas")}
        >
          Text
        </button>
      </div>
    </div>
  );
}

export default App;
