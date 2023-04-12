import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
} from "@mui/material";
import Image from "next/image";
import ListItemComp from "@/components/list_item";
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
import SourceIcon from "@mui/icons-material/Source";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import AddIcon from "@mui/icons-material/Add";

const karla = Karla({ subsets: ["latin"] });

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

function DrawerContent({
  folders,
  files,
  handleFileChangeFunction,
  handleFolderChangeFunction,
  createFolder,
}: {
  folders: any;
  files: any;
  createFolder: any;
  handleFileChangeFunction: any;
  handleFolderChangeFunction: any;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const [open, setOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const optionsList = [
    {
      title: "New Folder",
      icon: (
        <CreateNewFolderIcon className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
      ),
      type: "any",
    },
    {
      title: "Upload a File",
      icon: (
        <AttachFileIcon className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
      ),
      type: "any",
    },
    {
      title: "Upload a Folder",
      icon: (
        <DriveFolderUploadSharpIcon className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
      ),
      type: "any",
    },
    {
      title: "Upload a Video",
      icon: (
        <VideocamIcon className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
      ),
      type: "video/*",
    },
    {
      title: "Upload Music",
      icon: (
        <MusicVideoRoundedIcon className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
      ),
      type: "audio/*",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
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
              scrollbar-thin
              "
          >
            <h3
              className={`
                ${karla.className}
                 font-extrabold
                 text-4xl
                 text-center
                 text-[rgba(0,0,0,0.75)]
                  `}
            >
              Create Folder
            </h3>
            <hr />
            <TextField
              id="filled-textarea"
              label="Enter Folder Name"
              placeholder="Folder Name"
              className="mx-12 my-[5%]"
              onChange={handleFolderChangeFunction}
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
                createFolder();
                handleClose();
              }}
            >
              Create Folder
            </button>
          </div>
        </Modal>
        <div className="min-h-[60vh] overflow-y-scroll scrollbar-thin">
          <div
            className={`
                flex  
                items-center 
                justify-center 
                py-8 
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
                dark:text-[rgba(255,255,255,0.75)] 
                font-extrabold"
            >
              AFILENAME
            </h1>
          </div>
          <ListItemButton className="p-0 my-4" onClick={handleClick}>
            <p
              className="
                  mr-[auto]
                  flex
                  items-center
                  justify-center
                  content-center
                  text-center
                  bg-[#DEDEDE]
                  rounded-[5px]
                  gap-[6px]
                  text-black
                  px-3
                  py-[2px]
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
            {open ? (
              <ExpandLess className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
            ) : (
              <ExpandMore className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div
              className="
                  flex
                  items-center
                  text-sm
                  text-[rgba(0,0,0,0.85)] 
                  dark:text-[rgba(255,255,255,0.75)]
                  gap-[10px]
                  pl-[5px]
                  cursor-pointer"
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
          <ListItemButton
            className="p-0 my-4"
            onClick={() => {
              setRecentOpen(!recentOpen);
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "auto",
                paddingRight: "10px",
              }}
            >
              <SourceIcon className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)] text-base" />
            </ListItemIcon>

            <p
              className="
                text-[rgba(0,0,0,0.85)]  dark:text-[rgba(255,255,255,0.85)]
                ${karla.className}
                text-sm
                mr-auto
                "
            >
              Recent
            </p>
            {recentOpen ? (
              <ExpandLess className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
            ) : (
              <ExpandMore className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
            )}
          </ListItemButton>
          <Collapse
            className="pl-[5px]"
            in={recentOpen}
            timeout="auto"
            unmountOnExit
          >
            {files?.map((v: any, i: any) => {
              return <ListItemComp key={i} text={v.title} input={true} />;
            })}
          </Collapse>
        </div>
        <button
          className={`
              ${karla.className}
              text-sm
              text-white
              bg-[#1890FF]
              border
              p-1
              border-[#1890FF]
              mx-auto/
              flex
              w-[90%]
              justify-center
              my-[40px]
              mr-[10px]
             `}
        >
          Upgrade Plan
        </button>
        <div
          className={`${karla.className}
                text-[10px]
                text-[#7c8db5b8]
                mx-[30px]/
                pb-4
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
    </>
  );
}

export default function ResponsiveDrawer({
  folders,
  files,
  handleFileChangeFunction,
  handleFolderChangeFunction,
  createFolder,
}: {
  folders: any;
  files: any;
  createFolder: any;
  handleFileChangeFunction: any;
  handleFolderChangeFunction: any;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
            className: "scrollbar-thin border-r border-[#717171]",
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              padding: "0 10px 0 20px",
              overflowX: "hidden",
              backgroundColor: "transparent",
            },
          }}
        >
          <DrawerContent
            folders={folders}
            handleFileChangeFunction={handleFileChangeFunction}
            createFolder={createFolder}
            handleFolderChangeFunction={handleFolderChangeFunction}
            files={files}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{
            className: "scrollbar-thin border-r border-[#717171]",
          }}
          sx={{
            display: { sm: "block" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              padding: "0 10px 0 20px",
              overflowX: "hidden",
              backgroundColor: "transparent",
            },
          }}
          open
        >
          <DrawerContent
            folders={folders}
            handleFileChangeFunction={handleFileChangeFunction}
            createFolder={createFolder}
            handleFolderChangeFunction={handleFolderChangeFunction}
            files={files}
          />
        </Drawer>
      </Box>
    </Box>
  );
}
