/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";
import CheckList from "@/components/checkList";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { taskObject } from "@/Slices/taskSlice";
import FormModal from "@/components/Modals/modal";

const dbInstance = collection(database, "Task");
export default function Home() {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks);

  const [listObject, setListObject] = useState(task.taskObject);
  const [modal, setModal] = useState(task.modelStatus);
  const [numberOfTask, setNumerOfTask] = useState(0);

  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dbInstance, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData = snapshot.docs.map((doc) => {
        const detail = doc.data();
        const id = doc.id;
        const value = detail.task;
        const date = detail.dueDate;
        setNumerOfTask((prevData) => prevData + 1);
        return { value: value, id: id, date: date, list: detail.list };
      });
      setListObject(newData);
      dispatch(taskObject(newData));
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
      <div className={`container m-8 ${modal ? "blur-sm" : ""}`}>
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

        {/* Today */}
        <CheckList
          heading="Today"
          list={listObject.filter((ele) => ele.date == "Today")}
        />

        {/* Bottom Fragger */}
        <div className="conatiner flex justify-evenly my-6">
          {/* Tommorow */}
          <CheckList
            heading="Tommorow"
            addClass="mr-6"
            list={listObject.filter((ele) => ele.date == "Tommorow")}
          />
          {/* This Week */}
          <CheckList
            heading="This Week"
            addClass="ml-6"
            list={listObject.filter(
              (ele) => ele.date != "Today" && ele.date != "Tommorow"
            )}
          />
        </div>
      </div>
      {modal && <FormModal />}
    </>
  );
}
