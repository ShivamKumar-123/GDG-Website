// ===========================
// AUTHENTICATION MANAGER
// GDG NEHU - Local Storage Auth
// ===========================

// Authentication Class
class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateUIBasedOnAuth();
        this.setupLogoutHandlers();
    }

    // Check if user is logged in
    isLoggedIn() {
        return sessionStorage.getItem('gdg_logged_in') === 'true';
    }

    // Get current user data
    getCurrentUser() {
        const userStr = sessionStorage.getItem('gdg_current_user');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Logout user
    logout() {
        // Clear session storage
        sessionStorage.removeItem('gdg_logged_in');
        sessionStorage.removeItem('gdg_current_user');
        
        // Clear remember me if needed
        const shouldRemember = localStorage.getItem('gdg_remember');
        if (shouldRemember !== 'true') {
            localStorage.removeItem('gdg_user_email');
        }
        
        // Redirect to login page
        window.location.href = './loginpage/login.html';
    }

    // Update UI based on authentication status
    updateUIBasedOnAuth() {
        const loginBtn = document.querySelector('.btn-login');
        
        if (!loginBtn) return;

        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();
            
            // Create user dropdown
            const userDropdown = document.createElement('div');
            userDropdown.className = 'user-dropdown';
            userDropdown.innerHTML = `
                <button class="user-menu-btn">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="user-name">${this.getFirstName(user.name)}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="dropdown-menu">
                    <div class="dropdown-header">
                        <div class="dropdown-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="dropdown-user-info">
                            <div class="dropdown-name">${user.name}</div>
                            <div class="dropdown-email">${user.email}</div>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-user"></i>
                        <span>Profile</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-calendar"></i>
                        <span>My Events</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout-btn">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            `;
            
            // Replace login button with user dropdown
            loginBtn.parentElement.innerHTML = '';
            loginBtn.parentElement.appendChild(userDropdown);
            
            // Add styles for dropdown
            this.addDropdownStyles();
            
            // Setup dropdown functionality
            this.setupDropdown(userDropdown);
        }
    }

    // Get first name from full name
    getFirstName(fullName) {
        return fullName.split(' ')[0];
    }

    // Setup dropdown toggle
    setupDropdown(dropdown) {
        const menuBtn = dropdown.querySelector('.user-menu-btn');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });
        
        // Prevent dropdown from closing when clicking inside
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Setup logout handlers
    setupLogoutHandlers() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.logout-btn')) {
                e.preventDefault();
                
                if (confirm('Are you sure you want to logout?')) {
                    this.showLogoutAnimation();
                    setTimeout(() => {
                        this.logout();
                    }, 1000);
                }
            }
        });
    }

    // Show logout animation
    showLogoutAnimation() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            animation: fadeIn 0.3s ease;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center; color: white;">
                <i class="fas fa-spinner fa-spin" style="font-size: 48px; margin-bottom: 20px;"></i>
                <div style="font-size: 20px; font-weight: 600;">Logging out...</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }

    // Add dropdown styles dynamically
    addDropdownStyles() {
        if (document.getElementById('auth-dropdown-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'auth-dropdown-styles';
        style.textContent = `
            .user-dropdown {
                position: relative;
            }

            .user-menu-btn {
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 8px 15px;
                border-radius: 25px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .user-menu-btn:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-2px);
            }

            .user-avatar {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            }

            .user-name {
                font-weight: 600;
                font-size: 0.95rem;
            }

            .user-menu-btn i.fa-chevron-down {
                font-size: 0.8rem;
                transition: transform 0.3s ease;
            }

            .user-menu-btn:hover i.fa-chevron-down {
                transform: rotate(180deg);
            }

            .dropdown-menu {
                position: absolute;
                top: calc(100% + 10px);
                right: 0;
                min-width: 280px;
                background: rgba(15, 15, 30, 0.98);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                z-index: 1000;
            }

            .dropdown-menu.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .dropdown-header {
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .dropdown-avatar {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
            }

            .dropdown-user-info {
                flex: 1;
            }

            .dropdown-name {
                font-weight: 600;
                font-size: 1rem;
                color: white;
                margin-bottom: 4px;
            }

            .dropdown-email {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .dropdown-divider {
                height: 1px;
                background: rgba(255, 255, 255, 0.1);
                margin: 8px 0;
            }

            .dropdown-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 20px;
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .dropdown-item:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }

            .dropdown-item i {
                width: 20px;
                font-size: 1rem;
                color: #4285F4;
            }

            .dropdown-item.logout-btn {
                color: #EA4335;
            }

            .dropdown-item.logout-btn:hover {
                background: rgba(234, 67, 53, 0.1);
            }

            .dropdown-item.logout-btn i {
                color: #EA4335;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @media (max-width: 768px) {
                .user-name {
                    display: none;
                }

                .dropdown-menu {
                    right: -10px;
                    min-width: 260px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Protected page check
    protectPage() {
        if (!this.isLoggedIn()) {
            alert('Please login to access this page');
            window.location.href = './loginpage/login.html';
        }
    }

    // Show welcome message
    showWelcomeMessage() {
        if (!this.isLoggedIn()) return;
        
        const user = this.getCurrentUser();
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const diff = now - loginTime;
        
        // Show welcome only if logged in within last 10 seconds
        if (diff < 10000) {
            this.displayNotification(`Welcome back, ${user.name}! 👋`, 'success');
        }
    }

    // Display notification
    displayNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `auth-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        if (!document.getElementById('auth-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'auth-notification-styles';
            style.textContent = `
                .auth-notification {
                    position: fixed;
                    top: 100px;
                    right: -400px;
                    max-width: 350px;
                    background: rgba(0, 0, 0, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    padding: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    z-index: 10000;
                    transition: right 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    color: white;
                }

                .auth-notification.show {
                    right: 30px;
                }

                .auth-notification i {
                    font-size: 24px;
                }

                .auth-notification.success i {
                    color: #34A853;
                }

                .auth-notification.info i {
                    color: #4285F4;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize Auth Manager
const authManager = new AuthManager();

// Show welcome message on page load
window.addEventListener('load', () => {
    authManager.showWelcomeMessage();
});

// Export for use in other scripts
window.authManager = authManager;