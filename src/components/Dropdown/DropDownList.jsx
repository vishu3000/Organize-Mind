export default function DropDownList({ list, callBack, isSelected }) {
  const setValueHandler = (value) => {
    callBack(value);
  };
  return (
    <div
      id="dropdown"
      class="z-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        {list?.map((item, index) => {
          return (
            <li
              key={index}
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setValueHandler(item), isSelected();
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
