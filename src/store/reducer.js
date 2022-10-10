const defaultState = {
  itemList: JSON.parse(localStorage.getItem("itemList"))
    ? JSON.parse(localStorage.getItem("itemList"))
    : [],
};

let reducer = (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "addItem":
      // value是item对象
      newState.itemList.push(action.value);
      // console.log(newState.itemList);
      localStorage.setItem("itemList", JSON.stringify(newState.itemList));
      // console.log(JSON.parse(localStorage.getItem("itemList")));
      break;
    case "deleteItem":
      // value是id
      newState.itemList.forEach((item, index) => {
        if (item.id === action.value) {
          newState.itemList.splice(index, 1);
        }
      });
      localStorage.setItem("itemList", JSON.stringify(newState.itemList));
      // console.log(JSON.parse(localStorage.getItem("itemList")));
      break;
    case "changeItemState":
      // value是id
      newState.itemList.forEach((item, index) => {
        if (item.id === action.value) {
          item.isFinished = !item.isFinished;
        }
      });
      localStorage.setItem("itemList", JSON.stringify(newState.itemList));
      // console.log(JSON.parse(localStorage.getItem("itemList")));
      break;
    case "changeAllItemState":
      // value不需要
      // 遇到true就转为false
      // 当全是true时，全部变为false
      let ifAllTrue = true;
      newState.itemList.forEach((item, index) => {
        if (item.isFinished === false) {
          item.isFinished = !item.isFinished;
          ifAllTrue = false;
        }
      });
      if (ifAllTrue === true) {
        newState.itemList.forEach((item, index) => {
          item.isFinished = false;
        });
      }
      localStorage.setItem("itemList", JSON.stringify(newState.itemList));
      // console.log(JSON.parse(localStorage.getItem("itemList")));
      break;
    case "changeItemText":
      // value是item对象,包含id和text
      newState.itemList.forEach((item, index) => {
        if (item.id === action.value.id) {
          item.text = action.value.text;
        }
      });
      localStorage.setItem("itemList", JSON.stringify(newState.itemList));
      // console.log(JSON.parse(localStorage.getItem("itemList")));
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
