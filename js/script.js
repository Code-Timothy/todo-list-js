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

    const editTask = (taskIndex, newContent) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], content: newContent },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
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
                <span class="js-taskContent ${task.done ? "tasksList__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="tasksList__button tasksList__button--edit js-edit">🖊</button>  
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
                    class="buttons__button js-hideAllDone"
                >
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button 
                    class="buttons__button js-doneAllTasks" ${(tasks.every(({ done }) => done) ? "disabled" : "")}
                >
                    Ukończ wszystkie
                </button>
            `;
        } else {
            htmlButtonsString += ``;
        };

        document.querySelector(".js-headerButtons").innerHTML = htmlButtonsString;
    };

    const bindButtonsEvents = () => {
        if (tasks.length > 0) {
            const doneAllTasksButton = document.querySelector(".js-doneAllTasks");

            doneAllTasksButton.addEventListener("click", doneAllTasks);

            const hideDoneTasksButton = document.querySelector(".js-hideAllDone");

            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const bindEditEvents = () => {
        const editButtons = document.querySelectorAll(".js-edit");

        editButtons.forEach((editButton, taskIndex) => {
            editButton.addEventListener("click", () => {
                const taskContentElement = document.querySelectorAll(".js-taskContent")[taskIndex];
                taskContentElement.setAttribute("contentEditable", true);
                taskContentElement.focus();
            });
        });

        const taskContentElements = document.querySelectorAll(".js-taskContent");

        taskContentElements.forEach((taskContentElement, taskIndex) => {
            taskContentElement.addEventListener("blur", () => {
                const newContent = taskContentElement.innerText.trim();
                editTask(taskIndex, newContent);
            });
        });
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

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindEditEvents();
        bindButtonsEvents();
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
