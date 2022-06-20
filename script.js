  "use strict"


  let elForm = document.querySelector(".form")
  let elInput = document.querySelector(".input")
  let elList = document.querySelector(".todo-list")

  // BUTTONS VAR
  let elBtnAll = document.querySelector(".btn-all")
  let elBtnCompleted = document.querySelector(".btn-completed")
  let elBtnUnCompleted = document.querySelector(".btn-uncompleted")


  // NUMBERS VAR   
  let allNumber = document.querySelector(".all-number")
  let completedNumber = document.querySelector(".completed-number")
  let unCompletedNumber = document.querySelector(".uncompleted-number")




  // DELETE VA CHEKNI ISHLATISH 

  elList.addEventListener("click", function (evt) {
    const deleteBtnId = evt.target.dataset.deleteBtnId * 1;
    const foundTodoIndex = todos.findIndex(todo => todo.id === deleteBtnId)


    if (evt.target.matches(".delete-btn")) {
      todos.splice(foundTodoIndex, 1)
      elList.innerHTML = null;
      renderTodos(todos, elList)



    } else if (evt.target.matches(".check-btn")) {
      const checkBoxId = evt.target.dataset.checkBoxBtnId * 1;
      const foundTodo = todos.find((todo) => todo.id === checkBoxId)

      foundTodo.isCompleted = !foundTodo.isCompleted

      elList.innerHTML = null;


      renderTodos(todos, elList)

    }

  })



  let todos = []

  // CREATE <--

  let renderTodos = function (arr, htmlElement) {
    todos.forEach(todo => {

      allNumber.textContent = todos.length - 0

      completedNumber.textContent = todos.filter(
        todo => todo.isCompleted === true
      ).length

      unCompletedNumber.textContent = todos.filter(
        todo => todo.isCompleted === false
      ).length

      let newItem = document.createElement("li")

      newItem.style.marginTop = "20px"
      newItem.style.listStyleType = "none"
      newItem.style.width = "896px"
      newItem.style.color = "palevioletred"
      newItem.style.fontSize = "22px"
      newItem.style.display = "flex"
      newItem.style.alignItems = "center"
      newItem.textContent = todo.title;




      // CHECK
      let newCheck = document.createElement("input")
      newCheck.type = "checkbox"
      newCheck.classList.add("check-btn")
      newCheck.style.marginLeft = "auto"
      newCheck.style.marginRight = "10px"
      newCheck.style.display = "inline-block"
      newCheck.style.padding = "10px"


      // BUTTON
      let newDeleteBtn = document.createElement("button")
      newDeleteBtn.textContent = "Delete"
      newDeleteBtn.classList.add("delete-btn")
      newDeleteBtn.style.padding = "10px"
      newDeleteBtn.style.backgroundColor = "red"
      newDeleteBtn.style.border = "none"
      newDeleteBtn.style.borderRadius = "5px"
      newDeleteBtn.style.color = "white"



      // DATASET 
      newDeleteBtn.dataset.deleteBtnId = todo.id
      newCheck.dataset.checkBoxBtnId = todo.id
      if (todo.isCompleted) {
        newCheck.checked = true
        
        newItem.style.textDecoration = "line-through "
      }
      
      
      // APPEND
      
      htmlElement.appendChild(newItem)
      newItem.appendChild(newCheck)
      newItem.appendChild(newDeleteBtn)

      
    });
  }
  
  // LISTEN 
  
  elForm.addEventListener("submit", function (evt) {
    evt.preventDefault()
    
    let inputValue = elInput.value
    
    elInput.value = null;

    let newTodo = {
      id: todos[todos.length - 1]?.id + 1 || 0,
      title: inputValue,
      isCompleted: false,
    }
    
    todos.push(newTodo)
    elList.innerHTML = null;
    
    renderTodos(todos, elList)
    
  })
  
  
  elBtnAll.addEventListener("click", function () {
    
    elList.innerHTML = null
    
    renderTodos(todos, elList)
    
  })
  
  elBtnCompleted.addEventListener("click", function (e) {
    
    e.preventDefault()

    const completedTodos = todos.filter(function (todo) {
      
    return todo.isCompleted ;
      
  })
  

  elList.innerHTML = ""
  
  renderTodos( completedTodos , elList)  
}) 



  elBtnUnCompleted.addEventListener("click", function (e) {
    
    e.preventDefault()

    let unCompletedTodos = todos.filter(function (todo) {
      
     return  !todo.isCompleted ;
     
    })

    elList.innerHTML = null
    
    renderTodos( unCompletedTodos , elList)
    
  })  

  

































  // let btnAdd = document.querySelector("form button");
  // let input = document.querySelector("form input");
  // let Lists = document.querySelector(".todo-list");
  //  let todos = [];

  //  function search(id){
  //   console.log(id);
  //  }

  //  function createObj(data){
  //  let newObj={
  //   id: Math.floor(Math.random()*100000),
  //   data:data,
  //   isComplete:false
  //  } 

  //  todos.unshift(newObj)

  //  let element = todos.map(e=>{
  //   return `<li id=${e.id}> <p> ${e.data} </p>
  //   <div>
  //   <input type="checkbox" >
  //   <button>Delete</button>
  //   </div>
  //   </li>`
  //  })

  //  element = element.join("")

  //  Lists.innerHTML=element  
  //  let checkboxInp = document.querySelectorAll("ul input");

  // // ota va bola elementni olish   
  //  checkboxInp.forEach(e=>{
  //   e.addEventListener("click",e=>{
  //     let item=e.currentTarget.parentElement.parentElement.firstElementChild;
  //     item.style.textDecoration = "line-through"
  //     search(item.parentElement.id)
  //   })
  //  })
  // // ota va bola elementni olish
  //  }
  //  btnAdd.addEventListener("click",e=>{
  //   e.preventDefault();
  //   if(input.value.trim() != ""){
  //    createObj(input.value);
  //    input.value="";
  //   }else{
  //   }
  // })  