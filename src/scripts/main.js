import { getUsers } from "./users/UsersProvider.js";
import { getEvents } from "./events/EventProvider.js"
import { getMessages } from "./messages/MessagesProvider.js"
import { getNews } from "./news/NewsProvider.js"
import { logInList } from "./logIn/LogInList.js";
import { logInEvent } from "./logIn/LogInForm.js";
import { MessageEventListener } from "./messages/MessageListener.js"
import { EventsEventListener } from "./events/EventsListener.js"
import { NewsListener } from "./news/NewsListener.js"
import { NavbarEventListener } from "./navbar/navbarList.js";
import { FriendsListComponent} from "./friends/FriendsList.js";
import { getFriends } from "./friends/FriendsProvider.js";
import { addSearchEventListeners } from "./friends/FriendSearchList.js";
import { initiateDashboardEventListener } from "./dashboardEvents/DashboardLoad.js";
import { MessageList } from "./messages/MessageList.js";


if(!(sessionStorage.hasOwnProperty("activeUser"))){
getUsers()
  .then(() =>{
  logInList()})
  .then(() => logInEvent())
  .then(() => getMessages())
  .then(() => MessageEventListener())
  .then(getFriends)
  .then(getUsers)
  .then(() => {
    initiateDashboardEventListener()
  })}
  
  else{
    getUsers().then(getMessages)
  .then(() => MessageEventListener())
  .then(getFriends)
  // .then(getUsers)
  .then(() => {
    logInEvent()
    FriendsListComponent()
    MessageList()
    addSearchEventListeners()
    NavbarEventListener()
    initiateDashboardEventListener()
  })}
