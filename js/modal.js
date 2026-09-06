const form = document.querySelector(".consultation-form");

const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    clearErrors();

    if (nameInput.value.trim() === "") {
        showError(nameInput, "Введите ФИО");
        isValid = false;
    }

    if (!isValidPhone(phoneInput.value)) {
        showError(
            phoneInput,
            "Введите номер в формате: +7 999 123-45-67"
        );

        isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
        showError(
            emailInput,
            "Введите email в формате: username@example.com"
        );

        isValid = false;
    }

    if (isValid) {
        alert("Ваши данные приняты!");
    }
});


function showError(input, message) {
    input.classList.add("input-error");

    const error = document.createElement("p");

    error.classList.add("error-message");
    error.textContent = message;

    input.parentElement.appendChild(error);
}


function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");

    errorMessages.forEach(function (message) {
        message.remove();
    });

    const inputs = document.querySelectorAll(".form-field input");

    inputs.forEach(function (input) {
        input.classList.remove("input-error");
    });
}


function isValidPhone(phone) {
    const phonePattern = /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/;

    return phonePattern.test(phone);
}


function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}