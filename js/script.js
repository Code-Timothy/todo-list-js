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

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        renderTasks();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
              ${task.done ? " style=\"text-decoration: line-through\"" : ""}
            >
              <button class="js-remove">Usuń</button>
              <button class="js-done">zrobione</button>
              ${task.content}
            </li>
          `;
        };

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        renderTasks();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}