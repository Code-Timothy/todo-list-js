{
    let tasks = [
        { content: "1", done: false },
        { content: "2", done: false },
        { content: "3", done: false },
        { content: "4", done: false },
        { content: "5", done: false },
        { content: "6", done: false },
    ];

    let hideDoneTasks = false;

    const form = document.querySelector(".js-form");

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render()
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

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasksList__item">
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
        headerButtons.innerHTML = `
            <button class="tile__button">Ukryj ukończone</button>
            <button class="tile__button">Ukończ wszystkie</button>
        `;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
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