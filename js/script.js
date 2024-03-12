{
    const tasks = [
        {
            content: "Przykładowe zadanie nr1.",
            done: false,
        },
        {
            content: "Przykładowe zadanie nr2.",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li 
                    class="tasksList__item"
                >
                    <button class="tasksList__button js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span ${task.done ? "class=\"tasksList__item--toggleDone\"" : ""}>
                        ${task.content}
                    </span>  
                    <button class="tasksList__button tasksList__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

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
