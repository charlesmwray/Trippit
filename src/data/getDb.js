var getDb = () => {
    const data = localStorage.getItem('trips');
    if (data !== "undefined") {
        return JSON.parse(data);
    }
}

export default getDb;
