"use client";

import { modalToggler, taskAdded } from "@/Slices/taskSlice";
import { database } from "@/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "../Buttons/SubmitButton";
import DropDownButton from "../Dropdown/Button";
import Calender from "../Calender/calender";
import { format } from "date-fns";

const dbInstanceList = collection(database, "List");

export default function FormModal({ db }) {
  const initialState = useSelector((state) => state.tasks);
  const userInfo = initialState.userInfo;
  let initialFormValues = {
    task: "",
    dueDate: format(Date(), "dd-MM-yyyy"),
    description: "",
    list: "",
    priority: "",
    completed: false,
    completedDate: "",
    uid: userInfo.uid,
  };
  const [list, setList] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [date, setDate] = useState(format(Date(), "dd-MM-yyyy"));

  const datePickHandler = (datePicked) => {
    const newDate = format(datePicked, "dd-MM-yyyy");
    const newData = formData;
    newData.dueDate = newDate;
    setFormData(newData);
    setDate(newDate);
  };

  useEffect(() => {
    const getList = () => {
      getDocs(dbInstanceList).then((data) => {
        const filteredUserList = data.docs.filter(
          (item) => item.data().uid == userInfo.uid
        );
        setList(
          filteredUserList.map((item) => {
            const data = item.data();
            return data.value;
          })
        );
      });
    };
    getList();
  }, []);

  const showCalederHandler = (event) => {
    event.preventDefault();
    setShowCalender(!showCalender);
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormValues);

  const formHandler = (event, key) => {
    const newData = formData;
    newData[key] = event.target.value;
    setFormData(newData);
  };

  const submitListHandler = (value) => {
    const newData = formData;
    newData.list = value;
    setFormData(newData);
  };

  const submitPriorityHandler = (value) => {
    const newData = formData;
    newData.priority = value;
    setFormData(newData);
  };

  const submitHandler = (event) => {
    addDoc(db, formData).then(setFormData(initialFormValues));
    event.preventDefault();
    dispatch(taskAdded(true));
    dispatch(modalToggler(false));
  };

  const onCloseHandler = (event, value) => {
    dispatch(modalToggler(false));
  };

  return (
    <>
      <div class="relative z-10" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto mt-56 ">
          <form class="constainer max-w-3xl mx-auto bg-slate-50 p-6 rounded-md">
            <h1 className="font-bold text-2xl font-lato text-gray-700 mb-3">
              Add Your Task
            </h1>

            <div class="grid md:grid-cols-2 md:gap-6 ">
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => formHandler(e, "task")}
                />
                <label
                  for="floating_first_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Task
                </label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <div className="container m-5  flex  h-10 w-auto font-lato">
                  <span className=" relative  text-gray-500 dark:text-gray-400 top-2 ">
                    Due Date :
                  </span>
                  <button
                    className="ml-5 w-24 h-10 border rounded-md text-sm font-bold text-gray-500"
                    onClick={(e) => showCalederHandler(e)}
                  >
                    {date}
                  </button>
                </div>
                {showCalender && (
                  <div className="z-10 absolute">
                    <Calender
                      clickEvent={datePickHandler}
                      setShowCalender={setShowCalender}
                      value={date}
                    />
                  </div>
                )}
              </div>
            </div>
            <div class="mb-5">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter description here..."
                onChange={(e) => formHandler(e, "description")}
              ></textarea>
            </div>
            <div class="container flex mb-16 ">
              <div class="relative mb-5 ">
                <DropDownButton
                  label="List"
                  list={list}
                  callBack={submitListHandler}
                />
              </div>
              <div class="relative mb-5 ml-5">
                <DropDownButton
                  label="Priority"
                  callBack={submitPriorityHandler}
                />
              </div>
            </div>
            <div className="container max-w-56 flex justify-around align-middle ml-56 mb-6">
              <SubmitButton
                heading="Submit"
                colorCode="gray"
                callBackFunction={submitHandler}
              />
              <SubmitButton
                heading="Close"
                // colorCode="yellow"
                callBackFunction={onCloseHandler}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
