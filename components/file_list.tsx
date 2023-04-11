import React, { useEffect, useMemo, useState } from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { Inter, Karla, Manrope } from "next/font/google";
// ICONS
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import DrawerComp from "@/components/drawer_comp";
import { handleFetchAction, handleInsertAction } from "@/config/API_actions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import MenuIcon from "@mui/icons-material/Menu";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import Image from "next/image";
import axios from "axios";
import { API } from "@/config/API";
import { Button, Menu, MenuItem } from "@mui/material";

const karla = Karla({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
interface FileObject {
  title: string;
  contentType: string;
  dateUploaded: any;
}
const dateCalc = (_date: any) => {
  const apiDate = new Date(_date);

  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - apiDate.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  if (secondsDiff < 60) {
    return `${secondsDiff} seconds ago`;
  } else if (minutesDiff < 60) {
    return `${minutesDiff} minutes ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  } else {
    return `${daysDiff} days ago`;
  }
};

export default function FileList({
  fileObj,
  handleCopyClick,
  handleDowunloadUrl,
}: {
  fileObj: any;
  handleCopyClick: any;
  handleDowunloadUrl: any;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const finalDate = dateCalc(fileObj?.dateUploaded);

  return (
    <div
      //   key={i}
      className={`flex gap-3 border-b
     border-[#EBEFF2]
     items-center
      text-[#242634] ${karla.className}`}
    >
      {fileObj?.contentType?.slice(0, 5) == "image" ? (
        <InsertPhotoOutlinedIcon className="text-xl mt-4 mb-auto" />
      ) : fileObj?.contentType?.slice(0, 5) == "video" ? (
        <VideoCameraBackIcon className="text-xl mt-4 mb-auto" />
      ) : fileObj?.contentType?.slice(0, 11) == "application" ? (
        <InsertDriveFileIcon className="text-xl mt-4 mb-auto" />
      ) : (
        <FolderOutlinedIcon className="text-xl mt-4 mb-auto" />
      )}
      <div className={`my-4 flex-1`}>
        <p className="text-sm font-medium mb-[1px] break-. break-all ">
          {fileObj.title}
        </p>
        <p className="text-xs ">{finalDate}</p>
      </div>
      <p className="text-[11px] font-bold border h-fit py-[3px] px-[5px] my-auto border-[#EBEFF2]">
        1.46MB
      </p>
      <div
        className="
    
      "
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="w-fit min-w-0"
        >
          <MoreVertIcon className="text-lg my-auto h-fit" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={{
              color: "#545454",
              fontSize: "16px",
              fontWeight: "500",
            }}
            onClick={() => {
              handleDowunloadUrl();
              handleMenuClose();
            }}
          >
            <DownloadForOfflineIcon
              sx={{
                color: "#545454 !important",
                marginRight: "5px",
              }}
            />{" "}
            Download
          </MenuItem>
          <MenuItem
            sx={{
              color: "#545454",
              fontSize: "16px",
              fontWeight: "500",
            }}
            onClick={() => {
              handleCopyClick();
              handleMenuClose();
            }}
          >
            <ContentCopyRoundedIcon
              sx={{
                color: "#545454 !important",
                marginRight: "5px",
              }}
            />{" "}
            Copy Link
          </MenuItem>
          <MenuItem
            sx={{
              color: "#8A8A8A",
              fontSize: "11px",
              fontWeight: "500",
            }}
            onClick={handleMenuClose}
          >
            {" "}
            file ID: {fileObj.fileId}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
