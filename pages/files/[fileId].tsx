import { handleFetchAction } from "@/config/API_actions";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

function FilePage({ query }: { query: any }) {
  const router = useRouter();
  const { fileId } = router.query;

  const handleDownload = async () => {
    await handleFetchAction(`/files/downloadurl?file=${fileId}`)
      .then((response: any) => {
        console.log(response);
        const downloadLink = document.createElement("a");
        downloadLink.href = response.data.url;
        downloadLink.download = "";
        downloadLink.click();
        console.log(URL.revokeObjectURL(response.data.url));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
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
