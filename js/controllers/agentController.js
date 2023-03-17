const agent = new Agent();

window.onload = async () => {
    // Getting the agent id in the URL
    const agentId = window.location.href.substring(window.location.href.indexOf("=") + 1);
    const result = await getData(url + "/agents/" + agentId);

    // Setting texts, sources, title and style using the agent properties
    document.title = result.displayName;

    view.agentName.innerHTML = result.displayName;
    view.agentIcon.src = result.fullPortrait;
    view.agentIcon.style.height = "70vh";

    view.agentDescription.innerHTML = result.description;
    view.roleIcon.src = result.role.displayIcon;
    view.roleName.innerHTML = result.role.displayName;

    // Looping through its abilities
    for (let i = 0; i < result.abilities.length; i++) {
        const abilityDiv = agent.createAbilities(result.abilities[i]);

        view.abilities.appendChild(abilityDiv);
    }

    // Setting the content div and not the loading gif
    view.waitingGif.style.display = "none";
    view.mainContent.style.display = "block";
}