export default function UpdateListDropDown(props) {
  const { label, list, value, callBack } = props;

  return (
    <>
      {list?.length > 0 && (
        <>
          <label className="mt-1" for={label}>
            {label}:
          </label>
          <select
            className="ml-5 rounded-md border bg-nav p-1 h-8"
            name={label}
            id={label}
            onChange={(event) => callBack(event)}
          >
            {list.map((ele, index) => {
              let props = {
                value: ele,
              };

              if (value?.toLowerCase() == ele.toLowerCase()) {
                props = { ...props, selected: true };
              }
              return (
                <option key={index} {...props}>
                  {ele}
                </option>
              );
            })}
          </select>
        </>
      )}
    </>
  );
}
