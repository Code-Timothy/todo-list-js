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
            <li>
            <span ${task.done ? "style=\"text-decoration: line-through\"" : ""}>${task.content}</span> 
            <button class="js-done">Zrobione?</button> 
            <button class="js-remove">Usuń</button>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

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

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            } else {
                addNewTask(newTaskContent);
            }
        });
    };

    init();
}
