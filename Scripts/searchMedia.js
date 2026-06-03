export function searchItem(data, text) {

    const searchText = text.toLowerCase();

    return data.filter((elem) => {
        return (
            elem.title.toLowerCase().includes(searchText)
        );
    })
}