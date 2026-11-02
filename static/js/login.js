document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeOffIcon = document.getElementById('eyeOffIcon');
    const userError = document.getElementById('userError');
    const passwordError = document.getElementById('passwordError');
    const statusAlert = document.getElementById('statusAlert');
    const statusMessage = document.getElementById('statusMessage');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const demoChips = document.querySelectorAll('.demo-chip');

    // 1. Password Visibility Toggle
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';

            if (isPassword) {
                passwordInput.setAttribute('type', 'text');
                if (eyeIcon) eyeIcon.style.display = 'none';
                if (eyeOffIcon) eyeOffIcon.style.display = 'block';
                togglePasswordBtn.setAttribute('aria-label', 'Ocultar senha');
                togglePasswordBtn.setAttribute('aria-pressed', 'true');
            } else {
                passwordInput.setAttribute('type', 'password');
                if (eyeIcon) eyeIcon.style.display = 'block';
                if (eyeOffIcon) eyeOffIcon.style.display = 'none';
                togglePasswordBtn.setAttribute('aria-label', 'Mostrar senha');
                togglePasswordBtn.setAttribute('aria-pressed', 'false');
            }
            passwordInput.focus();
        });
    }

    // 2. Realtime error removal on typing
    if (usernameInput && userError) {
        usernameInput.addEventListener('input', () => {
            if (usernameInput.value.trim().length > 0) {
                usernameInput.classList.remove('input-error');
                userError.classList.remove('visible');
            }
        });
    }

    if (passwordInput && passwordError) {
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.trim().length > 0) {
                passwordInput.classList.remove('input-error');
                passwordError.classList.remove('visible');
            }
        });
    }

    // 3. Demo Quick Fill Buttons (Opcional)
    if (demoChips.length > 0) {
        demoChips.forEach(chip => {
            chip.addEventListener('click', () => {
                usernameInput.value = chip.getAttribute('data-user') || '';
                passwordInput.value = chip.getAttribute('data-pass') || '';

                usernameInput.classList.remove('input-error');
                userError.classList.remove('visible');
                passwordInput.classList.remove('input-error');
                passwordError.classList.remove('visible');
                hideStatus();

                passwordInput.focus();
            });
        });
    }

    // 4. Forgot password handler (Opcional)
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const userVal = usernameInput.value.trim();
            if (userVal) {
                showStatus(`Instruções de recuperação foram enviadas para o e-mail cadastrado de "${userVal}".`, 'success');
            } else {
                showStatus('Por favor, informe seu usuário ou e-mail no campo acima para solicitar a recuperação.', 'error');
                usernameInput.focus();
            }
        });
    }

    // 5. Form Submission & Validation
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            hideStatus();

            let hasError = false;
            const user = usernameInput ? usernameInput.value.trim() : '';
            const pass = passwordInput ? passwordInput.value.trim() : '';

            // Validate Username
            if (!user) {
                if (usernameInput) usernameInput.classList.add('input-error');
                if (userError) userError.classList.add('visible');
                hasError = true;
            } else {
                if (usernameInput) usernameInput.classList.remove('input-error');
                if (userError) userError.classList.remove('visible');
            }

            // Validate Password
            if (!pass) {
                if (passwordInput) passwordInput.classList.add('input-error');
                if (passwordError) passwordError.classList.add('visible');
                hasError = true;
            } else {
                if (passwordInput) passwordInput.classList.remove('input-error');
                if (passwordError) passwordError.classList.remove('visible');
            }

            if (hasError) {
                e.preventDefault(); // Só bloqueia o envio se houver erro de preenchimento do HTML
                showStatus('Por favor, preencha todos os campos obrigatórios.', 'error');
                if (!user && usernameInput) {
                    usernameInput.focus();
                } else if (passwordInput) {
                    passwordInput.focus();
                }
                return;
            }

            // Se passou na validação visual do front, deixa o Django processar no backend
        });
    }

    function showStatus(text, type) {
        if (statusAlert && statusMessage) {
            statusAlert.className = `status-alert ${type}`;
            statusMessage.textContent = text;
            statusAlert.style.display = 'block';
        }
    }

    function hideStatus() {
        if (statusAlert && statusMessage) {
            statusAlert.className = 'status-alert';
            statusAlert.style.display = 'none';
            statusMessage.textContent = '';
        }
    }

    // ==========================================
    // 6. LÓGICA DO MODAL DE STATUS DA SENHA
    // ==========================================
    // const modalElement = document.getElementById('statusModal');
    // if (modalElement) {
    //     const mensagem = modalElement.getAttribute('data-mensagem');
    //     const deveAbrir = modalElement.getAttribute('data-abrir');

    //     if (mensagem && mensagem.trim() !== "" && deveAbrir === 'true') {
    //         if (typeof bootstrap !== 'undefined') {
    //             const myModal = new bootstrap.Modal(modalElement);
    //             myModal.show();
    //         } else {
    //             // Fallback caso o bootstrap não carregue
    //             modalElement.style.display = 'block';
    //             modalElement.classList.add('show');
    //         }
    //     }
    // }
    // ==========================================
    // 6. LÓGICA DO MODAL DE STATUS DA SENHA (FORÇADA)
    // ==========================================
    const modalElement = document.getElementById('statusModal');
    if (modalElement) {
        const mensagem = modalElement.getAttribute('data-mensagem');
        const deveAbrir = modalElement.getAttribute('data-abrir');

        console.log("Mensagem lida:", mensagem); // Olhe o F12 do navegador para ver se aparece texto aqui
        console.log("Deve abrir:", deveAbrir);

        if (mensagem && mensagem.trim() !== "" && deveAbrir === 'true') {
            // Força a exibição via CSS e classes do Bootstrap diretamente
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
            modalElement.removeAttribute('aria-hidden');
            modalElement.setAttribute('aria-modal', 'true');
            modalElement.setAttribute('role', 'dialog');
            
            // Adiciona o fundo escuro (backdrop) do modal na tela
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            document.body.appendChild(backdrop);
            document.body.classList.add('modal-open');
        }
    }
});