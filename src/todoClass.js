export default class TodoMaster {
  constructor() {
    return null;
  }

  add(task = null) {
    if (task) {
      const taskMem = this.constructor.get();

      const newTask = {
        completed: false,
        description: task.charAt(0).toUpperCase() + task.slice(1).toLowerCase(),
        index: taskMem.length,
      };

      taskMem.push(newTask);
      this.constructor.set(taskMem);
      this.show();
    }
  }

  clear() {
    const tasks = this.constructor.get();

    const newTasks = tasks.filter((item) => {
      if (!item.completed) return true;
      return null;
    });

    this.constructor.set(this.constructor.refreshId(newTasks));
    this.show();
  }

  complete(id = null) {
    const tasks = this.constructor.get();

    const newTasks = tasks.filter((item) => {
      if (Number(id) === item.index) {
        item.completed = !item.completed;
        return item;
      }
      return item;
    });

    this.constructor.set(newTasks);
    this.show();
  }

  del(id = null) {
    if (id != null) {
      const tasks = this.constructor.get();

      const newTasks = tasks.filter((item) => {
        if (Number(id) !== item.index) return true;
        return null;
      });

      this.constructor.set(this.constructor.refreshId(newTasks));
      this.show();
    }
  }

  static get() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) return tasks;
    return [];
  }

  static set(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static refreshId(tasks) {
    for (let i = 0; i < tasks.length; i += 1) tasks[i].index = i;
    return tasks;
  }

  newtask(content) {
    let li = document.createElement("li");

    li.setAttribute('draggable','true');
    li.setAttribute('id',`task${item.index}`);
    return li.appendChild(document.createTextNode(content));
  }

  reorder() {
    const tasks = this.constructor.get();
    const ul = document.getElementById('task-list');
    const li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i += 1) {
      tasks[li[i].getAttribute('id').slice(4)].index = i;
    }

    tasks.sort((a, b) => a.index - b.index);
    this.constructor.set(tasks);
  }

  show() {
    const task = this.constructor.get();
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = '';

    if (task.length) {
      task.forEach((item) => {
        let content = `<div id="axn${item.index}" class="article-info" data-id="${item.index}" onmousedown="return false">
                <i id="icon${item.index}" class="${showIcon}"></i>
                <p id="title${item.index}" ${showText}>${item.description}</p>
            </div>
        
            <div id="del${item.index}" class="article-btn" title="Delete Task" onmousedown="return false">
                <i class="fas fa-trash-alt icon"></i>
            </div>`;

        ul.appendChild(newtask(content));  
      });
    } else {
      ul.appendChild(newtask('<span>No task availables</span></i>'));  
    }

    return true;
  }
}