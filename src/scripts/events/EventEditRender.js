export const EventEditRender = (events) => {
    debugger
    events.map(event => {
      const contentTarget =  document.querySelector(`.editButtonContainer--${event.id}`)
      if (event.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
        contentTarget.innerHTML = `
        <button id="editEvent--${event.id}">Edit Event</button>
        `
      }
    })
  }
  