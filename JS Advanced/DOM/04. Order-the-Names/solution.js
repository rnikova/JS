function solve() {
    let button = document.getElementsByTagName('button')[0];
    let student = document.querySelector('input[type=text]');

    button.addEventListener('click', addStudent);

    function addStudent(){
        let studentName = student.value;
        let index = studentName[0].toUpperCase().charCodeAt(0) - 65;  
        let Allletters = document.querySelectorAll("ol li");

        if (Allletters[index].textContent === ''){
            Allletters[index].textContent += studentName.charAt(0).toUpperCase() + studentName.slice(1).toLowerCase();
         }else{
            Allletters[index].textContent += ", "+ studentName.charAt(0).toUpperCase() + studentName.slice(1).toLowerCase();  
         }

         student.value = '';
    }
}