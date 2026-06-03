// IMPORTING DATA FROM OTHER FILES
import { renderCards, toggleSidebar } from "./ui.js";
import { data as initialData } from "./data.js";
import { getTrending, getMostFav, getTopMovies, getTopShows } from "./filter.js"
import { sortData } from "./sortData.js";
import { filters } from "./FilterData.js";
import { searchItem } from "./searchMedia.js";
import { filterStatus } from "./filterStatus.js";
import { saveItems, loadItems } from "./localStorage.js";


let data = loadItems() || initialData;

// =======================================================


// CONTAINERS 
const trending = document.getElementById('trending-section');
const mostFav = document.getElementById('fav-section');
const topShows = document.getElementById('top-shows-section');
const topMovies = document.getElementById('top-movies-section');

const resultContainer =
    document.querySelector('.result-container');
const resultSection =
    document.getElementById('results-section');
const defaultSections =
    document.querySelectorAll(
        ".trending, .most-fav, .top-shows, .top-movies");

const watchlistContainer =
    document.querySelector('.watchlist-container');
const myListContainer =
    document.querySelector('.watchlist-items')
const watchlistFilters =
    document.querySelector('.watchlist-filters');

const displayCardsContainer =
    document.querySelector('.display-cards')

const watchLaterBtn =
    document.querySelector('[data-filter-status="watchLater"]')

const filterSideBar = document.querySelector('.filter-chunk');
const genreBox = document.querySelector('.genres');
const dropdown = document.querySelector('.sort-dropdown');
let sortOption = document.querySelector('.selectionSortOption');




// BUTTONS & INPUTS
const movieBtn = document.getElementById("movie-btn");
const tvBtn = document.getElementById('tv-btn');
const animeBtn = document.getElementById('anime-btn');
const sortBtn = document.querySelector('.sort-btn');

const openFilter = document.getElementById('filter-button');
const closeFilter = document.querySelector('.close-filter');

const input = document.getElementById('search-box');
const searchButton = document.getElementById('search-button')

const home = document.getElementById('homepage');
const myList = document.getElementById('watchlist');




// ARRAYS & VARIABLES & STATES
let activeTypes = [];
let activeGenres = [];

let intervalId;

let sortType;

const bookmarkIcon = "Assets/bookmark.png";
const bookmarkSaved = "Assets/bookmark saved.png";

const threeDots = document.querySelector('.more-btn');

let activeStatus = "watchLater"




// FUNCTION :- RENDER THE HOME PAGE ITEMS
function renderHomepage() {

    renderCards(getTrending(data), trending);
    renderCards(getMostFav(data), mostFav);
    renderCards(getTopShows(data), topShows);
    renderCards(getTopMovies(data), topMovies);
}

renderHomepage();




// FUNCTION :- SHOW &  HIDE THE HOMEPAGE SECTION
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




// FUNCTION :- CONTROLS THE OPENING AND CLOSING OF FILTER SECTION
openFilter.addEventListener('click', () => {
    toggleSidebar(filterSideBar);
});

closeFilter.addEventListener('click', () => {
    toggleSidebar(filterSideBar);
});




// FUNCTION :-  MANAGE THE TYPE OF CARDS TO DISPLAY
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




// FUNCTION :- CONTROLS THE SEARCHING FEATURE
function showSearchResults(text) {
    clearTimeout(intervalId)

    intervalId = setTimeout(() => {

        if (text.trim() === "") {
            updateResults();
            return;
        }

        hideDefaultSections();
        watchlistContainer.classList.add('hidden');

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




// FUNCTION :- CONTROLS SORTING & RANKING
function showDropDown() {
    dropdown.classList.toggle('dropmenu');
}

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

sortBtn.addEventListener('click', () => {
    showDropDown();
});




// FUNCTION :- UPDATE FILTERS & GENRES
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




// FUNCTION :- HANDLES TYPE AND GENRES
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




// FUNCTION :- CONTROLS THE HOME & MY LIST SECTIONS
home.addEventListener('click', () => {

    watchlistContainer.classList.add('hidden');
    resultSection.classList.add('add');
    toggleSidebar(filterSideBar);
    resultSection.classList.add('hidden');
    showDefaultSections();
})

myList.addEventListener('click', () => {

    activeStatus = 'watchLater';

    document.
        querySelectorAll('[data-filter-status]').
        forEach(btn => {
            btn.classList.remove('selected');
        });

    watchLaterBtn.classList.add('selected');

    watchlistContainer.classList.remove('hidden')
    toggleSidebar(filterSideBar);
    resultSection.classList.add('hidden');
    hideDefaultSections();

    renderCards(filterStatus(data, activeStatus), myListContainer);
})




// FUNCTION :- CONTROLS THE STATUS OF ITEMS
displayCardsContainer.addEventListener('click', (e) => {

    const bookmark = e.target.closest(".bookmark-save");
    const statusBtn = e.target.closest('[data-status]');    
    const moreBtn = e.target.closest('.more-btn')
    

    if (bookmark) {
        const card = bookmark.closest('.card');
        const id = Number(card.dataset.id);
        const item = data.find(elem => elem.id === id);
        item.status = item.status === 'watchLater'
            ? 'none'
            : 'watchLater';
        saveItems(data);
    }
    
    if (statusBtn) {
        const status = statusBtn.dataset.status;
        let card = statusBtn.closest('.card');
        const id = Number(card.dataset.id);

        
        const item = data.find(elem => elem.id === id);

        item.status = status; 
        saveItems(data);
    }

    if (moreBtn) {
        const card = moreBtn.closest('.card');
        const menu = card.querySelector('.status-menu');

        menu.classList.toggle('hidden');

        return;
    }

    // if (!bookmark && !statusBtn && !moreBtn) return;

    renderHomepage();
    renderCards(
        filterStatus(data, activeStatus),
        myListContainer);
})

function handleStatus(e) {

    let card = e.target;
    let currentStatus = card.dataset.filterStatus;
    
    if (!currentStatus) return;
    
    if (activeStatus === currentStatus) { return; }

    activeStatus = currentStatus;
    document
        .querySelectorAll('[data-filter-status]')
        .forEach(btn => btn.classList.remove('selected'));

    card.classList.add('selected');
    renderCards(
        filterStatus(data, currentStatus),
        myListContainer
    );
    
}

watchlistFilters.addEventListener('click', (e) => { 
    handleStatus(e); 
})

renderHomepage();