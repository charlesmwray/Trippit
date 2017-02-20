var setDb = (arrr) => {
    return localStorage.setItem('trips', JSON.stringify(arrr));
}

export default setDb;
