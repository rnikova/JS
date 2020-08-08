const elements = {
    success: document.getElementById('successBox'),
    error: document.getElementById('errorBox')
};

export function showInfo(message) {
    elements.success.style.display = 'block';
    elements.success.textContent = message;

    setTimeout(hideInfo, 1000);
}

export function showError(message) {
    elements.error.style.display = 'block';
    elements.error.textContent = message;
    
    setTimeout(hideError, 1000);
}

function hideInfo() {
    elements.success.style.display = 'none';
}

function hideError() {
    elements.error.style.display = 'none';
}