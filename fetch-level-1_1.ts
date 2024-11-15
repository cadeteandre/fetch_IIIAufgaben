const URL = 'https://picsum.photos/v2/list';

async function fetchPicsum() {
    try {
        const fetchData = await fetch(URL);
        const result = await fetchData.json();
        console.log(result);
    } catch(error) {
        console.error(error);
    }
}
fetchPicsum();
