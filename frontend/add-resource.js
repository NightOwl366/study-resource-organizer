const API_URL = 'http://localhost:5000';

let user;
try {
    user = JSON.parse(localStorage.getItem('user'));
} catch (error) {
    user = null;
}

if (!user || user.role !== 'admin') {
    window.location.href = 'login.html';
}

function goBack() {
    window.location.href = 'admin-dashboard.html';
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

const form = document.getElementById('addResourceForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');
    const fileInput = document.getElementById('file');

    const title = titleInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;
    const file = fileInput.files[0];

    if (!file) {
        showMessage('Please select a file', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('file', file);
    formData.append('userEmail', user.email);

    const submitButton = form.querySelector('.btn-submit');
    submitButton.disabled = true;
    submitButton.textContent = 'Adding...';

    try {
        const response = await fetch(`${API_URL}/resources`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Resource added successfully!', 'success');
            form.reset();
            
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1500);
        } else {
            showMessage(data.message || 'Failed to add resource', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Add Resource';
        }
    } catch (error) {
        console.log('Error:', error);
        showMessage('Server error. Please try again.', 'error');
        submitButton.disabled = false;
        submitButton.textContent = 'Add Resource';
    }
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message show ' + type;
    
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 5000);
}