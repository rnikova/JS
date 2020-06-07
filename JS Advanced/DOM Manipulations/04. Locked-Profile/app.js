function lockedProfile() {
    let btns = [... document.getElementsByTagName('button')];
    btns.forEach(b => b.addEventListener('click', showHideInformation));

    function showHideInformation(event) {
        let button = event.target;
        let profile = button.parentNode;

        const moreInformation = profile.getElementsByTagName('div')[0];
        const lockStatus = profile.querySelector('input[type="radio"]:checked').value;
 
        if (lockStatus === 'unlock') {
            if (button.textContent === 'Show more') {
                moreInformation.style.display = 'inline-block';
                button.textContent = 'Hide it';
            } else if (button.textContent === 'Hide it') {
                moreInformation.style.display = 'none';
                button.textContent = 'Show more';
            }
        }

    }
    
}