{
    const tasks = [
        {
            content: "testowe zadanie 1",
            done: false,
        },
        {
            content: "testowe zadanie 2",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });

        renderTasks();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        renderTasks();
    };

    const onFormSubmit = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }

            addNewTask(newTaskContent);
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li style="${task.done ? "text-decoration: line-through" : ""}">
            <button class="js-remove">Usuń</button>
            ${task.content}
            </li>
            `;
        };

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });
    };

    const init = () => {
        renderTasks();
        onFormSubmit();
    };

    init();
}