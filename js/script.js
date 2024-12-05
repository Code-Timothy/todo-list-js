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
    };

    init();
}