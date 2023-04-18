import * as React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Modal,
  TextField,
} from "@mui/material";
import Image from "next/image";
import ListItemComp from "@/components/list_item";
import NestedListComp from "@/components/nested_list_comp";
import { useState } from "react";
import { Karla } from "next/font/google";
// ICONS
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DriveFolderUploadSharpIcon from "@mui/icons-material/DriveFolderUploadSharp";
import VideocamIcon from "@mui/icons-material/Videocam";
import MusicVideoRoundedIcon from "@mui/icons-material/MusicVideoRounded";
import SourceIcon from "@mui/icons-material/Source";
import AddIcon from "@mui/icons-material/Add";

const karla = Karla({ subsets: ["latin"] });

const drawerWidth = 240;

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
  const [open, setOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const optionsList = [
    {
      title: "New Folder",
      icon: (
        <CreateNewFolderIcon
          style={{ fontSize: "16px" }}
          className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]"
        />
      ),
      type: "any",
    },
    {
      title: "Upload a File",
      icon: (
        <AttachFileIcon
          style={{ fontSize: "16px" }}
          className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]"
        />
      ),
      type: "any",
    },
    {
      title: "Upload a Folder",
      icon: (
        <DriveFolderUploadSharpIcon
          style={{ fontSize: "16px" }}
          className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]"
        />
      ),
      type: "any",
    },
    {
      title: "Upload a Video",
      icon: (
        <VideocamIcon
          style={{ fontSize: "16px" }}
          className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]"
        />
      ),
      type: "video/*",
    },
    {
      title: "Upload Music",
      icon: (
        <MusicVideoRoundedIcon
          style={{ fontSize: "16px" }}
          className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]"
        />
      ),
      type: "audio/*",
    },
  ];

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="bg-white dark:bg-[#121212] h-full pr-[7px] pl-[14px]">
        <Modal
          open={modalOpen}
          onClose={() => handleClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            className="
            flex
            flex-col
            bg-white
            dark:bg-[#121212]
            dark:border-[#121212]
            pt-4
            pb-8
            rounded-[24px]
            w-[50%]
            md:w-[70%]
            sm:w-[80%]
            border-2
            absolute
            top-[20%]
            right-[25%]
            md:right-[15%]
            sm:right-[10%]
              "
          >
            <h3
              className={`
              ${karla.className} font-extrabold 
              text-4xl
              md:text-3xl
              sm:text-2xl
              mb-2
              text-center 
              text-[rgba(0,0,0,0.75) 
                  `}
            >
              Create Folder
            </h3>
            <hr />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createFolder();
                handleClose();
              }}
              className="
              w-full
              px-12
              md:px-8
              sm:px-6
              mt-12
              md:mt-10
              sm:mt-8
              "
            >
              <TextField
                id="filled-textarea"
                label="Folder Name"
                placeholder="enter folder name"
                className="text-white  dark:bg-[#ffffff]"
                required
                sx={{
                  width: "100%",
                  marginBottom: "3rem",
                  color: "white",
                  "@media (min-width: 768px, max-width: 1023px)": {
                    marginBottom: "2.5rem",
                  },
                  "@media (max-width: 767px)": {
                    marginBottom: "2rem",
                  },
                }}
                onChange={handleFolderChangeFunction}
              />
              <button
                className={`${karla.className}
               block 
               py-[15px]
               md:py-[10px] 
               sm:py-[10px] 
               w-[65%] 
               mx-auto 
               font-base 
               text-center
               bg-[#0066FF] 
               rounded-[5px]
             text-white`}
                type={"submit"}
              >
                Create Folder
              </button>
            </form>
          </div>
        </Modal>
        <div className="min-h-[60vh] sm:min-h-[68vh]  overflow-y-scroll scrollbar-thin">
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
              className="
                w-5
                md:w-4
                sm:w-4
                "
            />
            <h1
              className="
                text-3xl
                sm:text-2xl 
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
                  sm:text-sm
                  px-3
                  sm:px-2
                  py-[2px]
                  sm:py-0
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
                className="sm:text-xs"
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
            style={{
              padding: 0,
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            className="p-0 my-4"
            onClick={() => {}}
          >
            <ListItemIcon
              sx={{
                minWidth: "auto",
                paddingRight: "10px",
              }}
            >
              <SourceIcon
                style={{ fontSize: "16px" }}
                className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)] text-base"
              />
            </ListItemIcon>

            <p
              className="
                text-[rgba(0,0,0,0.85)]  dark:text-[rgba(255,255,255,0.85)]
                ${karla.className}
                text-sm
                sm:text-xs
                mr-auto
                "
            >
              Recent
            </p>
          </ListItemButton>
        </div>
        <button
          className={`
              ${karla.className}
              text-sm
              sm:text-xs
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
              sm:my-[25px]
              mr-[10px]
              sm:mr-[5px]
             `}
        >
          Upgrade Plan
        </button>
        <div
          className={`${karla.className}
                text-[10px]
                sm:text-[8px]
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
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ margin: "24px 20px 0px ", display: { sm: "none" } }}
      >
        <MenuIcon className="dark:text-white" />
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
            className: "scrollbar-thin border-r border-[#717171]  ",
          }}
          className="bg-[#ffffff] dark:bg-black "
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "40%",
              overflowX: "hidden",
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
            className:
              "scrollbar-thin border-r pl-[20px] sm:pl-[8px] pr-[10px] sm:pr-[5px] border-[#717171] w-[240px] sm:w-[200px]",
          }}
          className="scrollbar-thin border-r pl-[20px] sm:pl-[15px] pr-[10px] sm:pr-[5px] border-[#717171] w-[240px] sm:w-[200px]"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
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
