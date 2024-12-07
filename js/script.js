{
    let tasks = [];

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

    const setAllTasksAsDone = () => {
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
        const setAllTasksAsDoneButton = document.querySelector(".js-markAllAsDone");

        if (tasks.length > 0) {
            setAllTasksAsDoneButton.addEventListener("click", setAllTasksAsDone);
        }
    };

    const renderButtons = () => {
        let headerButtonsHTMLContent = "";

        if (tasks.length > 0) {
            headerButtonsHTMLContent += `
                <button class="js-markAllAsDone">Ukończ wszystkie</button>
                <button class="js-hideAllDone">Ukryj ukończone</button>
            `;
        }

        document.querySelector(".js-headerButtons").innerHTML = headerButtonsHTMLContent;
    };

    const renderTasks = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
            <li class="tasksList__item">
              <button class="tasksList__button js-done">${task.done ? "✔" : ""}</button>
              <span class="${task.done ? "tasksList__item--done" : ""}"> ${task.content}</span>            
              <button class="tasksList__button tasksList__button--remove js-remove">🗑</button>
            </li>
          `;
        };

        document.querySelector(".js-tasksList").innerHTML = tasksListHTMLContent;
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