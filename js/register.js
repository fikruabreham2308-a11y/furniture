const form = document.getElementById("registerForm");

const toggle1 = document.getElementById("togglePass1");
const toggle2 = document.getElementById("togglePass2");
const pass = document.getElementById("password");
const confirmPass = document.getElementById("confirmPassword");

// Show/Hide password
toggle1.onclick = () => pass.type = pass.type === "password" ? "text" : "password";
toggle2.onclick = () => confirmPass.type = confirmPass.type === "password" ? "text" : "password";

form.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = pass.value.trim();
    let confirm = confirmPass.value.trim();

    document.getElementById("nameError").textContent="";
    document.getElementById("emailError").textContent="";
    document.getElementById("passwordError").textContent="";
    document.getElementById("confirmError").textContent="";

    let valid=true;

    if(name.length < 3){
        document.getElementById("nameError").textContent="Enter full name";
        valid=false;
    }

    if(!email.includes("@") || !email.includes(".")){
        document.getElementById("emailError").textContent="Enter valid email";
        valid=false;
    }

    // Strong password validation
    let strongPass = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

    if(!strongPass.test(password)){
        document.getElementById("passwordError").textContent =
        "Min 6 chars, 1 number, 1 capital letter";
        valid=false;
    }

    if(password !== confirm){
        document.getElementById("confirmError").textContent="Passwords do not match";
        valid=false;
    }

    if(valid){
        alert("Registration Successful 🎉");
        form.reset();
    }
});