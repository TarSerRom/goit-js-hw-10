import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import NewsApiService from './fetchCountries';
import countryDetailList from './templates/country-detail-template.hbs';
import countriesList from './templates/countries-list-template.hbs';
let debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const newsApiService = new NewsApiService();
const searchBoxEl = document.getElementById('search-box');
const countriesListEl = document.querySelector('.country-list');

searchBoxEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries(event) {
    event.preventDefault();

    newsApiService.name = searchBoxEl.value.trim();
    console.log(newsApiService.name);

    if (newsApiService.name === "") {
    countriesListEl.innerHTML = '';
        return
  }
    newsApiService.fetchCountries().then(fetchSucsessCardMarkUp).catch(fetchError);
   
}
function fetchError(error) {
    countriesListEl.innerHTML = '';
    Notify.failure('Oops, there is no country with that name')

}
function fetchSucsessCardMarkUp(countries) {

    if (countries.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.')
    }
    if (countries.length > 1) {
        let markUp = countriesList(countries)
        return countriesListEl.innerHTML = markUp;
    }
    if (countries.length === 1) {
        let markUpDet = countryDetailList(countries)
        return countriesListEl.innerHTML = markUpDet;
    }
}


