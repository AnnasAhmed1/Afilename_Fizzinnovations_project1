import React, { useState } from "react";

const ProgressBar = ({ progress }: { progress: any }) => {
  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
        ></div>
      </div>
    </div>
  );
};

const UploadPage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileUpload = async (file: any) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    });

    // xhr.open("POST", "/api/upload");
    // xhr.send(formData);
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    await fileUpload(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <ProgressBar progress={uploadProgress} />
    </div>
  );
};

export default UploadPage;
