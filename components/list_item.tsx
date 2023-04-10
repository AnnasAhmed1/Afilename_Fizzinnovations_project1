import * as React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export default function ListItemComp(props: {
  text?: string;
  Icon?: any;
  handleFileChangeFunction?: any;
  filetype?: string;
  input?: boolean;
  onClick?: any;
}) {
  const { text, Icon, handleFileChangeFunction, filetype, onClick } = props;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  var input;
  props.input ? (input = false) : (input = true);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = handleFileChangeFunction;
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          color: "rgba(0, 0, 0, 0.85)",
          gap: "10px",
          paddingLeft: "5px",
          cursor: "pointer",
        }}
        onClick={input ? handleClick : onClick}
      >
        {Icon}

        <p
          style={{
            margin: "5px 0",
            wordBreak: "break-all",
          }}
        >
          {text}
        </p>
      </div>
      {input ? (
        <input
          ref={fileInputRef}
          type={filetype != "folder" ? "file" : text}
          accept={filetype}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      ) : null}
    </>
  );
}
