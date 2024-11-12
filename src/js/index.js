// Module import

import "../css/style.css";
import {createTodoDialog, writeBackToDOM, XDelete, dialog} from "./DOMfunctions.js"
import {addNewProjectTodo, saveChanges} from "./auxFunctions.js"

// Event Listeners
const btns = document.querySelectorAll("button");

document.body.addEventListener("click", (event) => {

    let target = event.target;

    switch(target.id) {
        case "modal":
            createTodoDialog(event);
            break;

        case "add":
            event.preventDefault();
            addNewProjectTodo(event);
            break;

        case "cancel":
            event.preventDefault();
            event.stopPropagation();
            dialog.close();
            break;

        case "task":
            event.preventDefault();
            writeBackToDOM(event);
            break;
        
        case "X":
        case "delete" :
            event.preventDefault();
            XDelete(event);
            break;
        
        case "saveChanges":
            event.preventDefault();
            saveChanges(event);
            break;
    }
});