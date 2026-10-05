function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    li.onclick = function() {
        li.classList.toggle("completed");
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function(event) {
        event.stopPropagation();
        li.remove();
    };

    li.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}