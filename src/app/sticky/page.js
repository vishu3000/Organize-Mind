/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { modalToggler } from "@/Slices/taskSlice";
import StickyModal from "@/components/Modals/stickyModal";
import { database } from "@/firebaseConfig";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor } from "../utils/utils";

const dbInstance = collection(database, "StickyNotes");
export default function sticky() {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks);
  const [modal, setModal] = useState(task.modelStatus);
  const [list, setList] = useState([]);

  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dbInstance, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData = snapshot.docs.map((doc) => {
        const detail = doc.data();
        const id = doc.id;
        const color = getRandomColor();
        return { value: detail, id: id, color: color };
      });
      setList(newData);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const deleteHandler = (event, id) => {
    const collectionById = doc(database, "StickyNotes", id);
    deleteDoc(collectionById);
    event.preventDefault();
  };

  useEffect(() => {
    setModal(task.modelStatus);
  }, [task.modelStatus]);
  return (
    <>
      <div className={`container m-8 ${modal ? "blur-sm" : ""}`}>
        {/* Heading */}
        <div className="flex m-8">
          <h1 className="font-bold text-6xl font-lato text-gray-700">
            Sticky Wall
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-8 border rounded-lg p-5 mr-28">
          {list &&
            list.map((ele, index) => {
              return (
                <div
                  class={`rounded-lg p-7 bg-${ele.color}-200 min-h-96 shadow-2xl`}
                  key={index}
                  data-id={ele.id}
                  onClick={(e) => deleteHandler(e, ele.id)}
                >
                  <h1 className="font-bold text-2xl font-lato text-gray-800 mb-5">
                    {ele.value.task}
                  </h1>
                  <span className="font-bold text font-lato text-gray-700">
                    {ele.value.description}
                  </span>
                </div>
              );
            })}

          {/* Button */}
          <div
            class="rounded-lg p-7 bg-slate-300 min-h-96 shadow-2xl cursor-pointer"
            onClick={() => dispatch(modalToggler(true))}
          >
            <i class="fa-solid fa-plus relative text-8xl text-gray-700 top-28 left-32"></i>
          </div>
        </div>
      </div>
      {modal && <StickyModal />}
    </>
  );
}
