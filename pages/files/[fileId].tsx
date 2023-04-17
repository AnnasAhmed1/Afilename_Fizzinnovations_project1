import { API } from "@/config/API";
import { handleFetchAction } from "@/config/API_actions";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function FilePage({ query }: { query: any }) {
  const router = useRouter();
  const { fileId } = router.query;

  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = async () => {
    await handleFetchAction(`/files/downloadurl?file=${fileId}`)
      .then((response: any) => {
        console.log(response);
        // const url = URL.createObjectURL(response.data.url);
        const downloadLink = document.createElement("a");
        downloadLink.href = response.data.url;
        downloadLink.download = "";
        downloadLink.click();
        console.log(URL.revokeObjectURL(response.data.url));
      })
      .catch((err) => {
        console.log(err);
      });
    return;
    console.log("check");
    await API({
      method: "GET",
      url: `files/download?file=${fileId}`,
      responseType: "blob",
    })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setDownloadUrl(url);
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
    <div
      className="
    flex
    justify-center
    items-center
    h-screen
  "
    >
      <CircularProgress size={"70px"} />
    </div>
  );
}
FilePage.getInitialProps = async (ctx: any) => {
  return { query: ctx.query };
};

export default FilePage;
