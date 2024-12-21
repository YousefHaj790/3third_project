import React, { useState, useEffect } from "react";
import "../Styles/Management.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingGIF from "../Images/loading-7528_256.gif";
import { Link, Outlet } from "react-router-dom";
import AddTask from "../Tasks/AddTask";
import {
  selectStatus,
  getTasksAsync,
  selectTasks,
} from "../redux/slices/fetchData";

const Management = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const tasksFromRedux = useSelector(selectTasks);

  const [localTasks, setLocalTasks] = useState([]);
  const [disable, setDisable] = useState("initial");

  const yourName = sessionStorage.getItem("username");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    console.log("Stored tasks from localStorage:", storedTasks);

    setLocalTasks(JSON.parse(storedTasks));
    dispatch(getTasksAsync());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched tasks from Redux:", tasksFromRedux);
    if (tasksFromRedux.length > 0) {
      setLocalTasks(tasksFromRedux);
      localStorage.setItem("tasks", JSON.stringify(tasksFromRedux));
    }
  }, [tasksFromRedux]);

  const disablPage = {
    pointerEvents: disable,
    // opacity:opacity
  };

  const disableClicks = () => {
    setDisable((prev) => (prev === "none" ? "initial" : "none"));
    // setOpacity('0.5')
  };

  return (
    <div>
      <h1 className="h1-main">
        {" "}
        Welcome {yourName} to your task manager &#9787;
      </h1>

      <AddTask />

      {status === "loading" && (
        <div>
          <img className="Loading" src={LoadingGIF} alt="Loading" />
        </div>
      )}

      <div className="Tasks" style={disablPage}>
        {localTasks.length > 0 ? (
          localTasks.map((task) => (
            <Link
              to={`/Tasks/${task._id}`}
              state={{ Task: task }}
              key={task._id}
              className="task-link" // Optional: add a class for styling
            >
              <div
                onClick={disableClicks}
                style={{ backgroundColor: task.isFinished ? "green" : "none" }}
                className="task-item" // Optional: add a class for styling
              >
                <h3>{task.Subject}</h3>
                <br />
                <h2
                  className="I_have_to"
                  style={{ float: "left", marginRight: "5px" }}
                >
                  I have to complete this task in:
                </h2>
                <h3>
                  {task.CompleteDate
                    ? task.CompleteDate.toString().split("T")[0]
                    : ""}
                </h3>
                <br />
                <br />
                <img
                  style={{
                    height: "1rem",
                    width: "1rem",
                    float: "left",
                    marginRight: "5px",
                    display: task.isFavorite ? "block" : "none",
                  }}
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios/50/favorites.png"
                  alt="favorites"
                />
                <img
                  style={{
                    height: "1rem",
                    width: "1rem",
                    float: "left",
                    marginRight: "5px",
                    display: task.isImportant ? "block" : "none",
                  }}
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ink/48/important-book.png"
                  alt="important-book"
                />
                <img
                  style={{
                    height: "1rem",
                    width: "1rem",
                    display: task.isFinished ? "block" : "none",
                  }}
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/task-completed.png"
                  alt="task-completed"
                />
              </div>
            </Link>
          ))
        ) : (
          <span style={{ fontSize: "2rem" }}>
            No tasks found ,please connect to your account
          </span>
        )}
      </div>

      <Outlet context={{ changeStyle: disableClicks }} />
    </div>
  );
};

export default Management;
