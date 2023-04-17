import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Inter, Karla, Manrope } from "next/font/google";
import { useRouter } from "next/router";
// ICONS
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DrawerComp from "@/components/drawer_comp";
import { handleFetchAction, handleInsertAction } from "@/config/API_actions";
import Cookies from "js-cookie";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import FileList from "@/components/file_list";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import { useTheme } from "next-themes";
import { Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
const drawerWidth = 240;
const manrope = Manrope({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

interface FileObject {
  title: string;
  contentType: string;
  dateUploaded: any;
  fileId: any;
}

export default function Folder({ query }: { query: any }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { id, name } = router.query;
  const [files, setFiles] = useState<Array<any>>([]);
  const [filesDetails, setFilesDetails] = useState<Array<object>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [folders, setFolders] = useState<Array<any>>([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [uploadingFiles, setUploadingFiles] = useState<Array<any>>([]);
  const [uploadingProgress, setUploadingProgress] = useState<Array<any>>([]);

  const open = Boolean(anchorEl);
  const email = Cookies.get("email")?.split("@")[0] as string;

  useEffect(() => {
    !Cookies.get("apikey") ? router.push("/") : getFolders();
  }, []);

  const uploadRequest = async (
    file?: any,
    filename?: any,
    contentType?: any
  ) => {
    try {
      const response: any = await handleInsertAction("files/upload", {
        filename,
        contentType,
      });

      const fileIndex = uploadingFiles.length;
      setUploadingFiles([...uploadingFiles, file]);
      setUploadingProgress([...uploadingProgress, 0]);

      await axios
        .put(response.data.url, file, {
          headers: {
            "Content-Type": contentType,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent?.total;
            if (totalLength) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              const newProgress = [...uploadingProgress];
              newProgress[fileIndex] = progress;
              setUploadingProgress(newProgress);
              console.log(newProgress);
            }
          },
        })
        .then(async () => {
          uploadInFolder(response.data.fileId);
        });

      const newProgress = [...uploadingProgress];
      newProgress[fileIndex] = 100;
      setUploadingProgress(newProgress);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadInFolder = async (fileId?: any) => {
    try {
      handleInsertAction(`folders/${id}/files`, {
        fileId: fileId,
      })
        .then(() => {
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
    uploadRequest(file, file?.name, file?.type);
  };

  const handleFolderChangeFunction = (e: any) => {
    setNewFolderName(e.target.value);
  };

  const createFolder = async (folderName: string) => {
    try {
      handleInsertAction("/folders/createfolder", {
        name: folderName,
      }).then(() => {
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
    handleFetchAction("/account/folders")
      .then((response: any) => {
        setFolders(response.data.folders);
        getFiles(response.data.folders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDowunloadUrl = async (_fileId: any) => {
    await handleFetchAction(`/files/download?file=${_fileId}`)
      .then((response: any) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <DarkModeSharpIcon className="text-dark" />
        ) : theme == "dark" ? (
          <LightModeSharpIcon className="text-white" />
        ) : (
          <DarkModeSharpIcon />
        )}
      </button>
      <CssBaseline />
      <div className="w-[240px] md:w-[200px] sm:w-[200px] xs:w-[0px]">
        <DrawerComp
          folders={folders}
          handleFileChangeFunction={handleFileChangeFunction}
          createFolder={() => createFolder(newFolderName)}
          handleFolderChangeFunction={handleFolderChangeFunction}
          files={filesDetails}
        />
      </div>
      <main
        className={`
        w-[calc(100%-240px)]
        sm:w-[calc(100%-200px)]
        xs:w-full
        pl-[3.5%] 
        pr-[2%]
        mt-[5%]
        md:mt-[7%]
        sm:mt-[7%]
      `}
      >
        <section
          className="flex 
            justify-between 
            pr-[10%]
            md:pr-0
            sm:pr-0
            "
        >
          <input
            type="text"
            className={`
            xs:ml-10
              w-[60%]
              sm:w-full
              mx-auto
              border
              border-black
              py-0 
              dark:border-white
              dark:bg-[#ffffff]
              dark:text-[black]
              px-4
              h-8
             `}
            placeholder="search"
            onChange={async (e) => {
              setSearchQuery(e.target.value);
              console.log(e.target.value);
              await handleFetchAction(`/account/search?q=${e.target.value}`)
                .then((response: any) => {
                  console.log(response);
                  getFilesDetails(response.data.fileIds);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
          <div className="pl-4 flex gap-4 md:gap-3 sm:gap-2 items-center">
            <div>
              <div
                className={` text-[#5073d2] text-base sm:text-sm font-semibold`}
              >
                {email}
              </div>
              <p
                className={`${manrope.className} text-[#7c8db5b8] text-xs sm:text-[11px] `}
              >
                Premium
              </p>
            </div>
            <p>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget);
                }}
                className="w-fit min-w-0"
              >
                <KeyboardArrowDownIcon className="text-lg my-auto h-fit dark:text-white" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                  setAnchorEl(null);
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  className:
                    "dark:bg-[#252525]  dark:text-white text-[#545454] text-base font-medium",
                }}
              >
                <MenuItem>Logout</MenuItem>
              </Menu>
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
            dark:text-[#ffffff]
            mb-4
            mt-10
            ml-[-10px]
          `}
          >
            <button onClick={() => router.push("/dashboard")}>
              <ArrowBackIosIcon className="mr-[20px]/ text-lg" />
            </button>
            <FolderCopyIcon className="ml-[5px] mr-[15px] text-3xl dark:text-[#ffffff]" />
            {name}
          </h1>
          {filesDetails?.map((v, i) => {
            const fileObj = v as FileObject;
            return (
              <FileList
                key={i}
                fileObj={fileObj}
                handleDowunloadUrl={() => handleDowunloadUrl(fileObj?.fileId)}
              />
            );
          })}
        </section>
      </main>
    </Box>
  );
}
Folder.getInitialProps = async (ctx: any) => {
  return { query: ctx.query };
};
