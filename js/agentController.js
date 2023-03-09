window.onload = async () => {
    const agentId = window.location.href.substring(window.location.href.indexOf("=") + 1);
    const result = await getData(url + "/agents/" + agentId);
    console.log(result);

    document.title = result.displayName;

    view.agentName.innerHTML = result.displayName;
    view.agentIcon.src = result.fullPortrait;
    view.agentIcon.style.height = "70vh";

    view.agentDescription.innerHTML = result.description;
    view.roleIcon.src = result.role.displayIcon;
    view.roleName.innerHTML = result.role.displayName;

    for (let i = 0; i < result.abilities.length; i++) {
        const ability = result.abilities[i];

        const abilityDiv = document.createElement("div");

        const abilityIcon = document.createElement("img");
        abilityIcon.style.width = "120px";
        abilityIcon.style.height = "120px";

        const abilityName = document.createElement("p");

        abilityIcon.src = ability.displayIcon;
        abilityName.innerHTML = ability.displayName

        abilityDiv.appendChild(abilityIcon);
        abilityDiv.appendChild(abilityName);

        view.abilities.appendChild(abilityDiv);
    }

    view.waitingGif.style.display = "none";
    view.mainContent.style.display = "block";
}