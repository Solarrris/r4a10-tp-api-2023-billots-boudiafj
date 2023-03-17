class Research {
    constructor() {
        this.input = "";
    }

    getInput() {
        return this.input;
    }

    setInput(input) {
        this.input = input;
    }

    goToAgentPage(uuid) {
        // Adding to the URL the agent page with an id in the variable agentId
        // Disclaimer : If index.html is in the URL, we remove it.
        const location = window.location.href;
        if (location.includes("index.html")) {
            window.location.href = window.location.href.replace("index.html", "");
        }

        window.location.href = window.location.href + "agent.html?agentId=" + uuid;
    }

    async getSearchedAgents() {
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

        return searchResults;
    }

    creatingAgentElements(searchResults, i) {
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

        return card;
    }
}