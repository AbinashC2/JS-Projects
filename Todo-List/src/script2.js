// Wait until the entire DOM (Document Object Model) is fully loaded before executing the script
document.addEventListener("DOMContentLoaded",()=>{

    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    
    
    let tasks = JSON.parse(localStorage.getItem("tasks"))  || []; // for the local storage
    // Loop through each task in the tasks array and render them on the page
    tasks.forEach((task) => renderTask(task));
    
    addTaskButton.addEventListener("click" , ()=>{
       // Get the value of the input field and trim any extra whitespace
       const taskText = todoInput.value.trim();
        if(taskText === "") return; // if else null
    
        //object
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        }
    
        // Add the new task object to the tasks array
        tasks.push(newTask);
        saveTasks();  // Save the updated tasks array to local storage
        
        // Render the newly added task in the UI
        renderTask(newTask);
    
        todoInput.value =""; // Clear the input field to prepare for the next task
        console.log(tasks);   // Log the updated tasks array to the console for debugging
        
    });
    
    function renderTask(task){
        const li = document.createElement("li");
         li.setAttribute("data-id", task.id); // Set a data attribute on the list item to store the task's unique ID
            li.innerHTML = `<span>${task.text}</span>
            <button>Delete</button>`;
    
            if(task.completed) li.classList.add("completed");
    
            li.querySelector('button').addEventListener("click", (e)=>{
                e.stopPropagation(); // prevent toggle from firing
                 // Filter out the task being deleted from the tasks array
                 tasks = tasks.filter(t => t.id !== task.id);
                li.remove();// Remove the task's list item from the UI
                // Save the updated tasks array to local storage
                saveTasks();
            })
    
             // Append the task's list item to the todo list in the UI
            todoList.append(li);
    
        }
    
       // Function to save the tasks array to local storage
    function saveTasks(){
        // Convert tasks to a JSON string and store it
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    

});


