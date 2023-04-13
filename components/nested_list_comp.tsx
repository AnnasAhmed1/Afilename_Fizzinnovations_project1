import * as React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { ListItem } from "@mui/material";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ListItemComp from "@/components/list_item";
import SourceIcon from "@mui/icons-material/Source";
import { useRouter } from "next/router";
export default function NestedListComp(props: { folders?: Array<Object> }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(true);
  interface FolderObject {
    name: string;
    _id: string;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton className="p-0 my-4" onClick={handleClick}>
        <ListItemIcon
          sx={{
            minWidth: "auto",
            paddingRight: "10px",
          }}
        >
          <SourceIcon style={{fontSize:"16px"}} className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)] text-base" />
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
          Folders
        </p>
        {open ? (
          <ExpandLess className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
        ) : (
          <ExpandMore className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
        )}
      </ListItemButton>
      <Collapse className="pl-[5px]" in={open} timeout="auto" unmountOnExit>
        {props.folders?.map((v, i) => {
          const folderObj = v as FolderObject;
          return (
            <ListItemComp
              onClick={() => {
                // setRefresh(!refresh);
                // router.push({ pathname: "/" }),
                router.push({
                  pathname: "/folder",
                  query: { id: folderObj._id, name: folderObj.name },
                });
                setTimeout(() => {
                  router.reload();
                }, 200);
                // Reload the current page after navigating to the new page
                // router.reload();
              }}
              key={i}
              text={folderObj.name}
              input={true}
              Icon={
                <FolderCopyIcon style={{fontSize:"16px"}} className="text-base text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]" />
              }
              handleFileChangeFunction={null}
            />
          );
        })}
      </Collapse>
    </>
  );
}
