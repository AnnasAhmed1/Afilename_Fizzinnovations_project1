import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, ListItemButton, Modal, TextField } from "@mui/material";
import Image from "next/image";
import ListItemComp from "./list_item";
import NestedListComp from "@/components/nested_list_comp";
import { useState } from "react";
import { Inter, Karla, Manrope } from "next/font/google";
import { handleInsertAction } from "@/config/API_actions";
// ICONS
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DriveFolderUploadSharpIcon from "@mui/icons-material/DriveFolderUploadSharp";
import VideocamIcon from "@mui/icons-material/Videocam";
import MusicVideoRoundedIcon from "@mui/icons-material/MusicVideoRounded";
import AddIcon from "@mui/icons-material/Add";

const karla = Karla({ subsets: ["latin"] });

export default function DrawerComp({folders}:{folders:any}) {
  console.log("folders", folders);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const drawerWidth = 240;
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const uploadRequest = async (filename?: any, contentType?: any) => {
    try {
      handleInsertAction("files/upload", {
        filename,
        contentType,
      }).then((response: any) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChangeFunction = (event: any) => {
    const file = event.target.files[0];
    uploadRequest(file?.name, file?.type);
  };

  const createFolder = async (folderName: string) => {
    try {
      handleInsertAction("/folders/createfolder", {
        name: folderName,
      }).then((response: any) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const optionsList = [
    {
      title: "New Folder",
      icon: (
        <CreateNewFolderIcon
          sx={{
            fontSize: "16px",
            coloe: "rgba(0,0,0,0.85)",
          }}
        />
      ),
      type: "any",
    },
    {
      title: "Upload a File",
      icon: (
        <AttachFileIcon
          sx={{
            fontSize: "16px",
            coloe: "rgba(0,0,0,0.85)",
          }}
        />
      ),
      type: "any",
    },
    {
      title: "Upload a Folder",
      icon: (
        <DriveFolderUploadSharpIcon
          sx={{
            fontSize: "16px",
            coloe: "rgba(0,0,0,0.85)",
          }}
        />
      ),
      type: "any",
    },
    {
      title: "Upload a Video",
      icon: (
        <VideocamIcon
          sx={{
            fontSize: "16px",
            coloe: "rgba(0,0,0,0.85)",
          }}
        />
      ),
      type: "video/*",
    },
    {
      title: "Upload Music",
      icon: (
        <MusicVideoRoundedIcon
          sx={{
            fontSize: "16px",
            coloe: "rgba(0,0,0,0.85)",
          }}
        />
      ),
      type: "audio/*",
    },
  ];

  const foldersList = [
    "Files",
    "Documents",
    "Images",
    "Views",
    "Some Folder",
    "Another folder.... ",
    "Work",
    "UI Design",
    "Mockups",
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="
        flex
        gap-4
        flex-col
        bg-white
        py-[2%]
        rounded-[24px]
        w-[50%]
        border-2
        absolute
        top-[20%]
        right-[25%]
        scrollbar-none
        "
        >
          <h3
            className={`${karla.className} font-extrabold text-4xl text-center text-[rgba(0,0,0,0.75)] `}
          >
            Create Folder
          </h3>
          <hr />
          <TextField
            id="filled-textarea"
            label="Enter Folder Name"
            placeholder="Folder Name"
            className="mx-12 my-[5%]"
            onChange={(e: any) => {
              setNewFolderName(e);
            }}
          />
          <button
            className={`
            ${karla.className} block 
            py-[15px] 
            w-[50%] 
            mx-auto 
            font-base 
            text-center
             bg-[#0066FF] 
             rounded-[5px]
              text-white`}
            onClick={() => {
              createFolder(newFolderName);
            }}
          >
            Create Folder
          </button>
        </div>
      </Modal>
      <div
        className={`
        flex  
        items-center 
        justify-center 
        my-8 
        gap-2  
        sm:gap-1 
        ${karla.className}`}
      >
        <Image
          src={require("../images/logo.svg")}
          alt="logo"
          // width={30}
          className="
          w-5
          md:w-3
          sm:w-2
          "
        />
        <h1
          className="
        text-3xl
        md:text-2xl 
        sm:text-lg 
        text-[rgba(0,0,0,0.75)] 
        font-extrabold"
        >
          AFILENAME
        </h1>
      </div>
      <ListItemButton onClick={handleClick}>
        <p
          className="
        mr-[auto]
        flex
        items-center
        bg-[#DEDEDE]
        gap-1
        px-3
        "
        >
          <AddIcon
            sx={{
              fontSize: "16px",
              coloe: "rgba(0,0,0,0.85)",
            }}
          />
          New
        </p>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.85)",
            gap: "10px",
            paddingLeft: "25px",
            cursor: "pointer",
          }}
          onClick={() => {
            handleOpen();
          }}
        >
          {optionsList[0].icon}
          <p
            style={{
              margin: "5px 0",
            }}
          >
            {optionsList[0].title}
          </p>
        </div>
        <hr />
        <ListItemComp
          text={optionsList[1].title}
          Icon={optionsList[1].icon}
          handleFileChangeFunction={handleFileChangeFunction}
        />
        <ListItemComp
          text={optionsList[2].title}
          Icon={optionsList[2].icon}
          handleFileChangeFunction={handleFileChangeFunction}
        />
        <hr />
        <ListItemComp
          text={optionsList[3].title}
          Icon={optionsList[3].icon}
          handleFileChangeFunction={handleFileChangeFunction}
          filetype={optionsList[3].type}
        />
        <ListItemComp
          text={optionsList[4].title}
          Icon={optionsList[4].icon}
          handleFileChangeFunction={handleFileChangeFunction}
          filetype={optionsList[4].type}
        />
      </Collapse>
      <NestedListComp folders={folders} />
      <button
        className={`
      ${karla.className}
      text-sm
      text-white
      bg-[#1890FF]
      border
      p-1
      border-[#1890FF]
      mx-auto
      flex
      justify-center
      my-[70px]
      `}
      >
        Upgrade Plan
      </button>
      <div
        className={`${karla.className}
        text-[10px]
        text-[#7c8db5b8]
        mx-[30px]
        pb-8

        `}
      >
        <p>
          Legal
          <br />
          Terms of Service - Privacy - DMCA - Creator Terms
        </p>
        <br />
        <br />
        <p>
          <span className="text-[#1890FF]">UI:</span>4.2023.15
        </p>
        <p>
          <span className="text-[#1890FF]">App:</span>4.2023.15
        </p>
        <p>
          <span className="text-[#1890FF]">Language:</span>English (US)
        </p>
      </div>
    </div>
  );
}
