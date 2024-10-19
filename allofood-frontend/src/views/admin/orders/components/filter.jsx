import React, { useState } from "react";

const FilterAndSearch = ({ onFilter }) => {
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleFilter = (status) => {
        setSelectedStatus(status);
        onFilter({ status });
    };

    const getButtonClass = (status) => {
        return selectedStatus === status
            ? "inline-flex w-full text-white items-center justify-center gap-x-1.5 rounded-xl px-3 py-2 text-[13px] font-medium shadow-sm bg-navy-500"
            : "inline-flex w-full items-center justify-center gap-x-1.5 rounded-xl px-3 py-2 text-[13px] font-medium text-[#526484] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
    };

    return (
        <div className="h-fit flex justify-between space-x-2 ">
            <button
                type="button"
                className={getButtonClass("")}
                onClick={() => handleFilter("")}
            >
                All
            </button>
            <button
                type="button"
                className={getButtonClass("Pending")}
                onClick={() => handleFilter("Pending")}
            >
                Pending
            </button>
            <button
                type="button"
                className={getButtonClass("Delivered")}
                onClick={() => handleFilter("Delivered")}
            >
                Delivered
            </button>
            <button
                type="button"
                className={getButtonClass("Rejected")}
                onClick={() => handleFilter("Rejected")}
            >
                Rejected
            </button>
        </div>
    );
};

export default FilterAndSearch;