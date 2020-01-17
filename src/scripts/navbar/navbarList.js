import {logInList } from "../logIn/LogInList.js"

const eventHub = document.querySelector(".container")
const messagesEventHub = document.querySelector(".appContainer")
const contentElement = document.querySelector(".navbar")

export const NavbarEventListener = () => {

  eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "logOut") {
      debugger
      sessionStorage.clear();
      document.querySelector(".friendsContainer").innerHTML=""
      document.querySelector(".newsContainer").innerHTML=""
      document.querySelector(".eventsContainer").innerHTML=""
      document.querySelector(".tasksContainer").innerHTML=""
      document.querySelector(".messagesContainer").innerHTML=""
      document.querySelector(".messagesForm").innerHTML=""
      logInList()
    }


  })

}