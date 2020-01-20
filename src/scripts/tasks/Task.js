export const TaskComponent = tasks => {
  return `
    <section id="taskCard--${tasks.id}" class="taskCard">
      <div class="taskCardInfo">Name: ${tasks.user.userName}</div>
      <div class="taskCardInfo">To Do:
        <ul>
          <li>${tasks.name}</li>
        </ul>
      </div>
      <div class="taskCardInfo">Date:
        <ul>
          <li>${tasks.completionDate}</li>
        </ul>
      </div>
      <div>
        Task Completed: <input id="hideTask--${tasks.id}" class="hideTask" type="checkbox">
      </div>
      <button id="editTask--${tasks.id}" class="editTask btn btn-secondary">Edit Task
      </button>
      <dialog>
        <input id="hidden-value" type="hidden">
        <div class="taskFormInfo">
          Task: <input id="task-name--${tasks.id}" class="task-name" type="text" placeholder="Please enter task.....">
        </div>
        <div class="taskFormInfo">
          Completion Date: <input id="task-date--${tasks.id}" class="task-date" type="date">
        </div>
        <button id="deleteTask--${tasks.id}" class="btn btn-secondary">Delete Task</button>
        <button id="saveTask--${tasks.id}" class="saveTaskBtn btn btn-primary">Save Task
        </button>
      </dialog>
    </section>
          `;
  // <button id="closeDialog--" class="closeBtn btn btn-secondary">Close</button>
};
