// ===========================
// LOGIN SYSTEM - GDG NEHU
// Local Storage Authentication
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================
    // PARTICLES BACKGROUND
    // ==================
    const particlesBg = document.getElementById('particlesBg');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesBg.appendChild(particle);
    }
    
    // ==================
    // ELEMENTS
    // ==================
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // Login form elements
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const rememberMe = document.getElementById('rememberMe');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    
    // Register form elements
    const registerName = document.getElementById('registerName');
    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');
    
    // Social login buttons
    const googleLogin = document.getElementById('googleLogin');
    const githubLogin = document.getElementById('githubLogin');
    const linkedinLogin = document.getElementById('linkedinLogin');
    
    // ==================
    // TAB SWITCHING
    // ==================
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        clearMessages();
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        clearMessages();
    });
    
    // ==================
    // PASSWORD TOGGLE
    // ==================
    toggleLoginPassword.addEventListener('click', function() {
        togglePasswordVisibility(loginPassword, this);
    });
    
    toggleRegisterPassword.addEventListener('click', function() {
        togglePasswordVisibility(registerPassword, this);
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(confirmPassword, this);
    });
    
    function togglePasswordVisibility(input, icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // ==================
    // PASSWORD STRENGTH CHECKER
    // ==================
    registerPassword.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length === 0) {
            passwordStrength.classList.remove('show');
            return;
        }
        
        passwordStrength.classList.add('show');
        
        let strength = 0;
        
        // Check length
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Check for lowercase and uppercase
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        
        // Check for numbers
        if (/\d/.test(password)) strength++;
        
        // Check for special characters
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        // Update strength bar
        strengthBar.className = 'strength-bar';
        
        if (strength <= 2) {
            strengthBar.classList.add('strength-weak');
        } else if (strength <= 4) {
            strengthBar.classList.add('strength-medium');
        } else {
            strengthBar.classList.add('strength-strong');
        }
    });
    
    // ==================
    // LOGIN FORM SUBMIT
    // ==================
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearMessages();
        
        const email = loginEmail.value.trim();
        const password = loginPassword.value;
        
        // Validate inputs
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Check if user exists
        const users = getUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            showError('Account not found. Please register first.');
            return;
        }
        
        // Verify password
        if (user.password !== hashPassword(password)) {
            showError('Incorrect password. Please try again.');
            return;
        }
        
        // Login successful
        const loginData = {
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString()
        };
        
        // Save login state
        if (rememberMe.checked) {
            localStorage.setItem('gdg_remember', 'true');
            localStorage.setItem('gdg_user_email', email);
        }
        
        sessionStorage.setItem('gdg_logged_in', 'true');
        sessionStorage.setItem('gdg_current_user', JSON.stringify(loginData));
        
        // Show success and redirect
        showSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    });
    
    // ==================
    // REGISTER FORM SUBMIT
    // ==================
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearMessages();
        
        const name = registerName.value.trim();
        const email = registerEmail.value.trim();
        const password = registerPassword.value;
        const confirmPwd = confirmPassword.value;
        
        // Validate inputs
        if (!name || !email || !password || !confirmPwd) {
            showError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }
        
        if (password !== confirmPwd) {
            showError('Passwords do not match');
            return;
        }
        
        // Check if user already exists
        const users = getUsers();
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            showError('An account with this email already exists');
            return;
        }
        
        // Create new user
        const newUser = {
            id: generateId(),
            name: name,
            email: email,
            password: hashPassword(password),
            createdAt: new Date().toISOString()
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('gdg_users', JSON.stringify(users));
        
        // Show success
        showSuccess('Account created successfully! Please login.');
        
        // Clear form
        registerForm.reset();
        passwordStrength.classList.remove('show');
        
        // Switch to login tab
        setTimeout(() => {
            loginTab.click();
            loginEmail.value = email;
        }, 1500);
    });
    
    // ==================
    // SOCIAL LOGIN (Demo)
    // ==================
    googleLogin.addEventListener('click', function() {
        showError('Google login is not yet implemented. Please use email/password.');
    });
    
    githubLogin.addEventListener('click', function() {
        showError('GitHub login is not yet implemented. Please use email/password.');
    });
    
    linkedinLogin.addEventListener('click', function() {
        showError('LinkedIn login is not yet implemented. Please use email/password.');
    });
    
    // ==================
    // FORGOT PASSWORD
    // ==================
    document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Enter your registered email address:');
        
        if (email) {
            const users = getUsers();
            const user = users.find(u => u.email === email);
            
            if (user) {
                showSuccess('Password reset link sent to your email (Demo only)');
            } else {
                showError('No account found with this email address');
            }
        }
    });
    
    // ==================
    // HELPER FUNCTIONS
    // ==================
    
    function getUsers() {
        const users = localStorage.getItem('gdg_users');
        return users ? JSON.parse(users) : [];
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function hashPassword(password) {
        // Simple hash function (in production, use bcrypt or similar)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }
    
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.classList.add('show');
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
    
    function clearMessages() {
        errorMessage.classList.remove('show');
        successMessage.classList.remove('show');
    }
    
    // ==================
    // AUTO-FILL REMEMBERED EMAIL
    // ==================
    const rememberedEmail = localStorage.getItem('gdg_user_email');
    const shouldRemember = localStorage.getItem('gdg_remember');
    
    if (shouldRemember === 'true' && rememberedEmail) {
        loginEmail.value = rememberedEmail;
        rememberMe.checked = true;
    }
    
    // ==================
    // CHECK IF ALREADY LOGGED IN
    // ==================
    const isLoggedIn = sessionStorage.getItem('gdg_logged_in');
    
    if (isLoggedIn === 'true') {
        const currentUser = JSON.parse(sessionStorage.getItem('gdg_current_user'));
        showSuccess(`Already logged in as ${currentUser.name}. Redirecting...`);
        
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    }
    
    // ==================
    // DEMO ACCOUNT INFO
    // ==================
    console.log('%c🔐 GDG NEHU Login System', 'background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('%cDemo Account (if no users registered):', 'color: #4285F4; font-size: 14px; font-weight: bold;');
    console.log('Email: demo@gdgnehu.com');
    console.log('Password: demo1234');
    
    // Create demo account if no users exist
    const users = getUsers();
    if (users.length === 0) {
        const demoUser = {
            id: 'demo001',
            name: 'Demo User',
            email: 'demo@gdgnehu.com',
            password: hashPassword('demo1234'),
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('gdg_users', JSON.stringify([demoUser]));
        console.log('%c✅ Demo account created!', 'color: #34A853; font-weight: bold;');
    }
});