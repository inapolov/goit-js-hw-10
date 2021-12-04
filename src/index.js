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
      <img scr="${flags}" alt="${name.official}">
          <h2 class="post-title">${name.official}</h2>
          <p><b>Post id</b>: ${capital}</p>
          <p><b>Author id</b>: ${population}</p>
          <p class="post-body">${languages}</p>
        </li>`;
    })
    .join("");

    
        countryListEl.innerHTML = markup;
 };



function onFetchError() {
    alert('Ошибка!!!');
 };