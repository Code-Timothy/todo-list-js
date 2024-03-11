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

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content} <button class="js-removeButton">Usuń</button>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const init = () => {
        render();
    };

    init();
}
