
"use strict";

// Find the accessibility controls
const textSizeButtons = document.querySelectorAll("[data-textsize]");
const contrastButton = document.getElementById("contrastToggle");

// Read saved preferences, or use the defaults
let textSize = localStorage.getItem("textSize") || "medium";
let highContrast = localStorage.getItem("highContrast") === "true";

// Apply the selected accessibility settings
function applySettings() {
    document.body.classList.remove(
        "text-small",
        "text-medium",
        "text-large",
        "high-contrast"
    );

    document.body.classList.add("text-" + textSize);

    if (highContrast) {
        document.body.classList.add("high-contrast");
    }

    // Update the active text-size button
    textSizeButtons.forEach(function (button) {
        const isActive = button.dataset.textsize === textSize;

        button.classList.toggle("active-setting", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    // Update the contrast button
    if (contrastButton) {
        contrastButton.setAttribute(
            "aria-pressed",
            String(highContrast)
        );

        contrastButton.textContent = highContrast
            ? "High Contrast: On"
            : "High Contrast: Off";
    }

    // Save preferences for the next visit
    localStorage.setItem("textSize", textSize);
    localStorage.setItem("highContrast", String(highContrast));
}

// Handle text-size buttons
textSizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        textSize = button.dataset.textsize;
        applySettings();
    });
});

// Handle the contrast toggle
if (contrastButton) {
    contrastButton.addEventListener("click", function () {
        highContrast = !highContrast;
        applySettings();
    });
}

// Apply saved settings when the page loads
applySettings();
