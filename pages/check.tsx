import { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
export default function Check() {
  const [files, setFiles] = useState([]);
  const handleUpload = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    // Do something with the uploaded files, e.g. send them to the server
    setFiles(acceptedFiles);
  }, []);
  const Dropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleUpload,
    });

    const style = useMemo(
      () => ({
        ...(isDragActive ? { borderColor: "green" } : {}),
      }),
      [isDragActive]
    );

    return (
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    );
  };
  return (
    <div>
      <h1>Upload a folder</h1>
      <Dropzone />
      {/* render the uploaded files here */}
    </div>
  );
}
