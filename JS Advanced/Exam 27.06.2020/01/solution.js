function solve() {
    let inputs = document.querySelectorAll('input');
    let name = inputs[0];
    let age = inputs[1];
    let kind = inputs[2];
    let owner = inputs[3];
    let addBtn = document.querySelector('button').addEventListener('click', AddPet);
    let sections = document.querySelectorAll('section');

    function AddPet(e){
e.preventDefault();
        if(name.value !== '' && Number(age.value) && kind.value !== '' && owner.value !== ''){
            let li = document.createElement('li');
            let ul = sections[0].children[1];
            let p = document.createElement('p');
            let span = document.createElement('span');
            let contactBtn = document.createElement('button');

            p.innerHTML = `<strong>${name.value}</strong> is a <strong>${age.value}</strong> year old <strong>${kind.value}</strong>`;
            span.textContent = `Owner: ${owner.value}`;
            contactBtn.textContent = 'Contact with owner';
            contactBtn.addEventListener('click', Take);

            li.appendChild(p);
            li.appendChild(span);
            li.appendChild(contactBtn);
            ul.appendChild(li);

            name.value = '';
            age.value = '';
            kind.value = '';
            owner.value = '';
        }
    }

    function Take(e){
        let div = document.createElement('div');
        let input = document.createElement('input');
        let takeBtn = document.createElement('button');
        input.placeholder = `Enter your names`;
        takeBtn.textContent = `Yes! I take it!`;
        takeBtn.addEventListener('click', NewOwner);

        div.appendChild(input);
        div.appendChild(takeBtn);
        e.target.parentNode.appendChild(div);
        e.target.parentNode.removeChild(e.target);
    }

    function NewOwner(e){
        let newOwner = e.target.parentNode.children[0];
        let li = e.target.parentNode.parentNode;
        li.children[1].textContent = `New Owner: ${newOwner.value}`;
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Checked';
        deleteBtn.addEventListener('click', DeletePet);
        li.appendChild(deleteBtn);
        li.removeChild(e.target.parentNode);
        let adopted = sections[1].children[1];

        adopted.appendChild(li);
    }

    function DeletePet(e){
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }
}