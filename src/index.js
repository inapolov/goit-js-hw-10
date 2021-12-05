import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTpl from '../src/country-card.hbs';
import {fetchCountriesName} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');


searchBoxEl.addEventListener("input", onSearch);

function onSearch(event) {
    event.preventDefault();

    const formInput = event.currentTarget;    
    const searchQuery = formInput.value;

fetchCountriesName(searchQuery).then(renderCountryCard).catch(onFetchError);

 };  

    
function renderCountryCard(countries) {    
    const markup = countries
        .map(({ name,capital,population,flags,languages }) => {
            return `<li>
      <img scr=${flags.svg} width="200px" height="100px" alt="${name.official}">
          <h2 class="name">${name.official}</h2>
          <p><b>capital</b>: ${capital}</p>
          <p><b>population</b>: ${population}</p>
          <p class="languages"><b>languages</b>:${languages}</p>
        </li>`;
    })
    .join("");

    
        countryListEl.innerHTML = markup;
 };



function onFetchError() {
    alert('Ошибка!!!');
 };