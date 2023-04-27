/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { Button, Input } from "antd";
import { Todo } from "./type";
import methodApi from "./redux/reducer/taskSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import "./Scss/App.scss"
import ModalShow from "./components/ModalShow";
import ListName from "./components/ListName";
import { v4 as uuidv4 } from "uuid";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [modifyingTask, setModifyingTask] = useState<string>("");
  const [modifyingTaskId, setModifyingTaskId] = useState<string>(uuidv4());
  const [inputSearch, setInputSearch] = useState<string>("");
  const [dataFilter, setDataFilter] = useState<Todo[]>([]);

  //get task list
  const taskListResponse = useSelector((state: RootState) => state.todo).flat();

  useEffect(() => {
    dispatch(methodApi.getTodos());
  }, []);

  const handleAdd = () => {
    dispatch(methodApi.addTodo({ task, modifyingTaskId }))
      .then(unwrapResult)
      .then(() => {
        setInputSearch("");
        dispatch(methodApi.getTodos());
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
    setTask("");
  };

  const handleDelete = (taskId: string) => {
    dispatch(methodApi.deleteTodo(taskId))
      .then(unwrapResult)
      .then(() => {
        setInputSearch("");
        dispatch(methodApi.getTodos());
      });
  };

  const handleUpdate = () => {
    dispatch(
      methodApi.updateTodo({ id: modifyingTaskId, updatedName: modifyingTask })
    )
      .then(unwrapResult)
      .then(() => {
        setInputSearch("");
        dispatch(methodApi.getTodos());
      });
    setShow(!show);
  };

  const toggleShow = (taskId: string, taskName: string) => {
    setModifyingTaskId(taskId);
    setModifyingTask(taskName);
    setShow(!show);
  };

  const handleSetTask = (e: any) => {
    setTask(e.target.value);
  };
  return (
    <>
      <ModalShow
        {...{ show, setShow, handleUpdate, modifyingTask, setModifyingTask }}
      />
      <div className={show ? "container blur" : "container"}>
        <div className='input-form' key={modifyingTask}>
          <p className='form-label'>To do list user </p>
          <div className='input-form_addtodo'>
            <Input
              value={task}
              type='text'
              placeholder='Enter your name...'
              onChange={handleSetTask}
              className='input-add'
            />
            <Button
              type='primary'
              onClick={handleAdd}
              disabled={!task}
              className='btn-add'
            >
              Add
            </Button>
          </div>
        </div>
        <div className='list-job'>
          <ul>
            {inputSearch.length > 0
              ? dataFilter?.map((item) => (
                  <ListName
                    key={item.id}
                    item={item}
                    toggleShow={toggleShow}
                    handleDelete={handleDelete}
                  />
                ))
              : taskListResponse?.map((item) => (
                  <ListName
                    key={item.id}
                    item={item}
                    toggleShow={toggleShow}
                    handleDelete={handleDelete}
                  />
                ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default App;
