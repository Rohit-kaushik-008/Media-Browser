export function createCard(show) {

    const bookmarkIcon = "Assets/bookmark.png";
    const bookmarkSaved = "Assets/bookmark saved.png";

    return `
            <div
                class="card"
                data-type="${show.type}"
                data-id="${show.id}">
                    <div
                        class="card-image">
                            <img
                                src="${show.image}"
                                alt="${show.title}">
                            <button>
                                ${show.type}
                            </button>
                            <p>
                                ⭐ ${show.rating}
                        </p>
                    </div>
                    <div
                        class="card-info">
                            <div
                                class="card-desc">
                                <h3>
                                    ${show.title}
                                </h3>
                                <p>
                                    Year ● ${show.year}
                                </p>
                            </div>

                            <div
                                class="card-actions">
                                <img 
                                    class="bookmark-save"
                                    src="${show.status === 'watchLater'
                                            ? bookmarkSaved
                                            : bookmarkIcon
                                        }"
                                    alt="bookmark">
                                <button 
                                    class="more-btn">
                                        &vellip;
                                </button>
                            </div>
                    </div>
    
            </div>`;

}