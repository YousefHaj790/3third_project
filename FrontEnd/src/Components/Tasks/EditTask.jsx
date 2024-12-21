import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { updateTaskAsync, deleteTaskAsync } from "../redux/slices/fetchData";

import "../Styles/EditTask.css";

const EditTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Task } = location.state || {};

  const dispatch = useDispatch();

  const { changeStyle } = useOutletContext();

  const subjectRef = useRef(null);
  const completeDateRef = useRef(null);
  const isFavoriteRef = useRef(null);
  const isFinishedRef = useRef(null);
  const isImportantRef = useRef(null);

  useEffect(() => {
    if (Task) {
      subjectRef.current.value = Task.Subject || "";
      completeDateRef.current.value = Task.CompleteDate || "";
      isFavoriteRef.current.checked = Task.isFavorite || false;
      isFinishedRef.current.checked = Task.isFinished || false;
      isImportantRef.current.checked = Task.isImportant || false;
    }
  }, [Task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      _id: Task._id,
      Subject: subjectRef.current.value,
      CompleteDate: completeDateRef.current.value,
      isFavorite: isFavoriteRef.current.checked,
      isFinished: isFinishedRef.current.checked,
      isImportant: isImportantRef.current.checked,
    };

    dispatch(updateTaskAsync(updatedTask));

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (Array.isArray(tasks)) {
      const taskIndex = tasks.findIndex((t) => t._id === updatedTask._id);

      if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        console.error("Task not found in the tasks array.");
      }
    }
    navigate("/Tasks");
    window.location.reload();
  };

  const deleteTask = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTaskAsync(Task._id))
        .then(() => {
          console.log("Task deleted successfully");
          navigate("/Tasks");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Failed to delete task:", error);
        });
    }
  };

  return (
    <div className="EDITTASK">
      <img
        className="CLOSE"
        width="30"
        height="30"
        src="https://img.icons8.com/neon/96/delete-sign.png"
        alt="delete-sign"
        onClick={() => {
          navigate("/Tasks");
          changeStyle();
        }}
      />
      <br />

      <form className="EDITFORM" onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <br />
        <textarea name="Subject" ref={subjectRef} />
        <br />
        <br />

        <label htmlFor="completeDate">Complete Date:</label>
        <br />
        <input name="CompleteDate" type="date" ref={completeDateRef} />
        <br />
        <br />

        <label htmlFor="favorite">Favorite:</label>
        <input name="isFavorite" type="checkbox" ref={isFavoriteRef} />
        <br />

        <label htmlFor="completed">Done:</label>
        <input name="isFinished" type="checkbox" ref={isFinishedRef} />
        <br />

        <label htmlFor="important">Important:</label>
        <input name="isImportant" type="checkbox" ref={isImportantRef} />
        <br />

        <button className="EDITB" type="">
          Submit
        </button>

        <button className="DELETEB" onClick={deleteTask}>
          Delete task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
