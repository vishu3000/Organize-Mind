import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRouteDetail } from "@/app/utils/utils";

export default function SearchBar(props) {
  const { allTask } = props;
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [noMatch, setNoMatch] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    const routeDetail = getRouteDetail(searchValue, allTask);
    if (routeDetail == "no match") {
      setNoMatch(true);
    } else {
      router.push(`/${routeDetail}`);
      setNoMatch(false);
    }
    setSearchValue("");
  };

  const searchChangeHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  return (
    <form class={`max-w-md mx-auto mt-5 `}>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class={`block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
          placeholder={noMatch ? "No Match" : "Search"}
          onChange={(e) => searchChangeHandler(e)}
          required
          value={searchValue}
        />
        <button
          disabled={searchValue.length == 0 ? true : false}
          type="submit"
          onClick={(e) => submitHandler(e)}
          class={`text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 `}
        >
          Search
        </button>
      </div>
    </form>
  );
}
