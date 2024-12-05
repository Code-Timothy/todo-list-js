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

    const removeTask = () => { };

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
            ${task.content}
            </li>
            `;
        };

        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const init = () => {
        renderTasks();
        onFormSubmit();
    };

    init();
}