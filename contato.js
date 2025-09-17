// ================================
// Formulário de contato
// ================================
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", handleFormSubmit);
});

// ================================
// Função principal de envio
// ================================
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Capturar valores dos campos
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    // Validações
    if (!name || !email || !message) {
        showNotification("Por favor, preencha todos os campos obrigatórios.", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showNotification("Por favor, insira um e-mail válido.", "error");
        return;
    }

    // Estado de carregamento
    toggleButton(submitBtn, true, "Enviando...");

    try {
        const formData = new FormData(form);

        // Corrigi a URL (estava entre colchetes e com markdown)
        const formspreeUrl = "https://formspree.io/f/xldlkkpe";

        const response = await fetch(formspreeUrl, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) throw new Error("Erro no envio do formulário");

        showNotification("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");

        form.reset();

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {
        console.error("Erro no envio:", error);
        showNotification("Erro ao enviar mensagem. Por favor, tente novamente mais tarde.", "error");
    } finally {
        toggleButton(submitBtn, false, originalText);
    }
}

// ================================
// Helpers
// ================================

// Valida e-mail com regex simples
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Ativa/desativa botão de envio
function toggleButton(button, disabled, text) {
    button.disabled = disabled;
    button.textContent = text;
}

// Sistema de notificações
function showNotification(message, type = "info") {
    // Remove notificação anterior
    document.querySelector(".notification")?.remove();

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove automaticamente após 3s
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
