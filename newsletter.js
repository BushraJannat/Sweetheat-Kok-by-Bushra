
"use strict";

// Select newsletter form elements
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterStatus = document.getElementById("newsletterStatus");

// Handle newsletter subscription
newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!newsletterEmail.checkValidity() || email === "") {
        newsletterStatus.textContent =
            "Please enter a valid email address.";

        newsletterStatus.style.color = "#b42318";
        newsletterEmail.focus();
        return;
    }

    newsletterStatus.textContent =
        "Thank you for your interest! This is a demo subscription. No email has been sent.";

    newsletterStatus.style.color = "#2e7d32";

    newsletterForm.reset();
});
