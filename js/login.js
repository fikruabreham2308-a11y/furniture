document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // 1. Toggle Password Visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '🕶️';
    });

    // 2. Form Submission Handling
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = passwordInput.value;

        // Simple validation check
        if (email && password) {
            console.log("Attempting login for:", email);
            
            // Here you would typically use fetch() to send data to your PHP/Node backend
            // For now, we will simulate a success
            alert("Login Successful! Welcome to ROHAM.");
            window.location.href = "index.html"; 
        } else {
            alert("Please fill in all fields.");
        }
    });
});