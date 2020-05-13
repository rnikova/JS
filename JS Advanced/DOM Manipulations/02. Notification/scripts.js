function notify(message) {
    let notificationBox = document.getElementById('notification');
    notificationBox.style.display = 'block';
    notificationBox.textContent = message;
    setTimeout(()=>{notificationBox.style.display = 'none';},2000)
}