export function createCard(show) {

    
    return `
            <div class="card" data-type="${show.type}">
                            <div class="card-image">
                                <img src="${show.image}" alt="${show.title}">
                                <button>${show.type}</button>
                                <p>⭐ ${show.rating}</p>
                            </div>
                            <div class="card-info">
                                <h3>${show.title}</h3>
                                <p>Year ● ${show.year}</p>
                            </div>
                        </div>`;

}