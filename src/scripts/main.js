import { getEvents } from "./events/EventProvider.js"
import { getNews } from "./news/NewsProvider.js"
import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { getUsers } from "./users/UsersProvider.js";
import { getMessages } from "./messages/MessagesProvider.js";
import { MessageEventListener } from "./messages/MessageListener.js";
import { NavbarEventListener } from "./navbar/navbarList.js";
import { FriendsListComponent } from "./friends/FriendsList.js";
import { getFriends } from "./friends/FriendsProvider.js";
import { addSearchEventListeners } from "./friends/FriendSearchList.js";
import { initiateDashboardEventListener } from "./dashboardEvents/DashboardLoad.js";
import { MessageList } from "./messages/MessageList.js";
import { getTasks } from "./tasks/TaskProvider.js";
import { reRenderTask, TaskList } from "./tasks/TaskList.js"
import { renderTaskForm, TaskListForm } from "./tasks/TaskFormList.js"
import { TaskForm } from "./tasks/TaskForm.js";
import { TaskDialog } from "./tasks/taskDialog.js"


if(!(sessionStorage.hasOwnProperty("activeUser"))){
  getUsers()
    .then(() => logInList())
    .then(() => logInEvent())
    .then(() => getMessages())
    .then(() => getEvents())
    .then(() => getNews())
    .then(() => MessageEventListener())
    .then(() => getFriends())
    .then(() => getUsers())
    .then(() => getTasks())
    .then(() => TaskForm())
    .then(() => TaskListForm())
    .then(() => TaskList())
    .then(() => TaskDialog())
    .then(() => initiateDashboardEventListener())
}

else{
    getUsers()
      .then(() => getMessages())
      .then(() => getEvents())
      .then(() => getNews())
      .then(() => getTasks())
      .then(() => MessageEventListener())
      .then(() => getFriends())
      .then(() => {
        logInEvent()
        FriendsListComponent()
        MessageList()
        addSearchEventListeners()
        TaskForm()
        TaskListForm()
        TaskList()
        TaskDialog()
        reRenderTask()
        renderTaskForm()
        NavbarEventListener()
        initiateDashboardEventListener()
      })
}