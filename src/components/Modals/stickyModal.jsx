import { addDoc, collection } from "firebase/firestore";
import SubmitButton from "../Buttons/SubmitButton";
import { database } from "@/firebaseConfig";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalToggler } from "@/Slices/taskSlice";

const dbInstance = collection(database, "StickyNotes");
export default function StickyModal() {
  const initialState = useSelector((state) => state.tasks);
  const userInfo = initialState.userInfo;
  let initialFormValues = {
    task: "",
    description: "",
    uid: userInfo.uid,
  };
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormValues);
  const formHandler = (event, key) => {
    const newData = formData;
    newData[key] = event.target.value;
    setFormData(newData);
  };
  const submitHandler = (event) => {
    addDoc(dbInstance, formData).then(setFormData(initialFormValues));
    event.preventDefault();
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
              Add Sticky Note
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
            <div className="container max-w-56 grid grid-cols-2 gap-4 ml-56 mb-6">
              <SubmitButton
                heading="Submit"
                // colorCode="gray"
                callBackFunction={submitHandler}
              />
              <SubmitButton
                heading="Close"
                colorCode="yellow"
                callBackFunction={onCloseHandler}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
