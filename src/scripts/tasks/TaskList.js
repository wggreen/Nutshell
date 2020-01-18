import { useTasks, deleteTask, getTasks } from "./TaskProvider.js";
import { useUsers } from "../users/UsersProvider.js";
import { TaskComponent } from "./Task.js";

export const TaskList = () => {
  const eventHub = document.querySelector(".container");
  const targetElement = document.querySelector(".tasksContainer");

  // Edit Task btn clicked
  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editTask--")) {
      const [prefix, taskId] = clickEvent.target.id.split("--");
      const editTaskCustomEvent = new CustomEvent("edit-btn-has-been-click", {
        detail: {
          taskId: taskId
        }
      });
      eventHub.dispatchEvent(editTaskCustomEvent);
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("saveTask--")) {
      const taskName = document.querySelector("#task-name").value;
      const taskCompletionDate = document.querySelector("#task-date").value;

      const saveTaskCustomEvent = new CustomEvent("task-saved", {
        detail: {
          taskName: taskName,
          taskCompletionDate: taskCompletionDate
        }
      });
      eventHub.dispatchEvent(saveTaskCustomEvent);
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.classList.contains("saveTaskBtn")) {
      const updateTask = useTasks();
      renderTask(updateTask);
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteTask--")) {
      const [prefix, taskId] = clickEvent.target.id.split("--");
      deleteTask(taskId).then(() => {
        const taskHasBeenDeletedCustomEvent = new CustomEvent("task-deleted");
        eventHub.dispatchEvent(taskHasBeenDeletedCustomEvent);

        const updateTask = useTasks();
        renderTask(updateTask);
      });
    }
  });

  eventHub.addEventListener("update", clickEvent => {
    const updateTask = useTasks();
    renderTask(updateTask);
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.classList.contains("saveTaskBtn")) {
      console.log("Save");
      getTasks().then(() => {
        const updateTask = useTasks();
        renderTask(updateTask);
      });
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "button--logIn") {
      const gotTask = useTasks();
      renderTask(gotTask);
    }
  });

  // render tasks
  const gotUsers = useUsers();

  const renderTask = taskCollection => {
    const foundTask = taskCollection.filter(
      // Display task associated with active user
      task => task.userId === parseInt(sessionStorage.getItem("activeUser"), 10)
    );
    targetElement.innerHTML = foundTask
      .map(taskFound => {
        // Display user that's associated with task
        const findUser = gotUsers.filter(user => taskFound.userId === user.id);
        const HTMLRepresentation = TaskComponent(taskFound, findUser);
        return HTMLRepresentation;
      })
      .join("");
  };
};
