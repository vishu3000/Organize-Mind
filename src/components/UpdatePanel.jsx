import { priorityList } from "@/app/utils/utils";
import SubmitButton from "./Buttons/SubmitButton";
import UpdateListDropDown from "./Dropdown/UpdateListDropDown";
import Calender from "./Calender/calender";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "@/firebaseConfig";

export default function UpdatePanel(props) {
  const { clickEvent, listsValue, dbInstance } = props;
  const [showCalender, setShowCalender] = useState(false);

  const updateTaskId = useSelector((state) => state.tasks.updateId);
  const collectionById = doc(database, "Task", updateTaskId);
  const [taskData, setTaskData] = useState({});
  const [date, setDate] = useState(format(Date(), "dd-MM-yyyy"));

  //   Experiment
  const [taskValue, setTaskValue] = useState(taskData.task);
  const [descValue, setDescValue] = useState(taskData.description);

  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dbInstance, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData = snapshot.docs.find((doc) => {
        return doc.id === updateTaskId;
      });
      const newDataValue = newData.data();
      setTaskData(newDataValue);
      setTaskValue(newDataValue.task);
      setDescValue(newDataValue.description);
      setDate(newDataValue.dueDate);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const showCalederHandler = () => {
    setShowCalender(!showCalender);
  };

  const datePickHandler = (datePicked) => {
    const newDate = format(datePicked, "dd-MM-yyyy");
    setDate(newDate);
  };

  //   Form Handlers

  const formHandler = (event, key) => {
    const newData = taskData;
    newData[key] = event.target.value;
    if (key == "task") setTaskValue(event.target.value);
    if (key == "description") setDescValue(event.target.value);
    setTaskData(newData);
  };

  const submitHandler = (event) => {
    taskData.dueDate = date;
    updateDoc(collectionById, taskData);
    event.preventDefault();
    clickEvent();
  };

  const deleteHandler = (event) => {
    deleteDoc(collectionById);
    event.preventDefault();
    clickEvent();
  };

  return (
    <>
      <div className="container ml-10 w-1/4 bg-nav rounded-lg top-24 mb-80 relative text-gray-700">
        {/* Header */}
        <div className="container m-5 flex justify-between font-semibold text-xl font-lato text-gray-700 max-w-72">
          <span className="">TASK :</span>
          <i
            class="fa-solid fa-xmark mt-1 cursor-pointer"
            onClick={() => clickEvent()}
          ></i>
        </div>
        {/* Name */}
        <input
          className=" m-5 flex border rounded-lg h-10  font-lato bg-inherit w-80 p-2"
          value={taskValue}
          onChange={(e) => formHandler(e, "task")}
        ></input>
        {/* Description */}
        <textarea
          className=" m-5 flex border rounded-lg h-32 font-lato bg-inherit w-80 p-2"
          value={descValue}
          onChange={(e) => formHandler(e, "description")}
        ></textarea>
        {/* List */}
        <div className="container m-5 flex h-5 w-auto font-lato">
          <UpdateListDropDown
            label="List"
            list={["-", ...listsValue.map((ele) => ele.value)]}
            value={taskData.list}
            callBack={(e) => formHandler(e, "list")}
          />
        </div>
        {/* DueDate */}
        <div className="container m-5  flex  h-10 w-auto font-lato">
          <span className="mt-2">Due Date :</span>
          <button
            className="ml-5 w-24 h-10 border rounded-md text-sm font-bold"
            onClick={() => showCalederHandler()}
          >
            {date}
          </button>
        </div>
        {showCalender && (
          <Calender
            clickEvent={datePickHandler}
            setShowCalender={setShowCalender}
            value={taskData.dueDate}
          />
        )}
        {/* Priority */}
        <div className="container ml-5 flex h-5 w-auto font-lato">
          <UpdateListDropDown
            label="Priority"
            list={priorityList}
            value={taskData.priority}
            callBack={(e) => formHandler(e, "priority")}
          />
        </div>
        <div className="container max-w-56 flex justify-around align-middle ml-12 mb-2 mt-28">
          <SubmitButton
            heading="Delete"
            colorCode="red"
            callBackFunction={deleteHandler}
          />
          <SubmitButton
            heading="Save Changes"
            colorCode="yellow"
            callBackFunction={submitHandler}
          />
        </div>
      </div>
    </>
  );
}
