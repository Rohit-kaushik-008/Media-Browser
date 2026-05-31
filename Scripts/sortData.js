export function sortData(data, sortType) {

    const sortedData = [...data];

    switch (sortType) {
        case "Newest":
            return sortedData.sort((a,b) => b.year - a.year);

        case "Oldest":
            return sortedData.sort((a,b) => a.year - b.year);

        case "highestRated":
            return sortedData.sort((a,b) => b.rating - a.rating);

        case "lowestRated":
            return sortedData.sort((a,b) => a.rating - b.rating);

        default:
            return sortedData;
    }
}