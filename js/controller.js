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

const searchForResults = async () => {
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
                .includes(view.searchInput.value.toLowerCase()) && agents[i].isPlayableCharacter
        ) {
            searchResults.push(agents[i]);
        }
    }

    console.log(searchResults);

    // If agents match the research, show a list of those agents
    if (searchResults.length !== 0) {
        for (let i = 0; i < searchResults.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");

            const agentDiv = document.createElement("div");
            agentDiv.classList.add("agent");

            const agentIcon = document.createElement("img");
            agentIcon.style.width = "200px";
            agentIcon.style.height = "200px";
            const agentName = document.createElement("p");

            agentIcon.src = searchResults[i].displayIcon;
            agentName.innerHTML = "<span>Nom : </span>" + searchResults[i].displayName;

            agentDiv.appendChild(agentIcon);
            agentDiv.appendChild(agentName);

            const abilitiesDiv = document.createElement("div");
            abilitiesDiv.classList.add("abilities");

            for (let j = 0; j < searchResults[i].abilities.length; j++) {
                if (searchResults[i].abilities[j].slot !== 'Passive') {
                    const abilityDiv = document.createElement("div");

                    const abilityIcon = document.createElement("img");
                    abilityIcon.style.width = "120px";
                    abilityIcon.style.height = "120px";

                    const abilityName = document.createElement("p");

                    abilityIcon.src = searchResults[i].abilities[j].displayIcon;
                    abilityName.innerHTML = searchResults[i].abilities[j].displayName

                    abilityDiv.appendChild(abilityIcon);
                    abilityDiv.appendChild(abilityName);

                    abilitiesDiv.appendChild(abilityDiv);
                }


            }

            const role = document.createElement("img");
            const roleName = document.createElement("p");

            role.src = searchResults[i].role.displayIcon;
            roleName.innerHTML = searchResults[i].role.displayName;

            card.appendChild(agentDiv);
            card.appendChild(abilitiesDiv);

            view.searchingResults.appendChild(card);
        }
    } else {
        // Else, a "Nothing found" text is displayed
        const noResult = document.createElement("p.info-vide");
        noResult.textContent = "(Nothing found)";
        view.searchingResults.appendChild(noResult);
    }

    

    // Putting back the researches and removing the loading gif
    view.searchingResults.style.display = "flex";
    view.waitingIcon.style.display = "none";
}

view.searchButton.addEventListener("click", searchForResults);

document.addEventListener("keydown", (e) => {

    console.log(e);
    if (e.target === view.searchInput && e.code === 'Enter') {
        searchForResults();
    }
})