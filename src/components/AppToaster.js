import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppErrorToaster = {
  show: (message, options = {}) => {
    toast.error(message, options);
  },
};
