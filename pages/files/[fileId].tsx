import { API } from "@/config/API";
import { handleFetchAction } from "@/config/API_actions";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function FilePage({ query }: { query: any }) {
  const router = useRouter();
  const { fileId } = router.query;
  //   const handleDowunloadUrl = async (_fileId: any) => {
  //     await handleFetchAction(`/files/download?file=${_fileId}`)
  //       .then(async (response: any) => {
  //         const blob = await response.blob();
  //         const url = URL.createObjectURL(blob);
  //         console.log(response);
  //         console.log(blob);
  //         console.log(url);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   useEffect(() => {
  //     handleDowunloadUrl(fileId);
  //   }, []);

  //   return (
  //     <div>
  //       <h1>File page for fileId: {fileId}</h1>
  //       {/* Display file data here */}
  //     </div>
  //   );
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = async () => {
    console.log("check");
    await API({
      method: "GET",
      url: `files/download?file=${fileId}`,
      responseType: "blob",
    })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setDownloadUrl(url);
     ;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log("annas");
    handleDownload();
  }, []);
  return (
    <div>
      {/* <button onClick={handleDownload}>Download File</button> */}
      {downloadUrl && (
        <a target="_blank" href={downloadUrl} download>
          Click here to download
        </a>
      )}
    </div>
  );
}
FilePage.getInitialProps = async (ctx: any) => {
  return { query: ctx.query };
};

export default FilePage;
