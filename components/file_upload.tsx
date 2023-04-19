import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { handleInsertAction } from "@/config/API_actions";
import ProgressBar from "./progressbar";
import CloseIcon from "@mui/icons-material/Close";

const FileUpload = ({
  file,
  onFinishUpload,
}: {
  file: any;
  onFinishUpload: any;
}) => {
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const uploadRequest = async (
    file?: any,
    filename?: string,
    contentType?: string
  ) => {
    try {
      let percent = 0;
      const response: any = await handleInsertAction("files/upload", {
        filename,
        contentType,
      });
      const onUploadProgress = (progressEvent: any) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadingProgress(progress);
      };
      await axios.put(response.data.url, file, {
        headers: {
          "Content-Type": contentType,
        },
        onUploadProgress,
      });
      percent = uploadingProgress;
      onFinishUpload(response.data?.fileId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    uploadRequest(file, file?.name, file?.type);
  }, []);
  return <ProgressBar progress={uploadingProgress} filename={file?.name} />;
};

export default FileUpload;
