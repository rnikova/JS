function toggle() {
    let span = document.querySelector('#accordion div.head span.button');
    let extra = document.getElementById('extra');
    if (span.textContent === 'More') {
      span.textContent = 'Less';
      extra.style.display = 'block';
    } else {
      span.textContent = 'More';
      extra.style.display = 'none';
    }
}