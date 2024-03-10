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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}
