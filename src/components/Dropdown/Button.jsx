"use client";

import { useState } from "react";
import DropDownList from "./DropDownList";
import { priorityList } from "@/app/utils/utils";

export default function DropDownButton(props) {
  const { label, callBack } = props;
  let { list = [] } = props;

  switch (label) {
    case "List":
      list = list;
      break;
    case "Priority":
      list = priorityList;
      break;
    default:
      [];
  }

  const [showList, setShowList] = useState(false);
  const showListHandler = () => {
    setShowList(!showList);
  };
  return (
    <>
      {list.length > 0 && (
        <>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            class="text-white z-10 bg-blue-700 min-w-36 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-between"
            type="button"
            onClick={() => showListHandler()}
          >
            {label}
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {showList && (
            <DropDownList
              list={list}
              // callBack={typeof callBackFunction == "function" ? callBack : null}
              callBack={callBack}
              isSelected={showListHandler}
            />
          )}
        </>
      )}
    </>
  );
}
