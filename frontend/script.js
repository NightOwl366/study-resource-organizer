const API_URL = 'http://localhost:5000';

function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

function isValidPassword(password) {
    return password.length >= 6;
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const message = document.getElementById('signupMessage');

        if (!isValidEmail(email)) {
            message.textContent = 'Please enter a valid email';
            message.className = 'message error';
            return;
        }

        if (!isValidPassword(password)) {
            message.textContent = 'Password must be at least 6 characters';
            message.className = 'message error';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                message.textContent = 'Account created! Redirecting...';
                message.className = 'message success';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                message.textContent = data.message;
                message.className = 'message error';
            }
        } catch (error) {
            message.textContent = 'Server error';
            message.className = 'message error';
        }
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const message = document.getElementById('loginMessage');

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                message.textContent = 'Login successful!';
                message.className = 'message success';
                
                localStorage.setItem('user', JSON.stringify(data.user));
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                message.textContent = data.message;
                message.className = 'message error';
            }
        } catch (error) {
            message.textContent = 'Server error';
            message.className = 'message error';
        }
    });
}

if (window.location.pathname.includes('dashboard.html')) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        window.location.href = 'login.html';
    } else {
        const welcomeTitle = document.querySelector('.welcome-card h1');
        const welcomeText = document.querySelector('.welcome-card > p');
        
        if (user.role === 'admin') {
            welcomeTitle.textContent = 'Welcome Admin! 👑';
            welcomeText.textContent = 'You have full access to the Study Resource Organizer';
        } else {
            welcomeTitle.textContent = `Welcome ${user.name}! 👋`;
            welcomeText.textContent = 'You have successfully logged in to Study Resource Organizer';
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}