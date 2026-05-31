export function getTrending(data){

    return data.filter((elem) => {
        return elem.rating >= 8.5 && elem.year >= 2015;
    });

}

export function getMostFav(data){

    return data.filter((elem) => {
        return elem.rating >= 9.0;
    });

}

export function getTopShows(data){

    return data.filter((elem) => {
        return elem.rating >= 8.5 && elem.type === "TV";
    });

}

export function getTopMovies(data){

    return data.filter((elem) => {
        return elem.rating >= 8.5 && elem.type === "Movie";
    });

}
