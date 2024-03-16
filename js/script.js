{
    let tasks = [];
    let hideDoneTasks = false;

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

    const doneAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const renderTasks = () => {
        let htmlTasksString = "";

        for (const task of tasks) {
            htmlTasksString += `
            <li 
                class="tasksList__item ${task.done && hideDoneTasks ? "tasksList__item--hidden" : ""}"
            >
                <button class="tasksList__button js-done">
                    ${task.done ? "✔" : ""}
                </button>
                <span ${task.done ? "class=\"tasksList__content--done\"" : ""}>
                    ${task.content}
                </span>  
                <button class="tasksList__button tasksList__button--remove js-remove">
                    🗑
                </button>
            </li>
        `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlTasksString;
    };

    const renderButtons = () => {
        let htmlButtonsString = "";

        if (tasks.length > 0) {
            htmlButtonsString += `
                <button
                    class="main__headerButton js-hideAllDone"
                >
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button 
                    class="main__headerButton js-doneAllTasks" ${(tasks.every((task) => task.done) ? "disabled" : "")}
                >
                    Ukończ wszystkie
                </button>
            `;
        } else {
            htmlButtonsString += ``;
        };

        document.querySelector(".js-headerButtons").innerHTML = htmlButtonsString;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const bindButtonsEvents = () => {
        if (tasks.length > 0) {
            const doneAllTasksButton = document.querySelector(".js-doneAllTasks");

            doneAllTasksButton.addEventListener("click", () => {
                doneAllTasks();
            });

            const hideDoneTasksButton = document.querySelector(".js-hideAllDone");

            hideDoneTasksButton.addEventListener("click", () => {
                toggleHideDoneTasks();
            });
        };
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const setFocusOnInput = (inputElement) => {
        inputElement.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-newTask");
        const newTaskContent = inputElement.value.trim();

        setFocusOnInput(inputElement);

        if (newTaskContent === "") {
            return;
        } else {
            addNewTask(newTaskContent);
            inputElement.value = "";
        }
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}
