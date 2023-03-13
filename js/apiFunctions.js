const url = "https://valorant-api.com/v1";

const getData = async function (url) {
    try {
        const response = await fetch(url);
        const jsResponse = await response.json();
        return jsResponse.data;
    } catch (error) {
        console.error(error);
    }
};