export function filters(data, genreTypes, activetypes) {

    return data.filter((elem) => {

        const matchesGenre =
            genreTypes.length === 0 ||
            elem.genre.some((genre) => genreTypes.includes(genre))

        const matchesType =
            activetypes.length === 0 ||
            activetypes.includes(elem.type);

        return matchesType && matchesGenre;
    });
}; 