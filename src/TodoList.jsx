import React, { useState, memo,useEffect , useRef } from 'react';
import "./scss/TodoList.scss";
import TodoItem from "./TodoItem";
import { connect } from 'react-redux';


const TodoList = memo((props) => {
  const input = useRef(null);
  // const [text, setText] = useState("");
  // text变化时不需要重新渲染的，所以不要用
  // let changeText = (e) => {
  //   setText(e.target.value);
  // };

  const submitItem =() => {
    // 点击保存
    console.log("触发了submitItem",input.current.value)
    if (input.current.value) {
      props.addItem(input.current.value);
      // setText("");
      input.current.value = "";
    }
  }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log("按下了Enter键");
      submitItem();
    }
  };
  
  // window.addEventListener('keydown', handleKeyDown);
  // 打字时text改变了，造成组件重新渲染，重新生成函数
  // 这样写会导致重复生成了多个同样组件和函数，当最后enter时会触发所有曾经存在的组件函数，并且保留当时的数据

  useEffect(() => {
    console.log("添加监听键盘")
    window.addEventListener('keydown', handleKeyDown); // 添加全局事件
    return () => {
      console.log("销毁当前组件");
      window.removeEventListener('keydown', handleKeyDown); // 销毁这个事件
    };
  });



  // 不能在函数体中调用setState函数，否则Too many re-renders.
  // todolist组件重新渲染时就会顺便更新
  let unFinishedItem = 0;
  props.itemList.forEach((item) => {
    if (item.isFinished === false) {
      unFinishedItem++;
    }
  })
  let tips = "items";
  if (unFinishedItem === 1) {
    tips = "item";
  }

  // 设置筛选模式
  const [mode , setMode] = useState(localStorage.getItem("mode")?localStorage.getItem("mode"):"all")
  localStorage.setItem("mode",mode);
  

  let changeModeToActive = () => {
    setMode("active");
    localStorage.setItem("mode","active");
  }
  let changeModeToAll = () => {
    setMode("all");
    localStorage.setItem("mode","all");
  }
  let changeModeToCompleted = () => {
    setMode("completed");
    localStorage.setItem("mode","completed");
  }

  console.log("重新渲染了TodoList组件");
  return (
    <div className='todos'>
      <div className='header'>
        <div className='tickAll' onClick={props.changeAllItemState}></div>
        <input type="text" autoComplete="off" name="newTodo" className='newTodoInput' ref={input}  placeholder=' What needs to be done?' />
        <div className='submit' onClick={submitItem} >保存</div>
      </div>
      <div className='list'>
        {
          props.itemList.map((item, index) => {
            if ((mode === "active" && item.isFinished === false) ||
              (mode === "completed" && item.isFinished === true) ||
              (mode === "all")
            ) {
              return <TodoItem
                key={item.id}
                id={item.id}
                item={item}
                deleteItem={(id) => props.deleteItem(id)}
                changeItemState={(id) => props.changeItemState(id)}
                changeItemText={(item) => props.changeItemText(item)}
              ></TodoItem>              
            } else {
              return null
            }
          })
        }
      </div>
      <div className='footer'>
        <div className='itemNums'>{ unFinishedItem } {tips} left</div>
        <div className='controller'>
          <div className={`All ${mode === "all"?"selected":"unselected"}`}  onClick={changeModeToAll} >All</div>
          <div className={`Active ${mode === "active"?"selected":"unselected"}`} onClick={changeModeToActive} >Active</div>
          <div className={`Completed ${mode === "completed"?"selected":"unselected"}`}  onClick={changeModeToCompleted} >Completed</div>
        </div>
      </div>
    </div>
  )
})

const mapStateToProps = (state) => {
  return {
    itemList: state.itemList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem(text) {
      // 直接传item对象
      const action = { type: "addItem" ,value:{
        id: Date.now(),
        text: text,
        isFinished: false,
      }};
      dispatch(action);
    },
    deleteItem(id) {
      const action = { type: "deleteItem" ,value:id};
      dispatch(action);      
    },
    changeItemState(id) {
      const action = { type: "changeItemState" ,value:id};
      dispatch(action);          
    },
    changeAllItemState() {
      const action = { type: "changeAllItemState" };
      dispatch(action);
    },
    changeItemText(item) {
      const action = { type: "changeItemText", value: item };
      console.log(item)
      dispatch(action);      
    }
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);