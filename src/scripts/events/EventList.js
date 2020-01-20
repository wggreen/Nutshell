import { useEvents, saveEvent, editEvent, deleteEvent } from "./EventProvider.js"
import { useFriends } from "../friends/FriendsProvider.js"
import { EventComponent } from "./Event.js"
import { EventsForm } from "./EventForm.js"
import { EventEditRender } from "./EventEditRender.js"
import { EventDeleteRender } from "./EventDeleteRender.js"

const contentTarget = document.querySelector(".eventsRenderArea")
const formTarget = document.querySelector(".eventsFormArea")
const eventHub = document.querySelector(".container")

const render = (eventsArray) => {
    contentTarget.innerHTML = eventsArray.map(event => {
        // Get HTML representation of product
        const html = EventComponent(event)

        return html
    }).join("")
}

const renderForm = () => {
    formTarget.innerHTML = ""
    formTarget.innerHTML = EventsForm()
}

const renderButton = () => {
    const buttonTarget = document.querySelector(".addEventsButton")
    buttonTarget.innerHTML = `
    <button id="addEventButton">Add event</button>
    `
}

export const EventList = () => {

    const events = useEvents()
    const friends = useFriends()

    let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10)

    const usersEvents = events.filter(
        event =>
            event.userId === currentUserId
    )

    let friendsEvents = []
    friends.map(friend => {
        if (friend.friendInitiateId === currentUserId) {
            events.filter(
                event => {
                    if (event.userId === friend.user.id) {
                        friendsEvents.push(event)
                    }
                }
            )
        }
    })

    const combinedArray = usersEvents.concat(friendsEvents)

    //Listens for click fo Save Event button
    eventHub.addEventListener("eventSaved", event => {
        if (event.detail.wasEventSaved === "yes") {
            const updatedEvents = useEvents()
            const updatedUsersEvents = updatedEvents.filter(
                event =>
                    event.userId === currentUserId
            )
        
            let updatedFriendsEvents = []
            friends.map(friend => {
                if (friend.friendInitiateId === currentUserId) {
                    updatedEvents.filter(
                        event => {
                            if (event.userId === friend.user.id) {
                                updatedFriendsEvents.push(event)
                            }
                        }
                    )
                }
            })
        
            const updatedCombinedArray = updatedUsersEvents.concat(updatedFriendsEvents)
            render(updatedCombinedArray)
            renderForm()
            renderButton()
            EventEditRender(updatedCombinedArray)
            EventDeleteRender(updatedCombinedArray)
            const dialogTarget = document.querySelector(".eventDialog")
            dialogTarget.close()
        }
    })

    

        //saves edit message


    render(combinedArray)
    renderForm()
    EventEditRender(combinedArray)
    EventDeleteRender(combinedArray)
    renderButton()
}

// Listens for click of Add Event button
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "addEventButton") {
    const dialogTarget = document.querySelector(".eventDialog")
    dialogTarget.showModal()
    }
})

// Listens for click of Save Event button
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "closeEventDialog") {
        const newEvent = {
            userId: parseInt(sessionStorage.getItem("activeUser"), 10),
            name: document.getElementById("eventTitleText").value,
            date: document.getElementById("eventDateTime").value,
            location: document.getElementById("eventLocationText").value
        }

        const message = new CustomEvent("eventSaved", {
            detail: {
                wasEventSaved: "yes"
            }
        })

        saveEvent(newEvent)
            .then(() => {
                eventHub.dispatchEvent(message)
            })
    }
})

//Listens for click of Edit Event button
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("editEvent--")) {
    const [prefix, id] = event.target.id.split("--")
    const editEvent = new CustomEvent("editEventButtonClicked", {
        detail: {
        eventId: id
        }
    })
    eventHub.dispatchEvent(editEvent)
    }
})

//Listens for click of Edit Event button
eventHub.addEventListener("editEventButtonClicked", event => {
    const eventToEdit = event.detail.eventId
    const allEvents = useEvents()
    const foundEvent = allEvents.find(
        (currentEvent) => {
            return currentEvent.id === parseInt(eventToEdit, 10)
        }
    )
    document.querySelector(`#eventName--${eventToEdit}`).value = foundEvent.name
    document.querySelector(`#eventLocation--${eventToEdit}`).value = foundEvent.location 
    const theDialog = document.querySelector(`#eventDetails--${foundEvent.id}`)
    theDialog.showModal()     
})


// Listens for click of Save Edit button
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("saveEventEdit")) {
      const [prefix, eventId] = clickEvent.target.id.split("--")
      const editedEvent = {
          id: parseInt(eventId, 10),
          userId: parseInt(sessionStorage.getItem("activeUser"), 10),
          name: document.querySelector(`#eventName--${eventId}`).value,
          date: document.querySelector(`#eventDate--${eventId}`).textContent.split("Date: ")[1],
          location: document.querySelector(`#eventLocation--${eventId}`).value
        }
        editEvent(editedEvent)
            .then(() => {
                const updatedEvents = useEvents()
                render(updatedEvents)
                EventEditRender(updatedEvents)
                EventDeleteRender(updatedEvents)
                renderForm()
            })
    }
})

//Listens for click of Delete Event button
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteEvent--")) {
    let [prefix, eventId] = event.target.id.split("--")
    eventId = parseInt(eventId, 10)
    deleteEvent(eventId)
        .then(() => {
            const updatedEvents = useEvents()
            render(updatedEvents)
            EventEditRender(updatedEvents)
            EventDeleteRender(updatedEvents)
            renderForm()
        })
    }
})