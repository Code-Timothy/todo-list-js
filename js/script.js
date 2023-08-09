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

    const form = document.querySelector(".js-form");

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

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li style="text-decoration:${task.done === true ? "line-through" : ""}">
                <button class="js-removeTask">Usuń</button>
                <button class="js-done">Zrobione</button>
                    ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        } else {
            addNewTask(newTaskContent);
            form.reset();
        }

    };

    const init = () => {
        render();

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}