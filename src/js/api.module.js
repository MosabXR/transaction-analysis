async function loadAPI() {
    const api = await fetch('./js/data.json');
    const data = api.json();
    return data;
}

async function loadData() {
    const data = await loadAPI();
    return data;
}

let api_data = await loadData();

export { api_data };