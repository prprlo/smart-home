const consultationButton = document.querySelector(".consultation-button");
const consultationModal = document.querySelector("#consultation-modal");
const closeButton = document.querySelector(".modal-close");

consultationButton.addEventListener("click", function () {
    consultationModal.hidden = false;
});

closeButton.addEventListener("click", function () {
    consultationModal.hidden = true;
});

consultationModal.addEventListener("click", function (event) {
    if (event.target === consultationModal) {
        consultationModal.hidden = true;
    }
});


const featureData = {
    security: {
        text: "Полный контроль дома: умные замки с NFC, датчики протечек с автоматическим отключением воды и видеонаблюдение с оповещениями в реальном времени. Ваша безопасность — наша приоритетная задача.",
        image: "images/features-security.jpg"
    },
    light: {
        text: "Автоматизированный свет, который подстраивается под ваш ритм жизни: плавное включение утром, сценарии для отдыха и работы, управление голосом или со смартфона. Создавайте идеальную атмосферу одним касанием.",
        image: "images/features-light.jpg"
    },
    climate: {
        text: "Умные термостаты и кондиционеры поддерживают комфортную температуру 24/7, экономя энергию. Тёплый пол к вашему пробуждению, свежий воздух к возвращению домой — климат, который чувствует ваши желания.",
        image: "images/features-climate.jpg"
    },
    devices: {
        text: "Кофемашина, которая готовит напиток к вашему пробуждению, холодильник, следящий за сроком годности продуктов, и техника, работающая по голосовой команде. Ваши помощники становятся smarter.",
        image: "images/features-devices.jpg"
    },
    curtains: {
        text: "Просыпайтесь с первыми лучами солнца или создавайте приватность одним нажатием. Автоматические шторы с интеллектуальным расписанием и защитой от перегрева помещений.",
        image: "images/features-curtains.jpg"
    },
    energy: {
        text: "Умные датчики отключают неиспользуемые приборы, оптимизируют работу техники в ночном режиме и сокращают расход энергии до 30%. Экологично и экономично.",
        image: "images/features-energy.jpg"
    }

};


const featuresButtons = 
    document.querySelectorAll(".feature-button");
const featuresDescription = 
    document.querySelector(".features-description");
const featuresSection  = 
    document.querySelector(".features");


featuresButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const feature = button.dataset.feature;
        const data = featureData[feature];
        featuresDescription.textContent = data.text;

        featuresSection.style.backgroundImage = `url("${data.image}")`;
        featuresButtons.forEach((button) => {
            button.classList.remove("active");

        });
        button.classList.add("active");
        

    });

});

const calculationQuestion = 
    document.querySelector(".calculation-question");

const calculationOptions = 
    document.querySelector(".calculation-options");

const calculationStep = 
    document.querySelector(".calculation-step");

const calculationHint =
    document.querySelector(".calculation-hint");

const backButton = 
    document.querySelector(".back-button");

const nextButton = 
    document.querySelector(".next-button");

const calculationQuiz =
    document.querySelector(".calculation-quiz");

const calculationForm =
    document.querySelector(".calculation-form");

const calculationFooter =
    document.querySelector(".calculation-footer");

let currentStep = 1;

const calculationAnswers = {
    place: "",
    numberRooms: "",
    tasks: []
};

const calculationSteps = [
    {
        view: "options",
        question: "Где вы хотите установить умный дом?",
        type: "radio",
        name: "place",
        options: ["Квартира", "Офис", "Дом", "Другое"]
    },

    {
        view: "options",
        question: "На какое количество комнат делать расчет?",
        type: "radio",
        name: "numberRooms",
        optionsClass: "calculation-options--step2",
        options: ["Одна", "Две", "Три", 
            "Четыре", "Более четырех", "Другое"]
    },

    {
        view: "options",
        question: "Какие задачи вы хотите решить?",
        type: "checkbox",
        name: "tasks",
        optionsClass: "calculation-options--step3",
        options: ["Управление освещением", 
            "Управление шторами, воротами и др.",
            "Безопасность",
            "Управление техникой",
            "Управление кондиционированием",
            "Энергосбережение"
        ],
        showHint: true
    },

    {
        view: "form"
    }
];

