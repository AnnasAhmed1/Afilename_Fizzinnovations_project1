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
import { API } from "@/config/API";
import FileList from "@/components/file_list";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import { useTheme } from "next-themes";
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
  fileId: any;
}

export default function Docs({ query }: { query: any }) {
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const { id, name } = router.query;
  // name?.toString();
  console.log(id, name);
  interface FileDetails {
    name: string;
  }
  const [files, setFiles] = useState<Array<any>>([]);
  const [filesDetails, setFilesDetails] = useState<Array<object>>();
  const [folders, setFolders] = useState<Array<any>>([]);
  const [newFolderName, setNewFolderName] = useState<string>("");

  useEffect(() => {
    !Cookies.get("apikey") ? router.push("/") : getFolders();
  }, []);

  const uploadRequest = async (filename?: any, contentType?: any) => {
    try {
      await handleInsertAction("files/upload", {
        filename,
        contentType,
      })
        .then(async (response: any) => {
          uploadInFolder(response.data.fileId);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const uploadInFolder = async (fileId?: any) => {
    try {
      handleInsertAction(`folders/${id}/files`, {
        fileId: fileId,
      })
        .then((response: any) => {
          getFolders();
        })
        .catch((err) => {
          console.log(err);
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
    try {
      handleInsertAction("/folders/createfolder", {
        name: folderName,
      }).then((response: any) => {
        getFolders();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFiles = async (_folders: any) => {
    let folderIndex: number;
    _folders?.map((v: any, i: any) => {
      if (v._id == id) {
        folderIndex = i;
        setFiles(_folders[folderIndex]?.fileIds);
        getFilesDetails(_folders[folderIndex]?.fileIds);
        return;
      } else {
        console.log("not found");
      }
    });
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
      handleFetchAction("/account/folders")
        .then((response: any) => {
          setFolders(response.data.folders);
          getFiles(response.data.folders);
          console.log("folders", folders);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCopyClick = async (_fileId: any) => {
    await handleFetchAction(`/files/downloadurl?file=${_fileId}`)
      .then((response: any) => {
        console.log(response);
        navigator.clipboard.writeText(response.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDowunloadUrl = async (_fileId: any) => {
    await handleFetchAction(`/files/download?file=${_fileId}`)
      .then((response: any) => {
        console.log(response);
        // navigator.clipboard.writeText(response.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <Box sx={{ display: "flex" }}>
      <button
        className="absolute top-2 right-3"
        onClick={() => {
          console.log(theme);
          setTheme(theme == "light" ? "dark" : "light");
        }}
      >
        {theme == "light" ? (
          <DarkModeSharpIcon />
        ) : (
          <LightModeSharpIcon className="text-white" />
        )}
      </button>
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
             border-black
             dark:border-white
             dark:bg-[#ececec]
             py-0 
             px-4 h-8
             `}
            placeholder="search"
          />
          <div className="flex gap-4 items-center">
            <div>
              <p
                className={`${manrope.className} text-[#2E3271] dark:text-[#6a72e6] text-base font-semibold`}
              >
                @kevan
              </p>
              <p
                className={`${manrope.className} text-[#7c8db5b8] dark:text-[#9daed7b8] text-xs `}
              >
                Premium
              </p>
            </div>
            <p>
              <KeyboardArrowDownIcon />
            </p>
          </div>
        </section>

        <section className=" pl-[2%]">
          <h1
            className={`
            ${karla.className}
            font-bold
            text-[32px]
            text-[#2E2E2E]
            dark:text-[#ececec]

            mb-4
            mt-10
            ml-[-10px]
          `}
          >
            <button onClick={() => router.push("/dashboard")}>
              <ArrowBackIosIcon className="mr-[20px]/ text-lg" />
            </button>
            <FolderCopyIcon className="ml-[5px] mr-[15px] text-3xl dark:text-[#ececec]" />
            {name}
          </h1>
          {filesDetails?.map((v, i) => {
            const fileObj = v as FileObject;
            const finalDate = fileObj?.dateUploaded;
            // const finalDate = dateCalc(v?.dateUploaded);

            // console.log(filesDetails);
            return (
              <FileList
                key={i}
                fileObj={fileObj}
                handleCopyClick={() => handleCopyClick(fileObj?.fileId)}
                handleDowunloadUrl={() => handleDowunloadUrl(fileObj?.fileId)}
              />
            );
          })}
          {/*    {[
            { title: "Some video.mp4", contentType: "video" },021 139700 do lc naeem
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
 dark:text-[#ffffff]  
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
Docs.getInitialProps = async (ctx: any) => {
  return { query: ctx.query };
};
