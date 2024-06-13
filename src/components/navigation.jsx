"use client";
import { getCount } from "@/app/utils/utils";
import { database } from "@/firebaseConfig";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);

  const taskHandler = useSelector((state) => state.tasks);
  const blur = taskHandler.modelStatus;
  const { overAllCount, todayCount } = getCount(taskHandler.taskObject);

  const enableToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {toggle ? (
        <div
          className={`m-6 rounded-lg p-6 mb-4 sticky ${blur ? "blur-sm" : ""}`}
        >
          <button onClick={() => enableToggle()}>
            <i
              class="fa-solid fa-bars fa-xl inset-y-0 right-0 absolute mt-6"
              style={{ color: "#8c9097" }}
            ></i>
          </button>
        </div>
      ) : (
        <div
          className={`container bg-nav max-w-96  max-h-screen m-6 rounded-lg p-6 mb-4 sticky ${
            blur ? "blur-sm" : ""
          }`}
        >
          {/* Toggle menu */}
          <div className=" relative container flex p-1 min-h-8">
            <h1 className="font-semibold text-3xl font-lato text-gray-700">
              Menu
            </h1>
            <button onClick={() => enableToggle()}>
              <i
                class="fa-solid fa-bars fa-xl inset-y-0 right-0 absolute mt-6"
                style={{ color: "#8c9097" }}
              ></i>
            </button>
          </div>

          {/* Search Bar */}
          <form class="max-w-md mx-auto mt-7">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              {/* <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button> */}
            </div>
          </form>

          <div className="container mt-10">
            {/* Tasks */}
            <div className="container mt-6">
              <span className="font-medium text-lg font-lato text-gray-700">
                TASKS
              </span>
              {/* Upcoming */}
              <Link href="/" className="flex ml-2 mt-4">
                <div className="container flex  w-24">
                  <i class="fa-solid fa-angles-right top-1 relative  text-gray-700"></i>
                  <span className="font-medium left-5 relative font-lato text-gray-700">
                    Upcoming
                  </span>
                </div>
                <div className="flex items-center justify-center h-6 w-6 bg-slate-200 rounded-md left-48 relative">
                  <span className="font-lato text-xs font-semibold text-gray-500">
                    {overAllCount}
                  </span>
                </div>
              </Link>
              {/* Today */}
              <Link href="/today" className="flex ml-2 mt-4">
                <div className="container flex  w-24">
                  <i class="fa-solid fa-list-check top-1 relative  text-gray-700"></i>
                  <span className="font-medium left-5 relative font-lato text-gray-700">
                    Today
                  </span>
                </div>
                <div className="flex items-center justify-center h-6 w-6 bg-slate-200 rounded-md left-48 relative">
                  <span className="font-lato text-xs font-semibold text-gray-500">
                    {todayCount}
                  </span>
                </div>
              </Link>
              {/* Sticky Wall */}
              <Link href="/sticky" className="flex ml-2 mt-4">
                <div className="container flex  w-24">
                  <i class="fa-solid fa-note-sticky top-1 relative  text-gray-700"></i>
                  <span className="font-medium left-5 relative font-lato text-gray-700">
                    Sticky Wall
                  </span>
                </div>
              </Link>
            </div>

            <hr class="h-px my-7 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* LISTS */}
            <div className="container mt-6">
              <span className="font-medium text-lg font-lato text-gray-700">
                LISTS
              </span>

              <Link href="/lists/Personal" className="flex ml-2 mt-4">
                <div className="container flex  w-24">
                  <div className="h-5 w-5 bg-red-200 rounded-md" />
                  <span className="font-medium left-5 relative font-lato text-gray-700">
                    Personal
                  </span>
                </div>
                <div className="flex items-center justify-center h-6 w-6 bg-slate-200 rounded-md left-48 relative">
                  <span className="font-lato text-xs font-semibold text-gray-500">
                    {
                      taskHandler.taskObject.filter(
                        (ele) => ele.list.toLowerCase() == "personal"
                      ).length
                    }
                  </span>
                </div>
              </Link>

              <Link href="/lists/Work" className="flex ml-2 mt-4">
                <div className="container flex  w-24">
                  <div className="h-5 w-5 bg-teal-200 rounded-md" />
                  <span className="font-medium left-5 relative font-lato text-gray-700">
                    Work
                  </span>
                </div>
                <div className="flex items-center justify-center h-6 w-6 bg-slate-200 rounded-md left-48 relative">
                  <span className="font-lato text-xs font-semibold text-gray-500">
                    {
                      taskHandler.taskObject.filter(
                        (ele) => ele.list.toLowerCase() == "work"
                      ).length
                    }
                  </span>
                </div>
              </Link>

              <Link href="/lists/List1" className="flex ml-2 mt-4">
                <div className="container flex  w-24">
                  <div className="h-5 w-5 bg-yellow-200 rounded-md" />
                  <span className="font-medium left-5 relative font-lato text-gray-700">
                    List 1
                  </span>
                </div>
                <div className="flex items-center justify-center h-6 w-6 bg-slate-200 rounded-md left-48 relative">
                  <span className="font-lato text-xs font-semibold text-gray-500">
                    {
                      taskHandler.taskObject.filter(
                        (ele) => ele.list.toLowerCase() == "list1"
                      ).length
                    }
                  </span>
                </div>
              </Link>
              <button className="flex ml-2 mt-4">
                <i class="fa-solid fa-plus top-1 relative  text-gray-700"></i>
                <span className="font-medium left-5 relative font-lato text-gray-700">
                  Add New List
                </span>
              </button>
            </div>

            <hr class="h-px my-7 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* Tags */}
            {/* <div className="container mt-6 h-40">
              <span className="font-medium text-lg font-lato text-gray-700">
                TAGS
              </span>
              <div className="flex ml-2 mt-4">
                <div className="container w-16 h-10 bg-red-200 rounded-md flex items-center justify-center ml-2">
                  <span className="font-medium font-lato">Tag 1</span>
                </div>
                <div className="container w-16 h-10 bg-teal-200 rounded-md flex items-center justify-center ml-2">
                  <span className="font-medium font-lato">Tag 2</span>
                </div>
                <button
                  type="button"
                  class="text-gray-700 ml-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <i class="fa-solid fa-plus  relative  text-gray-700"></i>
                  <span className="font-medium left-2 relative font-lato text-gray-700">
                    Add Tag
                  </span>
                </button>
              </div>
            </div> */}

            {/* Setting */}
            <div className="container flex justify-start">
              <i class="fa-solid fa-sliders text-gray-700 top-1 relative"></i>
              <span className="font-medium font-lato text-gray-700 ml-2">
                Settings
              </span>
            </div>

            {/* LogOut */}
            <div className="container flex justify-start mt-2 mb-2">
              <i class="fa-solid fa-right-from-bracket text-gray-700 top-1 relative"></i>
              <span className="font-medium font-lato text-gray-700 ml-2">
                Log Out
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
