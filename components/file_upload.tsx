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
    if (file?.size == 0) {
      toast.error("cannot upload empty file", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    } else {
      if (file?.size / 1073741824 > 5) {
        toast.error("Connot upload file larger than 5 GB", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
    }
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
      onFinishUpload(uploadingProgress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useEffect call upload");
    uploadRequest(file, file?.name, file?.type);
  }, []);
  console.log(uploadingProgress, "==>uploadingProgress", file?.name);
  return <ProgressBar progress={uploadingProgress} filename={file?.name} />;
};

export default FileUpload;
