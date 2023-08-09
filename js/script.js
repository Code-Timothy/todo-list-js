{
    const tasks = [
        {
            content: "zadanie testowe 1",
            done: false,
        },
        {
            content: "zadanie testowe 2",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li style="text-decoration:${task.done === true ? "line-through" : ""}">
                <button class="js-removeTask">Usuń</button>
                    ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        
        const removeTasksButton = document.querySelectorAll(".js-removeTask");
        removeTasksButton.forEach((removeTaskButton, index) => {
            removeTaskButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        } else {
            addNewTask(newTaskContent);
        }

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}