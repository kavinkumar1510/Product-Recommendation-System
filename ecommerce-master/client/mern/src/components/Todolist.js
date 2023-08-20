import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FoodItem, todoListState } from "../store";
import { v4 as uuidv4 } from "uuid";
import New from "./New";
function Todolist() {
  const setTodoList = useSetRecoilState(todoListState);
  const [foods, setFood] = useState("");
  const todoList = useRecoilValue(todoListState);
  const [todo, settodo] = useState("");
  const SetNewFood = useSetRecoilState(FoodItem);
  const additem = () => {
    const newtodo = {
      id: uuidv4(),
      title: todo,
      completed: false,
    };
    setTodoList((prev) => [...prev, newtodo]);
    settodo("");
  };

  const deleteitem = (id) => {
    const filteredList = todoList.filter((todoItem) => id !== todoItem.id);
    setTodoList(filteredList);
  };
  const [update, setUpdate] = useState("");
  const updateitem = (id) => {
    const updatedList = todoList.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, title: update } : todoItem
    );
    setTodoList(updatedList);
    setUpdate("");
  };
  const handlecheck = (id) => {
    const checked = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(checked);
  };
  const addfood = () => {
    const puthufood = {
      id: uuidv4(),
      foodname: foods,
    };
    console.log(puthufood);
    SetNewFood((oldfood) => [...oldfood, puthufood]);
  };
  return (
    <>
      <input type="name" onChange={(e) => setFood(e.target.value)} />
      <button onClick={addfood}>add food</button>
      <input
        placeholder="title"
        type="name"
        value={todo}
        onChange={(e) => settodo(e.target.value)}
      />
      <button onClick={additem}>add todo</button>
      {todoList.map((todoItem) => (
        <div key={todoItem.id}>
          <h3>{todoItem.title}</h3>
          <input
            type="text"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />
          <button onClick={() => updateitem(todoItem.id)}>update title</button>
          <p>Completed: {todoItem.completed ? "Yes" : "No"}</p>
          <label>finished</label>
          <input type="checkbox" onChange={() => handlecheck(todoItem.id)} />
          <br />
          <button onClick={() => deleteitem(todoItem.id)}>delete</button>
        </div>
      ))}
      <h3>Food Items</h3>
      <New />
    </>
  );
}

export default Todolist;
