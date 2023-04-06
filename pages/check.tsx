import { ChangeEvent, useRef, useState } from "react";

export default function MyImageUploader() {
  const [fileId, setFileId] = useState(null);

  const handleImageLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const fileId = event.target.src.split("/").pop();
    // setFileId(fileId);
    console.log("id", event.target.id);
    console.log("src", event.target.files);
    console.log(event.target.src);
    console.log(fileId);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    console.log(file?.name)
    console.log(file?.type)
    // do something with the selected file
  };

  return (
    <div>
      {" "}
      <div>
        <button onClick={handleClick}>Choose File</button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
