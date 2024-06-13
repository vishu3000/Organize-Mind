"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseConfig";

const dbInstance = collection(database, "Task");

export default function Today() {
  const [todayList, setTodayList] = useState([]);
  const [numberOfTask, setNumerOfTask] = useState(0);
  useEffect(() => {
    const listData = () => {
      let dummyList = [];
      getDocs(dbInstance).then((data) => {
        data.docs.forEach((item) => {
          const detail = item.data();
          const id = item.id;
          const value = detail.task;
          if (detail.dueDate == "Today") {
            dummyList = [{ value: value, id: id }, ...dummyList];
          }
          setNumerOfTask(dummyList.length);
          setTodayList(dummyList);
        });
      });
    };
    listData();
  }, []);
  return (
    <div className="container m-8">
      {/* Heading */}
      <div className="flex m-8">
        <h1 className="font-bold text-6xl font-lato text-gray-700">Today</h1>
        <div className="container w-16 rounded-md border-2 ml-10 flex items-center justify-center mt-1">
          <span className="font-lato text-3xl font-semibold text-gray-500">
            {numberOfTask}
          </span>
        </div>
      </div>

      {/* <CheckList heading="Today" onClick={showModal} list={listObject.today} /> */}

      {/* List */}
      <ul className="container mt-3">
        {todayList?.map((ele, index) => {
          return (
            <li className="container pt-3 ml-6" key={index} id={ele.id}>
              <div className="">
                <div class="flex items-center  text-xl ">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="default-checkbox" class="ms-2   text-gray-500 ">
                    {ele.value}
                  </label>
                </div>
              </div>
              {index !== todayList.length - 1 && (
                <hr class="h-px my-3 mr-32 bg-gray-200 border-0 dark:bg-gray-700" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
