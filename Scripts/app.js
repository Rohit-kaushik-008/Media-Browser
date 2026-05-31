// IMPORTING DATA FROM OTHER FILES
import { createCard } from "./card.js";
import { search } from "./search.js";
import { renderCards, toggleSidebar } from "./ui.js";
import { data } from "./data.js";
import { getTrending, getMostFav, getTopMovies, getTopShows } from "./filter.js"
import { sortData } from "./sortData.js";
import { filters } from "./FilterData.js";
import { searchItem } from "./searchMedia.js";
import { filterStatus } from "./filterStatus.js";
// =================================================================

// FILTERING THE CARDS BY CATEGORIES
const trending = document.getElementById('trending-section');
const mostFav = document.getElementById('fav-section');
const topShows = document.getElementById('top-shows-section');
const topMovies = document.getElementById('top-movies-section');

const resultContainer = document.querySelector('.result-container');
const defaultSections = document.querySelectorAll(".trending, .most-fav, .top-shows, .top-movies");

const movieBtn = document.getElementById("movie-btn");
const tvBtn = document.getElementById('tv-btn');
const animeBtn = document.getElementById('anime-btn');

const resultSection = document.getElementById('results-section');
let activeTypes = [];

const filterSideBar = document.querySelector('.filter-chunk');

const openFilter = document.getElementById('filter-button');
const closeFilter = document.querySelector('.close-filter');

let activeGenres = [];
const genreBox = document.querySelector('.genres');

let sortType;
const sortBtn = document.querySelector('.sort-btn');

const dropdown = document.querySelector('.sort-dropdown');
let sortOption = document.querySelector('.selectionSortOption');

const input = document.getElementById('search-box');
const searchButton = document.getElementById('search-button')

const myList = document.querySelector('.my-list');
const home = document.querySelector('.home');
const watchlistContainer = document.querySelector('.watchlist-container');

const myListContainer = document.querySelector('.watchlist-items')
const watchlistFilters = document.querySelector('.watchlist-filters');

let activeStatus = "watchLater"

function handleStatus(e) {

    let card = e.target;
    let status = card.dataset.status;

    if (!status) return;

    if (activeStatus === status) {
        return;
    }

    activeStatus = status;
    document
        .querySelectorAll('[data-status]')
        .forEach(btn => btn.classList.remove('selected'));

    card.classList.add('selected'); 
    
    renderCards(
        filterStatus(data, status),
        myListContainer
    );

}

watchlistFilters.addEventListener('click', (e) => {
    handleStatus(e);
})


myList.addEventListener('click', () => {
    
    watchlistContainer.classList.remove('hidden')
    hideDefaultSections();
})

home.addEventListener('click', () => {
    watchlistContainer.classList.add('hidden');
    resultSection.classList.add('add');
    showDefaultSections();
})


renderCards(getTrending(data), trending);
renderCards(getMostFav(data), mostFav);
renderCards(getTopShows(data), topShows);
renderCards(getTopMovies(data), topMovies);

// =================================================================

// FILTER BY TYPES :-  ANIME, MOVIES, TV SHOWS

// FILTER BY TYPE BUTTONS
// RESULT SECTION WHERE RESULTS WILL DISPLAY

function showDefaultSections() {

    defaultSections.forEach((section) => {
        section.classList.remove("deactivate");
    });
}


function hideDefaultSections() {

    defaultSections.forEach((section) => {
        section.classList.add("deactivate");
    })
}



function handleTypeFilter(type) {

    // CHECKS THAT TYPE IS ALREADY ACTIVE OR NOT
    if (activeTypes.includes(type)) {
        activeTypes = activeTypes.filter((elem) => elem !== type);
    }

    else {
        activeTypes.push(type);
    }

    updateResults();
}


// BUTTON HANDLERS WHICH NAVIGATE THE RESULT SECTION

movieBtn.addEventListener('click', () => {
    movieBtn.classList.toggle('active');
    handleTypeFilter("Movie")
});

tvBtn.addEventListener('click', () => {
    tvBtn.classList.toggle('active');
    handleTypeFilter("TV");
});

animeBtn.addEventListener('click', () => {
    animeBtn.classList.toggle('active');
    handleTypeFilter("Anime");
})



// =================================================================

// EVENT LISTENERS


openFilter.addEventListener('click', () => {
    toggleSidebar(filterSideBar);
})

closeFilter.addEventListener('click', () => {
    toggleSidebar(filterSideBar);
})

// =================================================================



function handleGenres(genre) {

    if (activeGenres.includes(genre)) {
        activeGenres = activeGenres.filter((elem) => elem != genre)
    }

    else {
        activeGenres.push(genre);
    }

    updateResults();
}

genreBox.addEventListener('click', (e) => {

    let genre = e.target.dataset.genre;

    if (!genre) {
        return;
    }
    handleGenres(genre);
})

// =============================================================


// SORT AND RANKING SYSTEM BY TIME AND RATINGS RESPECTIVELY



// function for sorting and Ranking
function handleSorting(type) {

    sortType = type;
    sortOption.innerHTML = type;

    updateResults();
}


dropdown.addEventListener('click', (e) => {
    sortType = e.target.dataset.sort;
    if (!sortType) {
        return;
    }
    handleSorting(sortType);
    showDropDown();
})

// EVENT LISTENERS OF SORTING
sortBtn.addEventListener('click', () => {
    showDropDown();
});

function showDropDown() {
    dropdown.classList.toggle('dropmenu');
}


function updateResults() {

    let filteredData = filters(
        data,
        activeGenres,
        activeTypes
    );

    let finalData = sortData(
        filteredData,
        sortType
    );

    renderCards(finalData, resultContainer);

    const hasFilters =
        activeGenres.length > 0 ||
        activeTypes.length > 0 ||
        sortType;

    if (hasFilters) {
        hideDefaultSections();
        resultSection.classList.remove('hidden');
    }

    else {
        showDefaultSections();
        resultSection.classList.add('hidden');
    }
}



// =============================================================

// NOW WE IMPLEMENT THE SEARCH FEATURE. SO USER CAN FIND THEIR FAVOURITE SHOWS AND MOVIES BY SEARCHING

let intervalId;

function showSearchResults(text) {
    clearTimeout(intervalId)

    intervalId = setTimeout(() => {

        if (text.trim() === "") {
            updateResults();
            return;
        }

        hideDefaultSections();
        resultSection.classList.remove('hidden');

        const results = searchItem(data, text);

        renderCards(results, resultContainer);

    }, 600);
}


input.addEventListener('input', (e) => {

    let text = e.target.value;
    showSearchResults(text);
})


searchButton.addEventListener('click', () => {
    input.focus();
    input.value = "";
    clearTimeout(intervalId);
    updateResults();
})
