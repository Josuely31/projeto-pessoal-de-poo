// Classe para Tarefa
class Task {
    constructor(text) {
        this.text = text;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

// Classe para Gerenciador de Tarefas
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(text) {
        const newTask = new Task(text);
        this.tasks.push(newTask);
        this.renderTasks();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].toggleCompleted();
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.className = task.completed ? 'task-text task-done' : 'task-text';

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Excluir';
            removeBtn.onclick = () => this.removeTask(index);

            li.appendChild(taskText);
            li.appendChild(removeBtn);
            li.onclick = () => this.toggleTaskCompletion(index);

            taskList.appendChild(li);
        });
    }
}

// Inicializa o gerenciador de tarefas
const taskManager = new TaskManager();

// Manipula o clique no botão de adicionar tarefa
document.getElementById('addTaskBtn').onclick = () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        taskManager.addTask(taskText);
        taskInput.value = '';
    }
};

// Permite adicionar tarefas pressionando Enter
document.getElementById('taskInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('addTaskBtn').click();
    }
});
