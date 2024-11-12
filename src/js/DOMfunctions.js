import { projects } from "./auxFunctions.js";

// Global variables

export let legendName; // This stores the name of the project to verify if exists
export let dialog; // this is the modal to enter the todo(s)

// Function to create modal

export function createTodoDialog(event) {
  event.preventDefault();

  const existingDialog = document.querySelector(".data-modal");
  if (existingDialog) {
    existingDialog.remove();
  }

  dialog = document.createElement("dialog");
  dialog.setAttribute("data-modal", "");
  dialog.classList.add("data-modal");

  const form = document.createElement("form");
  form.classList.add("addNewTodo");
  form.setAttribute("onsubmit", "return false;");

  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legendName = document
    .querySelector(".projectName")
    .value.replace(/[^a-zA-Z0-9-_]/g, ""); // Adds project name to legendName variable
  legend.style.fontSize = "3vh";
  legend.style.fontWeight = "600";
  legend.textContent = legendName;

  const container = document.createElement("div");
  container.classList.add("addNewTodoContainer");

  // Title div
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title-div");
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title\u00A0";
  const titleInput = document.createElement("input");
  titleInput.classList.add("title");
  titleInput.setAttribute("type", "text");
  titleDiv.append(titleLabel, titleInput);

  // Description div
  const descDiv = document.createElement("div");
  descDiv.classList.add("description-div");
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "description");
  descLabel.textContent = "Description\u00A0";
  const descInput = document.createElement("input");
  descInput.classList.add("description");
  descInput.setAttribute("type", "text");
  descInput.style.height = "4vh";
  descDiv.append(descLabel, descInput);

  // Due Date div
  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("dueDate-div");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "dueDate");
  dueDateLabel.textContent = "Due Date\u00A0";
  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add("dueDate");
  dueDateInput.setAttribute("type", "date");
  dueDateDiv.append(dueDateLabel, dueDateInput);

  // Priority div
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("priority-div");
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "Priority\u00A0";
  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("priority");
  prioritySelect.setAttribute("name", "Priority");
  prioritySelect.setAttribute("type", "range");

  const options = [
    { value: "Low", text: "Low" },
    { value: "Medium", text: "Medium", selected: true },
    { value: "High", text: "High" },
  ];

  options.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    if (opt.selected) option.selected = true;
    prioritySelect.appendChild(option);
  });
  priorityDiv.append(priorityLabel, prioritySelect);

  // Notes div
  const notesDiv = document.createElement("div");
  notesDiv.classList.add("notes-div");
  const notesLabel = document.createElement("label");
  notesLabel.setAttribute("for", "notes");
  notesLabel.textContent = "Notes\u00A0";
  const notesInput = document.createElement("input");
  notesInput.classList.add("notes");
  notesInput.setAttribute("type", "text");
  notesInput.style.height = "4vh";
  notesDiv.append(notesLabel, notesInput);

  // Buttons
  const addButton = document.createElement("button");
  addButton.id = "add";
  addButton.classList.add("add");
  addButton.style.borderRadius = "8px";
  addButton.style.border = "2px solid green";
  addButton.textContent = "Add";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel");
  cancelButton.id = "cancel";
  cancelButton.style.borderRadius = "8px";
  cancelButton.style.border = "2px solid red";
  cancelButton.textContent = "Cancel";
  cancelButton.setAttribute("type", "button");

  // Append all elements
  container.append(
    titleDiv,
    descDiv,
    dueDateDiv,
    priorityDiv,
    notesDiv,
    addButton,
    cancelButton
  );

  fieldset.appendChild(legend);
  fieldset.appendChild(container);
  form.appendChild(fieldset);
  dialog.appendChild(form);

  document.body.appendChild(dialog);

  dialog.showModal();
}

// Function to show task details

