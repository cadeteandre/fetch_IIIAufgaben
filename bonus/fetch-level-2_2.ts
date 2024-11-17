import { ITodo } from "../interface/ITodo";

const URL = 'https://jsonplaceholder.typicode.com/todos';

const showResults = document.querySelector('#showResults') as HTMLDivElement;
const searchTaskInput = document.querySelector('#searchTaskInput') as HTMLInputElement;

let fetchedTasks: ITodo[] = [];

function sortAlphabeticalOrder(a: ITodo, b: ITodo) {
    return a.title.localeCompare(b.title);
}

async function fetchAndDisplayTasks(url: string): Promise<void> {
    try {
        const response = await fetch(url);
        const tasksArr = await response.json() as ITodo[];
        const sortedTasksArr = tasksArr.toSorted(sortAlphabeticalOrder);
        fetchedTasks = [...sortedTasksArr];

        sortedTasksArr.forEach(async (task) => showResults.appendChild(await createTaskContainer(task)));
    } catch(error) {
        console.error(error);
    }
}

async function createTaskContainer(task: ITodo): Promise<HTMLDivElement> {
    const taskCard = document.createElement('div') as HTMLDivElement;
    taskCard.classList.add('task__card');
    taskCard.innerHTML = `
        <h3>${task.title}</h3>
        <p>ID: ${task.id}</p>
        <p>User ID: ${task.userId}</p>
        <p>Completed: <span style="color: ${task.completed ? 'green' : 'orange'};">${task.completed}</span></p>
    `;
    return taskCard;
}

function searchTasks(): void {
    showResults.innerHTML = '';
    const searchedTitle = searchTaskInput.value.trim().toLowerCase();

    fetchedTasks.forEach(async (task) => {
        if(task.title.toLowerCase().includes(searchedTitle)) {
            showResults.appendChild(await createTaskContainer(task));
        }
    })
}

searchTaskInput.addEventListener('input', searchTasks);

fetchAndDisplayTasks(URL);