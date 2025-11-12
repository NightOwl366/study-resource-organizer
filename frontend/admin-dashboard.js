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

document.getElementById('userName').textContent = user.name;

let allResources = [];
let currentFilter = 'All';

loadResources();

function goToAddResource() {
    window.location.href = 'add-resource.html';
}

async function loadResources() {
    try {
        const response = await fetch(`${API_URL}/resources`);
        const data = await response.json();
        allResources = data;
        displayResources();
    } catch (error) {
        console.log('Error:', error);
        document.getElementById('resourcesList').innerHTML = '<p class="no-resources">Failed to load resources</p>';
    }
}

function displayResources() {
    const container = document.getElementById('resourcesList');
    container.innerHTML = '';

    let resourcesToShow = allResources;
    
    if (currentFilter !== 'All') {
        resourcesToShow = [];
        for (let i = 0; i < allResources.length; i++) {
            if (allResources[i].category === currentFilter) {
                resourcesToShow.push(allResources[i]);
            }
        }
    }

    if (resourcesToShow.length === 0) {
        container.innerHTML = '<p class="no-resources">No resources found</p>';
        return;
    }

    for (let i = 0; i < resourcesToShow.length; i++) {
        const resource = resourcesToShow[i];
        
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        card.innerHTML = `
            <h3>${resource.title}</h3>
            <span class="category-badge">${resource.category}</span>
            <p>${resource.description}</p>
            <div class="card-buttons">
                <a href="${API_URL}${resource.filePath}" target="_blank">Download</a>
                <button onclick="deleteResource('${resource._id}')">Delete</button>
            </div>
        `;
        
        container.appendChild(card);
    }
}

function filterCategory(category, button) {
    currentFilter = category;
    
    const allButtons = document.querySelectorAll('.filter-btn');
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('active');
    }
    
    button.classList.add('active');
    
    displayResources();
}

async function deleteResource(resourceId) {
    const confirmDelete = confirm('Are you sure you want to delete this resource?');
    
    if (confirmDelete) {
        try {
            const response = await fetch(`${API_URL}/resources/${resourceId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail: user.email })
            });

            if (response.ok) {
                alert('Resource deleted successfully!');
                loadResources();
            } else {
                alert('Failed to delete resource');
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Error deleting resource');
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}