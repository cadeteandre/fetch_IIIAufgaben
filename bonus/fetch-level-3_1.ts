import { ICountry } from "../interface/ICountry";


const URL = 'https://restcountries.com/v3.1/all';

const showResults = document.querySelector('#showResults') as HTMLDivElement;
const searchCoutryInput = document.querySelector('#searchCountryInput') as HTMLInputElement;

let fetchedCoutries: ICountry[] = [];

async function fetchAndDisplayCountries(url: string): Promise<void> {
    try {
        const response = await fetch(url);
        const countriesArr = await response.json() as ICountry[];
        fetchedCoutries = [...countriesArr];

        countriesArr.forEach(async (country) => showResults.appendChild(await createCountryContainer(country)));
    } catch(error) {
        console.error(error);
    }
}

async function createCountryContainer(country: ICountry): Promise<HTMLDivElement> {
    const countryCard = document.createElement('div') as HTMLDivElement;
    countryCard.classList.add('country__card');
    countryCard.innerHTML = `
        <div class="name__flag__box">
            <h3>${country.name.official}</h3>
            <img src="${country.flags.svg}" alt="${country.flags.alt}">
        </div>
        <div class="countryData">
            <p><span class="bold__text">Population:</span> ${country.population.toLocaleString('de-DE')}</p>
            <p><span class="bold__text">Area:</span> ${country.area.toLocaleString('de-DE')} km²</p>
            <p><span class="bold__text">Capital:</span> ${country.capital}</p>
            <p><span class="bold__text">Independent:</span> ${country.independent ? 'Yes' : 'No'}</p>
        </div>
    `;
    return countryCard;
}

function searchCountry(): void {
    showResults.innerHTML = '';
    const searchedTitle = searchCoutryInput.value.trim().toLowerCase();

    fetchedCoutries.forEach(async (country) => {
        if(country.name.common.toLowerCase().includes(searchedTitle)) {
            showResults.appendChild(await createCountryContainer(country));
        }
    })
}

searchCoutryInput.addEventListener('input', searchCountry);

fetchAndDisplayCountries(URL);