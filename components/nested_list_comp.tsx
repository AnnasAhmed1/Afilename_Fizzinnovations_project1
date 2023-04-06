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
export default function NestedListComp(props: { folders?: Array<Object> }) {
  console.log(props.folders)
  const [open, setOpen] = React.useState(true);
  interface FolderObject {
    name: string;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon
          sx={{
            minWidth: "auto",
            paddingRight: "10px",
            color: "rgba(0,0,0,0.85)",
          }}
        >
          <SourceIcon
            sx={{
              fontSize: "16px",
              coloe: "rgba(0,0,0,0.85)",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Folders" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.folders?.map((v, i) => {
          const folderObj=v as FolderObject;
          return (
            <ListItemComp
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
