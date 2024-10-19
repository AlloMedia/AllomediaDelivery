import { MdOutlinePending } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { BiStopwatch } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";


const statusStyles = {
    Pending: { bgColor: 'bg-yellow-200', icon: <MdOutlinePending /> },
    Rejected: { bgColor: 'bg-red-200', icon: <FcCancel /> },
    Delivered: { bgColor: 'bg-green-200', icon: <IoMdDoneAll /> },
    Processing: { bgColor: 'bg-purple-200', icon: <BiStopwatch /> },
};

export default statusStyles;