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