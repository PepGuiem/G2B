document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");
    const submitButton = registrationForm.querySelector("button[type='submit']");
    const inputFields = registrationForm.querySelectorAll("input");

    function checkFormCompletion() {
        let formComplete = true;
        inputFields.forEach(function(input) {
            if (!input.value.trim()) {
                formComplete = false;
            }
        });
        return formComplete;
    }

    function handleFormChange() {
        if (checkFormCompletion()) {
            submitButton.classList.remove("btn-incomplete");
            submitButton.classList.add("btn-complete");
        } else {
            submitButton.classList.remove("btn-complete");
            submitButton.classList.add("btn-incomplete");
        }
    }

    inputFields.forEach(function(input) {
        input.addEventListener("input", handleFormChange);
    });
});
