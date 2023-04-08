import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { Inter, Karla, Manrope } from "next/font/google";
import { useRouter } from "next/router";
// ICONS
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DrawerComp from "@/components/drawer_comp";
import { handleFetchAction, handleInsertAction } from "@/config/API_actions";
import Cookies from "js-cookie";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
const drawerWidth = 240;
const manrope = Manrope({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

interface Props {
  window?: () => Window;
}

interface MyObject {
  name: string;
  _id: string;
}
interface FileObject {
  title: string;
  contentType: string;
}

export default function Docs(props: Props) {
  const router = useRouter();
  const { id, name } = router.query;
  // name?.toString();
  console.log(id, name);
  interface FileDetails {
    name: string;
  }
  const [files, setFiles] = useState<Array<any>>([]);
  const [filesDetails, setFilesDetails] = useState<Array<object>>([]);
  const [folders, setFolders] = useState<Array<any>>([]);
  const [newFolderName, setNewFolderName] = useState<string>("");

  useEffect(() => {
    !Cookies.get("apikey") ? router.push("/") : (getFolders(), getFiles());
  }, []);

  //   useEffect(() => {
  //     getFilesDetails();
  //   }, [files]);
  const uploadRequest = async (filename?: any, contentType?: any) => {
    try {
      handleInsertAction("files/upload", {
        filename,
        contentType,
      }).then((response: any) => {
        console.log(response.data.url);
        getFiles();
        // getFilesDetails();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChangeFunction = (event: any) => {
    const file = event.target.files[0];
    uploadRequest(file?.name, file?.type);
  };
  const handleFolderChangeFunction = (e: any) => {
    setNewFolderName(e.target.value);
  };

  const createFolder = async (folderName: string) => {
    console.log(folderName);
    try {
      handleInsertAction("/folders/createfolder", {
        name: folderName,
      }).then((response: any) => {
        getFolders();
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFiles = async () => {
    try {
      handleFetchAction("/account/files").then((response: any) => {
        setFiles(response.data.fileIds);
        console.log("files", files);
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function getFilesDetails() {
    console.log(files, "filesdetails");
    // setFilesDetails([])
    try {
      await files?.map((v, i) =>
        handleFetchAction(`files/${v}`).then((res: any) => {
          const data = res.data;
          console.log(data);
          filesDetails.push(data);
          i == filesDetails.length - 1
            ? setFilesDetails([...filesDetails])
            : null;
          console.log(filesDetails);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  const getFolders = async () => {
    try {
      handleFetchAction("/account/folders").then((response: any) => {
        setFolders(response.data.folders);
        console.log("folders", folders);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerComp
            folders={folders}
            handleFileChangeFunction={handleFileChangeFunction}
            createFolder={() => createFolder(newFolderName)}
            handleFolderChangeFunction={handleFolderChangeFunction}
          />
        </Drawer>
      </Box>
      <main
        className={`
      w-[80%]  
      pl-[3.5%] 
      pr-[2%]
      mt-[5%]
      `}
      >
        <section
          className="flex 
        justify-between 
        pr-[10%]
       
        "
        >
          <input
            type="text"
            className={`
            w-[60%] 
            mx-auto border
             border-black py-0 
             px-4 h-8
             `}
            placeholder="search"
          />
          <div className="flex gap-4 items-center">
            <div>
              <p
                className={`${manrope.className} text-[#2E3271] text-base font-semibold`}
              >
                @kevan
              </p>
              <p className={`${manrope.className} text-[#7c8db5b8] text-xs `}>
                Premium
              </p>
            </div>
            <p>
              <KeyboardArrowDownIcon />
            </p>
          </div>
        </section>
        {/* <section
          className="
        pl-[2%]
        mb-8"
        >
          <h1
            className={`
            ${karla.className}
            font-bold
            text-xl
            text-[#2E2E2E]
            my-4
          `}
          >
            Folders
          </h1>
          <div
            className="
            flex
            gap-6
            overflow-scroll
            w-full
          "
          >
            {folders.length == 0 ? (
              <p className="my-4">No folders yet</p>
            ) : (
              folders.map((v, i) => {
                console.log(folders, i, "aaaa");
                console.log(files, i, "aaaa");
                const obj = v as MyObject;
                return (
                  <div
                    key={i}
                    className="border-2
                  border-[rgba(0,0,0,0.06)]
                  rounded-lg
                  w-[150px]
                  flex
                  flex-col
                  justify-center
                  items-center
                  "
                    onClick={() => {
                      router.push(`/folder/${obj._id}`);
                    }}
                  >
                    <p>
                      <FolderIcon className="text-9xl" />
                    </p>
                    <p
                      className={`
                    ${inter.className}
                    text-lg
                    font-semibold
                    text-[#1A1A1A]
                    ml-[14px]/
                    mt-[-5px]/
                   `}
                    >
                      {obj.name}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>
        <hr /> */}
        <section className=" pl-[2%]">
          <h1
            className={`
            ${karla.className}
            font-bold
            text-[32px]
            text-[#2E2E2E]

            mb-4
            mt-10
            ml-[-10px]
          `}
          >
            <FolderCopyIcon className="mr-[20px] text-3xl " />
            {name}
          </h1>
          {/*    {[
            { title: "Some video.mp4", contentType: "video" },
            { title: "Some Image.peg", contentType: "image" },
            { title: "animportantfile.docx", contentType: "application" },
            { title: "animportantfile.docx", contentType: "application" },
            { title: "Some video.mp4", contentType: "video" },
            { title: "Some Image.peg", contentType: "image" },
            { title: "animportantfile.docx", contentType: "application" },
            { title: "animportantfile.docx", contentType: "application" },
          ]?.map((v, i) => {
            const fileObj = v as FileObject;
            return (
              <div
                key={i}
                className={`
                flex 
                gap-3 
                border-b 
                border-[#EBEFF2] 
                text-[#242634]  
                ${karla.className}`}
              >
                {fileObj.contentType.slice(0, 5) == "image" ? (
                  <InsertPhotoOutlinedIcon className="text-xl mt-4" />
                ) : fileObj.contentType.slice(0, 5) == "video" ? (
                  <VideoCameraBackIcon className="text-xl mt-4" />
                ) : fileObj.contentType.slice(0, 11) == "application" ? (
                  <InsertDriveFileIcon className="text-xl mt-4" />
                ) : (
                  <FolderOutlinedIcon className="text-xl mt-4" />
                )}
                <div className={`my-4 flex-1`}>
                  <p className="text-sm font-medium mb-[1px] ">
                    {fileObj.title}
                  </p>
                  <p className="text-xs ">3 days ago</p>
                </div>
                <p className="text-[11px] font-bold border h-fit py-[3px] px-[5px] my-auto border-[#EBEFF2]">
                  1.46MB
               </p>
                <MoreVertIcon className="text-lg my-auto h-fit" />
              </div>
            );
          })} */}
        </section>
      </main>
    </Box>
  );
}
