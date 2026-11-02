
    // --- Primeiro Input (Senha) ---
    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");
    
    if (togglePassword && password) {
        togglePassword.addEventListener("click", function () {
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);

            const icon = this.querySelector("i");
            icon.classList.toggle("bi-eye");
            icon.classList.toggle("bi-eye-slash");
        });
    }

    // --- Segundo Input (Senha Repetida) ---
    const toggleConfirmPassword = document.getElementById("togglesenha_repetida");
    const confirmPassword = document.getElementById("senha_repetida");

    if (toggleConfirmPassword && confirmPassword) {
        toggleConfirmPassword.addEventListener("click", function () {
            const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
            confirmPassword.setAttribute("type", type);

            const icon = this.querySelector("i");
            icon.classList.toggle("bi-eye");
            icon.classList.toggle("bi-eye-slash");
        });
    }
