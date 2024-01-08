//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

const inputNewTask = document.getElementById('new-task');
const btnNewTask = document.querySelector('.new-task__items .btn-add');
const incompleteTaskList = document.getElementById('incomplete-tasks__list');
const completedTasksList = document.getElementById('completed-tasks__list');

/**
 * Create and return new li element of task
 *
 * @return {Object} <li> task item
 * @param taskDescription {String} task description
 */
function createNewTaskElement(taskDescription) {
  // Create task container
  const taskItem = document.createElement('li');
  taskItem.className = "task";

  // Create checkbox element
  const checkBox = document.createElement('input');
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  //Create task description
  const label = document.createElement('label');
  label.innerText = taskDescription;
  label.className = "task__description";

  //Create task edit input
  const editInput = document.createElement('input');
  editInput.className = "task__input";
  editInput.type = "text";

  //Create edit button
  const editButton = document.createElement('button');
  editButton.className = "btn btn-edit";
  editButton.textContent = "Edit";

  //Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = "btn btn-delete";
  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.className = "btn-delete__img";
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  taskItem.append(checkBox, label, editInput, editButton, deleteButton);
  return taskItem;
}

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".btn-edit");
  const deleteButton = taskListItem.querySelector(".btn-delete");

  //Bind editTask to edit button.
  if (editButton) {
    editButton.addEventListener('click', editTask);
  }
  //Bind deleteTask to delete button.
  if (deleteButton) {
    deleteButton.addEventListener('click', deleteTask);
  }
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};
const taskIncomplete = function () {
  console.log("Incomplete Task...");
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};
const taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};
const addTask = function () {
  if (!inputNewTask.value) return;
  const listItem = createNewTaskElement(inputNewTask.value);
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  inputNewTask.value = "";
};
const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector('.task__description');
  const editBtn = listItem.querySelector('.btn-edit');
  const containsClass = listItem.classList.contains('task--edit');

  //If class of the parent is edit mode
  if (containsClass) {
    label.textContent = editInput.value;
    editBtn.textContent = "Edit";
  } else {
    editInput.value = label.textContent;
    editBtn.textContent = "Save";
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("task--edit");
};
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};


//Set the click handler to the addTask function.
btnNewTask.onclick = addTask;
btnNewTask.addEventListener("click", addTask);

//cycle over incompleteTaskList ul list items
//for each list item
for (let i = 0; i < incompleteTaskList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskList.children[i], taskCompleted);
}

//cycle over completedTasksList ul list items
for (let i = 0; i < completedTasksList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksList.children[i], taskIncomplete);
}
