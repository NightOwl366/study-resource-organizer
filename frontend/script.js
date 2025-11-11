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
                    if (data.user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html'; 
                    } else {
                        window.location.href = 'user-dashboard.html';   
                    }
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