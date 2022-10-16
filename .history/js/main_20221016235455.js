var todoList = new taskList();
var completeList = new taskList();

//them task
function addTask() {
  var txtToDo = document.getElementById("newTask").value;
  var ulToDo = document.getElementById("todo");
  var isTaskName = false;
  for (var value of todoList.arr) {
    if (value.taskName === txtToDo) {
      isTaskName = true;
      break;
    }
  }
  for (var value of completeList.arr) {
    if (value.taskName === txtToDo) {
      isTaskName = true;
      break;
    }
  }
  if (txtToDo !== "" && isTaskName == false) {
    var td = new task(txtToDo, "todo");
    todoList.addTask(td);
  }
  // console.log(todoList.arr);
  showToDoList(ulToDo);
  setLocalStorage();
  document.getElementById("newTask").value = "";
}
// Hien thi
function showToDoList(ulToDo) {
  ulToDo.innerHTML = todoList.renderTask();
}
function showCompleteList(ulComplete) {
  ulComplete.innerHTML = completeList.renderTask();
}

function setLocalStorage() {
  var stringArrToDo = JSON.stringify(todoList.arr);
  var stringArrComplete = JSON.stringify(completeList.arr);

  localStorage.setItem("todoList", stringArrToDo);
  localStorage.setItem("completeList", stringArrComplete);
}

function getLocalStorage() {
  if (localStorage.getItem("todoList")) {
    var stringArrToDo = localStorage.getItem("todoList");
    arrToDo = JSON.parse(stringArrToDo);
    document.getElementById("todo").innerHTML = todoList.renderTask();
  }
  if (localStorage.getItem("completeList")) {
    var stringArrComplete = localStorage.getItem("completeList");
    arrComplete = JSON.parse(stringArrComplete);
    document.getElementById("completed").innerHTML = completeList.renderTask();
  }
}

function renderTask(arrTask) {
  var contentHTML = "";
  for (var sv of arrSV) {
    contentHTML += `
    <li>
    <span>${item.taskName}</span>
    <div class="buttons">
        <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteToDo(${item.id},event)">
            <i class="fa fa-trash-alt"></i>
        </button>
        <button class="complete" data-index="${index}"  data-status="${item.status}" onclick="completeToDo(${item.id})" >
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
        </button>
    </div>
</li>
        `;
  }
  return content;
}

// xoa task
function deleteToDo(id, e) {
  var taskStatus = e.currentTarget.getAttribute("data-status");
  var ulToDo = document.getElementById("todo");
  var ulComplete = document.getElementById("completed");
  if (taskStatus == "todo") {
    var key = todoList.findIndex(id);
    todoList.deleteTask(key);
    showToDoList(ulToDo);
  }
  if (taskStatus == "completed") {
    var key = completeList.findIndex(id);
    todoList.deleteTask(key);
    showCompleteList(ulComplete);
  }
  setLocalStorage();
}

document.getElementById("addItem").onclick = function () {
  addTask();
};

getLocalStorage();
