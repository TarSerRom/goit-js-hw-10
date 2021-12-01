import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryDetailList from './templates/country-detail-template.hbs';
import countriesList from './templates/countries-list-template.hbs';

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1';
const searchBoxEl = document.getElementById('search-box');
const countriesListEl = document.querySelector('.country-list');

searchBoxEl.addEventListener('input', searchCountries);


function fetchCountryByName(countryName) {
    return fetch(`${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`).then(response => {
        return response.json();
});
}

function searchCountries(event) {
    event.preventDefault();

    const form = event.currentTarget;
    console.log(form.value);
    

    fetchCountryByName(form.value)
        .then(renderCountryCard)
        .catch(error => console.log(error));
}

function renderCountryCard(country) { 
    const markUp = countryDetailList(country);         
    countriesListEl.innerHTML = markUp;
}


