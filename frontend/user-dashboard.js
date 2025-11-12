const API_URL = 'http://localhost:5000';

const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    window.location.href = 'login.html';
}

document.getElementById('userName').textContent = user.name;

let allResources = [];
let currentFilter = 'All';

loadResources();

async function loadResources() {
    try {
        const response = await fetch(`${API_URL}/resources`);
        const resources = await response.json();
        allResources = resources;
        displayResources();
    } catch (error) {
        console.log('Error loading resources');
    }
}

function displayResources() {
    const container = document.getElementById('resourcesList');
    container.innerHTML = '';

    let filteredResources = allResources;
    if (currentFilter !== 'All') {
        filteredResources = allResources.filter(r => r.category === currentFilter);
    }

    if (filteredResources.length === 0) {
        container.innerHTML = '<p class="no-resources">No resources available in this category.</p>';
        return;
    }

    filteredResources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        let categoryIcon = '';
        if (resource.category === 'Notes') categoryIcon = '📘';
        else if (resource.category === 'Videos') categoryIcon = '🎥';
        else if (resource.category === 'Assignments') categoryIcon = '📄';
        else if (resource.category === 'Books') categoryIcon = '📚';
        else if (resource.category === 'Practice') categoryIcon = '🧠';
        
        card.innerHTML = `
            <h3>${categoryIcon} ${resource.title}</h3>
            <p class="category-tag">${resource.category}</p>
            <p>${resource.description}</p>
            <div class="card-actions">
                <a href="${API_URL}${resource.filePath}" target="_blank">Download</a>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterCategory(category) {
    currentFilter = category;
    
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    event.target.classList.add('active');
    
    displayResources();
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}