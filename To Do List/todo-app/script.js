// Elements
const categoryList = document.getElementById("categoryList");
const categorySelect = document.getElementById("categorySelect");
const newCategoryInput = document.getElementById("newCategoryInput");
const addCategoryBtn = document.getElementById("addCategoryBtn");

const selectedCategoryTitle = document.getElementById("selectedCategoryTitle");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Data storage
let categories = JSON.parse(localStorage.getItem("categories")) || {};
let selectedCategory = null;

// Save to localStorage
function saveData() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

// Render categories in sidebar and select
function renderCategories() {
  categoryList.innerHTML = "";
  categorySelect.innerHTML = '<option value="">Select category</option>';

  Object.keys(categories).forEach(cat => {
    // Sidebar item
    const li = document.createElement("li");
    li.textContent = cat;

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.className = "delete-category";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      delete categories[cat];
      if (selectedCategory === cat) {
        selectedCategory = null;
        selectedCategoryTitle.textContent = "Select a Category";
        taskList.innerHTML = "";
      }
      saveData();
      renderCategories();
    };

    li.appendChild(delBtn);

    li.onclick = () => {
      selectedCategory = cat;
      selectedCategoryTitle.textContent = `${cat}`;
      renderTasks();
    };

    categoryList.appendChild(li);

    // Dropdown option
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Render tasks of selected category
function renderTasks() {
  taskList.innerHTML = "";
  if (!selectedCategory) return;

  categories[selectedCategory].forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("completed");

    // Toggle done on click
    span.onclick = () => {
      categories[selectedCategory][index].done = !task.done;
      saveData();
      renderTasks();
    };

    // Delete Task Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.className = "delete-task";
    delBtn.onclick = () => {
      categories[selectedCategory].splice(index, 1);
      saveData();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add category
addCategoryBtn.onclick = () => {
  const newCat = newCategoryInput.value.trim();
  if (newCat && !categories[newCat]) {
    categories[newCat] = [];
    newCategoryInput.value = "";
    saveData();
    renderCategories();
  }
};

// Add task
addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  const cat = categorySelect.value;

  if (text && cat && categories[cat]) {
    categories[cat].push({ text, done: false });
    taskInput.value = "";
    saveData();
    if (selectedCategory === cat) {
      renderTasks();
    }
  }
};

// Init
renderCategories();
if (selectedCategory) renderTasks();
