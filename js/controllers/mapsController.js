window.onload = async () => {
    const result = await getData(url + "/maps/");
    console.log(result);

    for (let i = 0; i < result.length; i++) {

        if (result[i].displayName !== "The Range") {
            const mapCard = document.createElement("div");
            const mapImg = document.createElement("img");
            const mapName = document.createElement("p");

            mapImg.src = result[i].splash
            mapImg.style.width = "100%"
            mapName.innerHTML = result[i].displayName.toUpperCase();
            mapName.style.fontWeight = "bold"

            mapCard.classList.add("mapCard");

            mapCard.appendChild(mapImg);
            mapCard.appendChild(mapName);
            mapsView.grid.appendChild(mapCard);
        }
    }
}