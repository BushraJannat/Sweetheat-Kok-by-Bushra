
"use strict";

// Cooking skills data
const skills = [
    {
        id: 1,
        name: "Knife & Ingredient Preparation",
        category: "Preparation",
        proficiency: 4,
        yearsExperience: 5,
        description: "Preparing ingredients carefully before cooking."
    },
    {
        id: 2,
        name: "Marinating",
        category: "Flavour",
        proficiency: 4,
        yearsExperience: 5,
        description: "Using spices and marinades to develop flavour."
    },
    {
        id: 3,
        name: "Spice Layering",
        category: "Flavour",
        proficiency: 5,
        yearsExperience: 6,
        description: "Adding spices at different stages of cooking."
    },
    {
        id: 4,
        name: "Heat Control",
        category: "Cooking Techniques",
        proficiency: 4,
        yearsExperience: 5,
        description: "Adjusting heat to improve cooking results."
    },
    {
        id: 5,
        name: "Texture Control",
        category: "Cooking Techniques",
        proficiency: 4,
        yearsExperience: 4,
        description: "Observing texture to achieve the desired result."
    },
    {
        id: 6,
        name: "Cooking Timing",
        category: "Cooking Techniques",
        proficiency: 4,
        yearsExperience: 5,
        description: "Coordinating cooking times for ingredients."
    },
    {
        id: 7,
        name: "Dessert Preparation",
        category: "Preparation",
        proficiency: 3,
        yearsExperience: 3,
        description: "Practising measurements, texture and presentation."
    },
    {
        id: 8,
        name: "Food Presentation",
        category: "Preparation",
        proficiency: 3,
        yearsExperience: 3,
        description: "Presenting food in an inviting and organised way."
    }
];

// Find the HTML elements
const skillsContainer = document.getElementById("skillsContainer");
const skillsCounter = document.getElementById("skillsCounter");
const skillSort = document.getElementById("skillSort");
const filterButtons = document.querySelectorAll("[data-category]");

// Remember the currently selected category
let selectedCategory = "all";

// Create one card for a skill
function createSkillCard(skill) {
    const card = document.createElement("article");
    card.className = "skill-card";

    const title = document.createElement("h3");
    title.textContent = skill.name;

    const category = document.createElement("p");
    category.className = "skill-category";
    category.textContent = skill.category;

    // Show proficiency text
    const rating = document.createElement("p");
    rating.textContent =
        "Proficiency: " + skill.proficiency + " / 5";

    // Create visual proficiency bar
    const progressTrack = document.createElement("div");
    progressTrack.className = "proficiency-track";
    progressTrack.setAttribute("role", "progressbar");
    progressTrack.setAttribute("aria-label", skill.name + " proficiency");
    progressTrack.setAttribute("aria-valuemin", "0");
    progressTrack.setAttribute("aria-valuemax", "5");
    progressTrack.setAttribute(
        "aria-valuenow",
        String(skill.proficiency)
    );

    const progressFill = document.createElement("div");
    progressFill.className = "proficiency-fill";

    const percentage = (skill.proficiency / 5) * 100;
    progressFill.style.width = percentage + "%";

    progressTrack.appendChild(progressFill);

    const experience = document.createElement("p");
    experience.textContent =
        "Experience: " + skill.yearsExperience + " years";

    const description = document.createElement("p");
    description.textContent = skill.description;

    card.append(
        title,
        category,
        rating,
        progressTrack,
        experience,
        description
    );

    return card;
}

// Display the cards on the page
function renderSkills() {
    // First, filter the skills
    let visibleSkills = skills.filter(function (skill) {
        return selectedCategory === "all" ||
            skill.category === selectedCategory;
    });

    // Then, sort a copy of the filtered skills
    visibleSkills = [...visibleSkills];

    if (skillSort.value === "proficiency") {
        visibleSkills.sort(function (a, b) {
            return b.proficiency - a.proficiency;
        });
    } else if (skillSort.value === "experience") {
        visibleSkills.sort(function (a, b) {
            return b.yearsExperience - a.yearsExperience;
        });
    } else if (skillSort.value === "name") {
        visibleSkills.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    // Remove the old cards
    skillsContainer.replaceChildren();

    // Create cards from the filtered and sorted data
    visibleSkills.forEach(function (skill) {
        skillsContainer.appendChild(createSkillCard(skill));
    });

    // Update the result counter
    skillsCounter.textContent =
        "Showing " + visibleSkills.length +
        " of " + skills.length + " skills";
}

// Handle category filter buttons
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;

        filterButtons.forEach(function (filterButton) {
            const isActive =
                filterButton.dataset.category === selectedCategory;

            filterButton.classList.toggle("active-filter", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        renderSkills();
    });
});

// Handle sorting
skillSort.addEventListener("change", renderSkills);

// Show all skills when the page first loads
renderSkills();
