{
    let tasks = [];

    let hideDoneTasks = false;

    const form = document.querySelector(".js-form");

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, },
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const markAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const hideAllDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeTask");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindHeaderButtonsEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneButton");
        const markAllTasksDone = document.querySelector(".js-markAllTasksDoneButton");

        if (tasks.length !== 0) {
            markAllTasksDone.addEventListener("click", markAllDone);
            hideDoneTasksButton.addEventListener("click", hideAllDone);
        } else {
            return;
        }
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasksList__item ${hideDoneTasks && task.done ? "tasksList__item--hidden" : ""}">
                    <button class="js-done tasksList__button">${task.done ? "✔" : ""}</button>
                    <p class="tasksList__taskContent ${task.done ? "tasksList__item--done" : ""}">${task.content}</p>
                    <button class="js-removeTask tasksList__button tasksList__button--remove">🗑</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const headerButtons = document.querySelector(".js-headerButtons");

        if (tasks.length === 0) {
            return headerButtons.innerHTML = "";
        } else {
            return (headerButtons.innerHTML = `
                <button class="tile__button js-hideDoneButton">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
                <button class="tile__button js-markAllTasksDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindHeaderButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            newTaskElement.focus();
            return;
        } else {
            addNewTask(newTaskContent);
            form.reset();
            newTaskElement.focus();
        }
    };

    const init = () => {
        render();

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}