function solve() {
    let addBtn = document.getElementById('add').addEventListener('click', AddTask);
    let task = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let sections = document.querySelectorAll('section');

    function AddTask(e) {
        e.preventDefault();
        let article = document.createElement('article');
        let h3 = document.createElement('h3');
        h3.textContent = task.value;
        let pDescription = document.createElement('p');
        pDescription.textContent = 'Description: ' + description.value;
        let pDate = document.createElement('p');
        pDate.textContent = 'Due Date: ' + date.value;

        article.appendChild(h3);
        article.appendChild(pDescription);
        article.appendChild(pDate);

        let div = document.createElement('div');
        div.className = 'flex';
        let green = document.createElement('button');
        green.className = 'green';
        green.textContent = 'Start';
        green.addEventListener('click', InProgress);
        let red = document.createElement('button');
        red.className = 'red';
        red.textContent = 'Delete';
        red.addEventListener('click', Delete);
        div.appendChild(green);
        div.appendChild(red);
        article.appendChild(div);
        sections[1].children[1].appendChild(article);
    }

    function InProgress(e) {
        let article = e.target.parentNode.parentNode;
        let orange = document.createElement('button');
        orange.className = 'orange';
        orange.textContent = 'Finish';
        orange.addEventListener('click', Complete);
        e.target.parentNode.appendChild(orange);
        e.target.parentNode.removeChild(e.target.parentNode.childNodes[0]);
        sections[2].children[1].appendChild(article);
    }

    function Delete(e) {
     e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);   
    }

    function Complete(e){
        sections[3].children[1].appendChild(e.target.parentNode.parentNode)
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
}