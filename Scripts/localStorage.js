export function saveItems(data) {
    localStorage.setItem("Data", JSON.stringify(data))
}

export function loadItems(data) {
    const saved = localStorage.getItem("Data");

    if (saved) {
        data = JSON.parse(saved)
    }
}