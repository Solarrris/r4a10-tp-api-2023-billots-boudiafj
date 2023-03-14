"use-strict";

const showResultPage = async (uuid) => {
    window.location.href = window.location.href + "agent.html?agentId=" + uuid;
}

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
    const searchResults = [];
    
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

            card.addEventListener('click', () => {
                showResultPage(searchResults[i].uuid);
            });

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
    if (e.target === view.searchInput && e.code === 'Enter') {
        searchForResults();
    }
})


view.searchInput.addEventListener("keyup", (event) => {
    if (event.target.value === "") {
        view.favoritesButton.disabled = true;
        view.favoritesButton.style.cursor = "default";
        view.favoritesButton.style.backgroundColor = "#bebebe";

    } else {
        view.favoritesButton.disabled = false;
        view.favoritesButton.style.cursor = "pointer";
        view.favoritesButton.style.backgroundColor = "#20230F";
    }
});


view.favoritesButton.addEventListener("click", () => {
    if (view.favoritesButton.disabled === false) {
        let i = 0;

        while (i < view.favoriteResearches.length && view.searchInput.value.trim() !== view.favoriteResearches[i].innerText.trim()) {
            i++;
        }

        if (i === view.favoriteResearches.length) {
            favoriteResearchesArray.push(view.searchInput.value.trim());
            localStorage.setItem("favorites", favoriteResearchesArray);   

            for (let i = 0; i < favoriteResearchesArray.length; i++) {        
                const favoriteLi = document.createElement("li");
                const favoriteSpan = document.createElement("span");
                const favoriteImg = document.createElement("img");

                //ajouter eventlistener pour image et span

                favoriteSpan.title = "Click to restart the research";
                favoriteSpan.innerHTML = favoriteResearchesArray[i];

                favoriteImg.src = "images/croix.svg";
                favoriteImg.alt = "Icon to delete the favourite research";
                favoriteImg.style.width = "15px";
                favoriteImg.title = "Click to delete the favourite research";

                favoriteLi.appendChild(favoriteSpan);
                favoriteLi.appendChild(favoriteImg);

                view.favoriteResearchesList.appendChild(favoriteLi); 
            }         
        }
    }
});
