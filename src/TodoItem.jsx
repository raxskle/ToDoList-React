import React, { memo, useRef } from 'react'
import "./scss/TodoItem.scss";
// import { connect } from 'react-redux';
// 在item里不要控制store里的itemList, 传递到外面去修改

const TodoItem = memo((props)=> {
  console.log(`todoItem ${props.id}, 重新渲染`);
  let text = useRef(null);
  // 用了props.deleteItem 所以会重复渲染
  const deleteIcon = useRef(null);
  const showDeleteIcon = () => {
    deleteIcon.current.style.visibility = "visible";
  }
  const fadeDeleteIcon = () => {
    deleteIcon.current.style.visibility = "hidden";
  }
  const showChangeItem = () => {
    text.current.style.display = "flex";
    text.current.value = props.item.text;
    text.current.focus();
  }
  const fadeChangeItem = () => {
    saveItemTextChange();
    text.current.style.display = "none";
  }  
  const saveItemTextChange = () => {
    console.log("cun");
    const item = {
      id: props.item.id,
      text: text.current.value,
    }
    props.changeItemText(item);
  }
  const handdleEnter = (e) => {
    if (e.keyCode === 13 && text.current.value !== "" && text.current.style.display !== "none") {
      fadeChangeItem();
    }
  }
  window.addEventListener('keydown', handdleEnter);
  return (
    <div className='item' onMouseEnter={showDeleteIcon} onMouseLeave={fadeDeleteIcon}>
      <div className='toggle' onClick={() => props.changeItemState(props.item.id)}>
        {
          props.item.isFinished === true ? <img className='toggleImg' src={require('./assets/image/273-checkmark.png')} alt=''/> : <></>
        }
      </div>
      <div className='itemText' onDoubleClick={showChangeItem}>
        <p className={props.item.isFinished === true ? "finished" : ""}>
          {props.item.text}
        </p>
        <input type="text" className='changeText' ref={text} onBlur={fadeChangeItem } />
      </div>
      
      <div className='deleteItem' ref={deleteIcon} onClick={()=>props.deleteItem(props.item.id)}></div>
    </div>
  )
})

export default TodoItem;