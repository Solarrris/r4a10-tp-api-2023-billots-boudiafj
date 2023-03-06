"use-strict";

const url = "https://valorant-api.com/v1";

const getData = async function (url) {
    try {
        const response = await fetch(url);
        const jsResponse = await response.json();
        return jsResponse.data;
    } catch (error) {
        console.error(error);
    }
};

view.searchButton.addEventListener("click", async () => {
    // Showing the loading gif
    view.waitingIcon.style.display = "block";
    view.searchingResults.style.display = "none";

    // Removing all children in the results div
    while (view.searchingResults.firstChild) {
        view.searchingResults.removeChild(view.searchingResults.firstChild);
    }

    // Getting the agents
    const agents = await getData(url + "/agents/");

    // Putting the agents that have been searched in an array
    searchResults = [];
    for (let i = 0; i < agents.length; i++) {
        if (
            agents[i].displayName
                .toLowerCase()
                .includes(view.searchInput.value.toLowerCase())
        ) {
            searchResults.push(agents[i]);
        }
    }

    console.log(searchResults);

    // If agents match the research, show a list of those agents
    if (searchResults.length !== 0) {
        for (let i = 0; i < searchResults.length; i++) {
            const result = document.createElement("p.res");
            result.textContent = searchResults[i].displayName;
            view.searchingResults.appendChild(result);
        }
    } else {
        // Else, a "Nothing found" text is displayed
        const noResult = document.createElement("p.info-vide");
        noResult.textContent = "(Nothing found)";
        view.searchingResults.appendChild(noResult);
    }

    // Putting back the researches and removing the loading gif
    view.searchingResults.style.display = "block";
    view.waitingIcon.style.display = "none";
});
