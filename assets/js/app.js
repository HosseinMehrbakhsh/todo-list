let inputEl = document.querySelector('.to_do_input');
let contentList = document.querySelector('.to_do_content_list');
let contentListBox = document.querySelector('.to_do_content_box');
let toDoForm = document.querySelector('.toDoForm');

let toDos = [];

//show tasks from local storage when page load
window.addEventListener('load', () => {
    if (JSON.parse(localStorage.getItem('toDoList'))) {
        toDos = JSON.parse(localStorage.getItem('toDoList'));
        loadTask();
    }
});


toDoForm.addEventListener('submit', add);


// add task
function add() {
    let title = inputEl.value;
    if (title.trim() == '') {
        alert('ورودی خالی می باشد!!');
        return;
    }
    if (title.includes('<') || title.includes('>')) {
        alert('کاراکترهای غیرمجاز وارد شده است!');
        return;
    }

    toDos.push({
        title: title,
        status: 'new',// new | doing | done
    });
    loadTask();
    inputEl.value = '';

    saveToLocalstorage();
}

// remove task 
function remove(index) {
    toDos.splice(index, 1);

    saveToLocalstorage();
    loadTask();

    if (toDos.length === 0) {
        localStorage.removeItem('toDoList');
        contentListBox.classList.add('d-none');
    }
}

// doing status 
function doing(index) {
    toDos[index].status = 'doing';
    saveToLocalstorage();
    loadTask();
}

// done status 
function done(index) {
    toDos[index].status = 'done';
    saveToLocalstorage();
    loadTask();
}

// showing tasks
function loadTask() {
    contentList.innerHTML = '';
    contentListBox.classList.remove('d-none');

    toDos.forEach((toDoItem, index) => {
        let element = document.createElement('li');

        element.innerHTML = `
                        <span class="toDoTitle">${toDoItem.title}</span>
                        <div class="d-flex align-items-center gap-2">
                            <button onclick="done(${index})" class="finishedBtn btn btn-secondary p-2"><small>انجام شده</small></button>
                            <button onclick="doing(${index})" class="doingBtn btn btn-warning p-2"><small>درحال انجام</small></button>
                            <span class="btn btn-danger p-0">
                                <button onclick="remove(${index})" class="close_element btn-close p-2"></button>
                            </span>
                        </div>
                        
                        `;
        element.className = 'alert alert-light d-flex align-items-center justify-content-between';

        if (toDos[index].status == 'doing') {
            element.classList.remove('alert-light', 'alert-dark');
            element.classList.add('alert-warning');
            element.querySelector('.toDoTitle').classList.remove('text-decoration-line-through')
        }

        else if (toDos[index].status == 'done') {
            element.classList.remove('alert-light', 'alert-warning');
            element.classList.add('alert-done');
            element.querySelector('.toDoTitle').classList.add('text-decoration-line-through')
        }

        contentList.append(element);
    });
}

// save to local storage 
function saveToLocalstorage() {
    localStorage.setItem('toDoList', JSON.stringify(toDos));
}