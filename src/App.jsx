import React from 'react';
// import { useState } from 'react';
import "./scss/App.scss";
import TodoList from "./TodoList";

export default function App() {
  return (
    <div className='app'>
      <div className='title'>Todos</div>
      <TodoList></TodoList>
      <div className='pageTail'>
        <p>Double-click to edit a todo</p>
        <p>Developed by Raxskle🥤 using React</p>
      </div>
    </div>
  )
}
