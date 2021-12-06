import './css/styles.css';

import { fetchCountriesName } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');


searchBoxEl.addEventListener('input',debounce(onSearch,DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();
    
    const formInput = event.target;    
    const searchQuery = formInput.value;
    
    if (searchQuery==="") {
        clearCountriesContainer();
        return;
    };
    
    fetchCountriesName(searchQuery.trim())
        .then(countries => {
            console.log(countries.length);
            if (countries.length > 10) {
                clearCountriesContainer();
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');               
                return;
            };
            if (countries.length >= 2 && countries.length <= 10) {
                clearCountriesContainer();
                renderCountryList(countries);                
                return;
            };
            clearCountriesContainer();
            renderCountryCard(countries);
        })
        .catch(onFetchError);

 };  

function renderCountryList(countries) {
    const markup = countries
        .map(({ name,flags }) => {
            return `<li class="country-list__item">
      <img src=${flags.svg} width="50px" height="30px" alt="${name.official}">
          <h2 class="name">${name.official}</h2>
          
        </li>`;
    })
    .join("");
    
        countryListEl.insertAdjacentHTML("beforeend", markup);
};

    
function renderCountryCard(countries) {    
    const markup = countries
        .map(({ name,capital,population,flags,languages }) => {
            return `<div class="country-card">
            <div>
      <img src=${flags.svg} width="50px" height="30px" alt="${name.official}">
      </div>
          <h1 class="country-card__name">${name.official}</h2>
          </div>
          <p><span class="country-property">Capital: </span>${capital}</p>
          <p><span class="country-property">Population: </span>${population}</p>
          <p><span class="country-property">Languages: </span>${Object.values(languages).join(", ")}</p>
        `;
    })
    .join("");
    
        countryInfoEl.insertAdjacentHTML("beforeend", markup);
 };


function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');    
 };

function clearCountriesContainer() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
};