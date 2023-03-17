"use-strict";

// Updating favourites on page load
window.onload = () => {
    updateFavorites();
};


const showResultPage = async (uuid) => {
    // Adding to the URL the agent page with an id in the variable agentId
    // Disclaimer : If index.html is in the URL, we remove it.
    const location = window.location.href;
    if (location.includes("index.html")) {
        window.location.href = window.location.href.replace("index.html", "");
    }

    window.location.href = window.location.href + "agent.html?agentId=" + uuid;
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

    // Creating an array to store agents searched
    const searchResults = [];

    // Looping through all the agents in the game
    for (let i = 0; i < agents.length; i++) {
        // If the agent name includes the search
        if (
            agents[i].displayName
                .toLowerCase()
                .includes(view.searchInput.value.toLowerCase()) &&
            agents[i].isPlayableCharacter
        ) {
            // Adding the agent to the searched agents array
            searchResults.push(agents[i]);
        }
    }

    // logging the agents searched
    console.log(searchResults);

    // If agents match the research, show a list of those agents
    if (searchResults.length !== 0) {
        // Looping through the searched agents
        for (let i = 0; i < searchResults.length; i++) {
            // Creating a card and adding its class
            const card = document.createElement("div");
            card.classList.add("card");

            // Adding an eventl listener on the card
            card.addEventListener("click", () => {
                showResultPage(searchResults[i].uuid);
            });

            // Creating the agent div and adding its class
            const agentDiv = document.createElement("div");
            agentDiv.classList.add("agent");

            // Creating the agent image and setting its size
            const agentIcon = document.createElement("img");
            agentIcon.style.width = "200px";
            agentIcon.style.height = "200px";

            // Creating the agent name paragraph
            const agentName = document.createElement("p");

            // Setting the source of the agent image
            agentIcon.src = searchResults[i].displayIcon;

            // Setting the agent name
            agentName.innerHTML =
                "<span>Nom : </span>" + searchResults[i].displayName;

            // Adding the agent image and name to the agent div
            agentDiv.appendChild(agentIcon);
            agentDiv.appendChild(agentName);

            // Creating a div for the agent's abilities and setting its class name
            const abilitiesDiv = document.createElement("div");
            abilitiesDiv.classList.add("abilities");

            // Looping through the abilities of the agent
            for (let j = 0; j < searchResults[i].abilities.length; j++) {
                // We decided not to add the passive of the character in the game
                if (searchResults[i].abilities[j].slot !== "Passive") {
                    // Creating a div for the ability itself
                    const abilityDiv = document.createElement("div");

                    // Creating the icon element and stting its style
                    const abilityIcon = document.createElement("img");
                    abilityIcon.style.width = "120px";
                    abilityIcon.style.height = "120px";

                    // Creating the element for the name of the ability
                    const abilityName = document.createElement("p");

                    // Setting the icon source
                    abilityIcon.src = searchResults[i].abilities[j].displayIcon;

                    // Setting the ability name
                    abilityName.innerHTML =
                        searchResults[i].abilities[j].displayName;

                    // Adding the icon and the name to the ability div
                    abilityDiv.appendChild(abilityIcon);
                    abilityDiv.appendChild(abilityName);

                    // Adding the ability div to the abilities div
                    abilitiesDiv.appendChild(abilityDiv);
                }
            }

            // Adding the agent div and the abilities div to the agent card
            card.appendChild(agentDiv);
            card.appendChild(abilitiesDiv);

            // Adding the card to the results of the search
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
};

const onInput = (e) => {
    // If the user presses Enter
    if (e.code === "Enter") {
        // Launch the search
        searchForResults();
    }
};

// Adding an event listener to the search button to launch the search
view.searchButton.addEventListener("click", searchForResults);

// Adding an event listener to the search input on mouse enter to add another one to the document, so that it executes the onInput() function
view.searchInput.addEventListener("mouseenter", (e) => {
    document.addEventListener("keydown", onInput);
});

// Adding an event listener to the search input on mouse leave to remove another one to the document, so that it executes the onInput() function
view.searchInput.addEventListener("mouseleave", (e) => {
    document.removeEventListener("keydown", onInput);
});

const showFavoriteImage = () => {
    let i = 0;

    while (
        i < favoriteResearchesArray.length &&
        view.searchInput.value !== favoriteResearchesArray[i]
    ) {
        i++;
    }

    if (i < favoriteResearchesArray.length) {
        console.log(view.favoriteImages);
        view.favoriteImages[0].style.display = "none";
        view.favoriteImages[1].style.display = "block";
    } else {
        view.favoriteImages[0].style.display = "block";
        view.favoriteImages[1].style.display = "none";
    }
};

// Adding an event listener to the search input on keyup
view.searchInput.addEventListener("keyup", (event) => {
    // The value of the input is empty
    if (event.target.value === "") {
        // Disable the favourites button
        view.favoritesButton.disabled = true;

        // Putting the cursor style to default on the favourites button
        view.favoritesButton.style.cursor = "default";

        // Putting back the default background color to the button
        view.favoritesButton.style.backgroundColor = "#bebebe";
    } else {
        // Activating the favourites button
        view.favoritesButton.disabled = false;

        // Putting the cursor style to pointer on the favourites button
        view.favoritesButton.style.cursor = "pointer";
        view.favoritesButton.style.backgroundColor = "#ff4655";
    }

    showFavoriteImage();

    // Putting a different background color to the button so that we can see it's clickable
    view.favoritesButton.style.backgroundColor = "#20230F";
});

const displayNoFavMessage = () => {
    const noFav = document.createElement("p");
    noFav.innerHTML = "(No favourite research)";
    view.favoritesSection.appendChild(noFav);
};

const updateFavorites = () => {
    if (
        localStorage.getItem("favorites") !== "" &&
        localStorage.getItem("favorites") !== null
    ) {
        console.log(localStorage.getItem("favorites"));
        favoriteResearchesArray = JSON.parse(localStorage.getItem("favorites"));

        while (view.favoriteResearchesList.firstChild) {
            view.favoriteResearchesList.removeChild(
                view.favoriteResearchesList.firstChild
            );
        }

        while (view.searchesDataList.firstChild) {
            view.searchesDataList.removeChild(view.searchesDataList.firstChild);
        }

        if (view.favoritesSection.lastChild.nodeName === "P") {
            view.favoritesSection.removeChild(view.favoritesSection.lastChild);
        }

        if (favoriteResearchesArray.length > 0) {
            for (let i = 0; i < favoriteResearchesArray.length; i++) {
                const favoriteLi = document.createElement("li");
                const favoriteSpan = document.createElement("span");
                const favoriteImg = document.createElement("img");

                favoriteSpan.addEventListener("click", () => {
                    view.searchInput.value = favoriteSpan.innerHTML;
                    searchForResults();
                });

                favoriteImg.addEventListener("click", () => {
                    favoriteResearchesArray.splice(i, 1);
                    localStorage.setItem(
                        "favorites",
                        JSON.stringify(favoriteResearchesArray)
                    );
                    updateFavorites();
                });

                favoriteSpan.title = "Click to restart the research";
                favoriteSpan.innerHTML = favoriteResearchesArray[i];

                favoriteImg.src = "images/croix.svg";
                favoriteImg.style.marginLeft = "10px";
                favoriteImg.alt = "Icon to delete the favourite research";
                favoriteImg.style.width = "15px";
                favoriteImg.title = "Click to delete the favourite research";

                favoriteLi.appendChild(favoriteSpan);
                favoriteLi.appendChild(favoriteImg);

                const option = document.createElement("option");
                option.innerHTML = favoriteResearchesArray[i];
                view.searchesDataList.appendChild(option);

                view.favoriteResearchesList.appendChild(favoriteLi);
            }
        } else {
            displayNoFavMessage();
        }
    } else {
        displayNoFavMessage();
    }
};

view.favoritesButton.addEventListener("click", () => {
    if (view.favoritesButton.disabled === false) {
        if (view.favoriteImages[0].style.display === "block") {
            favoriteResearchesArray.push(view.searchInput.value.trim());
            localStorage.setItem(
                "favorites",
                JSON.stringify(favoriteResearchesArray)
            );

            updateFavorites();
        } else {
            const result = confirm(
                "Do you really want to remove this research from your favorites?"
            );

            if (result) {
                for (let i = 0; i < favoriteResearchesArray.length; i++) {
                    if (
                        view.searchInput.value.trim() ===
                        favoriteResearchesArray[i]
                    ) {
                        favoriteResearchesArray.splice(i, 1);
                    }
                }

                localStorage.setItem(
                    "favorites",
                    JSON.stringify(favoriteResearchesArray)
                );

                updateFavorites();
            }
        }
    }

    showFavoriteImage();
});
