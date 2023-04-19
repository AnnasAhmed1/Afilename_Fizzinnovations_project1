import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Karla, Manrope } from "next/font/google";
import { handleFetchAction, handleInsertAction } from "@/config/API_actions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Button, Menu, MenuItem } from "@mui/material";
import ProgressBar from "@/components/progressbar";
import DrawerComp from "@/components/drawer_comp";
import Image from "next/image";
import axios from "axios";
import FileList from "@/components/file_list";

// ICONS
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import { toast } from "react-toastify";
import FileUpload from "@/components/file_upload";

const manrope = Manrope({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
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

export default function Dashboard() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [filesDetails, setFilesDetails] = useState<Array<any>>([]);
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [uploadingFiles, setUploadingFiles] = useState<Array<any>>([]);
  const [uploadingProgress, setUploadingProgress] = useState<number>();
  const [progress, setProgress] = useState<number[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [currentUpload, setCurrentUpload] = useState(null);
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    !Cookies.get("apikey")
      ? router.push("/")
      : (getFolders(),
        getFiles(),
        setEmail(Cookies.get("email")?.split("@")[0]));
  }, []);

  const handleFileChangeFunction = (event: any) => {
    const file = event.target.files[0];
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
    uploadingFiles.push(file);
    setUploadingFiles([...uploadingFiles]);
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

  const getSingleFileDetails = async (fileId?: any) => {
    await handleFetchAction(`files/${fileId}`).then((res: any) => {
      const data = res.data;
      filesDetails.push(data);
      setFilesDetails([...filesDetails]);
    });
  };

  const getFolders = async () => {
    try {
      handleFetchAction("/account/folders").then((response: any) => {
        setFolders(response.data.folders);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="w-[240px] md:w-[200px] sm:w-[200px] xs:w-[0px]">
        <DrawerComp
          folders={folders}
          handleFileChangeFunction={handleFileChangeFunction}
          createFolder={() => createFolder(newFolderName)}
          handleFolderChangeFunction={handleFolderChangeFunction}
          files={filesDetails}
        />
      </div>
      <div
        className={`
          w-[calc(100%-240px)]
          sm:w-[calc(100%-200px)]
          xs:w-full
          pl-[3.5%] 
          pr-[2%]
          mt-[5%]
          sm:mt-[25px]
        `}
      >
        <section
          className="flex 
            justify-between
            items-center 
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
              px-4
              h-8
             `}
            placeholder="search"
            onChange={async (e) => {
              setSearchQuery(e.target.value);
              await handleFetchAction(`/account/search?q=${e.target.value}`)
                .then((response: any) => {
                  getFilesDetails(response.data.fileIds);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
          <div className="pl-4 md:pl-2 sm:pl-1 flex gap-4 md:gap-1 sm:gap-0 items-center">
            <div>
              <p className="text-[#2E3271]  dark:text-[#5073d2] text-base sm:text-xs font-semibold">
                {email}
              </p>
              <p
                className={`${manrope.className} text-[#7c8db5b8] text-xs sm:text-[10px] `}
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
                    "dark:bg-[#252525] dark:text-white text-[#545454] text-base font-medium",
                }}
              >
                <MenuItem>Logout</MenuItem>
              </Menu>
            </p>
          </div>

          <button
            onClick={() => {
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
        </section>
        {searchQuery.length == 0 ? (
          <>
            <section
              className="
                pl-[3%]
                mb-8
                border-b-[0.25px]
                pt-[5%]
                pb-[5%]
                border-black
                dark:border-white
              "
            >
              <h1
                className={`
                ${karla.className}
                  tracking-[1px]
                  font-bold
                  text-xl
                  text-[#2E2E2E]
                  dark:text-[#ffffff]
                  my-4
                `}
              >
                Folders
              </h1>

              <div
                className="
                    flex
                    gap-6
                    md:gap-4
                    overflow-x-scroll
                    scrollbar-thin
                    scroll-m-0
                    scroll-p-0
                  "
              >
                {folders?.length == 0 ? (
                  <p className="my-4">No folders yet</p>
                ) : (
                  folders?.map((v, i) => {
                    const obj = v as MyObject;
                    return (
                      <div
                        key={i}
                        className="border-2
                          border-[rgba(0,0,0,0.06)]
                          dark:border-[rgba(255,255,255,0.9)]
                          container
                          cursor-pointer
                          rounded-lg
                          min-w-[150px]
                          w-[150px]
                          h-[185px]
                          md:min-w-[120px]
                          md:w-[120px]
                          md:h-[145px]
                          md:pt-[25px]
                          md:pb-[10px]
                          sm:min-w-[120px]
                          sm:w-[120px]
                          sm:h-[145px]
                          sm:pt-[25px]
                          sm:pb-[10px]
                          pt-[35px]
                          pb-[20px]
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
                          className="w-[100px] md:w-[80px] mx-auto"
                        />
                        <p
                          className={`
                            $inter.className
                            text-[18px]
                            md:text-base
                            font-semibold
                            text-[#1A1A1A]
                            dark:text-[#ffffff]
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
            <section className="">
              <h1
                className={`
                  ${karla.className}
                  font-bold
                  text-xl
                  text-[#2E2E2E]
                  dark:text-[#ffffff]
                  tracking-[1px]
                  my-4
                  pl-[1.5%]
                `}
              >
                Files
              </h1>
              {filesDetails.length == 0 ? (
                <p className="my-4">No files yet</p>
              ) : (
                filesDetails.map((v, i) => {
                  const fileObj = v as FileObject;
                  return <FileList key={i} fileObj={fileObj} />;
                })
              )}
            </section>
            {uploadingFiles?.length > 0 ? (
              <main className="w-[295px] px-3 py-2 bottom-2 right-4 fixed max-h-[308px] overflow-scroll scrollbar-thin bg-white border-2 border-gray-100 rounded-md ">
                <h1
                  className={`
                    text-[18px]
                    font-bold
                    text-[#1A1A1A]
                    dark:text-[#ffffff]
                    text-center
                  `}
                >
                  {`Uploading ${uploadingFiles?.length} Files...`}
                </h1>

                {uploadingFiles.map((file, index) => (
                  <FileUpload
                    key={index}
                    file={file}
                    onFinishUpload={(fileId: string) => {
                      setTimeout(() => {
                        uploadingFiles.splice(index, 1);
                        setUploadingFiles([...uploadingFiles]);
                      }, 500);
                      // getFiles();
                      getSingleFileDetails(fileId);
                    }}
                  />
                ))}
              </main>
            ) : null}
          </>
        ) : (
          <section className="">
            <h1
              className={`
                ${karla.className}
                font-bold
                text-xl
                text-[#2E2E2E]
                dark:text-[#ffffff]
                tracking-[1px]
                my-4
                pl-[1.5%]
              `}
            >
              Files
            </h1>
            {filesDetails.length == 0 ? (
              <p className="my-4">No files yet</p>
            ) : (
              filesDetails.map((v, i) => {
                const fileObj = v as FileObject;
                return <FileList key={i} fileObj={fileObj} />;
              })
            )}
          </section>
        )}
      </div>
    </div>
  );
}
