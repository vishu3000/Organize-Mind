"use client";
import { database } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noDataImage from "../../../public/NoData.jpg";
import { differenceInDays, getColor, getPriorityHtml } from "../utils/utils";
import { motion } from "framer-motion";

const dbInstance = collection(database, "Task");

export default function Today() {
  const [todayList, setTodayList] = useState([]);
  const [numberOfTask, setNumerOfTask] = useState(0);
  const task = useSelector((state) => state.tasks);
  const userInfo = task.userInfo;
  const listsValue = task.lists;

  const [showDescription, setShowDescription] = useState({
    status: false,
    index: 0,
  });

  const showDescriptionHnalder = (index) => {
    setShowDescription({ status: !showDescription.status, index: index });
  };

  useEffect(() => {
    const listData = () => {
      let dummyList = [];
      getDocs(dbInstance).then((data) => {
        data.docs.forEach((item) => {
          const detail = item.data();
          const id = item.id;
          const value = detail;
          if (
            differenceInDays(detail.dueDate) == 0 &&
            detail.completed != true &&
            detail.uid == userInfo.uid
          ) {
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
        <h1 className="font-bold text-6xl font-lato text-gray-700">Today</h1>
        <div className="container w-16 rounded-md border-2 ml-10 flex items-center justify-center mt-1">
          <span className="font-lato text-3xl font-semibold text-gray-500">
            {numberOfTask}
          </span>
        </div>
      </div>

      {todayList.length > 0 ? (
        <ul className="container mt-3">
          {todayList?.map((ele, index) => {
            return (
              <li className="container pt-3 ml-6" key={index} id={ele.id}>
                <div className="">
                  <div class="flex items-center  text-xl justify-between">
                    <div>
                      <label
                        for="default-checkbox"
                        class="ms-2   text-gray-500 "
                      >
                        {ele.value.task}
                      </label>
                      {/* Priority */}
                      {getPriorityHtml(ele.value.priority)}
                      <div className="ml-6 mt-2 flex text-gray-500 text-sm font-bold font-lato container justify-between">
                        {/* Date */}
                        <span className="flex w-24 align-middle">
                          <i class="fa-solid fa-calendar-xmark relative mt-1 mr-2"></i>
                          <span>{ele.value.dueDate}</span>
                        </span>
                        {/* List Type */}
                        {ele.value.list && (
                          <div className="flex">
                            <div
                              className={`h-4 w-4 bg-${getColor(
                                listsValue,
                                ele.value.list
                              )}-200 rounded-md  mr-2`}
                            />
                            <span>{ele.value.list || ""}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Show Description Button */}
                    <div className="mr-16 text-gray-500">
                      {ele.value.description.length > 0 && (
                        <>
                          {showDescription.status &&
                          showDescription.index == index ? (
                            <i
                              class="fa-solid fa-angle-down cursor-pointer"
                              onClick={() => showDescriptionHnalder(index)}
                            ></i>
                          ) : (
                            <i
                              class="fa-solid fa-chevron-right cursor-pointer"
                              onClick={() => showDescriptionHnalder(index)}
                            ></i>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* Description */}
                {showDescription.status && showDescription.index == index && (
                  <div className="container flex mt-2 ml-20">
                    <i class="fa-solid fa-arrow-turn-up fa-rotate-90 text-xl text-gray-500"></i>
                    <span className="font-lato ml-5 text-gray-500">
                      {ele.value.description}
                    </span>
                  </div>
                )}
                {index !== todayList.length - 1 && (
                  <hr class="h-px my-3 mr-32 bg-gray-200 border-0 dark:bg-gray-700" />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <Image
            alt="No Data"
            src={noDataImage}
            width="1000"
            height="1000"
          ></Image>
        </div>
      )}
    </motion.div>
  );
}
