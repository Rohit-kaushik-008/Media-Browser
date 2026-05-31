import { createCard } from "./card.js";

export function renderCards(data, container)
{
    container.innerHTML = "";
    data.forEach(show => {

        container.innerHTML += createCard(show)

    });
}

export function toggleSidebar(sidebar) {
    sidebar.classList.toggle("active");
}