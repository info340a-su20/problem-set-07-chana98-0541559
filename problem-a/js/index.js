'use strict';

/* your code goes here! */
class Task {
  constructor(description, complete) {
    this.description = description;
    this.complete = complete;
  }

  toggleFinished() {
    if (this.complete) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }

  getDescription() {
    return this.description;
  }

  getComplete() {
    return this.complete;
  }

  render() {
    let newList = document.createElement('li');
    newList.textContent = this.description;
    if (this.complete) {
      newList.classList.add('font-strike');
    }
    newList.addEventListener('click', () => {
      this.toggleFinished();
      newList.classList.toggle('font-strike');
    })
    return newList;
  }
}

class TaskList {
  constructor(taskArray) {
    this.tasks = taskArray;
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task) {
    let newTask = new Task(task, false);
    this.tasks.push(newTask);
  }
  
  render() {
    let newTaskList = document.createElement('ol');
    this.tasks.forEach((taskObj) => {
      let aTask = taskObj.render();
      newTaskList.appendChild(aTask);
    })
  return newTaskList;
  }
}

class NewTaskForm {

  constructor(callBackFunction) {
    this.submitCallback = callBackFunction;
  }

  render() {
    let newForm = document.createElement('form');

    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute("placeholder", "What else do you have to do?");
    newForm.appendChild(inputElem);
    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn', 'btn-primary');
    buttonElem.textContent = "Add task to list";
    newForm.appendChild(buttonElem);

    buttonElem.addEventListener('click', (event) => {
      event.preventDefault();

      let inputValue = inputElem.value;

      let whattoDo = this.submitCallback;
      whattoDo(inputValue);
    })
    return newForm;
  }
}

class App {
  constructor(parentElement, taskList) {
    this.parentElement = parentElement;
    this.taskList = taskList;
  }

  getParentElement() {
    return this.parentElement;
  }

  getTaskList() {
    return this.taskList;
  }
  render() {
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let whoYouGonnaCall = (desc) => this.addTaskToList(desc);
    let formObj = new NewTaskForm(whoYouGonnaCall);
    this.parentElement.appendChild(formObj.render());
  }
  addTaskToList(description) {
    this.taskList.addTask(description);

    this.parentElement.innerHTML = '';
    this.render();
  }
}
let aTask = new Task("Make some classes", true);
let bTask = new Task("Arrow some functions", false);
let newApp = new App(document.querySelector('#app'), new TaskList([aTask, bTask]));
newApp.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
