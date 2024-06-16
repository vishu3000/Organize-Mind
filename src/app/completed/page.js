"use client";

import { database } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getColor } from "../utils/utils";
import { motion } from "framer-motion";

const dbInstance = collection(database, "Task");

const getCategorisedList = (list) => {
  let categoryList = {};
  list.forEach((ele) => {
    const detail = ele.value;
    const listType = detail.list == "" ? "Others" : detail.list;
    if (categoryList?.[listType]?.length > 0) {
      categoryList[listType] = [
        { value: detail, id: ele.id },
        ...categoryList?.[listType],
      ];
    } else {
      categoryList[listType] = [{ value: detail, id: ele.id }];
    }
  });

  return categoryList;
};

export default function Completed() {
  const [list, setList] = useState({});
  const [numberOfTask, setNumerOfTask] = useState(0);

  const listDetail = useSelector((state) => state.tasks.lists);
  const userInfo = useSelector((state) => state.tasks.userInfo);

  useEffect(() => {
    const listData = () => {
      let dummyList = [];
      getDocs(dbInstance).then((data) => {
        data.docs.forEach((item) => {
          const detail = item.data();
          const id = item.id;
          if (detail.completed == true && detail.uid == userInfo.uid) {
            dummyList = [{ value: detail, id: id }, ...dummyList];
          }
        });
        const categorizedList = getCategorisedList(dummyList);
        setNumerOfTask(dummyList.length);
        setList(categorizedList);
      });
    };
    listData();
  }, []);
  return (
    <>
      <motion.div
        className="container m-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {/* Heading */}
        <div className="flex m-8">
          <h1 className="font-bold text-6xl font-lato text-gray-700">
            Completed
          </h1>
          <div className="container w-16 rounded-md border-2 ml-10 flex items-center justify-center mt-1">
            <span className="font-lato text-3xl font-semibold text-gray-500">
              {numberOfTask}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(list).map((ele, index) => {
            return (
              <div
                key={index}
                className={`h-96 mb-5 p-5 shadow-lg rounded-2xl bg-${getColor(
                  listDetail,
                  ele
                )}-200 overflow-y-scroll`}
              >
                <span className="text-gray-500 text-3xl font-lato font-bold">
                  {ele}
                </span>
                <ul className="mt-10">
                  {list[ele].map((task) => {
                    const hasDesc = task.value.description.length > 0;
                    return (
                      <li
                        key={task.id}
                        className="grid grid-cols-1  p-5 m-3 ml-0"
                      >
                        <span className="text-gray-600 text-2xl font-lato font-bold flex justify-between">
                          <span>
                            {task.value.task} {hasDesc ? ":" : ""}
                          </span>
                          <i
                            class="fa-solid fa-thumbs-up left-0"
                            style={{ color: "#089405" }}
                          ></i>
                        </span>
                        {hasDesc && (
                          <span className=" text-gray-600 text-lg font-lato">
                            {task.value.description}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
