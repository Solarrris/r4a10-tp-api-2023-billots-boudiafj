window.onload = async () => {
    const agentId = window.location.href.substring(window.location.href.indexOf("=") + 1);
    const result = await getData(url + "/agents/" + agentId);
    console.log(result);

    document.title = result.displayName;

    view.agentName.innerHTML = result.displayName;
    view.agentIcon.src = result.displayIcon;

    view.waitingGif.style.display = "none";
    view.mainContent.style.display = "block";
}