let add = document.querySelector("form button");
let section = document.querySelector("section");
loadData(); //初始化讀取localStorage 的 list，顯示在section
add.addEventListener("click", (e) => {
  //prevent form from submitted
  e.preventDefault();

  //get input value
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDay = form.children[2].value;

  if (todoText === "") {
    alert("please enter some text!!");
    return;
  }

  //creat todo
  let todo = document.createElement("div");
  todo.classList.add("todo");

  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;

  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDay;

  todo.appendChild(text);
  todo.appendChild(time);

  //create green check and red trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;

    todoItem.addEventListener("animationend", () => {
      //remove from local storage
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText === text) {
          myListArray.splice(index, 1);
        }

        localStorage.setItem("list", JSON.stringify(myListArray));
      });

      //html delete
      todoItem.remove();
    });

    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  todo.style.animation = "scaleUp 0.3s forwards";

  //create an object
  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDay: todoDay,
  };

  //store data into an array of objects
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  //console.log(JSON.parse(localStorage.getItem("list")));

  section.appendChild(todo);

  form.children[0].value = ""; //clear text input
});

//sort button
let sortBtn = document.querySelector("div.sort button");
sortBtn.addEventListener("click", () => {
  //sort data
  let myArray = JSON.parse(localStorage.getItem("list"));
  localStorage.setItem("list", JSON.stringify(mergeSort(myArray)));

  //清空section
  section.replaceChildren();

  loadData(); //初始化讀取localStorage 的 list，顯示在section
});

//初始化讀取localStorage 的 list，顯示在section
function loadData() {
  let myListArray = JSON.parse(localStorage.getItem("list"));
  if (myListArray != null) {
    myListArray.forEach((item) => {
      let todoText = item.todoText;
      let todoMonth = item.todoMonth;
      let todoDay = item.todoDay;

      //creat todo
      let todo = document.createElement("div");
      todo.classList.add("todo");

      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = todoText;

      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = todoMonth + "/" + todoDay;

      todo.appendChild(text);
      todo.appendChild(time);

      //create green check and red trash can
      let completeButton = document.createElement("button");
      completeButton.classList.add("complete");
      completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      completeButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
      });

      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      trashButton.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationend", () => {
          //remove form local storage
          let text = todoItem.children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));
          myListArray.forEach((item, index) => {
            if (item.todoText === text) {
              myListArray.splice(index, 1);
            }

            localStorage.setItem("list", JSON.stringify(myListArray));
          });

          //html delete
          todoItem.remove();
        });

        todoItem.style.animation = "scaleDown 0.3s forwards";
      });

      todo.appendChild(completeButton);
      todo.appendChild(trashButton);

      todo.style.animation = "scaleUp 0.3s forwards";
      section.appendChild(todo);
    });
  }
}

//合併比大小merge
function mergeTime(left, right) {
  let result = [];
  let l = 0;
  let r = 0;

  while (l < left.length && r < right.length) {
    if (Number(left[l].todoMonth) < Number(right[r].todoMonth)) {
      result.push(left[l]);
      l++;
    } else if (Number(right[r].todoMonth) < Number(left[l].todoMonth)) {
      result.push(right[r]);
      r++;
    } else if (Number(left[l].todoMonth) == Number(right[r].todoMonth)) {
      if (Number(left[l].todoDay) < Number(right[r].todoDay)) {
        result.push(left[l]);
        l++;
      } else {
        result.push(right[r]);
        r++;
      }
    }
  }

  while (l < left.length) {
    result.push(left[l]);
    l++;
  }

  while (r < right.length) {
    result.push(right[r]);
    r++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);
  let leftArray = arr.slice(0, mid);
  let rightArray = arr.slice(mid, arr.length);

  return mergeTime(mergeSort(leftArray), mergeSort(rightArray));
}
