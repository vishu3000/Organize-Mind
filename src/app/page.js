/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";
import CheckList from "@/components/checkList";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { modalToggler, taskObject } from "@/Slices/taskSlice";
import FormModal from "@/components/Modals/modal";
import UpdatePanel from "@/components/UpdatePanel";
import { getFilteredList, getRestFilteredList } from "./utils/utils";
import { motion } from "framer-motion";

const dbInstance = collection(database, "Task");
export default function Home() {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks);
  const userInfo = task.userInfo;
  const listsValue = task.lists;

  const [listObject, setListObject] = useState(task.taskObject);
  const [modal, setModal] = useState(task.modelStatus);
  const [numberOfTask, setNumerOfTask] = useState(0);
  const [showUpdatePanel, setShowUpdatePanel] = useState(false);
  const updateTaskToggler = () => {
    setShowUpdatePanel(!showUpdatePanel);
  };

  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dbInstance, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData = snapshot.docs.map((doc) => {
        const detail = doc.data();
        const id = doc.id;
        const value = detail.task;
        const date = detail.dueDate;
        const uid = detail.uid;

        return {
          value: value,
          id: id,
          date: date,
          list: detail.list,
          desc: detail.description,
          priority: detail.priority,
          completed: detail.completed,
          compltedDate: detail.completedDate,
          uid: uid,
        };
      });
      const filteredData = newData.filter(
        (ele) => ele.completed == false && ele.uid == userInfo.uid
      );
      setNumerOfTask(filteredData.length);
      setListObject(filteredData);
      dispatch(taskObject(filteredData));
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setModal(task.modelStatus);
  }, [task.modelStatus]);

  return (
    <>
      <motion.div
        className={`container m-8 ${modal ? "blur-sm" : ""} w-full ${
          showUpdatePanel ? "flex" : ""
        }`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className={`${showUpdatePanel ? "w-3/4" : ""}`}>
          {/* Heading */}
          <div className="flex m-8">
            <h1 className="font-bold text-6xl font-lato text-gray-700">
              Upcoming
            </h1>
            <div className="container w-16 rounded-md border-2 ml-10 flex items-center justify-center mt-1">
              <span className="font-lato text-3xl font-semibold text-gray-500">
                {numberOfTask}
              </span>
            </div>
          </div>

          {/* Add new Task */}
          <button
            onClick={() => dispatch(modalToggler(true))}
            className="container p-2 px-11 border-2 rounded-md flex align-middle mt-6 mb-6 text-2xl"
          >
            <i class="fa-solid fa-plus  relative  text-gray-400 top-1"></i>
            <span className="font-medium left-2 relative font-lato text-gray-400 pl-3">
              Add New Task
            </span>
          </button>

          {/* Today */}
          <CheckList
            heading="Today"
            list={getFilteredList(listObject, 0)}
            listValue={listsValue}
            clickEvent={updateTaskToggler}
          />

          {/* Bottom Fragger */}
          <div className="conatiner flex justify-evenly my-6">
            {/* Tommorow */}
            <CheckList
              heading="Tommorow"
              addClass="mr-6"
              list={getFilteredList(listObject, 1)}
              listValue={listsValue}
              clickEvent={updateTaskToggler}
            />
            {/* This Week */}
            <CheckList
              heading="Rest"
              addClass="ml-6"
              list={getRestFilteredList(listObject)}
              listValue={listsValue}
              clickEvent={updateTaskToggler}
            />
          </div>
        </div>
        {/* Panel */}
        {showUpdatePanel && (
          <UpdatePanel
            clickEvent={updateTaskToggler}
            listsValue={listsValue}
            dbInstance={dbInstance}
          />
        )}
      </motion.div>

      {modal && <FormModal db={dbInstance} />}
    </>
  );
}
