"use-strict";

class Favorites {
    constructor() {
        if (
            localStorage.getItem("favorites") !== "" &&
            localStorage.getItem("favorites") !== null
        ) {
            // Getting the favorites research array in the local storage
            this.favoriteResearchesArray = JSON.parse(localStorage.getItem("favorites")) ? JSON.parse(localStorage.getItem("favorites")) : [];
        }
    }

    getList() {
        return this.favoriteResearchesArray;
    }

    setList(value) {
        this.favoriteResearchesArray = value;
    }

    displayNoFavMessage() {
        // Creating a p element
        const noFav = document.createElement("p");

        // Adding its text
        noFav.innerHTML = "(No favourite research)";

        return noFav;
    };

    isFavouriteInsideFavouritesArray() {
        // Initializing a counter
        let i = 0;

        // While the favourites array hasn't been looped on all elements
        // AND the value of the search input isn't the same as the value of the current favourite element
        while (
            i < this.favoriteResearchesArray.length &&
            view.searchInput.value !== this.favoriteResearchesArray[i]
        ) {
            // Mooving to the next element
            i++;
        }

        // If the counter is inferior to the number of elements in the array
        // That means the vlaue of the search is the same as the value of favoriteResearchesArray[i]
        return i < this.favoriteResearchesArray.length;
    }

    createFavoriteElements(i) {
        // Creating elements
        const favoriteLi = document.createElement("li");
        const favoriteImg = document.createElement("img");

        // Adding listener
        favoriteImg.addEventListener("click", () => {
            // Removing the current element form the favorites
            this.favoriteResearchesArray.splice(i, 1);
            localStorage.setItem(
                "favorites",
                JSON.stringify(this.favoriteResearchesArray)
            );
            updateFavorites();
        });

        // Adding titles, texts, sources and styles

        favoriteImg.src = "images/croix.svg";
        favoriteImg.style.marginLeft = "10px";
        favoriteImg.alt = "Icon to delete the favourite research";
        favoriteImg.style.width = "15px";
        favoriteImg.title = "Click to delete the favourite research";

        // Adding the image to the list element
        favoriteLi.appendChild(favoriteImg);

        return favoriteLi;
    }

    addValueToFavorites(value) {
        this.favoriteResearchesArray.push(value.trim());
            localStorage.setItem(
                "favorites",
                JSON.stringify(this.favoriteResearchesArray)
            );
    }
    

    loopAndRemoveFavoriteElement(value) {
        // We search for the element to remove
        for (let i = 0; i < this.favoriteResearchesArray.length; i++) {
            // If the value if the current element is the same as the value of the input
            if (
                value.trim() ===
                this.favoriteResearchesArray[i]
            ) {
                // Remove the element from the list
                this.favoriteResearchesArray.splice(i, 1);
            }
        }

        // Updating the favorites array
        localStorage.setItem(
            "favorites",
            JSON.stringify(this.favoriteResearchesArray)
        );
    }

    setSpanValue(span, i) {
        span.innerHTML = this.favoriteResearchesArray[i];
    }
}