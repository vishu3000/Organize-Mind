export default function SubmitButton(props) {
  const { heading, colorCode = "gray", callBackFunction } = props;

  return (
    <button
      type="submit"
      class={`text-${colorCode}-800 bg-${colorCode}-200 hover:bg-${colorCode}-800 hover:text-${colorCode}-100 focus:ring-4 focus:outline-none focus:ring-${colorCode}-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-${colorCode}-600 dark:hover:bg-${colorCode}-700 dark:focus:ring-${colorCode}-800`}
      onClick={
        typeof callBackFunction == "function"
          ? (event) => callBackFunction(event, false)
          : null
      }
    >
      {heading}
    </button>
  );
}
