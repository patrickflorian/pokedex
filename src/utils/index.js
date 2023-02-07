export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function addToFavorites(name) {
    const listString = localStorage.getItem('favorites');
    let list = [];
    if (listString) list = JSON.parse(listString);
    list.push(name);
    localStorage.setItem('favorites', JSON.stringify(list));
}

export function removeFromFavorites(name) {
    const listString = localStorage.getItem('favorites');
    let list = [];
    if (listString) list = JSON.parse(listString);
    localStorage.setItem('favorites', JSON.stringify(list.filter(item => item !== name)));
}


export function getAllFavorites() {
    const listString = localStorage.getItem('favorites');
    let list = [];
    if (listString) list = JSON.parse(listString);
    return list;
}