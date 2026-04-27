const API = "https://fullstack-to-do-list-6zhb.onrender.com";

// elements
const inputText = document.querySelector(".inputText");
const timeInput = document.querySelector(".time");
const addBtn = document.querySelector(".addTask");
const taskList = document.querySelector(".taskList");

// load tasks when page opens
window.onload = fetchTasks;

// ================= FETCH =================
async function fetchTasks() {
    const res = await fetch(API + "/fetch");
    const data = await res.json();

    displayTasks(data.todo);
}

// ================= DISPLAY =================
function displayTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const due = new Date(task.dueTime).toLocaleTimeString();

        li.innerHTML = `
            <strong>${task.task}</strong> 
            <small>⏰ ${due}</small>
            <button onclick="updateTask('${task._id}', '${task.task}', '${task.dueTime}')"  class="edit-btn">
             Edit ✏️
            </button>
            <button onclick="deleteTask('${task._id}')">Delete❌</button>
        `;

        taskList.appendChild(li);
    });
}

// ================= ADD =================
addBtn.addEventListener("click", async () => {
    const task = inputText.value;
    const time = timeInput.value;

    if (!task || !time) {
        alert("Please enter task and time");
        return;
    }

    // convert time → full date
    const dueTime = new Date();
    const [hours, minutes] = time.split(":");
    dueTime.setHours(hours, minutes);

    await fetch(API + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: task,
            dueTime: dueTime
        })
    });

    inputText.value = "";
    timeInput.value = "";

    fetchTasks();
});

// ================= DELETE =================
async function deleteTask(id) {
    await fetch(API + "/delete/" + id, {
        method: "DELETE"
    });

    fetchTasks();
}

async function updateTask(id, oldTask, oldTime) {
    const newTask = prompt("Edit task:", oldTask);

    const newTimeInput = prompt(
        "Edit time (HH:MM):",
        new Date(oldTime).toTimeString().slice(0,5)
    );

    if (!newTask || !newTimeInput) return;

    const dueTime = new Date();
    const [hours, minutes] = newTimeInput.split(":");
    dueTime.setHours(hours, minutes);

    await fetch(API + "/update/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: newTask,
            dueTime: dueTime
        })
    });

    fetchTasks();
}