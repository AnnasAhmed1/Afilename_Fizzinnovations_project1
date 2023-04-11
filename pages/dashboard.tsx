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
import {
  handleFetchAction,
  handleInsertAction,
  handleUpdateAction,
} from "@/config/API_actions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Image from "next/image";
import axios from "axios";
import { API } from "@/config/API";
import FileList from "@/components/file_list";
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
  dateUploaded: any;
}
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Dashboard(props: Props) {
  const router = useRouter();
  interface FileDetails {
    name: string;
  }
  const [files, setFiles] = useState([]);
  const [filesDetails, setFilesDetails] = useState<Array<any>>([]);
  const [arr, setArr] = useState<Array<any>>([]);
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState<string>("");

  useEffect(() => {
    !Cookies.get("apikey") ? router.push("/") : (getFolders(), getFiles());
  }, []);

  const uploadRequest = async (filename?: any, contentType?: any) => {
    try {
      await handleInsertAction("files/upload", {
        filename,
        contentType,
      })
        .then(async (response: any) => {
          console.log(response.data.url, "response.data.url");

          await axios
            .put(response.data.url, filename, {
              headers: {
                "Content-Type": contentType,
              },
            })

            .then((res) => {
              console.log("success");
              getFiles();
            })
            .catch((err) => {
              console.log(err, "error put");
            });
        })
        .catch((err) => {
          console.log("upload post error", err);
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
      handleFetchAction("/account/files").then((res: any) => {
        const response = res.data.fileIds;
        setFiles(response);
        getFilesDetails(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFilesDetails = async (_files?: any) => {
    let tempArr: any[] = [];
    try {
      await _files?.map(
        async (v: string, i: any) =>
          await handleFetchAction(`files/${v}`).then((res: any) => {
            const data = res.data;
            tempArr.push(data);
            setFilesDetails([...tempArr]);
          })
      );
    } catch (error) {
      console.log(error);
    }
  };

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

  const text = "" as Props;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <DrawerComp
          folders={folders}
          handleFileChangeFunction={handleFileChangeFunction}
          createFolder={() => createFolder(newFolderName)}
          handleFolderChangeFunction={handleFolderChangeFunction}
        />
      </Box>
      <main
        className={`
        w-[calc(100%-240px)]
      w-[80%]/  
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
        <section
          className="
        pl-[3%]
        mb-8
        border-b-[0.25px]
        pt-[7%]
        pb-[5%]
        border-black
        "
        >
          <h1
            className={`
            ${karla.className}
            tracking-[1px]
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
            overflow-x-scroll
            scrollbar-thin
            scroll-m-0
            scroll-p-0
          "
          >
            {folders.length == 0 ? (
              <p className="my-4">No folders yet</p>
            ) : (
              folders.map((v, i) => {
                const obj = v as MyObject;
                return (
                  <div
                    key={i}
                    className="border-2
                  border-[rgba(0,0,0,0.06)]
                  container
                  cursor-pointer
                  rounded-lg
                  min-w-[150px]
                  w-[150px]
                
                  min-h-[185px]
                  max-h-[185px]
                  pt-[35px]
                  pb-[20px]
                  mx-auto

                  

                  "
                    onClick={() => {
                      router.push({
                        pathname: "/folder",
                        query: { id: obj._id, name: obj.name },
                      });
                    }}
                  >
                    <Image
                      src={require("../images/folder_icon.svg")}
                      alt="folder icon"
                      className="w-[100px] mx-auto"
                    />
                    <p
                      className={`
                    ${inter.className}
                    text-[18px]
                    font-semibold
                    text-[#1A1A1A]
                    mt-[10px]
                    px-[10px]
                    text-center
                    mx-6/
                    leading-[18px]
                    tracking-[0.01em]
                    break-all
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
        {/* <hr
        className="
        border-[0.25px]
        border-black
        "
        /> */}
        <section className="">
          <h1
            className={`
            ${karla.className}
            font-bold
            text-xl
            text-[#2E2E2E]
            tracking-[1px]
            my-4
            pl-[1.5%]
           
          `}
          >
            Files
          </h1>

          {filesDetails.map((v, i) => {
            const fileObj = v as FileObject;
            const finalDate = dateCalc(fileObj?.dateUploaded);
            return <FileList key={i} fileObj={fileObj} />;
          })}
        </section>
      </main>
    </Box>
  );
}
