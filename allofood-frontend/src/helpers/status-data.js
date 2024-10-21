import { MdOutlinePending } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { BiStopwatch } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import { TbBasketCancel } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";



const statusStyles = {
    Pending: { bgColor: 'bg-yellow-200', icon: <MdOutlinePending /> },
    Rejected: { bgColor: 'bg-red-200 text-[#D50000]', icon: <FcCancel /> },
    Delivered: { bgColor: 'bg-cyan-200', icon: <GrCompliance /> },
    Ready: { bgColor: 'bg-green-200', icon: <IoMdDoneAll /> },
    "In Progress": { bgColor: 'bg-purple-200', icon: <BiStopwatch /> },
    Cancelled: { bgColor: 'bg-orange-200', icon: <TbBasketCancel /> },
};

export default statusStyles;