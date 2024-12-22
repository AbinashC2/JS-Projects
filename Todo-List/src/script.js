document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    
    let tasks= JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener("click", ()=>{
    
        const tastTest = todoInput.value.trim();
        if(tastTest === "") return;
    
        const newTask = {
            id: Date.now(),
            text: tastTest,
            completed: false,
        };
    
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = ""; // clear the input
        console.log(tasks);
        
    });
    
    function renderTask(task){
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        //  li.className = "flex justify-between items-center bg-gray-100 text-gray-800 p-2 mb-2 rounded-md shadow-sm"; // Tailwind styles for li
         li.innerHTML = `<span>${task.text}</span>
        <button>delete</delete>`;

        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation(); // prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTasks();
        })

        todoList.append(li)
    }
    
    function saveTasks(){
        localStorage.setItem("tasks" ,JSON.stringify(tasks) )
    }
    //save data in local storage
    
    // function localSave(){
    //     localStorage.setItem("tasks",JSON.stringify(tasks));
    // }
    
    


})
