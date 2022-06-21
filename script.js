"use strict";

// BU yerda biz html elementlarni tanlab olyapmiz
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".todos-list");
let  elBtnAll = document.querySelector(".btn-all")
let  elBtnCompleted = document.querySelector(".btn-completed")
let  elBtnUnCompleted = document.querySelector(".btn-uncompleted")

let  allNumber = document.querySelector(".all-number")
let  completedNumber = document.querySelector(".completed-number")
let  unCompletedNumber = document.querySelector(".uncompleted-number")

let  locolData = JSON.parse(window.localStorage.getItem("todos"))

console.log(locolData);

const todos = locolData || [];


elList.addEventListener("click", function (evt) {
  const deleteBtnId = evt.target.dataset.deleteBtnId * 1;
  const foundTodoIndex = todos.findIndex((todo) => todo.id === deleteBtnId);
    

  if (evt.target.matches(".delete-btn")) {
    todos.splice(foundTodoIndex, 1);

    elList.innerHTML = null;

    window.localStorage.setItem("todos" , JSON.stringify(todos));
    
    if (todos.length===0) {
      window.localStorage.removeItem("todos") 
    }

    renderTodos(todos, elList);
  
  } 
  else if (evt.target.matches(".checkbox-btn")) {
    const checkboxId = evt.target.dataset.checkboxBtnId * 1;

    const foundTodo = todos.find((todo) => todo.id === checkboxId);

    foundTodo.isCompleted = !foundTodo.isCompleted;

    elList.innerHTML = null;

    window.localStorage.setItem("todos" , JSON.stringify(todos)); 
    
    renderTodos(todos, elList);
  }
});

const renderTodos = function (arr, htmlElement) {
  allNumber.textContent = todos.length
  unCompletedNumber.textContent = todos.filter(todo => todo.isCompleted===false).length 
  completedNumber.textContent = todos.filter(todo => todo.isCompleted===true).length 
  
  arr.forEach((todo) => {
    

    const newItem = document.createElement("li");
    const newCheckbox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newItem.textContent = todo.title;
    newCheckbox.type = "checkbox";
    newDeleteBtn.textContent = "Delete";

    newItem.style.display="flex"
    newItem.style.alignItems="center"
    newItem.style.marginTop="10px"
    newItem.style.padding="10px"

    newCheckbox.style.marginLeft="auto"
    newCheckbox.style.marginRight="10px"
    newCheckbox.style.padding = "5px"

    newDeleteBtn.style.padding = "10px"
    newDeleteBtn.style.backgroundColor = "red"
    newDeleteBtn.style.color = "white"
    newDeleteBtn.style.border= "white"
    newDeleteBtn.style.borderRadius= "5px"

    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("checkbox-btn");

    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckbox.dataset.checkboxBtnId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    htmlElement.appendChild(newItem);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newDeleteBtn);



  });
};

renderTodos(todos ,elList)

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputValue = elInput.value;

  const newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodo);

  elInput.value = null;
  elList.innerHTML = null;

  window.localStorage.setItem("todos" , JSON.stringify(todos))

  renderTodos(todos, elList);
});


elBtnAll.addEventListener("click" , function () {
  elList.innerHTML = ""
  renderTodos(todos ,elList)
})

elBtnCompleted.addEventListener("click" , function name() {
  let completed = todos.filter(todo => todo.isCompleted === true)
  elList.innerHTML =""
  renderTodos(completed , elList)
})

elBtnUnCompleted.addEventListener("click" , function name() {
  let unCompleted = todos.filter(todo => todo.isCompleted === false)
  elList.innerHTML =""
  
  renderTodos(unCompleted , elList)
})