export function writeBackToDOM(event) {
  let buttonClasses = event.target.className.split(" ");
  let projectTitle = buttonClasses[0];
  let taskID = buttonClasses[1];
  let index = projects[projectTitle].findIndex(
    (project) => project.id === taskID
  );

  // Main Container
  const rightContainer = document.querySelector(".right-panel");

  // Form
  const form = document.createElement("form");
  form.classList.add("todo");
  form.setAttribute("onsubmit", "return false;");

  // Fieldset
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("input");
  legend.classList.add("projectTitle-input");
  legend.setAttribute("value", projectTitle);

  // Container div
  const container = document.createElement("div");
  container.classList.add("todoContainer");

  // Title div
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title-div");
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title\u00A0";
  const titleInput = document.createElement("input");
  titleInput.classList.add("title-input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("value", projects[projectTitle][index].title);
  titleDiv.append(titleLabel, titleInput);

  // Description div
  const descDiv = document.createElement("div");
  descDiv.classList.add("description-div");
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "description");
  descLabel.textContent = "Description\u00A0";
  const descInput = document.createElement("input");
  descInput.classList.add("description-input");
  descInput.setAttribute("type", "text");
  descInput.setAttribute("value", projects[projectTitle][index].description);
  descDiv.append(descLabel, descInput);

  // Due Date div
  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("dueDate-div");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "dueDate");
  dueDateLabel.textContent = "Due Date\u00A0";
  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add("dueDate-input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("value", projects[projectTitle][index].dueDate);
  dueDateDiv.append(dueDateLabel, dueDateInput);

  // Priority div
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("priority-div");
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "Priority\u00A0";
  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("priority-input");
  prioritySelect.setAttribute("name", "Priority");
  prioritySelect.setAttribute("type", "range");

  const options = [
    { value: "Low", text: "Low" },
    { value: "Medium", text: "Medium" },
    { value: "High", text: "High" },
  ];

  options.forEach((opt) => {
    const option = document.createElement("option");
    let priority = projects[projectTitle][index].priority;
    option.value = opt.value;
    option.textContent = opt.text;
    if (priority === opt.value) {
      option.selected = true;
    }
    prioritySelect.appendChild(option);
  });
  priorityDiv.append(priorityLabel, prioritySelect);

  // Notes div
  const notesDiv = document.createElement("div");
  notesDiv.classList.add("notes-div");
  const notesLabel = document.createElement("label");
  notesLabel.setAttribute("for", "notes");
  notesLabel.textContent = "Notes\u00A0";
  const notesInput = document.createElement("input");
  notesInput.classList.add("notes-input");
  notesInput.setAttribute("type", "text");
  notesInput.setAttribute("value", projects[projectTitle][index].notes);
  notesDiv.append(notesLabel, notesInput);

  // Checklist
  const checkboxDiv = document.createElement("div");
  checkboxDiv.classList.add("checkbox-div");
  const checkboxLabel = document.createElement("label");
  checkboxLabel.setAttribute("for", "checkbox");
  checkboxLabel.textContent = "Done?\u00A0";
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox-input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = projects[projectTitle][index].checkbox;
  checkboxDiv.append(checkboxLabel, checkbox);

  // Buttons

  const saveButton = document.createElement("button");
  saveButton.id = "saveChanges";
  saveButton.classList.add(projectTitle);
  saveButton.classList.add(taskID);
  saveButton.style.borderRadius = "8px";
  saveButton.style.border = "2px solid green";
  saveButton.textContent = "Save";

  const delButton = document.createElement("button");
  delButton.id = "delete";
  delButton.classList.add(projectTitle);
  delButton.classList.add(taskID);
  delButton.style.borderRadius = "8px";
  delButton.style.border = "2px solid red";
  delButton.textContent = "Delete";

  // Remove all children
  let rightPanel = document.querySelector(".right-panel");
  let formExists = document.querySelector(".todo");
  formExists && rightPanel.removeChild(formExists);

  // Append all elements
  container.append(
    titleDiv,
    descDiv,
    dueDateDiv,
    priorityDiv,
    notesDiv,
    checkboxDiv,
    saveButton,
    delButton
  );

  fieldset.appendChild(legend);
  fieldset.appendChild(container);
  form.appendChild(fieldset);

  rightContainer.appendChild(form);

  switch (projects[projectTitle][index].priority) {
    case "Low":
      fieldset.style.backgroundColor = "rgba(0, 0, 255, 0.75)";
      container.style.backgroundColor = "rgba(0, 0, 255, 0)";
      fieldset.style.color = "aliceblue";
      titleLabel.style.color = "aliceblue";
      descLabel.style.color = "aliceblue";
      dueDateLabel.style.color = "aliceblue";
      priorityLabel.style.color = "aliceblue";
      notesLabel.style.color = "aliceblue";
      checkboxLabel.style.color = "aliceblue";
      break;
    case "Medium":
      fieldset.style.backgroundColor = "rgba(255, 255, 0, 0.75)";
      container.style.backgroundColor = "rgba(255, 255, 0, 0)";
      titleLabel.style.color = "black";
      descLabel.style.color = "black";
      dueDateLabel.style.color = "black";
      priorityLabel.style.color = "black";
      notesLabel.style.color = "black";
      checkboxLabel.style.color = "black";
      fieldset.style.color = "black";
      break;
    case "High":
      fieldset.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      container.style.backgroundColor = "rgba(255, 0, 0, 0)";
      titleLabel.style.color = "black";
      descLabel.style.color = "black";
      dueDateLabel.style.color = "black";
      priorityLabel.style.color = "black";
      notesLabel.style.color = "black";
      checkboxLabel.style.color = "black";
      fieldset.style.color = "black";
      fieldset.style.color = "black";
      break;
  }
}

// Function to delete task from storage

