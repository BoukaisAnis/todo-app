document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const backgroundImage = document.querySelector(".todo img");
    const todo = document.querySelector(".todo");
    const todoList = document.querySelector(".todo-list");
    const inputField = document.querySelector(".input-field");
    const addButton = document.querySelector(".add-btn");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const clearButton = document.querySelector(".clear-btn");
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filters = document.querySelector('.filters');

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", () => {
        const isDarkMode = todo.classList.toggle("dark-mode");

        // Switch background images based on mode
        if (isDarkMode) {
            backgroundImage.src = "./images/bg-desktop-dark.jpg"; // Dark mode image
            darkModeToggle.innerHTML = `
                <svg id="sun" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                    <path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.414-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/>
                </svg>`;
        } else {
            backgroundImage.src = "./images/bg-desktop-light.jpg"; // Light mode image
            darkModeToggle.innerHTML = `
                <svg id="moon" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                    <path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/>
                </svg>`;
        }

        // Update text color for list items
        const listItems = todoList.querySelectorAll(".list-item");
        listItems.forEach(item => {
            item.style.color = isDarkMode ? "white" : "black";
        });
    });

    // Add a new todo item
    const addNewTodo = () => {
        if (inputField.value.trim() !== "") {
            const newItem = document.createElement("li");
            newItem.classList.add("list-item");
            newItem.innerHTML = `
                <input type="checkbox" class="checkbox">
                <span class="item-text">${inputField.value.trim()}</span>
            `;
            todoList.appendChild(newItem);
            inputField.value = ""; // Clear input field
        }
    };

    // Add new todo when Add button is clicked or Enter is pressed
    addButton.addEventListener("click", addNewTodo);
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addNewTodo();
        }
    });

    // Toggle completed state (clicking on list item or checkbox)
    todoList.addEventListener("click", (event) => {
        const target = event.target;
        const listItem = target.closest(".list-item");

        // Check if clicked element is the list item or checkbox
        if (listItem) {
            const checkbox = listItem.querySelector(".checkbox");

            // Toggle checkbox state
            checkbox.checked = !checkbox.checked;

            // Add/remove checked class for styling
            if (checkbox.checked) {
                listItem.classList.add("checked");
            } else {
                listItem.classList.remove("checked");
            }
        }
    });

    // Filter todo items
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            const items = todoList.querySelectorAll(".list-item");

            items.forEach((item) => {
                const isChecked = item.querySelector(".checkbox").checked;

                if (filter === "all") {
                    item.style.display = "flex";
                } else if (filter === "active" && isChecked) {
                    item.style.display = "none";
                } else if (filter === "completed" && !isChecked) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
            });
        });
    });

    // Clear completed items
    clearButton.addEventListener("click", () => {
        const items = todoList.querySelectorAll(".list-item");

        items.forEach((item) => {
            if (item.querySelector(".checkbox").checked) {
                item.remove();
            }
        });
    });

    // Toggle filters visibility on mobile
    filterToggleBtn.addEventListener('click', () => {
        filters.classList.toggle('show');
    });
});
