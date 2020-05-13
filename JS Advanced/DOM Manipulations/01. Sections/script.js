function create(words) {
   for (let word of words) {
      let div = document.createElement('div');
      let content = document.getElementById('content');
      div.innerHTML = `<p style="display: none">${word}</p>`;
      div.addEventListener('click',onClick);
      content.appendChild(div);
    }
    
    function onClick() {
      this.querySelector('p').style.display = 'inline'
    }
}