export function XDelete(event) {
  let buttonClasses = event.target.className.split(" ");
  let projectTitle = buttonClasses[0];
  let taskID = buttonClasses[1];
  let index = parseInt(
    projects[projectTitle].findIndex((project) => project.id === taskID)
  );
  let buttons = document.querySelectorAll(
    `.${projectTitle}[class*=" ${taskID}"]`
  );
  buttons.forEach((button) => button.remove());

  // I need to modify both projects and projects
  projects[projectTitle].splice(index, 1);
  projects[projectTitle].splice(index, 1);
  localStorage.setItem("todoArrayJSON", JSON.stringify(projects));

  removeTaskDetails();
}

export function removeTaskDetails() {
  // Remove main box with task details
  let rightPanel = document.querySelector(".right-panel");
  let formExists = document.querySelector(".todo");
  formExists && rightPanel.removeChild(formExists);
}

// Function to create the left panel with the projects and tasks from scratch

export function populateLeftPanel() {
  // Reset the left panel
  let projectsDiv = document.querySelector(".projects");

  if (projectsDiv) {
    while (projectsDiv.firstChild) {
      projectsDiv.removeChild(projectsDiv.firstChild);
    }
  }

  // Re-write the Projects title

  const projectDivTitle = document.createElement("div");
  projectDivTitle.classList.add("projects-title");
  projectDivTitle.textContent = "Projects";
  projectsDiv.appendChild(projectDivTitle);

  // Loop through each object project in projects and each of its todo's

  for (let project in projects) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add(project);
    const projectDivText = document.createElement("div");
    projectDivText.classList.add("text");
    projectDivText.classList.add(project);
    projectDivText.textContent = project;
    projectDiv.append(projectDivText);
    projects[project].forEach((todo) => {
      // Task Div
      const taskButton = document.createElement("button");
      taskButton.id = "task";
      taskButton.classList.add(project);
      taskButton.classList.add(todo.id);
      switch (todo.priority) {
        case "Low":
          taskButton.style.backgroundColor = "rgba(0, 0, 255, 0.75)";
          taskButton.style.color = "aliceblue";
          break;
        case "Medium":
          taskButton.style.backgroundColor = "rgba(255, 255, 0, 0.75)";
          taskButton.style.color = "black";
          break;
        case "High":
          taskButton.style.backgroundColor = "rgba(255, 0, 0, 0.75)";
          taskButton.style.color = "black";
          break;
      }
      taskButton.textContent = todo.title;

      // Delete Task Button
      const XButton = document.createElement("button");
      XButton.id = "X";
      XButton.classList.add(project);
      XButton.classList.add(todo.id);
      XButton.classList.add("fa");
      XButton.classList.add("fa-trash");
      switch (todo.priority) {
        case "Low":
          XButton.style.backgroundColor = "rgba(0, 0, 255, 0.75)";
          XButton.style.color = "aliceblue";
          break;
        case "Medium":
          XButton.style.backgroundColor = "rgba(255, 255, 0, 0.75)";
          XButton.style.color = "black";
          break;
        case "High":
          XButton.style.backgroundColor = "rgba(255, 0, 0, 0.75)";
          XButton.style.color = "black";
          break;
      }

      //Append
      projectDiv.appendChild(taskButton);
      projectDiv.appendChild(XButton);
      projectsDiv.appendChild(projectDiv);
    });
  }
}

export function manipulateCSS(event) {
  let buttonClasses = event.target.className.split(" ");
  let projectTitle = buttonClasses[0];
  let taskID = buttonClasses[1];

  let index = parseInt(
    projects[projectTitle].findIndex((project) => project.id === taskID)
  );
  let buttons = document.querySelectorAll(
    `button:not([id*='modal']).${projectTitle}[class*=" ${taskID}"]`
  );
  buttons.forEach((btn) => {
    switch (projects[projectTitle][index].priority) {
      case "Low":
        btn.style.backgroundColor = "rgba(0, 0, 255, 0.75)";
        btn.style.color = "aliceblue";
        break;
      case "Medium":
        btn.style.backgroundColor = "rgba(255, 255, 0, 0.75)";
        btn.style.color = "black";
        break;
      case "High":
        btn.style.backgroundColor = "rgba(255, 0, 0, 0.75)";
        btn.style.color = "black";
        break;
    }
  });
}

export function manipulateCSSModal(newID) {
  let projectTitle = legendName;
  let taskID = newID;

  let index = parseInt(
    projects[projectTitle].findIndex((project) => project.id === taskID)
  );
  let buttons = document.querySelectorAll(
    `button:not([id*='modal']).${projectTitle}[class*=" ${taskID}"]`
  );
  buttons.forEach((btn) => {
    switch (projects[projectTitle][index].priority) {
      case "Low":
        btn.style.backgroundColor = "rgba(0, 0, 255, 0.75)";
        btn.style.color = "aliceblue";
        break;
      case "Medium":
        btn.style.backgroundColor = "rgba(255, 255, 0, 0.75)";
        btn.style.color = "black";
        break;
      case "High":
        btn.style.backgroundColor = "rgba(255, 0, 0, 0.75)";
        btn.style.color = "black";
        break;
    }
  });
}
