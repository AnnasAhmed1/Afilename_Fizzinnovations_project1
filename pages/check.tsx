import { useState } from "react";

export default function MyForm(): JSX.Element {
  const [folder, setFolder] = useState<File | null>(null);

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFolder(file ?? null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (folder) {
      formData.append("folder", folder);
    }

    // Add any other form data to the request
    formData.append("name", "My Folder");

    // Send the form data to the server using fetch
    const response = await fetch("/api/upload-folder", {
      method: "POST",
      body: formData,
    });

    // Handle the response from the server
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="folder">Upload a folder:</label>
      <input
        type="file"
        id="folder"
        name="folder"
        onChange={handleFolderChange}
        directory
        webkitdirectory
        {...(process.browser &&
          ({ webkitdirectory: true, directory: true } as any))}
      />

      <br />
      <button type="submit">Upload</button>
    </form>
  );
}
