import { modalToggler } from "@/Slices/taskSlice";
import { useDispatch } from "react-redux";

export default function CheckList(props) {
  const { heading, list, addClass } = props;
  const dispatch = useDispatch();
  return (
    <div className={`container p-6  border-2 rounded-md ${addClass}`}>
      {/* Heading */}
      <h1 className="font-bold text-3xl font-lato text-gray-700">{heading}</h1>
      {/* Add new Task */}
      <button
        onClick={() => dispatch(modalToggler(true))}
        className="container p-2 px-11 border-2 rounded-md flex align-middle mt-6 ml-3 text-2xl"
      >
        <i class="fa-solid fa-plus  relative  text-gray-400 top-1"></i>
        <span className="font-medium left-2 relative font-lato text-gray-400 pl-3">
          Add New Task
        </span>
      </button>

      {/* List */}
      <ul className="container mt-3">
        {list?.map((ele, index) => {
          return (
            <li className="container pt-3 ml-6" id={ele.id} key={index}>
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
              {index !== list.length - 1 && (
                <hr class="h-px my-3 mr-32 bg-gray-200 border-0 dark:bg-gray-700" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
