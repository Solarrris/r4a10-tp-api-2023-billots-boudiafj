"use-strict";

const url = "https://valorant-api.com/v1"

const getData = async function (url) {
    try {
        const response = await fetch(url);
        const jsResponse = await response.json();
        return jsResponse.data
    } catch (error) {
        console.error(error);
    }
}

view.searchButton.addEventListener("click", () => {
    const agents = getData(url + "/agents/")
    for (let i = 0; i < agents.length(); i++) {
        if (agents[i].name.includes())
    }
    getData(url + "/agents/" + view.searchInput.value);
})