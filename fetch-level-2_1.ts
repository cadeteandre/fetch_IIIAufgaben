import { IPicsum } from "./interface/Ipicsum";

const URL: string = 'https://picsum.photos/v2/list';

const showResults = document.querySelector('#showResults') as HTMLDivElement;

async function fetchPicsumData(url: string): Promise<void> {
    const response = await fetch(url);
    const picsumArrResp = await response.json() as IPicsum[];
    picsumArrResp.forEach((elt) => displayImages(elt));
}

function displayImages(picsum: IPicsum): void {
    const figureElt = document.createElement('figure');
    const imgElt = document.createElement('img');
    const figcaptionElt = document.createElement('figcaption');

    imgElt.src = picsum.download_url;
    figcaptionElt.textContent = picsum.author;

    figureElt.append(imgElt, figcaptionElt);
    showResults.appendChild(figureElt);
}

fetchPicsumData(URL);