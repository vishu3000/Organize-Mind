const eventConfig = {
  modalToggle: "toggle",
};

export const ListFormColors = [
  "red",
  "yellow",
  "blue",
  "green",
  "cyan",
  "pink",
  "gray",
];

export const priorityList = ["-", "High", "Mid", "Low"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const dispatcher = (props) => {
  const key = props.key;
  const detail = props.detail;
  const event = new CustomEvent(eventConfig[key], {
    detail: {
      detail,
    },
  });
  document.dispatchEvent(event);
};

export const getCount = (list) => {
  const overAllCount = list.filter(
    (ele) => ele.data().completed != true
  ).length;
  let todayCount = 0;

  list.forEach((element) => {
    const completed = element.data().completed;
    if (differenceInDays(element.data().dueDate) == 0 && !completed) {
      todayCount = todayCount + 1;
    }
  });
  return { overAllCount, todayCount };
};

export const getRandomColor = () => {
  const colorList = ["red", "blue", "yellow", "pink", "orange"];
  return colorList[getRandomInt(colorList.length)];
};

export const getPriorityHtml = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return (
        <i class="fa-solid fa-angles-up ml-5" style={{ color: "#db0000" }}></i>
      );

    case "mid":
      return (
        <i class="fa-solid fa-angles-up ml-5" style={{ color: "#FFD43B" }}></i>
      );
    case "low":
      return (
        <i class="fa-solid fa-angles-up ml-5" style={{ color: "#63e6be" }}></i>
      );

    default:
      return <></>;
  }
};

export const getFilteredList = (list, difference) => {
  return list.filter((ele) => {
    const todayTime = new Date().getTime();
    const newFormatDate = formattedDate(ele.date);
    const selectedDateTime = new Date(newFormatDate.toString()).getTime();
    const Difference_In_Time = selectedDateTime - todayTime;
    const Difference_In_Days = Math.ceil(
      Difference_In_Time / (1000 * 3600 * 24)
    );

    return Difference_In_Days == difference;
  });
};

export function differenceInDays(date) {
  const todayTime = new Date().getTime();
  const newFormatDate = formattedDate(date);
  const selectedDateTime = new Date(newFormatDate.toString()).getTime();
  const Difference_In_Time = selectedDateTime - todayTime;
  const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
}

export const getRestFilteredList = (list) => {
  return list.filter((ele) => {
    const Difference_In_Days = differenceInDays(ele.date);
    return Difference_In_Days !== 0 && Difference_In_Days !== 1;
  });
};

const formattedDate = (date) => {
  const array = date.split("-");
  return `${array[1]}-${array[0]}-${array[2]}`;
};

export const getColor = (listValue, listType) => {
  const desiredObject = listValue.find(
    (ele) => ele.value.toLowerCase() === listType.toLowerCase()
  );
  if (listType == "Others") {
    return "black";
  }
  return desiredObject.color;
};

export const getRouteDetail = (value, list) => {
  let target = "";
  const targetObject = list.find((ele) => {
    const taskValue = ele.data().task;
    return taskValue.toLowerCase() == value.toLowerCase();
  });
  console.log(targetObject.data());

  if (targetObject == undefined) {
    return "no match";
  }
  // Completed
  if (targetObject?.data().completed == true) {
    return "completed";
  }
  // Check for List Type
  if (targetObject?.data().list !== "") {
    target = targetObject?.data().list;
    return `lists/${target}`;
  }
  // Today
  if (differenceInDays(targetObject?.data().dueDate) == 0) {
    return "today";
  }

  return "";
};
