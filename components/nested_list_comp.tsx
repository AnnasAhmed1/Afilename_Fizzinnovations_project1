import * as React from "react";
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
  const [open, setOpen] = React.useState(true);
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
          <SourceIcon
            sx={{
              fontSize: "16px",
            }}
          />
        </ListItemIcon>

        <p
          className="
        text-[rgba(0,0,0,0.85)]
        ${karla.className}
        text-sm
        mr-auto
        "
        >
          Folders
        </p>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse className="pl-[5px]" in={open} timeout="auto" unmountOnExit>
        {props.folders?.map((v, i) => {
          const folderObj = v as FolderObject;
          return (
            <ListItemComp
              onClick={() => {
                router.push({
                  pathname: "/folder",
                  query: { id: folderObj._id, name: folderObj.name },
                });
              }}
              key={i}
              text={folderObj.name}
              input={true}
              Icon={
                <FolderCopyIcon
                  sx={{
                    fontSize: "16px",
                    color: "rgba(0,0,0,0.85)",
                  }}
                />
              }
              handleFileChangeFunction={null}
            />
          );
        })}
      </Collapse>
    </>
  );
}
