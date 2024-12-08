{
    let tasks = [];
    let hideDoneTasks = false;

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");
        const hideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (tasks.length > 0) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            return buttonsElement.innerHTML = "";
        }

        buttonsElement.innerHTML = `
                <button class="buttons__button js-toggleHideDoneTasks">
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button 
                    class="buttons__button js-markAllDone" 
                    ${tasks.every(({ done }) => done) ? "disabled" : ""} 
                >
                    Ukończ wszystkie
                </button>
            `;
    };

    const renderTasks = () => {
        const taskToHTML = (task) => `
            <li class="tasksList__item ${task.done && hideDoneTasks ? "tasksList__item--hidden" : ""}">
              <button class="tasksList__button js-done">${task.done ? "✔" : ""}</button>
              <span class="${task.done ? "tasksList__item--done" : ""}"> ${task.content}</span>            
              <button class="tasksList__button tasksList__button--remove js-remove">🗑</button>
            </li>
        `

        const tasksListElement = document.querySelector(".js-tasksList");
        tasksListElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}