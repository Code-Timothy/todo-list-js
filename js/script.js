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

    const onFormSubmit = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent === "") {
                return;
            }
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
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