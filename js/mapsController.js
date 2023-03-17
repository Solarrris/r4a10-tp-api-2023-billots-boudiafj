window.onload = async () => {
    const result = await getData(url + "/maps/");
    console.log(result);

    //document.title = result.displayName;

    mapsView.mapName.innerHTML = result.displayName;
    mapsView.mapIcon.src = result.splash;
    mapsView.mapIcon.style.height = "50vh"; //300px

    for (let i = 0; i < result.length; i++) {
        const map = result[i];

        const mapCard = document.createElement("div");
        const mapImg = document.createElement("img");
        const mapName = document.createElement("p");


    mapsView.grid.appendChild(map);


        
    }

}