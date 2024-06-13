const eventConfig = {
  modalToggle: "toggle",
};

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
  const overAllCount = list.length;
  let todayCount = 0;
  list.forEach((element) => {
    if (element.date == "Today") {
      todayCount = todayCount + 1;
    }
  });
  return { overAllCount, todayCount };
};

export const getRandomColor = () => {
  const colorList = ["red", "blue", "yellow", "pink", "orange"];
  return colorList[getRandomInt(colorList.length)];
};
