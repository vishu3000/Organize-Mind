import { updateTaskId } from "@/Slices/taskSlice";
import { getColor, getPriorityHtml } from "@/app/utils/utils";
import { database } from "@/firebaseConfig";
import { format } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

/* eslint-disable react/no-unescaped-entities */
export default function CheckList(props) {
  const { heading, list, addClass, listValue, clickEvent } = props;

  const [showDescription, setShowDescription] = useState({
    status: false,
    index: 0,
  });

  const dispatch = useDispatch();

  const showDescriptionHnalder = (index) => {
    setShowDescription({ status: !showDescription.status, index: index });
  };

  const updateStatus = (element) => {
    const collectionById = doc(database, "Task", element.id);
    updateDoc(collectionById, {
      completed: true,
      completedDate: format(Date(), "dd-MM-yyyy"),
    });
  };


  return (
    <div className={`container p-6  border-2 rounded-md ${addClass}`}>
      {/* Heading */}
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl font-lato text-gray-700">
          {heading}
        </h1>
        {list.length == 0 && (
          <i
            class="fa-solid fa-circle-check text-3xl"
            style={{ color: "#63E6BE" }}
          ></i>
        )}
      </div>

      {/* List */}
      {list.length > 0 ? (
        <ul className="container mt-3">
          {list?.map((ele, index) => {
            return (
              <li className="container pt-3 ml-6" id={ele.id} key={index}>
                <div class="flex items-center  text-xl  justify-between">
                  {/* Task Name and Check Box */}
                  <div>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onClick={() => updateStatus(ele)}
                    />
                    <label
                      for="default-checkbox"
                      class="ms-2 text-gray-500 text-xl "
                    >
                      {ele.value}
                    </label>
                    {/* Priority */}
                    {getPriorityHtml(ele.priority)}
                    <div className="ml-6 mt-2 flex text-gray-500 text-sm font-bold font-lato container justify-between">
                      {/* Date */}
                      <span className="flex w-24 align-middle">
                        <i class="fa-solid fa-calendar-xmark relative mt-1 mr-2"></i>
                        <span>{ele.date}</span>
                      </span>
                      {/* List Type */}
                      {ele.list && (
                        <div className="flex">
                          <div
                            className={`h-4 w-4 bg-${getColor(
                              listValue,
                              ele.list
                            )}-200 rounded-md  mr-2`}
                          />
                          <span>{ele.list || ""}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Show Description Button */}
                  <div className="mr-16 text-gray-500">
                    <i
                      class="fa-solid fa-gears cursor-pointer mr-10"
                      onClick={() => {
                        clickEvent();
                        dispatch(updateTaskId(ele.id));
                      }}
                    ></i>
                    {ele.desc.length > 0 && (
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

                {/* Description */}
                {showDescription.status && showDescription.index == index && (
                  <div className="container flex mt-2 ml-20">
                    <i class="fa-solid fa-arrow-turn-up fa-rotate-90 text-xl text-gray-500"></i>
                    <span className="font-lato ml-5 text-gray-500">
                      {ele.desc}
                    </span>
                  </div>
                )}
                {index !== list.length - 1 && (
                  <hr class="h-px my-3 mr-32 bg-gray-200 border-0 dark:bg-gray-700" />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-xl font-lato text-gray-700 mt-10">
          " No Task Listed or Pending "
        </div>
      )}
    </div>
  );
}
