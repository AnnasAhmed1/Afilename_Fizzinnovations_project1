import { toast } from "react-toastify";

const errorToast = (text?: any) => {
  toast.success("file ID copied to clipboard!", {
    position: "top-center",
    autoClose: 2000,
  });
};

export default errorToast;
