"use client";
import { lists } from "@/Slices/taskSlice";
import { ListFormColors, getCount } from "@/app/utils/utils";
import { auth, database } from "@/firebaseConfig";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar/SearchBar";
import Image from "next/image";
import profilePicture from "../../public/profilePlaceHolder.jpg";

const dbInstance = collection(database, "List");
const dbInstanceTask = collection(database, "Task");

const Navigation = () => {
  const [toggle, setToggle] = useState(false);
  const [showListInput, setShowListInput] = useState(false);
  const [listcolor, setListColor] = useState("red");
  const [listList, setListList] = useState([]);
  const [completedTaskCount, setCompletedtaskCount] = useState(0);
  const [allTask, setAllTask] = useState([]);
  const router = useRouter();

  const dispatch = useDispatch();
  const taskHandler = useSelector((state) => state.tasks);
  const blur = taskHandler.modelStatus;
  const userInfo = taskHandler.userInfo;

  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dbInstance, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData = snapshot.docs.map((doc) => {
        const detail = doc.data();
        const id = doc.id;
        const value = detail.value;
        const color = detail.color;
        return { value: value, id: id, color: color, uid: detail.uid };
      });
      setListList(newData.filter((ele) => ele.uid == userInfo.uid));
      dispatch(lists(newData));
    });
    const unsubscribeTask = onSnapshot(dbInstanceTask, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData = snapshot.docs.filter((doc) => {
        return doc.data().completed == true && doc.data().uid == userInfo.uid;
      });

      setCompletedtaskCount(newData.length);
      setAllTask(snapshot.docs);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
      unsubscribeTask();
    };
  }, []);

  let initialListFormValue = {
    value: "",
    color: "",
    uid: userInfo.uid,
  };
  const [listFormValue, setListFormValue] = useState(initialListFormValue);

  const { overAllCount, todayCount } = getCount(allTask);

  const enableToggle = () => {
    setToggle(!toggle);
  };

  const showListHandler = () => {
    setShowListInput(!showListInput);
  };

  const submitListHandler = (event) => {
    event.preventDefault();
    addDoc(dbInstance, listFormValue).then(() => {
      setListFormValue(initialListFormValue);
      setShowListInput(false);
      setListColor("red");
    });
  };
  const formHandler = (event, key) => {
    const newData = listFormValue;
    newData[key] = event.target.value;
    setListFormValue(newData);
  };

  const colorPicker = (color) => {
    setListColor(color);
    const newData = listFormValue;
    newData.color = color;
    setShowListInput(newData);
  };

  const SignOutHandler = (event) => {
    event.preventDefault();
    router.push("/");
    signOut(auth).then(() => console.log("SIGNED OUT"));
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
          {/* User Info */}
          <div className=" relative container flex p-1 min-h-8">
            <Image
              alt="No Data"
              src={profilePicture}
              width="40"
              height="40"
              className=" border rounded-full w-10 h-10 mr-2 "
            ></Image>

            <h1 className="font-semibold text-xl font-lato text-gray-500 mt-1">
              {userInfo.email}
            </h1>
          </div>
          {/* Search Bar */}
          <SearchBar allTask={allTask} />

          <div className="container mt-7">
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
              {/* Today */}
              <Link href="/completed" className="flex ml-2 mt-4">
                <div className="container flex  w-24">
                  <i class="fa-solid fa-clipboard-check top-1 relative  text-gray-700"></i>
                  <span className="font-medium left-5 relative font-lato text-gray-700">
                    Completed
                  </span>
                </div>
                <div className="flex items-center justify-center h-6 w-6 bg-slate-200 rounded-md left-48 relative">
                  <span className="font-lato text-xs font-semibold text-gray-500">
                    {completedTaskCount}
                  </span>
                </div>
              </Link>
            </div>

            <hr class="h-px my-7 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* LISTS */}

            <div className="container mt-6">
              {listList.length > 0 && (
                <>
                  <span className="font-medium text-lg font-lato text-gray-700">
                    LISTS
                  </span>
                  {listList.map((ListType) => {
                    return (
                      <Link
                        key={ListType.id}
                        href={`/lists/${ListType.value}`}
                        className="flex ml-2 mt-4"
                      >
                        <div className="container flex  w-24">
                          <div
                            className={`h-5 w-5 bg-${ListType.color}-200 rounded-md`}
                          />
                          <span className="font-medium left-5 relative font-lato text-gray-700">
                            {ListType.value}
                          </span>
                        </div>
                        <div className="flex items-center justify-center h-6 w-6 bg-slate-200 rounded-md left-48 relative">
                          <span className="font-lato text-xs font-semibold text-gray-500">
                            {
                              allTask.filter(
                                (ele) =>
                                  ele.data().list.toLowerCase() ==
                                    ListType.value.toLowerCase() &&
                                  ele.data().completed != true
                              ).length
                            }
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}

              <button
                className="flex ml-2 mt-4"
                onClick={() => showListHandler()}
              >
                <i class="fa-solid fa-plus top-1 relative  text-gray-700"></i>
                <span className="font-medium left-5 relative font-lato text-gray-700">
                  Add New List
                </span>
              </button>

              {/* List Maker */}
              {showListInput && (
                <form className="container h-28 border rounded-lg mt-4 border-gray-400 p-4">
                  <div className="w-full h-10 border rounded-lg flex pl-4">
                    <span
                      className={`h-5 w-5 bg-${listcolor}-200 rounded-md mt-2`}
                    ></span>
                    <input
                      type="text"
                      name="list"
                      id="list"
                      className="ml-6 text-lg font-lato  text-gray-500 bg-inherit outline-none"
                      placeholder="List Name"
                      onChange={(e) => formHandler(e, "value")}
                    />
                    <button
                      type="submit"
                      onClick={(event) => submitListHandler(event)}
                    >
                      <i class="fa-solid fa-plus  relative  text-gray-400"></i>
                    </button>
                  </div>
                  <ul className="flex w-full justify-evenly mt-4">
                    {ListFormColors.map((color, index) => {
                      return (
                        <li
                          key={index}
                          className={`h-5 w-5 bg-${color}-200 rounded-md cursor-pointer hover:shadow-lg hover:h-6 hover:w-6`}
                          onClick={() => colorPicker(color)}
                        ></li>
                      );
                    })}
                  </ul>
                </form>
              )}
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
            <div
              className="container flex justify-start mt-2 mb-2  cursor-pointer"
              onClick={(e) => SignOutHandler(e)}
            >
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
