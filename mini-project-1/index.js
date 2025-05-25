let task_input = document.getElementById("task-input");
let task_submit = document.getElementById("submit");
let search = document.getElementById("search");
let task_list = document.getElementById("task-list");
let task_category = document.getElementById("task-category");
const clearAllBtn = document.getElementById("clear-all");
const backToTopBtn = document.getElementById("back-to-top");

// Debounce
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderAllTasks(filteredTask = tasks) {
  task_list.innerHTML = "";
  const notask = document.getElementById("no-task");
  if (filteredTask.length === 0) {
    notask.textContent = "No tasks found.";
  } else {
    notask.textContent = "";
    filteredTask.forEach((task, ind) => {
      const li = document.createElement("li");
      li.className = "task-item";
      const titleClass = task.completed ? "line-through" : "";
      const categoryClass = task.completed ? "line-through" : "";

      li.innerHTML = `
     <span class="task-title">
    Task: <span class="title ${titleClass}">${task.title}</span><br/>
    Category: <span class="category ${categoryClass}">${task.category}</span>
    </span>
    <div class="task-actions">
    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
    <button class="delete-button">Delete</button>
    </div>
    `;

      // checkbox
      const checkbox = li.querySelector(".checkbox");
      checkbox.addEventListener("click", () => {
        task.completed = !task.completed;
        saveRenderTasks();
      });

      // delete button
      const deleteButton = li.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        tasks.splice(ind, 1);
        saveRenderTasks();
      });

      task_list.appendChild(li);
    });
  }
  clearAllBtn.style.display = tasks.length > 0 ? "block" : "none";
}

// add task
task_submit.addEventListener("click", () => {
  const taskTitle = task_input.value.trim();
  const category = task_category.value;
  if (taskTitle) {
    tasks.push({ title: taskTitle, category: category, completed: false });
    task_input.value = "";
    saveRenderTasks();
  }
});

// search tasks
search.addEventListener(
  "input",
  debounce(() => {
    const query = search.value.toLowerCase();
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(query)
    );
    renderAllTasks(filteredTasks);
  }, 300)
);

// clear all tasks
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks.length = 0;
    saveRenderTasks();
  }
});

// Throttle scroll function
function throttle(func, delay) {
  let lastCall = 0;
  return () => {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func();
    }
  };
}

// back to top button
window.addEventListener(
  "scroll",
  throttle(() => {
    backToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
  }, 200)
);

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// save and re render tasks
const saveRenderTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderAllTasks();
};

renderAllTasks();
