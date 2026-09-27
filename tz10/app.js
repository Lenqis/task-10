let todos = []
let currentFilter = "all";

function render(list) {
    const container = document.getElementById("todos");
    container.textContent = "";

    list.forEach(function (task) {
        const li = document.createElement("li");
        li.dataset.id = task.id;

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.done) {
            li.classList.add("done");
        }
        li.appendChild(taskText);

        const delet = document.createElement("button");
        delet.textContent = "Удалить";
        delet.classList.add("delete-bin");

        li.appendChild(delet);
        container.appendChild(li);
    });
};

render(visible());

const ul = document.getElementById("todos");

ul.addEventListener("click", function (event) {
    const delet = event.target.closest("button");
    if (delet) {
        const li = delet.closest("li");
        const id = Number(li.dataset.id);
        todos = todos.filter(function (todo) {
            return todo.id !== id;
        });
        render(visible());
        return;
    }
    const li = event.target.closest("li");
    if (!li) {
        return;
    };
    const id = Number(li.dataset.id);
    const task = todos.find(function (todo) {
        return todo.id === id;
    });
    if (!task) {
        return;
    };
    task.done = !task.done;
    render(visible());

});

const buttonAdd = document.getElementById("add");

buttonAdd.addEventListener("click", function () {
    const input = document.getElementById("task");
    const text = input.value.trim();
    if (text === "") {
        return;
    };

    const object = { id: Date.now(), text, done: false };
    todos.push(object);
    input.value = "";

    render(visible());
});

const filters = document.getElementById("tabs");
function visible() {
    if (currentFilter === "all") {
        return todos;
    };
    if (currentFilter === "active") {
        return todos.filter(function (t) {
            return !t.done;
        });
    };
    if (currentFilter === "done") {
        return todos.filter(function (t) {
            return t.done;
        });
    };
};

filters.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (!li) {
        return;
    };
    currentFilter = li.dataset.tab;
    document.querySelectorAll("#tabs li").forEach(function (tab) {
        tab.classList.remove("active");
        if (tab.dataset.tab === currentFilter) {
            tab.classList.add("active");
        };
    });
    render(visible());
});