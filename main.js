//Check that Javascript file is loaded
//console.log("script is loaded");

//Declare variables
let completedCount = 0;
let todoId = 1; //Not needed but nice to have=)
const todoArray = [];


//Declare HTML elements
const inputTodo = document.querySelector("#inputTodo");
const addBtn = document.querySelector("#addButton");
const todolist = document.querySelector("ul");
const infoText = document.querySelector("#infoText");
const countTodo = document.querySelector("#countTodo");


function changeStatus(text, status) {
    let changeindex = todoArray.map(t => t.name).indexOf(text);
    todoArray[changeindex].completed = status;
    //console.log(todoArray);
}

//Add a listener to the addButton
addBtn.addEventListener("click", addTodoItem);

//Add listener to the Enterkey
document.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {

        addTodoItem();
    }
});

// Function addTodoItem adds todoItem to todoArray
function addTodoItem() {

    const text = inputTodo.value;

    // Checks if input is empty
    if (text.length == 0) {
        infoText.innerText = "Du måste skriva något i rutan!";
        return;
    }
    else {
         // TODO CHECK IF ANY DUBLETTS
            infoText.innerText = "";
        }

       

        //Create todoItem and add text to ul
        const todoItem = document.createElement("li");
        todolist.appendChild(todoItem);

        const itemLabel = document.createElement("span");
        itemLabel.innerText = text;
        todoItem.appendChild(itemLabel);

        //Adds a HTML-tagg with trashcan
        const trashcan = document.createElement("span");
        trashcan.innerHTML = "&#x1F5D1;";
        trashcan.setAttribute("class", "trashcan");
        todoItem.appendChild(trashcan);


        //Add listener to the todoItem
        itemLabel.addEventListener("click", function () {

            if (todoItem.getAttribute("class") == "completed") {
                completedCount--;
                todoItem.setAttribute("class", "");
                let todoText = todoItem.firstChild.textContent;
                changeStatus(todoText, false);
            }
            else {
                completedCount++;
                todoItem.setAttribute("class", "completed");
                let todoText = todoItem.firstChild.textContent;
                changeStatus(todoText, true);
            }

            countTodo.innerText = `${completedCount} Completed`;

        });

        // add listener to the trashcan
        //On click delete the clicked todoObject in Array and in DOM update competeCount
        trashcan.addEventListener("click", function () {
            todoArray.splice(todoArray.indexOf(todoObject), 1);
            todoItem.remove();
           if (todoItem.getAttribute("class") == "completed") {
                completedCount--;
                countTodo.innerText = `${completedCount} Completed`;
            }
        });


        //Add to object 
        const todoObject = {};// skapar nytt object varje gång
        todoObject.id = todoId;
        todoObject.name = text;
        todoObject.completed = false;
        todoArray.push(todoObject);

        //Set input empty
        todoId++;
        inputTodo.value = "";

    };
