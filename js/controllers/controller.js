"use-strict";

const favorites = new Favorites();
const research = new Research();

// Updating favourites on page load
window.onload = () => {
    updateFavorites();
};

const showResultPage = async (uuid) => {
    research.goToAgentPage(uuid);
};

const searchForResults = async () => {
    // Showing the loading gif
    view.waitingIcon.style.display = "block";
    view.searchingResults.style.display = "none";

    // Removing all children in the results div
    while (view.searchingResults.firstChild) {
        view.searchingResults.removeChild(view.searchingResults.firstChild);
    }

    const searchedAgents = await research.getSearchedAgents();

    // If agents match the research, show a list of those agents
    if (searchedAgents.length !== 0) {
        // Looping through the searched agents
        for (let i = 0; i < searchedAgents.length; i++) {
            const card = research.creatingAgentElements(searchedAgents, i);

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
    if (favorites.isFavouriteInsideFavouritesArray()) {
        // Displaying the filled star icon and hiding the other one
        view.favoriteImages[0].style.display = "none";
        view.favoriteImages[1].style.display = "block";
    } else {
        // Displaying the empty star icon and hiding the other one
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
    const element = favorites.displayNoFavMessage();

    // Adding the element to the right parent
    view.favoritesSection.appendChild(element);
};

const updateFavorites = () => {
    // If the key "favorites" exists in the local storage and is not empty
    if (
        localStorage.getItem("favorites") !== "" &&
        localStorage.getItem("favorites") !== null
    ) {
        // Getting the favorites research array in the local storage
        favorites.setList(JSON.parse(localStorage.getItem("favorites")));

        // Removing all the child from the list of favourites
        while (view.favoriteResearchesList.firstChild) {
            view.favoriteResearchesList.removeChild(
                view.favoriteResearchesList.firstChild
            );
        }

        // Removing all the child from the searching datalist
        while (view.searchesDataList.firstChild) {
            view.searchesDataList.removeChild(view.searchesDataList.firstChild);
        }

        // Removing the last child if the last child is a p element
        // If the last child is a p element, that means it is the "No favorite research" element
        if (view.favoritesSection.lastChild.nodeName === "P") {
            view.favoritesSection.removeChild(view.favoritesSection.lastChild);
        }

        // If there is elements inside the favourites array
        if (favorites.getList().length > 0) {
            // Looping through the array
            for (let i = 0; i < favorites.getList().length; i++) {
                const favoriteLi = favorites.createFavoriteElements(i);

                const favoriteSpan = document.createElement("span");
                favoriteSpan.title = "Click to restart the research";
                favorites.setSpanValue(favoriteSpan, i);

                // Adding listeners to some elements
                favoriteSpan.addEventListener("click", () => {
                    // Launch the research
                    view.searchInput.value = favoriteSpan.innerHTML;
                    searchForResults();
                });

                favoriteLi.appendChild(favoriteSpan);

                // Creating an option in the datalist to make the autocomplete work
                const option = document.createElement("option");
                option.innerHTML = favorites.getList()[i];
                view.searchesDataList.appendChild(option);

                // Adding the list element to the favourites list element
                view.favoriteResearchesList.appendChild(favoriteLi);
            }
        } else {
            // Displaying the "No favourite research" text
            displayNoFavMessage();
        }
    } else {
        // Displaying the "No favourite research" text
        displayNoFavMessage();
    }
};

view.favoritesButton.addEventListener("click", () => {
    // If the button is not disabled
    if (view.favoritesButton.disabled === false) {
        // If the image displayed is the empty one
        if (view.favoriteImages[0].style.display === "block") {
            // Adding the value of the search input
            favorites.addValueToFavorites(view.searchInput.value);

            updateFavorites();
        } else {
            // Else, it display a message to confirm for the removal of the favourite research
            const result = confirm(
                "Do you really want to remove this research from your favorites?"
            );

            // If the user clicked "Ok"
            if (result) {
                favorites.loopAndRemoveFavoriteElement(view.searchInput.value);

                updateFavorites();
            }
        }
    }

    // Showing the right image
    showFavoriteImage();
});