function renderStep() {
    const step = calculationSteps[currentStep-1];
    const totalSteps = calculationSteps.length;

    const isForm = step.view === "form";

    calculationFooter.classList.toggle(
        "calculation-footer--form",
        isForm
    );

    calculationQuiz.hidden = isForm;
    calculationForm.hidden = !isForm;

    if (step.view === "options") {
        
        calculationQuestion.textContent = step.question;
        calculationOptions.textContent = "";

        calculationSteps.forEach((item) => {
            if (item.optionsClass) {
                calculationOptions.classList.remove(item.optionsClass);
            };
        });

        if (step.optionsClass) {
            calculationOptions.classList.add(step.optionsClass);
        };

        step.options.forEach((option) => {
            const labelOption = document.createElement("label");
            const inputOption = document.createElement("input");

            inputOption.type = step.type;
            inputOption.name = step.name;
            inputOption.value = option;

            if (step.type === "radio") {
                inputOption.checked = calculationAnswers[step.name] === option;
            } else {
                inputOption.checked = calculationAnswers[step.name].includes(option);
            }

            inputOption.addEventListener("change", () => {
                if (step.type === "radio") {
                    calculationAnswers[step.name] = inputOption.value;
                } else {
                    if (inputOption.checked) {
                        calculationAnswers[step.name].push(inputOption.value);
                    } else {
                        calculationAnswers[step.name] =
                            calculationAnswers[step.name].filter((item) => item !== inputOption.value);
                    }
                }
            });

            labelOption.append(inputOption);
            labelOption.append(option);
            calculationOptions.append(labelOption);

        });
        
        calculationHint.hidden = !step.showHint;
        
    }
    
    calculationStep.textContent = `Шаг ${currentStep}/${totalSteps}`; 
    backButton.hidden = currentStep === 1;
    nextButton.hidden = currentStep === totalSteps;
};

renderStep();

function isStepComplete() {
    const step = calculationSteps[currentStep - 1];
    const answer = calculationAnswers[step.name];

    if (step.type === "checkbox") {
        return answer.length !== 0;
    } else {
        return answer !== "";
    };

}

nextButton.addEventListener("click", () => {
    if (isStepComplete()) {
        currentStep +=1;
        renderStep();
    }
});

backButton.addEventListener("click", () => {
    currentStep -=1;
    renderStep();
});

const calculationNameInput  = document.querySelector("#form-name");
const calculationTelInput  = document.querySelector("#form-tel");
const calculationEmailInput  = document.querySelector("#form-email");

calculationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearErrors();

    let isValid = true;

    if (calculationNameInput.value.trim() === "") {
        showError(calculationNameInput, "Введите ФИО");
        isValid = false;
    }

    if (!isValidPhone(calculationTelInput.value)) {
        showError(calculationTelInput, 
            "Введите номер в формате: +7 999 123-45-67");
        isValid = false;
    }

    if (!isValidEmail(calculationEmailInput.value)) {
        showError(calculationEmailInput, 
            "Введите email в формате: username@example.com");
        isValid = false;
    }

    const calculationContent = document.querySelector(".calculation-content");

    if (isValid) {
        calculationForm.reset();

        calculationAnswers.place = "";
        calculationAnswers.numberRooms = "";
        calculationAnswers.tasks = [];

        currentStep = 1;

        calculationForm.hidden = true;
        calculationFooter.hidden = true;

        const calculationTitle = 
        document.querySelector(".calculation .section-title");
        calculationTitle.hidden = true;

        const success = document.createElement("div");
        success.classList.add("calculation-success");

        const successTitle = document.createElement("h3");
        successTitle.textContent = "Спасибо за заявку!";
        const successText = document.createElement("p");
        successText.textContent = "Наш специалист свяжется с вами в ближайшее время, чтобы уточнить детали и предложить индивидуальное решение."

        success.append(successTitle);
        success.append(successText);
        calculationContent.append(success);


    }


});

const widgetButton = document.querySelector(".contact-widget-button");
const widgetMenu = document.querySelector(".contact-widget-menu");
const widgetClose   = document.querySelector(".contact-widget-close");

function toggleWidget() {
    widgetButton.toggleAttribute("hidden");
    widgetMenu.toggleAttribute("hidden");
}

widgetButton.addEventListener("click", toggleWidget);
widgetClose.addEventListener("click", toggleWidget);