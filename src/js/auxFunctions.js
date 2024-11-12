// Module import

import { todo } from "./constructors.js";
import {
  populateLeftPanel,
  legendName,
  removeTaskDetails,
  manipulateCSSModal,
  manipulateCSS,
  dialog,
} from "./DOMfunctions.js";

// Global variables

export let projects = {}; // This is the object that then will be passed as JSON
let todoArray = []; // This will store the individual todo task

// Auxiliary functions

export function addNewProjectTodo(event) {
  event.preventDefault();
  let idForCSS;

  // Grab DOM variables

  let DOMElements = grabDOMElements();

  // Add new project if necessary and its new To-do list

  addTodoToJSON(
    DOMElements.title,
    DOMElements.description,
    DOMElements.dueDate,
    DOMElements.priority,
    DOMElements.notes
  );

  // Return the values inside the dialog to blank

  resetValues(
    DOMElements.title,
    DOMElements.description,
    DOMElements.dueDate,
    DOMElements.priority,
    DOMElements.notes
  );

  dialog.close();
}

function grabDOMElements() {
  let title = document.querySelector(".title").value;
  let description = document.querySelector(".description").value;
  let dueDate = document.querySelector(".dueDate").value;
  let priority = document.querySelector(".priority").value;
  let notes = document.querySelector(".notes").value;

  return { title, description, dueDate, priority, notes };
}

function addTodoToJSON(title, description, dueDate, priority, notes) {
  let newID = `${Date.now()}`;

  // Add new Todo list to array
  let newTodo = new todo(newID, title, description, dueDate, priority, notes);
  todoArray.push(newTodo);

  // Check if project exists in projects object and adds it if not
  if (legendName in projects) {
    projects[legendName].push(newTodo);
  } else {
    projects[legendName] = [];
    projects[legendName].push(newTodo);
  }

  // Adds Project/todo to localstorage as JSON
  localStorage.setItem("todoArrayJSON", JSON.stringify(projects));
  projects = JSON.parse(localStorage.getItem("todoArrayJSON"));

  populateLeftPanel();
  manipulateCSSModal(newID);
}

function resetValues(title, description, dueDate, priority, notes) {
  title = "";
  description = "";
  dueDate = "";
  priority = "";
  notes = "";
  todoArray = [];
}

export function saveChanges(event) {
  let DOMElementsTask = grabDOMElementsTask();

  EditJSON(
    event,
    DOMElementsTask.projectTitleName,
    DOMElementsTask.title,
    DOMElementsTask.description,
    DOMElementsTask.dueDate,
    DOMElementsTask.priority,
    DOMElementsTask.notes,
    DOMElementsTask.checkbox
  );

  removeTaskDetails();
}

function grabDOMElementsTask() {
  let projectTitleName = document
    .querySelector(".projectTitle-input")
    .value.replace(/[^a-zA-Z0-9-_]/g, "");
  let title = document.querySelector(".title-input").value;
  let description = document.querySelector(".description-input").value;
  let dueDate = document.querySelector(".dueDate-input").value;
  let priority = document.querySelector(".priority-input").value;
  let notes = document.querySelector(".notes-input").value;
  let checkbox = document.querySelector(".checkbox-input").checked;

  return {
    projectTitleName,
    title,
    description,
    dueDate,
    priority,
    notes,
    checkbox,
  };
}

function EditJSON(
  event,
  projectTitleName,
  title,
  description,
  dueDate,
  priority,
  notes,
  checkbox
) {
  let buttonClasses = event.target.className.split(" ");
  let projectTitle = buttonClasses[0];
  let taskID = buttonClasses[1];
  let index = projects[projectTitle].findIndex(
    (project) => project.id === taskID
  );

  // Update values of projects Object
  projects[projectTitle][index].title = title;
  projects[projectTitle][index].description = description;
  projects[projectTitle][index].dueDate = dueDate;
  projects[projectTitle][index].priority = priority;
  projects[projectTitle][index].notes = notes;
  projects[projectTitle][index].checkbox = checkbox;

  // Update values of stored JSON
  projects[projectTitle][index].title = title;
  projects[projectTitle][index].description = description;
  projects[projectTitle][index].dueDate = dueDate;
  projects[projectTitle][index].priority = priority;
  projects[projectTitle][index].notes = notes;
  projects[projectTitle][index].checkbox = checkbox;

  // Update the name of the task button and their class names as well
  let taskButton = document.querySelector(
    `#task.${projectTitle}[class*=" ${taskID}"]`
  );
  let XButton = document.querySelector(
    `#X.${projectTitle}[class*=" ${taskID}"]`
  );
  taskButton.textContent = title;
  taskButton.className = "";
  taskButton.classList.add(projectTitleName);
  taskButton.classList.add(taskID);
  XButton.className = "";
  XButton.classList.add(projectTitleName);
  XButton.classList.add(taskID);

  // Replace name references if different (having same keys causes issues)
  if (projectTitle !== projectTitleName && !(projectTitleName in projects)) {
    console.log("case 1");

    // This replaces the name of the project
    projects[projectTitleName] = projects[projectTitle];
    delete projects[projectTitle];
    projectTitle = projectTitleName;
    projects[projectTitle] = projects[projectTitleName];

    localStorage.setItem("todoArrayJSON", JSON.stringify(projects));
    projects = JSON.parse(localStorage.getItem("todoArrayJSON"));

    populateLeftPanel();

    let eventWithUpdatedClasses = {
      target: {
        className: `${projectTitleName} ${taskID}`,
      },
    };
    manipulateCSS(eventWithUpdatedClasses);
  }

  // if an existing task goes into an existing project, then it pushes it to that project instead of replacing it.
  else if (projectTitle !== projectTitleName && projectTitleName in projects) {
    console.log("case 2");

    // projectTitle: Project1
    // projectTitleName: Project2

    projects[projectTitleName].push(projects[projectTitle][index]); //Project1 has now task 2

    projects[projectTitle].splice(index, 1); //Project2 has now task 2 deleted

    if (projects[projectTitle][index] === undefined) {
      console.log("empty project");
      delete projects[projectTitle];
    }

    localStorage.setItem("todoArrayJSON", JSON.stringify(projects));
    projects = JSON.parse(localStorage.getItem("todoArrayJSON"));

    populateLeftPanel();

    let eventWithUpdatedClasses = {
      target: {
        className: `${projectTitleName} ${taskID}`,
      },
    };
    manipulateCSS(eventWithUpdatedClasses);
  } else {
    console.log("case 3");
    populateLeftPanel();
    manipulateCSS(event);
  }
}
