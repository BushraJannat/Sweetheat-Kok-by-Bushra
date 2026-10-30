
"use strict";

// Find the form and its fields
const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("topic");
const commentsInput = document.getElementById("comments");
const websiteInput = document.getElementById("website");

const counter = document.getElementById("characterCounter");
const statusMessage = document.getElementById("formStatus");
const clearButton = document.getElementById("clearButton");

// Show an error message for one field
function showError(input, messageId, message) {
    input.classList.add("error");
    input.classList.remove("valid");
    input.setAttribute("aria-invalid", "true");
    document.getElementById(messageId).textContent = message;
}

// Mark a field as valid
function showValid(input, messageId) {
    input.classList.remove("error");
    input.classList.add("valid");
    input.setAttribute("aria-invalid", "false");
    document.getElementById(messageId).textContent = "";
}

// Remove old validation styling
function clearFieldState(input, messageId) {
    input.classList.remove("error", "valid");
    input.removeAttribute("aria-invalid");
    document.getElementById(messageId).textContent = "";
}

// Check the name
function validateName() {
    if (nameInput.value.trim().length < 2) {
        showError(
            nameInput,
            "fullNameError",
            "Please enter your name (at least 2 characters)."
        );
        return false;
    }

    showValid(nameInput, "fullNameError");
    return true;
}

// Check the email format
function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError(
            emailInput,
            "emailError",
            "Please enter a valid email address."
        );
        return false;
    }

    showValid(emailInput, "emailError");
    return true;
}

// Check the selected topic
function validateTopic() {
    if (topicInput.value === "") {
        showError(
            topicInput,
            "topicError",
            "Please choose a topic."
        );
        return false;
    }

    showValid(topicInput, "topicError");
    return true;
}

// Check the comments
function validateComments() {
    if (commentsInput.value.trim().length < 15) {
        showError(
            commentsInput,
            "commentsError",
            "Please write at least 15 characters."
        );
        return false;
    }

    showValid(commentsInput, "commentsError");
    return true;
}

// Check the optional website only when provided
function validateWebsite() {
    const website = websiteInput.value.trim();

    if (website === "") {
        clearFieldState(websiteInput, "websiteError");
        return true;
    }

    try {
        const parsedUrl = new URL(website);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            throw new Error("Invalid website protocol");
        }

        showValid(websiteInput, "websiteError");
        return true;
    } catch {
        showError(
            websiteInput,
            "websiteError",
            "Enter a valid website starting with https:// or http://."
        );
        return false;
    }
}

// Update the live character counter
function updateCharacterCounter() {
    const length = commentsInput.value.length;
    const minimum = 15;

    counter.textContent =
        length + " / " + minimum + " characters minimum";

    if (length >= minimum) {
        counter.textContent += " — Minimum reached!";
    }
}

// Validate fields while the user types
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
topicInput.addEventListener("change", validateTopic);

commentsInput.addEventListener("input", () => {
    updateCharacterCounter();
    validateComments();
});

websiteInput.addEventListener("input", validateWebsite);

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    statusMessage.textContent = "";
    statusMessage.style.color = "";

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const topicIsValid = validateTopic();
    const commentsAreValid = validateComments();
    const websiteIsValid = validateWebsite();

    if (
        !nameIsValid ||
        !emailIsValid ||
        !topicIsValid ||
        !commentsAreValid ||
        !websiteIsValid
    ) {
        statusMessage.textContent =
            "Please correct the errors above and try again.";

        statusMessage.style.color = "#b42318";

        form.querySelector(".error")?.focus();
        return;
    }

    // Save the name before resetting the form
    const submittedName = nameInput.value.trim();

    // Show success message
    statusMessage.textContent =
        "Thanks for your feedback, " + submittedName + "!";

    statusMessage.style.color = "#2e7d32";

    // Reset the form after successful submission
    form.reset();

    // Clear validation styles and error messages
    [
        [nameInput, "fullNameError"],
        [emailInput, "emailError"],
        [topicInput, "topicError"],
        [commentsInput, "commentsError"],
        [websiteInput, "websiteError"]
    ].forEach(([input, messageId]) => {
        clearFieldState(input, messageId);
    });

    // Reset the character counter
    updateCharacterCounter();

    // Remove success message after 4 seconds
    setTimeout(function () {
        statusMessage.textContent = "";
        statusMessage.style.color = "";
    }, 4000);
});

// Clear the form
clearButton.addEventListener("click", function () {
    form.reset();

    [
        [nameInput, "fullNameError"],
        [emailInput, "emailError"],
        [topicInput, "topicError"],
        [commentsInput, "commentsError"],
        [websiteInput, "websiteError"]
    ].forEach(([input, messageId]) => {
        clearFieldState(input, messageId);
    });

    statusMessage.textContent = "";
    statusMessage.style.color = "";

    updateCharacterCounter();
    nameInput.focus();
});

// Set the initial counter
updateCharacterCounter();
