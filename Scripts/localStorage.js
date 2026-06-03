const STORAGE_KEY = "my-list";

export function saveItems(data) {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadItems() {
    const saved = 
        localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : null;
}