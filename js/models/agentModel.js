class Agent {
    createAbilities(result) {
        const ability = result;

        const abilityDiv = document.createElement("div");

        const abilityIcon = document.createElement("img");
        abilityIcon.style.width = "120px";
        abilityIcon.style.height = "120px";

        const abilityName = document.createElement("p");

        abilityIcon.src = ability.displayIcon;
        abilityName.innerHTML = ability.displayName

        abilityDiv.appendChild(abilityIcon);
        abilityDiv.appendChild(abilityName);

        return abilityDiv;
    }
}