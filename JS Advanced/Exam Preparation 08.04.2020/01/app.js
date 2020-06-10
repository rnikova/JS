function solve() {
    let task = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let addBtn = document.querySelector('button#add').addEventListener('click', AddTask);

    function AddTask(e) {
        e.preventDefault();
        if(task.value !== "" || description.value !== "" || data.value !== ""){
            let openSection = document.querySelector('.orange').parentNode.parentNode.children[1];
            let openTask = document.createElement('article');
            let h3Task = document.createElement('h3');
            h3Task.textContent = task.value;
            let pDescription = document.createElement('p');
            pDescription.innerText = 'Description: ' + description.value;
            let pDate = document.createElement('p');
            pDate.innerText = 'Due Date: ' + date.value;
            let divBtns = document.createElement('div')
            divBtns.className = 'flex';
            let greenBtn = document.createElement('button');
            greenBtn.className = 'green';
            greenBtn.textContent = 'Start';
            let redBtn = document.createElement('button');
            redBtn.className = 'red';
            redBtn.textContent = 'Delete';

            divBtns.appendChild(greenBtn);
            divBtns.appendChild(redBtn);
            openTask.appendChild(h3Task);
            openTask.appendChild(pDescription);
            openTask.appendChild(pDate);
            openTask.appendChild(divBtns);
            openSection.appendChild(openTask);
        }
    }

}